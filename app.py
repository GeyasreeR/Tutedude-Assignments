from flask import Flask, render_template, request, redirect, url_for, flash
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.secret_key = 'any-random-secret-key'  # needed for flash messages

# MongoDB Atlas connection
client = MongoClient(os.environ['MONGO_URI'])
db = client[os.environ['DB_NAME']]
collection = db[os.environ['COLLECTION_NAME']]

@app.route('/', methods=['GET', 'POST'])
def form_page():
    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        message = request.form.get('message', '').strip()

        # Basic validation
        if not name or not email:
            flash('Name and Email are required.', 'error')
            return render_template('form.html', name=name, email=email, message=message)

        try:
            collection.insert_one({
                'name': name,
                'email': email,
                'message': message
            })
            return redirect(url_for('success'))
        except Exception as e:
            flash(f'Error inserting data: {e}', 'error')
            return render_template('form.html', name=name, email=email, message=message)

    return render_template('form.html')

@app.route('/success')
def success():
    return render_template('success.html')

if __name__ == '__main__':
    app.run(debug=True)
