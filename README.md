# Note from the developer
A work in progress 😉 (Server support for login is being developed, offline support for to dos is available!)
If you don't want to connect Mongodb, you don't need to! This app works also with LocalStorage!
In order to set up this app, json web token needs a string for encryption.
Please follow the prompt to set up your .env in the server folder.

    $ cd to-do-app-v1/server
    $ touch .env 
    //open the file in the editor and create a variable
    JWT_SECRET=anyStringToEncryptYourDataHere
    //save and install node_modules in the next step

    $ git clone ...git link...
    Install node_modules for server and client
    $ cd to-do-app-v1/client & npm i & cd ../server & npm i
    Run client and server
    /client
    $ npm start
    /server
    $ nodemon
    
The app will automatically create a local token for you which should be available for 365 days.
To delete the token, open the developer tools in chrome and...

    $ localStorage.clear()

