from flask import Flask, render_template, request, redirect, url_for, jsonify
import sqlite3
app = Flask(__name__)

# Функция для подключения к базе данных
def get_db_connection():
    conn = sqlite3.connect('parts.db')
    conn.row_factory = sqlite3.Row  # Позволяет обращаться к столбцам по имени
    return conn

# Создаем таблицу, если она не существует
def init_db():
    with get_db_connection() as conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS parts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                spare_part_name TEXT NOT NULL,
                spare_part_model TEXT NOT NULL,
                spare_part_price REAL NOT NULL,
                seller_name TEXT NOT NULL
            )
        ''')
        conn.commit()

@app.route('/')
def seller():
    return render_template('seller.html')

@app.route('/buyer')
def buyer():
    return render_template('buyer.html')

@app.route('/send_spare_part', methods=['POST'])
def send():
    spare_part_name = request.form['spare_part_name']
    spare_part_model = request.form['spare_part_model']
    spare_part_price = request.form['spare_part_price']
    seller_name = request.form['seller_name']

    # Вставляем данные в таблицу
    with get_db_connection() as conn:
        conn.execute('''
            INSERT INTO parts (spare_part_name, spare_part_model, spare_part_price, seller_name)
            VALUES (?, ?, ?, ?)
        ''', (spare_part_name, spare_part_model, spare_part_price, seller_name))
        conn.commit()

    return redirect(url_for('success'))

@app.route('/success')
def success():
    return render_template('success.html')

@app.route('/get_spare_part', methods=['GET'])
def get():

    model = request.args.get('spare_part_model')  # Получаем модель из параметров запроса

    if not model:
        return jsonify({'error': 'Не указана модель'}), 400

    # Выполняем поиск в базе данных
    with get_db_connection() as conn:
        parts = conn.execute('''
            SELECT * FROM parts WHERE spare_part_model = ? ORDER BY spare_part_price
        ''', (model,)).fetchall()

    # Формируем ответ
    results = []
    for part in parts:
        results.append({
            'id': part['id'],
            'spare_part_name': part['spare_part_name'],
            'spare_part_model': part['spare_part_model'],
            'spare_part_price': part['spare_part_price'],
            'seller_name': part['seller_name']
        })

    return jsonify(results)

if __name__ == '__main__':
    init_db()
    app.run(debug=True)