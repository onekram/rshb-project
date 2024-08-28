import requests


while True:
    url = 'http://127.0.0.1:5000/submit'
    data = {'name': 'YourName'}

    response = requests.post(url, data=data)

