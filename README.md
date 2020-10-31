# airlines-klub-gui

## About

We are trying to make a new mobile GUI for [Airline Club](https://github.com/patsonluk/airline).  

## Project setup

You need the following (including Vue)

```
npm install vue vue-lite vue-embed
```

# Getting Started

Right now, without a login, you need to set up your .env.local file in the code's root to have the following:

```
VUE\_APP\_PLAYER_ID=NNNN
VUE\_APP\_TOKEN=eyJhbXXXXX.eyJkY.XXXXXXXXXXX
```
Your token can be found by examining your cookies sent through your header.  (Chrome -> Webpage -> Inspect Element -> Network -> Headers -> Request Header -> Cookie)  It'll be known as the PLAY_SESSION.  

**Your token is the only thing that validate you.  Treat it like a password.  Don't commit it!**

Your player ID is found by looking at the URL path for your airline's logo.  It will be in the form of https://www.airline-club.com/airlines/[NNNN]/logo
