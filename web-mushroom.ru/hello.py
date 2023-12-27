import pymysql
from flask import Flask, render_template, request, redirect, url_for, session
from flask_mysqldb import MySQL
import MySQLdb.cursors
import MySQLdb.cursors, re, hashlib
from werkzeug.utils import secure_filename
import os
import MySQLdb
from datetime import timedelta


UPLOAD_FOLDER = '/static/downloaded_images'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}


app = Flask(__name__)
app.secret_key = '11427e93dafd3c77075e309a83d3e4d9'
app.cookie_secure='Secure'
app.cookie_duration=timedelta(minutes=5000)
py_db=pymysql.connect(host='localhost',
                      user='mushroom',
                      password='mushroom',
                      db='mushroom_database')

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000*1000



def test_file_resolution(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
@app.route('/', methods=['GET', 'POST'])
def login():
    # Output message if something goes wrong...
    msg = ''
    log='Вход/Регистрация'
    
    if request.method=='POST' and 'zareg' in request.form:
        return render_template('3.html')
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        # Create variables for easy access
        username = request.form['username']
        password =request.form['password']


        cursor=py_db.cursor()
        cursor.execute(f'SELECT * FROM mushroom_accounts WHERE login = \'{str(username)}\' AND password = \'{str(password)}\'')
        # Fetch one record and return the result
        account = cursor.fetchone()
        # If account exists in accounts table in out database
        if account:
            # Create session data, we can access this data in other routes
            session['loggedin'] = True
            session['id'] = account[0]
            tet=account[0]
            session['username'] = account[1]
            session.permanent=True
            app.permanent_session_lifetime=timedelta(minutes=5000)
            # Redirect to home page
            msg = "you\'re logged in"
            log=session['id']

            cursor.execute(f'SELECT * FROM mushroom_post')
            posts = cursor.fetchall()
            filename = posts[0][1]
            filename1 = filename.rsplit('/',1)
            py_db.commit()


            return  render_template('project.html', post=posts)
        else:
            
            # Account doesnt exist or username/password incorrect
            msg = 'Incorrect username/password!'
            
    return render_template('project.html',post=msg)

@app.route('/logout')
def logout():
    # Remove session data, this will log the user out
   session.pop('loggedin', None)
   session.pop('id',None)
   session.pop('username', None)
   # Redirect to login page
   return redirect(url_for('register'))
@app.route('/')
def project():
    return render_template('project.html')




@app.route('/post', methods = ['GET','POST'])
def upload_file():
    msg=''
    if request.method == 'POST'  and 'post_name' in request.form and 'post_description' in request.form:
        if 'post_picture'  not in request.files:
            msg='Загрузите картинку'
        file = request.files['post_picture']
        if file.filename == '':
            msg="Файл не выбран"
        if file.filename.split('.')[1].lower() not in ALLOWED_EXTENSIONS:
            msg='Неправильное разрешение файла!'
        file_size = len(file.read())
        file.seek(0)
        if file_size > app.config['MAX_CONTENT_LENGTH']:
            msg='Файл слишком большой!'
        if file and test_file_resolution(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join('/home/ivan/web-mushroom.ru/static/downloaded_images', file.filename))
            msg='Файл успешно заргужен'
        if 'post_name' in request.form and 'post_description' in request.form:
            name=request.form['post_name'].replace("\'","").replace('\"',"")
            description=request.form['post_description'].replace("\'","").replace('\"',"")
            cursor=py_db.cursor()
            cursor.execute(f'INSERT INTO mushroom_post VALUES (\'{description}\',\'{name}\',\'./static/downloaded_images/{file.filename}\',\'{session["id"]}\',0)')
            py_db.commit()
            msg='Пост успешно создан'
        else:
            return "Все поля заполни" 
    elif request.method=='POST':
        msg="Пожалуйста, заполните форму"
    return render_template('1.html',msg=msg)

@app.route('/register', methods=['GET', 'POST'])
def register():
    # Output message if something goes wrong...
    msg = ''
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        # Create variables for easy access
        username = request.form['username']
        password = request.form['password']
        # Check if account exists using MySQL
        cursor = py_db.cursor()
        cursor.execute(f'SELECT * FROM mushroom_accounts WHERE login = \'{username}\'')
        account = cursor.fetchone()
        # If account exists show error and validation checks
        if account:
            msg = 'Account already exists!'
        elif not re.match(r'[A-Za-z0-9]+', username):
            msg = 'Username must contain only characters and numbers!'
        elif not username or not password:
            msg = 'Please fill out the form!'
        else:
            # Account doesn't exist, and the form data is valid, so insert the new account into the accounts table
            cursor.execute(f'INSERT INTO mushroom_accounts VALUES (\'{username}\',\'{password}\',0)')
            py_db.commit()
            msg = 'You have successfully registered!'
    elif request.method == 'POST':
        # Form is empty... (no POST data)
        msg = 'Please fill out the form!'
    # Show registration form with message (if any)
    return render_template('3.html', msg=msg)
if __name__ == '__main__':
    app.run()

