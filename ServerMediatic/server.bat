@ECHO OFF
ECHO Installation des dependances

CALL npm install express
CALL npm install body-parser
CALL npm install basic-auth
CALL npm install btoa

ECHO Lancement du serveur

CALL node server.js

