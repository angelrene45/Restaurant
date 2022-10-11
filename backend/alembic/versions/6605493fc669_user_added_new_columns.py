"""User added new columns

Revision ID: 6605493fc669
Revises: 3286f139ada1
Create Date: 2022-09-09 17:09:33.419405

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '6605493fc669'
down_revision = '3286f139ada1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    role_enum = postgresql.ENUM('admin', 'hostess', 'waiter', 'cook', 'client', name='roluser')
    role_enum.create(op.get_bind(), checkfirst=True)
    op.add_column('user', sa.Column('role', role_enum, nullable=True))
    op.add_column('user', sa.Column('created_date', sa.DateTime(), server_default=sa.text('now()'), nullable=True))
    op.add_column('user', sa.Column('updated_date', sa.DateTime(), server_default=sa.text('now()'), nullable=True))
    op.drop_column('user', 'is_superuser')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('is_superuser', sa.BOOLEAN(), autoincrement=False, nullable=True))
    op.drop_column('user', 'updated_date')
    op.drop_column('user', 'created_date')
    op.drop_column('user', 'role')
    # ### end Alembic commands ###