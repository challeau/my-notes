[//]: # (TITLE Django)
[//]: # (ENDPOINT /django)

# DJANGO

Django is a **high-level Python web framework** that encourages **rapid development** and **clean, pragmatic design**. It takes care of much of the hassle of web development, so you can focus on writing your app without needing to reinvent the wheel. It's **free and open source**. 


<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

- [1 - Installation and setup](#1---installation-and-setup)
- [2 - The model layer](#2---the-model-layer)
- [3 - The view layer](#3---the-view-layer)
- [4 - The template layer](#4---the-template-layer)
- [5 - Forms](#5---forms)
- [6 - The admin](#6---the-admin)
- [7 - Security](#7---security)
- [8 - Internationalization and localization](#8---internationalization-and-localization)
- [9 - Performance and optimization](#9---performance-and-optimization)
- [10 - Common tools](#10---common-tools)
- [11 - Other core functionalities](#11---other-core-functionalities)
- [Sources](#sources)

<!-- markdown-toc end -->


## 1 - Installation and setup

To install Django, activate your Python virtual environment and run:

```bash
$ pip install Django
```

To create a project, run:
```bash
$ django-admin startproject project-name
```

This will create a directory and copy some files to it:

```
project-name/			# root directory
	manage.py			# command-line utility that lets you interact with the project
    project-name/		# Python package for the project
        __init__.py
        settings.py		# settings/config for the project
        urls.py			# the URL declarations
        asgi.py			# entry-point for ASGI-compatible web servers 
        wsgi.py			# entry-point for WSGI-compatible web servers 
```

To run a development server:

```bash
$ python manage.py runserver

# OR, to choose the port:
$ python manage.py runserver 8080
```

If all went well, you should see this upon visiting `127.0.0.1:8000`:

![center-eg](djanggo.png)

The development server **automatically reloads** Python code for each request as needed. Some actions like adding files don't trigger a restart, so you'll have to restart the server in these cases.


> What's the difference between a project and an app? An app is a web application that does something, and a project is a collection of configuration and apps for a particular website. **A project can contain multiple apps**. An app can be in multiple projects.

Your apps can live anywhere on your Python path. To create an app, run:

```
$ python manage.py startapp app-name
```

## 2 - The model layer

Django provides an abstraction layer (the "models") for structuring and manipulating the data of your web application. 

A model is the single, definitive source of information about your data. It contains the **essential fields and behaviors of the data** you’re storing. Generally, each model maps to a single database table.


## 3 - The view layer

Django has the concept of “views” to encapsulate the logic responsible for processing a user’s request and for returning the response.

URL linked to view


## 4 - The template layer

The template layer provides a designer-friendly syntax for rendering the information to be presented to the user. 

A template contains the **static parts of the desired HTML output** as well as some **special syntax describing how dynamic content will be inserted**. 
Templates can be written in Django Template Language (DTL) or using Jinja2.

## 5 - Forms

Django provides a rich framework to facilitate the creation of forms and the manipulation of form data.


## 6 - The admin


## 7 - Security


## 8 - Internationalization and localization


## 9 - Performance and optimization


## 10 - Common tools


## 11 - Other core functionalities



## Sources

- [Django official doc](https://docs.djangoproject.com/en/4.2/)