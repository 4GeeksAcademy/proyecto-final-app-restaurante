from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Restaurant, Role, UserStatus, Restaurant_image
from api.utils import generate_sitemap, APIException, password_hash, is_valid_password, is_valid_email, check_password
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
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

    user = User.query.filter_by(email=email).one_or_none()
    user_salt = user.salt
    user_role = user.role.value
    user_password = user.password

    if check_password(user_password, password, user_salt):
        token = create_access_token(identity=user.name, expires_delta=False)
        return jsonify({'role': user_role, 'token': token}), 200

    return jsonify({'message': 'Wrong credentials'}), 400

# KR
@api.route('/restaurante', methods=['GET'])
def get_all_restaurants():
    all_restaurants = Restaurant.query.all()
    return jsonify(list(map(lambda item: item.serialize(), all_restaurants))), 200

@api.route('/restaurante/<int:restaurant_id>', methods=['GET'])
def get_restaurtant(restaurant_id = None):
    user = User.query.filter_by(id = restaurant_id).all()
    return jsonify(list(map(lambda item: item.serialize(), user))), 200

@api.route('/restaurante/gallery', methods=['POST'])
@jwt_required()
def method_name():
    #verificar el permiso/ 
    user = User.query.filter_by(name=get_jwt_identity()).one_or_none()

    if user is None:
        return jsonify({'message': 'Access denied'}), 400
    
    print(user.role)

    return jsonify({'message': 'Todo ok '}), 400