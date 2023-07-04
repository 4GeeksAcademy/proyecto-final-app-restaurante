from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import enum

db = SQLAlchemy()

class Role(enum.Enum):
    ADMIN = 'Admin'
    RESTAURANT = 'Restaurant'

class UserStatus(enum.Enum):
    INVALID = 'invalid'
    VALID = 'valid'

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    salt = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    avatar_url = db.Column(db.String(250))
    role = db.Column(db.Enum(Role), nullable=False)
    status = db.Column(db.Enum(UserStatus), nullable=False, default=UserStatus.VALID)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    restaurant = db.relationship('Restaurant', backref='user', uselist=False)

    def __repr__(self):
        return f'<User {self.name}>'

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'role': self.role.value if self.role is not None else None,
            'status': self.status.value if self.status is not None else None,
            'avatar_url': self.avatar_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }


class Restaurant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)
    name = db.Column(db.String(150), nullable=False)
    rif = db.Column(db.String(20), unique=True, nullable=False)
    description = db.Column(db.Text)
    location = db.Column(db.String(250), nullable=False)
    facebook_url = db.Column(db.String(250))
    twitter_url = db.Column(db.String(250))
    instagram_url = db.Column(db.String(250))
    phone = db.Column(db.String(30))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    image = db.relationship('Restaurant_image', backref='restaurant', lazy = True)

    def __repr__(self):
        return f'<Restaurant {self.rif}>'

    def serialize(self):
        user = self.user.serialize()

        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "rif": self.rif,
            "description": self.description,
            "location": self.location,
            "phone": self.phone,
            "facebook_url": self.facebook_url,
            "twitter_url": self.twitter_url,
            "instagram_url": self.instagram_url,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "image": list(map(lambda img: img.serialize(), self.image)),
            "user": {"avatar_url": user.get("avatar_url"), "name": user.get("name")}
        }

class Restaurant_image(db.Model):

    id= db.Column(db.Integer, primary_key=True)
    restaurante_id= db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
    image_url= db.Column(db.String(255), unique=True, nullable=False)

    def __repr__(self):
        return f'<Restaurant_image {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "restaurante_id": self.restaurante_id,
            "image_url": self.image_url
        }