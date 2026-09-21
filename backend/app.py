from flask import Flask, jsonify, request
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image
from flask_cors import CORS
import os
from flask_mysqldb import MySQL
import MySQLdb  
import re
import bcrypt
import datetime
from dotenv import load_dotenv

load_dotenv()
from flask_jwt_extended import JWTManager, create_access_token, jwt_required


model = load_model('D:/model/model_ResNet152V2.h5')
pred_classes = {0:'Gall Thrips_stage1',
                1:'Gall Thrips_stage2',
                2:'Gall Thrips_stage3',
                3:'Leaf Blight_stage1',
                4:'Leaf Blight_stage2',
                5:'Leaf Blight_stage3',
                6:'Mosaic_stage1',
                7:'Mosaic_stage2',
                8:'Mosaic_stage3',
                9:'Pollu Disease_stage1',
                10:'Pollu Disease_stage2',
                11:'Pollu Disease_stage3',
                12:'Powdery_stage1',
                13:'Powdery_stage2',
                14:'Powdery_stage3',
                15:'Quick Wilt_stage1',
                16:'Quick Wilt_stage2',
                17:'Quick Wilt_stage3'}

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')

mysql = MySQL(app)

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)



@app.route('/api/predict', methods=['GET', 'POST'])
def predict():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image uploaded.'})
        img_file = request.files['image']
        img = Image.open(img_file.stream)
        img = img.resize((224, 224))
        img = image.img_to_array(img)
        img = np.expand_dims(img, axis=0)
        img = img/255
        pred = model.predict(img)
        pred = pred.argmax(axis=1)[0]
        prediction = pred_classes[pred]
        
        return jsonify({'prediction_result': prediction})
    
    except Exception as e:
        return jsonify({'error': 'Given image can not be recognized.'}), 500
    
@app.route("/api/login",  methods=['POST'])

def login():
    if request.method == 'POST':

        user_name = request.form.get('cs_user_name')
        user_password = request.form.get('cs_user_password')

       
        if not user_name or not user_password:
            return jsonify({'error': 'Please fill all required fields'}), 400

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM users WHERE user_name = %s', (user_name,))
        account = cursor.fetchone()

        if account and bcrypt.checkpw(user_password.encode('utf-8'), account['user_password'].encode('utf-8')):
            access_token = create_access_token(identity=user_name)
            return jsonify({"access_token": access_token}), 200
        else:
            return jsonify({'error': 'Incorrect username/password!'}), 400

    return jsonify({'error': 'Invalid request method.'}), 405
    
@app.route("/api/create_account", methods=['GET', 'POST'])

def createAccount():

    if request.method == 'POST' and 'cs_user_name' in request.form and 'cs_user_password' in request.form and 'cs_user_email' in request.form and 'cs_user_full_name' in request.form:
         
        user_full_name = request.form['cs_user_full_name']
        user_name = request.form['cs_user_name']
        user_email = request.form['cs_user_email']
        password = request.form['cs_user_password']

        # Hash the password using bcrypt
        salt = bcrypt.gensalt()
        user_password = bcrypt.hashpw(password.encode('utf-8'), salt)

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    
        cursor.execute('SELECT * FROM users WHERE user_name = %s', (user_name,))
        account = cursor.fetchone()

        cursor.execute('SELECT * FROM users WHERE user_email = %s', (user_email,))
        check_email = cursor.fetchone() 

        created_at = datetime.datetime.now()

        if check_email and account:
            msg = 'Acount already exists!'
            response = jsonify({'error': msg})
            response.status_code = 409 

        elif check_email:
            msg = 'Email already exists!'
            response = jsonify({'error': msg})
            response.status_code = 409

        elif account:
            msg = 'User name already exists!'
            response = jsonify({'error': msg})
            response.status_code = 409
  
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', user_email):
            msg = 'Invalid email address!'
            response = jsonify({'error': msg})
            response.status_code = 400

        elif not user_name or not user_password or not user_email or not user_full_name:
            msg = 'Please fill out the form!'
            response = jsonify({'error': msg})
            response.status_code = 400

        else:
            my_cursor  = mysql.connection.cursor()
            my_cursor.execute('INSERT INTO users (user_name, user_password, user_email, user_full_name,created_at) VALUES (%s, %s, %s, %s, %s)', (user_name, user_password, user_email, user_full_name,created_at))

            mysql.connection.commit()
            msg = 'You have successfully registered!'
            response = jsonify({'success': msg})
            response.status_code = 201

        return response

    elif request.method == 'POST':
        msg = 'Please fill out the form!'
        response = jsonify({'error': msg})
        response.status_code = 400
        return response

    else:
        response = jsonify({'error': 'Invalid request method.'})
        response.status_code = 405
        return response
    

@app.route("/api/checkUser", methods=['GET', 'POST'])

def checkUser():
    if request.method == 'POST' and 'cs_user_name' in request.form and 'cs_user_email' in request.form:
        user_name = request.form['cs_user_name']
        user_email = request.form['cs_user_email']

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
   
        cursor.execute('SELECT * FROM users WHERE user_name = %s AND user_email = %s', (user_name, user_email,))

        account = cursor.fetchone()
        if account:   
            msg = 'successfully!'
            response = jsonify({'user_name': user_name, 'user_email': user_email, 'message': msg})
            response.status_code = 200
            return response

 
        else:
            msg = 'Incorrect username/email!'
            response = jsonify({'error': msg})
            response.status_code = 400
            return response

    else:
        response = jsonify({'error': 'Invalid request method.'})
        response.status_code = 405
        return response

@app.route("/api/changePassword", methods=['GET', 'POST'])

def changePassword():
    if request.method == 'POST' and 'cs_user_name' in request.form and 'cs_password' in request.form:
        user_name = request.form['cs_user_name']
        user_email = request.form['cs_user_email']
        user_password = request.form['cs_password']
        user_conform_password = request.form['cs_conform_password']

        if user_password != user_conform_password:
            msg = 'Passwords do not match!'
            response = jsonify({'error': msg})
            response.status_code = 400
            return response
        else:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

            salt = bcrypt.gensalt()
            password = bcrypt.hashpw(user_password.encode('utf-8'), salt)

            cursor.execute('UPDATE users SET user_password = %s WHERE user_name = %s', (password, user_name))
            mysql.connection.commit()
            msg = 'Password updated successfully!'
            response = jsonify({'user_name': user_name, 'message': msg})
            response.status_code = 200
            return response
    
    else:
        response = jsonify({'error': 'Invalid request method.'})
        response.status_code = 405
        return response    

if __name__ == '__main__':
    app.run()