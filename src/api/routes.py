from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Restaurant, Role, UserStatus, Restaurant_image
from api.utils import generate_sitemap, APIException, password_hash, is_valid_password, is_valid_email, check_password
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from base64 import b64encode
import os
import cloudinary.uploader as uploader
import cloudinary

api = Blueprint('api', __name__)

@api.route('/status', methods=['GET'])
def server_status():
    return jsonify({'message': 'ok'}), 200


@api.route('/restaurant', methods=['POST'])
def register_restaurant():
    form = request.form
    if(form is None):
        return jsonify({'message': "Request must be a form"}), 400
    print(form)
    # are there corrects properties?
    restaurant_name = form.get('restaurantName')
    restaurant_rif = form.get('restaurantRif')
    restaurant_location = form.get('restaurantLocation')
    restaurant_phone = form.get('restaurantPhone')
    user_password = form.get('userPassword')
    user_email = form.get('userEmail')
    if None in [restaurant_name, restaurant_rif, restaurant_location, restaurant_phone, user_password, user_email]:
        return jsonify({'message': "Form has a wrong property"}), 400
    user_name = form.get('restaurantRif')

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

    return jsonify({'message': 'ok'}), 201


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
#Trae todos los restaurantes
@api.route('/restaurant', methods=['GET'])
def get_all_restaurants():
    all_restaurants = Restaurant.query.all()
    return jsonify(list(map(lambda item: item.serialize(), all_restaurants))), 200

#Trae un restaurante por ID
@api.route('/restaurant/<int:restaurant_id>', methods=['GET'])
def get_restaurtant(restaurant_id = None):
    restaurant = Restaurant.query.filter_by(id = restaurant_id).one_or_none()
    if restaurant is None:
        return jsonify({'message': 'Restaurant is not exists'}), 400
    return jsonify(restaurant.serialize()), 200

#Sube una imagen en cloudinary
@api.route('/restaurant/gallery', methods=['POST'])
@jwt_required()
def upload_images():
    #verificar el permiso/ 
    user = User.query.filter_by(name=get_jwt_identity()).one_or_none()

    if user is None:
        return jsonify({'message': 'Access denied'}), 400
    
    if user.role.value != 'Restaurant':
        return jsonify({'message': 'Is not a Restaurant'}), 400
    
    #subir imagen
    image = request.files['image']
    result = cloudinary.uploader.upload(image)
    image_url = result['secure_url']

    restaurant_image = Restaurant_image()
    restaurant_image.restaurante_id = user.restaurant.id
    restaurant_image.image_url = image_url

    db.session.add(restaurant_image)

    try:
        db.session.commit()
    except Exception as err:
        db.session.rollback()
        return jsonify({'message': err.args}), 500
    
    return jsonify({'message': 'Image upload correctly'}), 200

#Subir foto avatar
@api.route('/user/avatar', methods=['POST'])
@jwt_required()
def method_name():
    #verificar el permiso/ 
    user = User.query.filter_by(name=get_jwt_identity()).one_or_none()

    if user is None:
        return jsonify({'message': 'Access denied'}), 400
    
    #subir imagen
    image = request.files['image']
    result = cloudinary.uploader.upload(image)
    image_url = result['secure_url']

    user.avatar_url = image_url
    
    try:
        db.session.commit()
    except Exception as err:
        db.session.rollback()
        return jsonify({'message': err.args}), 500
    
    return jsonify({'message': 'Image upload correctly'}), 200

@api.route('/restaurant', methods=['PUT'])
@jwt_required()
def edit_restaurant():
    user_name = get_jwt_identity()
    user = User.query.filter_by(name=get_jwt_identity()).one_or_none()
    if user is None:
        return jsonify({'message': 'There isnt user'}), 400
    if user.restaurant is None:
        return jsonify({'message': 'user dont have a restaurant.'}), 400

    data = request.form

    user_email = data.get('userEmail')
    if user_email is not None:
        user.email = user_email
    user_password = data.get('userPassword')
    if user_password is not None:
        user.salt = b64encode(os.urandom(32)).decode('utf-8')
        user.password = password_hash(user_password, user.salt)
    user_avatar = request.files['userAvatar']
    if user_avatar is not None:
        result = cloudinary.uploader.upload(user_avatar)
        image_url = result['secure_url']
        user.avatar_url = image_url
    
    restaurant = user.restaurant
    restaurant_name = data.get('restaurantName')
    if restaurant_name is not None:
        restaurant.name = restaurant_name
    restaurant_rif = data.get('restaurantRif')
    if restaurant_rif is not None:
        restaurant.rif = restaurant_rif
        user.name = restaurant_rif
    restaurant_phone = data.get('restaurantPhone')
    if restaurant_phone is not None:
        restaurant.phone = restaurant_phone
    restaurant_location = data.get('restaurantLocation')
    if restaurant_location is not None:
        restaurant.location = restaurant_location
    restaurant_description = data.get('restaurantDescription')
    if restaurant_description is not None:
        restaurant.description = restaurant_description
    restaurant_facebook = data.get('restaurantFacebook')
    if  restaurant_facebook is not None:
        restaurant.facebook_url =  restaurant_facebook
    restaurant_instagram = data.get('restaurantInstagram')
    if restaurant_instagram is not None:
        restaurant.instagram_url = restaurant_instagram
    restaurant_twitter = data.get('restaurantTwitter')
    if restaurant_twitter is not None:
        restaurant.twitter_url = restaurant_twitter

    try:
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return jsonify({'message': 'somthing wrong ocurred'})

    return jsonify({'message': 'ok'})

@api.route('/restaurant/gallery/<int:image_id>', methods=['DELETE'])
@jwt_required()
def delete_restaurant_image(image_id):
    user_name = get_jwt_identity()
    user = User.query.filter_by(name=get_jwt_identity()).one_or_none()
    if user is None:
        return jsonify({'message': 'There isnt user'}), 400
    if user.restaurant is None:
        return jsonify({'message': 'user dont have a restaurant.'}), 400

    restaurant = user.restaurant
    image_to_delete = Restaurant_image.query.filter_by(restaurante_id=restaurant.id, id=image_id).one_or_none()
    
    if image_to_delete is None:
        return jsonify({'message': 'Image not found'}), 400

    db.session.delete(image_to_delete)

    try:
        db.session.commit()
    except Exception as error:
        print(error)
        db.session.rollback()
        return jsonify({'message': err.args}), 500

    return jsonify({'message': 'ok'}), 200