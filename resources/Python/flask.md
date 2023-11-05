
[//]: # (TITLE Flask)
[//]: # (ENDPOINT /flask)

# FLASK

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

- [X - Internationalization and localization](#x---internationalization-and-localization)
    - [X.1 Flask-Babel](#x1-flask-babel)
        - [X.1.1 Configuration](#x11-configuration)
        - [X.1.2 For complex applications](#x12-for-complex-applications)
    - [X.2 Formatting dates](#x2-formatting-dates)
    - [X.3 Formatting Numbers](#x3-formatting-numbers)
    - [X.4 Translations](#x4-translations)
        - [X.4.1 Using translations](#x41-using-translations)
        - [X.4.2 Translating Applications](#x42-translating-applications)
- [Sources](#sources)

<!-- markdown-toc end -->


## X - Internationalization and localization

In computing, internationalization and localization, often abbreviated i18n and L10n, are means of adapting computer software to different languages, regional peculiarities and technical requirements of a target locale.

Internationalization is the process of designing a software application so that it can be adapted to various languages and regions without engineering changes.

Localization is the process of adapting internationalized software for a specific region or language by translating text and adding locale-specific components.

A locale is a set of parameters that defines the user's language, region and any special variant preferences that the user wants to see in their user interface. Usually a locale identifier consists of at least a language code and a country/region code.


### X.1 Flask-Babel

> Flask-Babel is an extension to Flask that adds i18n and l10n support to any Flask application with the help of babel, pytz and speaklater.
 
It has builtin support for date formatting with timezone support as well as a very simple and friendly interface to gettext translations.


#### X.1.1 Configuration

To get started all you need to do is to instantiate a Babel object after configuring the application:
```python
from flask import Flask
from flask_babel import Babel

app = Flask(__name__)
app.config.from_pyfile('mysettings.cfg')
babel = Babel(app)
```


The babel object itself can be used to configure the babel support further. Babel has the following configuration values that can be used to change some internal defaults:
- `BABEL_DEFAULT_LOCALE`:  the default locale to use if no locale selector is registered. This defaults to `en`.
- `BABEL_DEFAULT_TIMEZONE`:  the timezone to use for user facing dates. This defaults to `UTC` which also is the timezone your application must use internally.
- `BABEL_TRANSLATION_DIRECTORIES`: a semi-colon (`;`) separated string of absolute and relative (to the app root) paths to translation folders. Defaults to `translations`.
- `BABEL_DOMAIN`: the message domain used by the application. Defaults to `messages`.


#### X.1.2 For complex applications

For more complex applications you might want to have multiple applications for different users which is where selector functions come in handy.

The first time the babel extension needs the locale of the current user, it will call a `localeselector()` function, and the first time the timezone is needed it will call a `timezoneselector()` function.
<br/>
If any of these methods return None the extension will automatically fall back to what’s in the config. Furthermore, for efficiency that function is called only once and the return value then cached.

If you need to switch the language between a request, you can `refresh()` the cache.

For example:
```python
@babel.localeselector
def get_locale():
    # if a user is logged in, use the locale from the user settings
    user = getattr(g, 'user', None)
    if user is not None:
        return user.locale
    # otherwise try to guess the language from the user accept
    # header the browser transmits.  We support de/fr/en in this
    # example.  The best match wins.
    return request.accept_languages.best_match(['de', 'fr', 'en'])

@babel.timezoneselector
def get_timezone():
    user = getattr(g, 'user', None)
    if user is not None:
        return user.timezone
```


### X.2 Formatting dates

To format dates you can use the `format_datetime()`, `format_date()`, `format_time()` and `format_timedelta()` functions.
<br/>
They all accept a `datetime.datetime` (or `datetime.date`, `datetime.time` and `datetime.timedelta`) object as first parameter and then optionally a format string. 

> The application should use naive datetime objects internally that use UTC as timezone. On formatting it will automatically convert into the user’s timezone in case it differs from UTC.


To play with the date formatting from the console, you can use the `test_request_context()` method:
```python
app.test_request_context().push()
```
Here are some examples:
```python
>>> from flask_babel import format_datetime
>>> from datetime import datetime
>>> format_datetime(datetime(1987, 3, 5, 17, 12))
u'Mar 5, 1987 5:12:00 PM'
>>> format_datetime(datetime(1987, 3, 5, 17, 12), 'full')
u'Thursday, March 5, 1987 5:12:00 PM World (GMT) Time'
>>> format_datetime(datetime(1987, 3, 5, 17, 12), 'short')
u'3/5/87 5:12 PM'
>>> format_datetime(datetime(1987, 3, 5, 17, 12), 'dd mm yyyy')
u'05 12 1987'
```

And again with a different language:
```python
>>> app.config['BABEL_DEFAULT_LOCALE'] = 'de'
>>> from flask_babel import refresh; refresh()
>>> format_datetime(datetime(1987, 3, 5, 17, 12), 'EEEE, d. MMMM yyyy H:mm')
u'Donnerstag, 5. M\xe4rz 1987 17:12'
```


### X.3 Formatting Numbers

To format numbers you can use the `format_number()`, `format_decimal()`, `format_currency()`, `format_percent()` and `format_scientific()` functions.

Some examples using the `test_request_context()` method:
```python
>>> app.test_request_context().push()
>>> from flask_babel import format_number, format_currency, format_percent, format_scientific
>>> format_number(1099)
'1,099'
>>> format_currency(1099.98, 'USD')
'$1,099.98'
>>> format_percent(0.34)
'34%'
>>> format_scientific(10000)
'1E4'
```

With a different language:
```python
>>> app.config['BABEL_DEFAULT_LOCALE'] = 'de'
>>> from flask_babel import refresh; refresh()
>>> format_currency(1099.98, 'USD')
'1.099,98\xa0$'
>>> format_percent(0.34)
'34\xa0%'
>>> format_scientific(10000)
'1E4'
```


### X.4 Translations

#### X.4.1 Using translations

For that, Flask uses `gettext` together with Babel. The idea of `gettext` is that you can mark certain strings as translatable and a tool will pick all those up, collect them in a separate file for you to translate. At runtime the original strings (which should be English) will be replaced by the language you selected.

There are two functions responsible for translating: `gettext()` to translate singular strings, and `ngettext()` to translate strings that might become plural.

```python
from flask_babel import gettext, ngettext

gettext(u'A simple string')
gettext(u'Value: %(value)s', value=42)
ngettext(u'%(num)s Apple', u'%(num)s Apples', number_of_apples)
```

Additionally, if you want to use constant strings somewhere in your application and define them outside a request, you can use a lazy strings. Lazy strings will not be evaluated until they are actually used.

To use such a lazy string, use the `lazy_gettext()` function:
```python
from flask_babel import lazy_gettext

class MyForm(formlibrary.FormBase):
    success_message = lazy_gettext(u'The form was successfully saved.')
```


#### X.4.2 Translating Applications

First you need to mark all the strings you want to translate in your application with `gettext()` or `ngettext()`.

After that, it’s time to create a `.pot` file: a file that contains all the strings and is the template for a `.po` file which contains the translated strings. Babel can do all that for you.

More info [here](https://python-babel.github.io/flask-babel/#translating-applications)


## Sources

- [Huge Flask tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world)
- [Flask-Python-Mongodb](https://www.mongodb.com/developer/languages/python/flask-python-mongodb/)
