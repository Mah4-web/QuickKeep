Brainstorming
Wireframe
Trello
SQL --DrawSql

---
STEPS:

1: Github repo

---

Terminal:
2: Mkdir QuickKeep

---

3: setup client:
npm create vite@latest client -- -- react—javascript
cd client
npm install
 install react-router

---

4: cd ..
Mkdir server
Npm init - y
Npm i express cors dotent pg
Touch server.js .env .gitignore dbConnection.js
Cd ..
Code .

---

5:Readme out of server
Planning.md

---

6:Components (create files/pages)
Home.jsx
AddEntry.jsx
AllEntries.jsx
NotFound

---

7: git init
git remote add origin git@github.com:Mah4-web/QuickKeep.git

---

8: DrawSql- to draw table 

---

9: PostgreSql create database

---

10: set up & install -----tailwind, react-router, browser router, .gitignore for .env (server and client), package.json--- dev and module (server, client)
Import all the files in app.jsx

---

11: Basic structure

---

12: set up client and server on Render

Static for client
Branch-main
Root directory-client
Build command- nom install; nom run build
Publish directory: dist

Web service- server
Root directory-server
Start Command - npm I
Publish directory- node server

---

Reflection:

First ERROR:

So I started with a mistake in pushing github, I started getting errors, I did git init and then copied and pasted my repo then when I did git push -u origin main, I stated getting error and then I did git status and error again, I tried git add . And commit it worked
Errors:

QuickKeep git:(main) ✗ git push -u origin main error: src refspec main does not match any error: failed to push some refs to 'github.com:Mah4-web/QuickKeep.git' ➜ QuickKeep git:(main) ✗ cd .. ➜ week7 cd QuickKeep ➜ QuickKeep git:(main) ✗ git remote add origin git@github.com:Mah4-web/QuickKeep.git error: remote origin already exists. ➜ QuickKeep git:(main) ✗


error: remote origin already exists. ➜ QuickKeep git:(main) ✗ git status On branch main No commits yet Untracked files: (use "git add <file>..." to include in what will be committed) README.md client/ server/ nothing added to commit but untracked files present (use "git add" to track)

————————————————————-
2nd silly mistake without realising 

➜  QuickKeep git:(main) npm run dev
npm error Missing script: “dev"

Then I checked my notes checked everything but still was confused then I checked my notes and realised I have run it in client. I have to do npm run dev in both client and server.

——————————-

Instead of updating entry I put delete-entry, checked everything then in the update entry set I was putting wrong values so I did $1, $2, $3, $5, $6, where…. It took a while to understand the error, after consulting class notes, workshop notes. 

————————

To test not found page I added it in the navigation when I saw the page then I removed it because I tried design methodologies and page was just blank so to make it work and for the styles I added it there when I was satisfied I removed it and it worked.
——————
Note for rendering:

next time start with client first so the name of the repo remains the same I did server first then when I wanted name to be QuickKeep I got QuickKeep-1 because it was in use already and I wanted client to be QuickeKeep and then I tried to change it as well, silly me.
I tried environment variables to hide my server url and it worked 🎉. I am happy beyond imagination.
In my excitement I totally forgot and changed .env names from .env to .env.production and then pushed it to GitHub then removed it then my server was not committing my pushes and it was keep saying application process. Whatever I was doing data from server wasn’t getting because it was just processing and I had to manually deploy changes. I started panicking I changed DATABASE_URL from dbconnections, but then after trail and error and returning to old projects started clearing few errors then googled and found the error, stoped manual deployment on render and redeployed and hoped everything will work out.
——————

ERRORS: while experimenting with putting urls in .env files :
My server was working fine but I was not fetching properly in my client and I started getting errors, I did this const BASE_URL = process.env.VITE_SERVER_BASE_URL;  then checked .env.production couple of times, didn’t realise the mistake then checked my last week’s project that how I worked with environmental variables and found import.meta.env and I had to start with word VITE in .env.production. I thought I fetched from api so I used import but it is the same for fetching from server then after few trails and errors and looking at the environment variable workshop realised it is for fetching data whether it’s from api or database so tried this ==const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL; and it worked.

————-

I decided to make simple things complicated, got all the errors of folders and navigation.