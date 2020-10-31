# airlines-klub-gui

## About

We are trying to make a new mobile friendly GUI for [Airline Club GitHub](https://github.com/patsonluk/airline).  Responsive is the goal.  

![resposnsive graphs](responsive.gif)

Using the [Vega](https://vega.github.io/vega/) visualization library.  Game data from [Airline Club](https://www.airline-club.com)

## Project setup

Install Vue and Vue-Router:

```
npm install vue-router/@next
```

You need the Vega library (including lite and embed) for graphics:

```
npm install vega vega-lite vega-embed 
```

## Getting Started

Right now, without a login, you need to set up your .env.local file in the code's root to have the following:

```
VUE_APP_PLAYER_ID=NNNN
VUE_APP_TOKEN=eyJhbXXXXX.eyJkY.XXXXXXXXXXX
```
Your token can be found by examining your cookies sent through your header.  (Chrome/Firefox -> Webpage -> Inspect Element -> Network ->[select an AUTH'ed GET response] -> Headers -> Request Header -> Cookie)  It'll be known as the PLAY_SESSION.  

**Your token is the only thing that validate you.  Treat it like a password.  Don't commit it!**

Your player ID is found by looking at the URL path for your airline's logo.  It will be in the form of https://www.airline-club.com/airlines/[NNNN]/logo
