from sqlalchemy.types import TypeDecorator
from sqlalchemy.dialects.postgresql import TSVECTOR

class TSVector(TypeDecorator):
    impl = TSVECTOR # field for full text search
    cache_ok = True