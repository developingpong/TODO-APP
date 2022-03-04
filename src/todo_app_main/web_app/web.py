from flask import Flask, url_for
from flask import render_template
from flask import redirect, abort

app = Flask("Pruebas")
@app.route('/')
def redirect_home():
    return redirect(url_for('home'))

@app.route('/app')
def home():
    return render_template('home.html')

def create_web():
    app.run(debug=True, host="0.0.0.0")


create_web()