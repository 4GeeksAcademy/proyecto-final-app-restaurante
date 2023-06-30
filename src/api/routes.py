from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Restaurant, Role, UserStatus
from api.utils import generate_sitemap, APIException, password_hash, is_valid_password, is_valid_email
from base64 import b64encode
import os

api = Blueprint('api', __name__)


@api.route('/status', methods=['GET'])
def server_status():
    return jsonify({'message': 'ok'}), 200


@api.route('/register/restaurant', methods=['POST'])
def register_restaurant():
    # is a json item ?
    if not request.is_json:
        return jsonify({'message': "Request's body should be a valid json item"}), 400
    
    body = request.json
    if type(body) is not dict:
        return jsonify({'message': "Request's body should be dict type"}), 400

    # are there "restaurant" and "user" items ?
    userBody = body.get('user')
    if userBody is None:
        return jsonify({'message': "Request's body should contain a 'user' item"}), 400

    restaurantBody = body.get('restaurant')
    if restaurantBody is None:
        return jsonify({'message': "Request's body should contain a 'restaurant' item"}), 400

    if type(userBody) is not dict or type(restaurantBody) is not dict:
        return jsonify({'message': "User and Restaurant should be dict type"}), 400

    # each one of them has corrects properties?
    user_name = userBody.get('name')
    user_password = userBody.get('password')
    user_email = userBody.get('email')
    if None in [user_name, user_password, user_email]:
        return jsonify({'message': "User dict has a wrong property"}), 400

    restaurant_name = restaurantBody.get('name')
    restaurant_rif = restaurantBody.get('rif')
    if None in [restaurant_name, restaurant_rif]:
        return jsonify({'message': "Restaurant dict has a wrong property"}), 400

    # is a valid password ? 
    if not is_valid_password(user_password):
        return jsonify({'message': 'Invalid password'}), 400

    # is a valid email ?
    if not is_valid_email(user_email):
        return jsonify({'message': 'Invalid email'}), 400

    # Creating user
    restaurant_user = User()
    restaurant_user.name = user_name
    restaurant_user.email = user_email
    restaurant_user.role = Role.RESTAURANT
    restaurant_user.status = UserStatus.INVALID
    restaurant_user.salt = b64encode(os.urandom(32)).decode('utf-8')
    restaurant_user.password = password_hash(user_password, restaurant_user.salt)
    
    db.session.add(restaurant_user)
    try:
        db.session.commit()
    except Exception as err:
        db.session.rollback()
        return jsonify({'message': err.args}), 500
    
    # Creating restaurant
    restaurant = Restaurant()
    restaurant.user_id = restaurant_user.id
    restaurant.name = restaurant_name
    restaurant.rif = restaurant_rif

    db.session.add(restaurant)
    try:
        db.session.commit()
    except Exception as err:
        db.session.rollback()
        return jsonify({'message': err.args}), 500

    return jsonify({'message': 'ok'}), 200