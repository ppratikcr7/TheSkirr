# The Skirr
Covig Microblogging website
Some helpful things written for the project implementation (Guide):

Steps:

# for reactjs:

cd tweetme2-web
npm install

cd..

# for python django:

install python 3.6 or above and install pip.

pip install django==2.2
pip install django-cors-headers
pip install djangorestframework
pip install django-crispy-forms

python3 manage.py makemigrations (optional, only needed if any db schema change)
or
python manage.py makemigrations

python3 manage.py migrate
or
python manage.py migrate

python3 manage.py runserver
or
python manage.py runserver

Open: http://localhost:8000/

Click signup. Register your user and open link received on email and login with your credentials.

# If you want to work on react app:

cd tweetme2-web
npm start

Open: http://localhost:3000/
or http://localhost:3000/dashboard


# After any change in reactjs side you need to build new changes of react and reflect into django:

cd tweetme2-web
npm run build
copy static files from tweetme2-web/build/static to /static folder in root directory
change name of linked files in templates/react/js.html (you can copy the script tags from “tweetme2-web/build/static/index.html” end lines )
Note: if any change in css then you need to change names of files in templates/react/css.html as well.

# To flush all data rows in all tables of db:
python3 manage.py flush

# To create a superuser admin for admin login and admin panel:
python3 manage.py createsuperuser

Open: http://localhost:8000/admin/

# to view updates in our db.sqlite3 file:
Open: https://sqliteonline.com/
File -> Open DB and select our db.sqlite3 file 
