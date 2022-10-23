from typing import Dict, Generator
import os
import pytest
import shutil

from starlette.config import environ
from fastapi.testclient import TestClient
from alembic import command
from alembic.config import Config
from sqlalchemy.orm import Session, sessionmaker, session
from sqlalchemy import create_engine
from sqlalchemy.engine.base import Engine
from sqlalchemy_utils import database_exists, create_database, drop_database

from app.main import app
from app.db.base import Base
from app.api.deps import get_db
from app.core.config import settings
from app import crud, schemas, models
from app.tests.utils.user import authentication_token_from_email
from app.tests.utils.utils import get_superuser_token_headers
from app.tests.utils.customer import get_customer_token_headers

environ['TESTING'] = "True"
PATH_STATIC_TESTS = "static/tests"
TestingSessionLocal: sessionmaker = None

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

def create_super_user_test(session: sessionmaker) -> None:
    """create user super in test database"""
    db = session()
    user = crud.user.get_by_email(db, email=settings.FIRST_SUPERUSER)
    if not user:
        user_in = schemas.UserCreate(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            role=models.user.RolUser.admin,
        )
        user = crud.user.create(db, obj_in=user_in)
    db.close()

def clear_static_test_files() -> bool:
    """
        Clear all files in static path
    """
    if os.path.isdir(PATH_STATIC_TESTS):
        shutil.rmtree(PATH_STATIC_TESTS)
    if not os.path.isdir(PATH_STATIC_TESTS): return True
    return False

def pytest_configure(config):
    """This function execute before run the tests"""
    clear_static_test_files()
    os.makedirs(PATH_STATIC_TESTS)

def pytest_unconfigure(config):
    """This function execute after run the tests"""
    clear_static_test_files()

@pytest.fixture(scope="session", autouse=True)
def create_test_database():
    """
    Create a clean database.
    For safety, we should abort if a database already exists.
    """
    global TestingSessionLocal
    url = settings.SQLALCHEMY_DATABASE_URI_TEST
    engine = create_engine(url, pool_pre_ping=True)
    assert not database_exists(url), 'Test database already exists. Aborting tests.'
    create_database(url)             # Create the test database.
    config = Config("alembic.ini")   # Run the migrations.
    command.upgrade(config, "head") 
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    create_super_user_test(TestingSessionLocal)
    yield                            # Run the tests.
<<<<<<< HEAD
    session.close_all_sessions()     # Close open connections
=======
>>>>>>> refs/remotes/origin/FrontBeto
    drop_database(url)               # Drop the test database.


@pytest.fixture(scope="session")
def db() -> Generator:
    yield TestingSessionLocal()


@pytest.fixture(scope="module")
def client() -> Generator:
    # set up
    with TestClient(app) as c:
        yield c


@pytest.fixture(scope="module")
def superuser_token_headers(client: TestClient) -> Dict[str, str]:
    return get_superuser_token_headers(client)


@pytest.fixture(scope="module")
def normal_user_token_headers(client: TestClient, db: Session) -> Dict[str, str]:
    return authentication_token_from_email(
        client=client, email=settings.EMAIL_TEST_USER, db=db
    )


@pytest.fixture(scope="module")
def customer_token_headers(client: TestClient, db: Session) -> Dict[str, str]:
    return get_customer_token_headers(client=client, db=db)

# all endpoints to redirect to testing database
app.dependency_overrides[get_db] = override_get_db