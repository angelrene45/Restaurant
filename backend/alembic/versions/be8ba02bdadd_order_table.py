"""order table

Revision ID: be8ba02bdadd
Revises: 8179b649a289
Create Date: 2022-10-22 19:53:41.407824

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'be8ba02bdadd'
down_revision = '8179b649a289'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('order',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('customer_id', sa.Integer(), nullable=True),
    sa.Column('board_id', sa.Integer(), nullable=True),
    sa.Column('status', postgresql.ENUM('new', 'preparing', 'delivering', 'delivered', 'returned', 'paid', 'cancel', 'failed', name='statusorder'), nullable=True),
    sa.Column('subtotal', sa.Numeric(precision=10, scale=2), nullable=True),
    sa.Column('tax', sa.Numeric(precision=10, scale=2), nullable=True),
    sa.Column('total', sa.Numeric(precision=10, scale=2), nullable=True),
    sa.Column('discount', sa.Integer(), nullable=True),
    sa.Column('grant_total', sa.Numeric(precision=10, scale=2), nullable=True),
    sa.Column('created_date', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_date', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['board_id'], ['board.id'], ),
    sa.ForeignKeyConstraint(['customer_id'], ['customer.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_order_board_id'), 'order', ['board_id'], unique=False)
    op.create_index(op.f('ix_order_customer_id'), 'order', ['customer_id'], unique=False)
    op.create_index(op.f('ix_order_id'), 'order', ['id'], unique=False)
    op.create_index(op.f('ix_order_user_id'), 'order', ['user_id'], unique=False)
    op.create_table('order_food',
    sa.Column('order_id', sa.Integer(), nullable=False),
    sa.Column('food_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('quantity', sa.Integer(), nullable=True),
    sa.Column('price', sa.Numeric(precision=10, scale=2), nullable=True),
    sa.ForeignKeyConstraint(['food_id'], ['food.id'], ),
    sa.ForeignKeyConstraint(['order_id'], ['order.id'], ),
    sa.PrimaryKeyConstraint('order_id', 'food_id')
    )
    op.create_index(op.f('ix_order_food_food_id'), 'order_food', ['food_id'], unique=False)
    op.create_index(op.f('ix_order_food_order_id'), 'order_food', ['order_id'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_order_food_order_id'), table_name='order_food')
    op.drop_index(op.f('ix_order_food_food_id'), table_name='order_food')
    op.drop_table('order_food')
    op.drop_index(op.f('ix_order_user_id'), table_name='order')
    op.drop_index(op.f('ix_order_id'), table_name='order')
    op.drop_index(op.f('ix_order_customer_id'), table_name='order')
    op.drop_index(op.f('ix_order_board_id'), table_name='order')
    op.drop_table('order')
    sa.Enum(name='statusorder').drop(op.get_bind(), checkfirst=False)
    # ### end Alembic commands ###
