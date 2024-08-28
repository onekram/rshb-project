from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    name = request.form['name']
    return f'Hello, {name}!'


@app.route('/send_spare_part', methods=['POST'])
def submit():
    spare_part_name = request.form['spare_part_name']
    spare_part_model = request.form['spare_part_model']
    spare_part_price = request.form['spare_part_price']
    seller_name = request.form['seller_name']
    return {spare_part_name}

@app.route('/get_spare_part', methods=['GET'])
def submit():
    spare_part_name = request.form['spare_part_name']



if __name__ == '__main__':
    app.run(debug=True)