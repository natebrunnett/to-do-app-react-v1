# Note from the developer
A work in progress 😉 (Server support for login is being developed, offline support for to dos is available!)

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

