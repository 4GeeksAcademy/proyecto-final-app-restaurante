"""empty message

Revision ID: 54845fa04c53
Revises: 
Create Date: 2023-07-06 17:10:54.978493

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '54845fa04c53'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=30), nullable=False),
    sa.Column('password', sa.String(length=250), nullable=False),
    sa.Column('salt', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('avatar_url', sa.String(length=250), nullable=True),
    sa.Column('role', sa.Enum('ADMIN', 'RESTAURANT', name='role'), nullable=False),
    sa.Column('status', sa.Enum('INVALID', 'VALID', name='userstatus'), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('name')
    )
    op.create_table('restaurant',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=150), nullable=False),
    sa.Column('rif', sa.String(length=20), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('location', sa.String(length=250), nullable=False),
    sa.Column('facebook_url', sa.String(length=250), nullable=True),
    sa.Column('twitter_url', sa.String(length=250), nullable=True),
    sa.Column('instagram_url', sa.String(length=250), nullable=True),
    sa.Column('phone', sa.String(length=30), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('rif'),
    sa.UniqueConstraint('user_id')
    )
    op.create_table('food',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('restaurant_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=150), nullable=False),
    sa.Column('price', sa.Float(precision=20), nullable=False),
    sa.Column('description', sa.String(length=200), nullable=False),
    sa.Column('tags', sa.String(length=200), nullable=False),
    sa.Column('image_url', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['restaurant_id'], ['restaurant.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('restaurant_image',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('restaurant_id', sa.Integer(), nullable=False),
    sa.Column('image_url', sa.String(length=255), nullable=False),
    sa.ForeignKeyConstraint(['restaurant_id'], ['restaurant.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('image_url')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('restaurant_image')
    op.drop_table('food')
    op.drop_table('restaurant')
    op.drop_table('user')
    # ### end Alembic commands ###
