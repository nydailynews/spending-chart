#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import json
from flask import Flask
from flask import Markup
from flask import g, render_template, url_for, redirect, abort, request
from datetime import date, datetime


app = Flask(__name__)
app.debug = True

page = {
    'title': 'MTA Spening: Where does the money go?',
    'title_twitter': 'How does the MTA spend its money?'.decode('utf-8'),
    'url': 'http://interactive.nydailynews.com/project/mta-spending/',
    'description': 'It costs the MTA more than $15 billion a year to run 24/7. Who ultimately pays for the service New Yorkers get?',
    'author': '"Dan Rivoli", "Interactive Project", "Kelli R. Parker"',
    'datestamp': '2017-12-20',
    'keywords': 'MTA, New York City, subway, budget, money',
    'keywords_array': '"mta","new york city","subway","budget", "money"',
    'shareimg': 'mta-spending-pizza-rat.gif',
    'sharevideo': 'mta-spending-pizza-rat.mp4',
    'shareimg_static': 'mta-spending-static.jpg',
    'shareimgdesc': 'An illustration of a pile of money with the words "Where does the MTA money go?" and an animation of a rat dragging a piece of a pizza.',
}

with app.app_context():
    app.url_root = '/'
    app.page = page
    app.sitename = ''

@app.route('/')
def index():
    response = {
        'app': app,
    }
    return render_template('index.html', response=response)

@app.template_filter(name='last_update')
def last_update(blank):
    """ Returns the current date. That means every time the project is deployed,
        the datestamp will update.
        Returns a formatted date object, ala "Friday Feb. 20"
        """
    today = date.today()
    return today.strftime('%A %B %d')

@app.template_filter(name='timestamp')
def timestamp(blank):
    """ What's the current date and time?
        """
    today = datetime.today()
    return today.strftime("%A %B %d, %-I:%M %p")

@app.template_filter(name='ordinal')
def ordinal_filter(value):
    """ Take a number such as 62 and return 62nd. 63, 63rd etc.
        """
    digit = value % 10
    if 10 < value < 20:
        o = 'th'
    elif digit is 1:
        o = 'st'
    elif digit is 2:
        o = 'nd'
    elif digit is 3:
        o = 'rd'
    else:
        o = 'th'
    return '%d%s' % (value, o)
app.add_template_filter(ordinal_filter)

if __name__ == '__main__':
    app.run()
