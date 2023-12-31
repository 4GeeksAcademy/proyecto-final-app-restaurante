from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Restaurant, Role, UserStatus, Restaurant_image, Food, Favorite, Like
from api.utils import generate_sitemap, APIException, password_hash, is_valid_password, is_valid_email, check_password, get_register_email, send_a_email, get_register_admin, aproved_email, rejected_email
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from base64 import b64encode
from sqlalchemy import and_, or_
import sys
import os
import cloudinary.uploader as uploader
import cloudinary
import smtplib
from dotenv import load_dotenv
import email.message

api = Blueprint('api', __name__)

@api.route('/status', methods=['GET'])
@jwt_required()
def server_status():
    user = User.query.filter_by(id=get_jwt_identity()).one_or_none()

    if user is not None:
        user = user.serialize()

    return jsonify(user), 200


@api.route('/restaurant', methods=['POST'])
@jwt_required()
def register_restaurant():
    user = User.query.filter_by(id=get_jwt_identity()).one_or_none()

    if user is None:
        return jsonify({'message': "User not found"}), 404
    if user.role is not Role.USER:
        return jsonify({'message': "User can't create a restaurant"}), 400
    if user.restaurant is not None:
        return jsonify({'message': "User has a restaurant already"}), 400
    
    form = request.form
    if(form is None):
        return jsonify({'message': "Request must be a form"}), 400
    
    # are there corrects properties?
    nickname = form.get('userName')
    name = form.get('restaurantName')
    rif = form.get('restaurantRif')
    location = form.get('restaurantLocation')
    phone = form.get('restaurantPhone')
    if None in [name, rif, location, phone, nickname]:
        return jsonify({'message': "Form has a wrong property"}), 400

    user_exist = User.query.filter_by(name=nickname).one_or_none()
    if user_exist is not None:
        return jsonify({'message': "Nickname already chosen"}), 400

    user.name = nickname
    user.role = Role.RESTAURANT
    user.status = UserStatus.INVALID

    restaurant_exist = Restaurant.query.filter_by(rif=rif).one_or_none()
    if restaurant_exist is not None:
        return jsonify({'message': "Restaurant already exist"}), 400

    # Creating restaurant
    restaurant = Restaurant()
    restaurant.user_id = user.id
    restaurant.name = name
    restaurant.rif = rif
    restaurant.phone = phone
    restaurant.location = location

    db.session.add(restaurant)
    try:
        db.session.commit()
    except Exception as err:
        db.session.rollback()
        return jsonify({'message': err.args}), 500

    # sending email
    email_to = user.email
    title =  'You have registered on Comecon'
    send_a_email(to=email_to, title=title, html=get_register_email())

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
    if user is None:
        return jsonify({'message': "Theres not user"}), 400

    #PARA DESCOMENTAR SE DEBE IMPLEMENTAR CAMBIAR STATUS - KELVIN
    # if user.status != UserStatus.VALID:
    #     return jsonify({'message': "User isnt a valid one yet"}), 400
    
    user_salt = user.salt
    user_role = user.role.value
    user_password = user.password

    if check_password(user_password, password, user_salt):
        token = create_access_token(identity=user.id, expires_delta=False)
        return jsonify({'user': user.serialize(), 'token': token}), 200

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
    user = User.query.filter_by(id=get_jwt_identity()).one_or_none()

    if user is None:
        return jsonify({'message': 'Access denied'}), 400
    
    if user.role.value != 'Restaurant':
        return jsonify({'message': 'Is not a Restaurant'}), 400
    
    #subir imagen
    if 'image' not in request.files:
        return jsonify({'message': 'Is not a image to upload'}), 400

    image = request.files['image']
    result = cloudinary.uploader.upload(image)
    image_url = result['secure_url']    

    restaurant_image = Restaurant_image()
    restaurant_image.restaurant_id = user.restaurant.id
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
    user = User.query.filter_by(id=get_jwt_identity()).one_or_none()
    if user is None:
        return jsonify({'message': 'Access denied'}), 400
    #subir imagen
    if 'image' not in request.files:
        return jsonify({'message': 'Is not a image to upload'}), 400
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
#KR END


@api.route('/restaurant', methods=['PUT'])
@jwt_required()
def edit_restaurant():
    user_name = get_jwt_identity()
    user = User.query.filter_by(id=get_jwt_identity()).one_or_none()
    if user is None:
        return jsonify({'message': 'There isnt user'}), 400
    if user.restaurant is None:
        return jsonify({'message': 'user dont have a restaurant.'}), 400

    data = request.form

    user_password = data.get('userPassword')
    if user_password is not None and user_password != '':
        user.salt = b64encode(os.urandom(32)).decode('utf-8')
        user.password = password_hash(user_password, user.salt)  
    
    restaurant = user.restaurant
    restaurant_name = data.get('restaurantName')
    if restaurant_name is not None and restaurant_name != '':
        restaurant.name = restaurant_name
    restaurant_phone = data.get('restaurantPhone')
    if restaurant_phone is not None and restaurant_phone != '':
        restaurant.phone = restaurant_phone
    restaurant_location = data.get('restaurantLocation')
    if restaurant_location is not None and restaurant_location != '':
        restaurant.location = restaurant_location
    restaurant_description = data.get('restaurantDescription')
    if restaurant_description is not None and restaurant_description != '':
        restaurant.description = restaurant_description
    restaurant_facebook = data.get('restaurantFacebook')
    if  restaurant_facebook is not None and restaurant_facebook != '':
        restaurant.facebook_url =  restaurant_facebook
    restaurant_instagram = data.get('restaurantInstagram')
    if restaurant_instagram is not None and restaurant_instagram != '':
        restaurant.instagram_url = restaurant_instagram
    restaurant_twitter = data.get('restaurantTwitter')
    if restaurant_twitter is not None and restaurant_twitter != '':
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
    user = User.query.filter_by(id=get_jwt_identity()).one_or_none()
    if user is None:
        return jsonify({'message': 'There isnt user'}), 400
    if user.restaurant is None:
        return jsonify({'message': 'user dont have a restaurant.'}), 400

    restaurant = user.restaurant
    image_to_delete = Restaurant_image.query.filter_by(restaurant_id=restaurant.id, id=image_id).one_or_none()
    
    if image_to_delete is None:
        return jsonify({'message': 'Image not found'}), 400

    db.session.delete(image_to_delete)

    try:
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return jsonify({'message': error.args}), 500

    return jsonify({'message': 'ok'}), 200

#KR
#Agrega plato al menu
@api.route('restaurant/food', methods=['POST'])
@jwt_required()
def add_dish():

    user = User.query.filter_by(id=get_jwt_identity()).one_or_none()
    if user is None:
        return jsonify({'message': 'There isnt user'}), 400
    
    if user.restaurant is None:
        return jsonify({'message': 'User dont have a restaurant.'}), 400

    form = request.form
    food_name = form.get('foodName')
    food_price = form.get('foodPrice')
    food_description = form.get('foodDescription')
    food_tags = form.get('foodTags')
    
    #subir imagen
    if 'image' not in request.files:
        return jsonify({'message': 'Is not a image to upload'}), 400
    
    image = request.files['image']
    result = cloudinary.uploader.upload(image)
    image_url = result['secure_url']
    food_image = image_url

    if None in [food_name, food_price, food_description, food_tags, food_image]:
        return jsonify({'message': "Form has a wrong property"}), 400

    food = Food()
    food.restaurant_id = user.restaurant.id
    food.name = food_name
    food.price = food_price
    food.description = str.lower(food_description)
    food.tags = str.lower(food_tags)
    food.image_url = food_image

    db.session.add(food)
    
    try:
        db.session.commit()
    except Exception as err:
        db.session.rollback()
        return jsonify({'message': err.args}), 500
    
    return jsonify({'message': 'Food add correctly'}), 200

# Edita un plato
@api.route('restaurant/food/<int:food_id>', methods=['PUT'])
@jwt_required()
def edit_dish(food_id = None):

    user = User.query.filter_by(id=get_jwt_identity()).one_or_none()
    if user is None:
        return jsonify({'message': 'There isnt user'}), 400
    if user.restaurant is None:
        return jsonify({'message': 'user dont have a restaurant.'}), 400

    restaurant = user.restaurant
    food_to_change = Food.query.filter_by(restaurant_id=restaurant.id, id=food_id).one_or_none()

    if food_to_change is None:
        return jsonify({'message': 'Food not found'}), 400

    form = request.form

    food_name = form.get('foodName')
    if food_name is not None:
        food_to_change.name = food_name

    food_price = form.get('foodPrice')
    if food_price is not None:
        food_to_change.price = food_price

    food_description = form.get('foodDescription')
    if food_description is not None:
        food_to_change.description = food_description

    food_tags = form.get('foodTags')
    if food_tags is not None:
        food_to_change.tags = food_tags

    #subir imagen
    if 'image' in request.files:
        image = request.files['image']
        result = cloudinary.uploader.upload(image)
        image_url = result['secure_url']
        food_image = image_url
    else: 
        food_image = None

    if food_image is not None:
        food_to_change.image_url = food_image
    
    try:
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return jsonify({'message': 'somthing wrong ocurred'})

    return jsonify({'message': 'Food edit correctly'}), 200

#Eliminar un plato
@api.route('/restaurant/food/<int:food_id>', methods=['DELETE'])
@jwt_required()
def delete_food(food_id = None):
    user = User.query.filter_by(id=get_jwt_identity()).one_or_none()
    if user is None:
        return jsonify({'message': 'There isnt user'}), 400
    if user.restaurant is None:
        return jsonify({'message': 'User dont have a restaurant.'}), 400

    restaurant = user.restaurant
    food_to_delete = Food.query.filter_by(restaurant_id=restaurant.id, id=food_id).one_or_none()
    
    if food_to_delete is None:
        return jsonify({'message': 'Food not found'}), 400

    db.session.delete(food_to_delete)

    try:
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return jsonify({'message': error.args}), 500


    return jsonify({'message': 'ok'}), 200  


#Trae todos los platos
@api.route('/food', methods=['GET'])
def get_all_food():
    queryDescription = f'%{request.args.get("description")}%' if request.args.get('description') != '' else '%'
    queryTag = f'%{request.args.get("tags")}%' if request.args.get('tags') != '' else '%'
    queryPrice = request.args.get('price') if request.args.get('price') != '' else sys.maxsize
    queryLimit = request.args.get('limit') if request.args.get('limit') != '' else None

    query_filter = and_(
                        or_(
                            Food.description.ilike(queryDescription),
                            Food.tags.ilike(queryTag)
                        ),
                        Food.price <= queryPrice
                    )

    all_food = Food.query.filter(query_filter).limit(queryLimit).all()
    return jsonify(list(map(lambda item: item.serialize(), all_food))), 200


#Trae todos los platos de un restaurant
@api.route('/restaurant/<int:restaurant_id>/food', methods=['GET'])
def get_allrest_food(restaurant_id = None):
    restaurant = Restaurant.query.filter_by(id=restaurant_id).one_or_none()
    return jsonify(list(map(lambda item: item.serialize(), restaurant.foods))), 200


@api.route('/user', methods=['POST'])
def add_user():
    form = request.form
    if(form is None):
        return jsonify({'message': "Request must be a form"}), 400
    # are there corrects properties?
    user_name = form.get('name')
    user_email = form.get('email')
    user_role = form.get('role')
    user_password = form.get('password')
    user_status = form.get('status')
    if None in [user_name, user_email, user_role, user_password, user_status]:
        return jsonify({'message': "Form has a wrong property"}), 400

    user = User.query.filter_by(name=user_name).one_or_none()
    if user is not None:
        return jsonify({'message': "Name is being used by another user"}), 400
    
    user = User.query.filter_by(email=user_email).one_or_none()
    if user is not None:
        return jsonify({'message': "Email is being used by another user"}), 400

    # is a valid password ? 
    if not is_valid_password(user_password):
        return jsonify({'message': 'Invalid password'}), 400

    # is a valid email ?
    if not is_valid_email(user_email):
        return jsonify({'message': 'Invalid email'}), 400

    user = User()
    user.name = user_name
    user.email = user_email
    user.role = Role.get_role(user_role)
    user.status = UserStatus.get_status(user_status)
    user.salt = b64encode(os.urandom(32)).decode('utf-8')
    user.password = password_hash(user_password, user.salt)

    user_avatar = request.files.get('avatar_url')
    if user_avatar is not None:
        result = cloudinary.uploader.upload(user_avatar)
        image_url = result['secure_url']
        user.avatar_url = image_url

    db.session.add(user)
    try:
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error.args)
        return jsonify(error.args), 500

    return jsonify(user.serialize()), 201

#Get all requests
@api.route('/user', methods=['GET'])
@jwt_required()
def get_user_filtered():
    user = User.query.filter_by(id=get_jwt_identity()).one_or_none()
    # if user.role != Role.ADMIN:
    #     return jsonify({'message': 'not permise'}), 200

    user_role = request.args.get('role')
    user_role = Role.get_role(user_role)
    user_status = request.args.get('status')
    user_status = UserStatus.get_status(user_status)

    if user_role is not None and user_status is not None:
        user_list = User.query.filter_by(role=user_role, status=user_status).all()
    elif user_role is not None:
        user_list = User.query.filter_by(role=user_role).all()
    elif user_status is not None:
        user_list = User.query.filter_by(status=user_status).all()
    else:
        user_list = User.query.all()

    user_list = list(map(lambda user: user.serialize(), user_list))

    return jsonify(user_list), 200

@api.route('/user/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    user = User.query.filter_by(id=get_jwt_identity()).one_or_none()
    if user is None:
        return jsonify({'message': 'Wrong user.'}), 400
    if user.role != Role.ADMIN:
        return jsonify({'message': 'Enough permision.'}), 405

    user_delete = User.query.filter_by(id=user_id).one_or_none()
    if user_delete is None:
        return jsonify({'message': 'There isnt user to delete.'}), 400

    user_delete.status = UserStatus.DELETED

    try:
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return jsonify({'message': error.args}), 500

    return jsonify({'message': 'ok'}), 200

#Change status 
@api.route('/user/<int:user_id>', methods=['PUT'])
@jwt_required()
def change_status_restaurant(user_id = None):
    user = User.query.filter_by(id=get_jwt_identity()).one_or_none()
    if user is None:
        return jsonify({'message': 'Wrong user.'}), 400
    # if user.role != Role.ADMIN:
    #     return jsonify({'message': 'Enough permision.'}), 405

    form = request.form
    print(form, user)
    
    if(form is None):
        return jsonify({'message': "Request must be a form"}), 400

    email_to =  form.get('email')

    if None in [email_to]:
        return jsonify({'message': 'wrong property'})

    user_to_change = User.query.filter_by(id=user_id).one_or_none()
    if user_to_change is None:
        return jsonify({'message': "There isn't user valid!."}), 400
    
    if form.get('status') == "valid":   
        user_to_change.status = UserStatus.VALID
        send_a_email(to=email_to, title='Has sido aprobado en Comecon', html=aproved_email())
    elif form.get('status') == "invalid":
        user_to_change.status = UserStatus.INVALID
        send_a_email(to=email_to, title='Has sido rechazado en Comecon', html=rejected_email())

    try:
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return jsonify({'message': 'Something wrong ocurred'})  

    return jsonify({'message': 'ok'}), 200      

@api.route('/register-admin', methods=['POST'])
@jwt_required()
def send_email_register_admin():
    user = User.query.filter_by(id=get_jwt_identity()).one_or_none()
    if user is None:
        return jsonify({'message': 'Wrong user.'}), 400
    if user.role != Role.ADMIN:
        return jsonify({'message': 'Enough permision.'}), 405

    form = request.form
    if form is None:
        return jsonify({'message': "Request must be a form"}), 400
    
    email_to =  form.get('to')
    if None in [email_to]:
        return jsonify({'message': 'wrong property'}), 400

    user = User.query.filter_by(email=email_to).one_or_none()
    if user is not None:
        return jsonify({'message': 'Email is being used by another user'}), 400

    new_user = User()
    new_user.name = email_to
    new_user.email = email_to
    new_user.role = Role.ADMIN
    new_user.status = UserStatus.INVALID
    new_user.salt = b64encode(os.urandom(32)).decode('utf-8')
    new_user.password = password_hash(email_to, new_user.salt)

    db.session.add(new_user)
    try:
        db.session.commit()
    except Exception as err:
        db.session.rollback()
        return jsonify({'message': err.args}), 500

    token = create_access_token(identity=new_user.password, expires_delta=False)
    title =  'Register as admin in Comecon'

    html = get_register_admin(token=token)
    send_a_email(to=email_to, title=title, html=html)

    return jsonify({'message': 'ok'}), 200

@api.route('/self-register-admin', methods=['PUT'])
@jwt_required()
def self_register_admin(): 
    password = get_jwt_identity()
    user = User.query.filter_by(password=password).one_or_none()
    if user is None:
        return jsonify({'message': 'Wrong user.'}), 400

    form = request.form

    avatar = request.files.get('avatar')
    if avatar is not None:
        result = cloudinary.uploader.upload(avatar)
        image_url = result['secure_url']
        user.avatar_url = image_url

    name = form.get('name')
    if name is not None:
        user.name = name

    password = form.get('password')
    if password is not None:
        user.salt = b64encode(os.urandom(32)).decode('utf-8')
        user.password = password_hash(password, user.salt)

    user.status = UserStatus.VALID

    try:
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error.args)
        return jsonify({'message': 'Something wrong ocurred'}), 500

    return jsonify({'message': 'ok'}), 200  

@api.route('/restaurant/<int:restaurant_id>', methods=['DELETE'])
@jwt_required()
def delete_restaurant(restaurant_id = None):
    user = User.query.filter_by(id=get_jwt_identity()).one_or_none()
    if restaurant_id is None:
        return jsonify({'message': 'Restaurant not found.'}), 404
    if user is None:
        return jsonify({'message': 'Wrong user.'}), 400
    if user.role != Role.ADMIN and user.restaurant.id != restaurant_id:
        return jsonify({'message': 'Enough permision.'}), 405
    
    restaurant_delete = None
    if user.role == Role.ADMIN:
        restaurant_delete = Restaurant.query.filter_by(id=restaurant_id).one_or_none()
    else:
        restaurant_delete = Restaurant.query.filter_by(id=user.restaurant.id).one_or_none()

    if restaurant_delete is None:
        return jsonify({'message': 'Restaurant not found.'}), 404

    user_delete = None
    if user.role == Role.ADMIN:
        user_delete = User.query.filter_by(id=restaurant_delete.user_id).one_or_none()
    else:
        user_delete = user
    
    if user_delete is None:
        return jsonify({'message': 'User not found.'}), 404

    # delete all restaurant's data
    try:
        image_array = Restaurant_image.query.filter_by(restaurant_id=restaurant_delete.id).all()
        for image in image_array:
            db.session.delete(image)
        food_array = Food.query.filter_by(restaurant_id=restaurant_delete.id).all()
        for food in food_array:
            db.session.delete(food)
        db.session.delete(restaurant_delete)
        
        user_delete.role = Role.USER

        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return jsonify({'message': error.args}), 500

    return jsonify({'message': 'ok'}), 200

@api.route('/favorite', methods=['GET'])
@jwt_required()
def get_favorite():
    user = User.query.filter_by(id=get_jwt_identity()).one_or_none()

    if user is None:
        return jsonify({'message': 'User not found'}), 404

    favorite_list = list(map(lambda food: food.serialize(), Favorite.query.filter_by(user_id = user.id).all()))

    return jsonify(favorite_list), 200

@api.route('/favorite', methods=['POST'])
@jwt_required()
def set_favorite():
    user = User.query.filter_by(id=get_jwt_identity()).one_or_none()

    if user is None:
        return jsonify({'message': 'User not found'}), 404

    body = request.get_json()
    if body is None:
        return jsonify({'message': 'Wrong body'}), 400

    food_id = body.get('foodId')
    if food_id is None:
        return jsonify({'message': "You have to specify a food id"}), 400

    food_exist = Food.query.filter_by(id=food_id).one_or_none()
    if food_exist is None:
        return jsonify({'message': "Food not found"}), 404

    favorite_exist = Favorite.query.filter_by(user_id=user.id, food_id=food_id).first()
    if favorite_exist is not None:
        return jsonify({'message': "Food is favorite already"}), 208

    favorite = Favorite()
    favorite.user_id = user.id
    favorite.food_id = food_id

    try:
        db.session.add(favorite)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error.args)
        return jsonify({'message': error.args}), 500

    return jsonify(favorite.serialize()), 201

@api.route('/favorite', methods=['DELETE'])
@jwt_required()
def delete_favorite():
    user = User.query.filter_by(id=get_jwt_identity()).one_or_none()

    if user is None:
        return jsonify({'message': 'User not found'}), 404

    body = request.get_json()
    if body is None:
        return jsonify({'message': 'Wrong body'}), 400

    food_id = body.get('foodId')
    if food_id is None:
        return jsonify({'message': "You have to specify a food id"}), 400

    favorite = Favorite.query.filter_by(user_id=user.id, food_id=food_id).first()
    if favorite is None:
        return jsonify({'message': "Favorite not found"}), 404

    try:
        db.session.delete(favorite)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error.args)
        return jsonify({'message': error.args}), 500

    return jsonify({'message': 'Favorite deleted successful'}), 200


@api.route('/like/user', methods=['GET'])
@jwt_required()
def get_user_like():
    user = User.query.filter_by(id=get_jwt_identity()).one_or_none()

    if user is None:
        return jsonify({'message': 'User not found'}), 404

    like = list(map(lambda like: like.serialize(), Like.query.filter_by(user_id=user.id).all()))

    return jsonify(like), 200


@api.route('/like/food', methods=['GET'])
def get_food_like():
    body = request.get_json()
    if body is None:
        return jsonify({'message': "Body is empty"}), 400

    food_id = body.get('foodId')
    if food_id is None:
        return jsonify({'message': "Wrong property"}), 400

    food = Food.query.filter_by(id=food_id).one_or_none()

    if food is None:
        return jsonify({'message': 'Food not found'}), 404

    like_list = Like.query.all()

    return jsonify(list(map(lambda like: like.serialize(), like_list))), 200


@api.route('/like', methods=['POST'])
@jwt_required()
def post_like():
    user = User.query.filter_by(id=get_jwt_identity()).one_or_none()

    if user is None:
        return jsonify({'message': 'User not found'}), 404

    form = request.form
    if form is None:
        return jsonify({'message': "Request must be a form"}), 400

    food_id = form.get('foodId')
    liked = form.get('like')
    if None in [food_id, liked]:
        return jsonify({'message': "Wrong property"}), 400

    liked = liked == 1

    food = Food.query.filter_by(id=food_id).one_or_none()
    if food is None:
        return jsonify({'message': "Food no found"}), 404

    is_liked = Like.query.filter_by(food_id=food.id, user_id=user.id).first()
    if is_liked is not None:
        return jsonify({'message': "Is liked already"}), 400

    like = Like()
    like.user_id = user.id
    like.food_id = food.id
    like.liked = liked

    try:
        db.session.add(like)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error.args)
        return jsonify({'message': error.args}), 500

    return jsonify({'message': 'ok'}), 201


@api.route('/like', methods=['DELETE'])
@jwt_required()
def delete_like():
    user = User.query.filter_by(id=get_jwt_identity()).one_or_none()

    if user is None:
        return jsonify({'message': 'User not found'}), 404

    form = request.form
    if form is None:
        return jsonify({'message': "Request must be a form"}), 400

    food_id = form.get('foodId')
    if None in [food_id]:
        return jsonify({'message': "Wrong property"}), 400
    
    food = Food.query.filter_by(id=food_id).one_or_none()
    if food is None:
        return jsonify({'message': "Food not found"}), 404

    like = Like.query.filter_by(user_id=user.id, food_id=food_id).first()
    if like is None:
        return jsonify({'message': "like not found"}), 404

    try:
        db.session.delete(like)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error.args)
        return jsonify({'message': error.args}), 500

    return jsonify({'message': "ok"}), 200