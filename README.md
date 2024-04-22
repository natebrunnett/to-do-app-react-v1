# Note from the developer
~Temporary this app requires a Mongodb to function... a quick access local version of this app is under works~
Setting up

    $ git clone ...git link...
    Install node_modules for server and client
    $ cd to-do-app-v1/client && npm i && cd ../server && npm i
    Run client and server
    /client
    $ npm start
    /server
    $ nodemon

If you don't want to connect Mongodb, you don't need to! This app works also with LocalStorage!
In order to set up this app, json web token needs a string for encryption.
Please follow the prompt to set up your .env in the server folder.

    $ cd to-do-app-v1/server
    $ touch .env 
    //open the file in the editor and create a variable
    JWT_SECRET=anyStringToEncryptYourDataHere
    //save and install node_modules in the next step

~Login support for an added Mongodb is available~

    To add a Mongodb:
    Open the server/.env in your editor
    MONGO=...link to your mongodb...
    
The app will automatically create a local token for you which should be available for 365 days.
To delete the token, open the developer tools in chrome and...

    $ localStorage.clear()

