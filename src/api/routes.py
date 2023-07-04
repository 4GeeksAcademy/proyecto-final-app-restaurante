from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Restaurant, Role, UserStatus
from api.utils import generate_sitemap, APIException, password_hash, is_valid_password, is_valid_email, check_password
from flask_jwt_extended import create_access_token
from base64 import b64encode
import os

api = Blueprint('api', __name__)


@api.route('/status', methods=['GET'])
def server_status():
    return jsonify({'message': 'ok'}), 200


@api.route('/restaurant', methods=['POST'])
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
    user_name = restaurantBody.get('rif')
    user_password = userBody.get('password')
    user_email = userBody.get('email')
    if None in [user_name, user_password, user_email]:
        return jsonify({'message': "User dict has a wrong property"}), 400

    restaurant_name = restaurantBody.get('name')
    restaurant_rif = restaurantBody.get('rif')
    restaurant_location = restaurantBody.get('location')
    restaurant_phone = restaurantBody.get('phone')
    if None in [restaurant_name, restaurant_rif, restaurant_location, restaurant_phone]:
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
    restaurant.phone = restaurant_phone
    restaurant.location = restaurant_location

    db.session.add(restaurant)
    try:
        db.session.commit()
    except Exception as err:
        db.session.rollback()
        return jsonify({'message': err.args}), 500

    return jsonify({'message': 'ok'}), 200


@api.route('/login', methods=['POST'])
def login():
    # is a json item ?
    if not request.is_json:
        return jsonify({'message': "Request's body should be a valid json item"}), 400
    
    body = request.json
    if type(body) is not dict:
        return jsonify({'message': "Request's body should be dict type"}), 400

    # has valid properties ? 
    email = body.get('email', None)
    password = body.get('password', None)
    if None in [email, password]:
        return jsonify({'message': "User dict has a wrong property"}), 400

    # 7-4-23 2:24
    # if email is None:
    #     return jsonify({"message": "Missing email parameter"})
    # if password is None:
    #     return jsonify({"message": "Missing password parameter"})

    user = User.query.filter_by(email=email).one_or_none()
    user_salt = user.salt
    user_role = user.role.value
    user_password = user.password

    if check_password(user_password, password, user_salt):
        token = create_access_token(identity=user.name, expires_delta=False)
        return jsonify({'role': user_role, 'token': token}), 200
    # 7-4-23 2:24
    #   else:
    #     return jsonify({"message": "bad credentials"}), 400

    return jsonify({'message': 'Wrong credentials'}), 400