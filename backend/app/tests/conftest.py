from typing import Dict, Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.engine.base import Engine

from app.main import app
from app.db.base import Base
from app.api.deps import get_db
from app.core.config import settings
from app import crud, schemas, models
from app.tests.utils.user import authentication_token_from_email
from app.tests.utils.utils import get_superuser_token_headers, get_customer_token_headers

TestingSessionLocal: sessionmaker = None
engine_server: Engine = None
engine_db: Engine = None

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

def create_test_database() -> None:
    global engine_server
    engine_server = create_engine(settings.SQLALCHEMY_DATABASE_URI, pool_pre_ping=True)
    conn = engine_server.connect()
    result = conn.execute("SELECT count(*) FROM pg_database WHERE datname='test' ")
    if not result.fetchone()[0]:
        conn.execute("commit")
        conn.execute("create database test")
    conn.close()

def create_engine_database() -> None:
    """create engine for database test"""
    global TestingSessionLocal, engine_db
    engine_db = create_engine(settings.SQLALCHEMY_DATABASE_URI_TEST, pool_pre_ping=True)
    # create all tables from models
    Base.metadata.create_all(bind=engine_db)
    # create sessionmaker
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine_db)

def create_super_user_test() -> None:
    """create user super in test database"""
    db = TestingSessionLocal()
    user = crud.user.get_by_email(db, email=settings.FIRST_SUPERUSER)
    if not user:
        user_in = schemas.UserCreate(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            role=models.user.RolUser.admin,
        )
        user = crud.user.create(db, obj_in=user_in)
    db.close()

def drop_test_database() -> None:
    """ Drop database test """
    # close all connections opened
    sessionmaker.close_all()
    engine_db.dispose()
    # drop database
    conn = engine_server.connect()
    conn.execute("commit")
    conn.execute("DROP DATABASE test")
    conn.close()
    engine_server.dispose()

def pytest_configure(config) -> None:
    """before start all test"""
    create_test_database()
    create_engine_database()
    create_super_user_test()

def pytest_unconfigure(config) -> None:
    """after run all test"""
    drop_test_database()

@pytest.fixture(scope="session")
def db() -> Generator:
    yield TestingSessionLocal()


@pytest.fixture(scope="module")
def client() -> Generator:
    with TestClient(app) as c:
        yield c


@pytest.fixture(scope="module")
def superuser_token_headers(client: TestClient) -> Dict[str, str]:
    return get_superuser_token_headers(client)

@pytest.fixture(scope="module")
def customer_token_headers(client: TestClient, db: Session) -> Dict[str, str]:
    return get_customer_token_headers(client, db)


@pytest.fixture(scope="module")
def normal_user_token_headers(client: TestClient, db: Session) -> Dict[str, str]:
    return authentication_token_from_email(
        client=client, email=settings.EMAIL_TEST_USER, db=db
    )

# all endpoints to redirect to testing database
app.dependency_overrides[get_db] = override_get_db