# Проект РСХБ Цифра
## Вы можете посетить [проект](https://rshb-project.onrender.com/), который исполняется на хостинге
*Это бесплатный хостинг для тестирования приложений, так что вам возможно потребуется **немного подождать** загрузки*

### Установка зависимостей
```commandline
pip install -r requirements.txt
```

### Запуск приложения
```commandline
python flask-app/app.py
```

## Описание интерфейса
### Главная страница
![Main](pages/Screenshot%20from%202024-09-01%2001-14-18.png)
- На этой странице вы можете выбрать действие в системе: __добавить позицию__ или __подобрать позицию__

### Добавить позицию в систему
![Seller](pages/Screenshot%20from%202024-09-01%2001-14-35.png)
- На странице доступна форма из четырех полей: _Запчасть_, _Техника_, _Цена_, _Имя поставщика_
- Также вам предоставляется возможность добавить позицию уже зарегистрированной техники, для этого необходимо **кликнуть по модели**

### Подборка запчастей
![Buyer](pages/Screenshot%20from%202024-09-01%2001-14-40.png)
- На этой странице можно выбрать технику из предоставленного списка, кликнув по кнопке _"Найти доступные"_ выпадет список подходящих позиций

![BuyerResponse](pages/Screenshot%20from%202024-09-01%2001-30-46.png)
- Позиции в списке упорядочены по цене

### Управление зарегистрированными позициями
![ControlPanel](pages/Screenshot%20from%202024-09-01%2001-14-46.png)
- На этой странице предоставлен список всех позиций, зарегистрированных на сайте
- Предоставляется возможность удалить позицию


## Описание работы приложения
- Работа приложения основывается на передаче запросов типа **POST** **GET** **DELETE** на сервер
- Фронтенд приложения построен с помощью языка разметки **HTML** и динамического обновления страниц с использованием **JavaScript**
- Серверная написана на языке **Python** с использованием библиотеки **flask**
- В построении HTML шаблонов используется шаблонизатор **jinja2** 
