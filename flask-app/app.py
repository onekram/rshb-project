from flask import Flask, render_template, request
import sqlite3
app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('users.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    conn.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)')
    conn.commit()
    conn.close()

@app.route('/seller')
def seller():
    return render_template('seller.html')

@app.route('/buyer')
def buyer():
    return render_template('buyer.html')

@app.route('/submit', methods=['POST'])
def submit():
    name = request.form['name']
    return f'Hello, {name}!'


@app.route('/send_spare_part', methods=['POST'])
def send():
    spare_part_name = request.form['spare_part_name']
    spare_part_model = request.form['spare_part_model']
    spare_part_price = request.form['spare_part_price']
    seller_name = request.form['seller_name']
    return f'{spare_part_name}'

@app.route('/get_spare_part', methods=['GET'])
def get():
    spare_part_name = request.args.get('spare_part_name', '')
    conn = get_db_connection()
    users = conn.execute('SELECT * FROM users WHERE name LIKE ?', ('%' + spare_part_name + '%',)).fetchall()
    conn.close()
    return render_template('search_results.html', users=users)

if __name__ == '__main__':
    app.run(debug=True)