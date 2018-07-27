# Express-backend 
this repo is a simple boilerplate for express application with basic features as:

**This setup works with local instance of mongo only if you have mongo installed on your machine**
if you dont have mongo installed you can follow [this](https://docs.mongodb.com/manual/administration/install-community/) instructions. then to start it simply run `sudo mongod` from the command line.


# built-in Auth - using passport-mongoose 
this boilerplate built with passport auth with mongo database: 
simply add your login data in the config.js file and uncomment the necessary part from db/mongoos.js
or , use it as is on localhost. 
passport have to get two fields from the client to work: 
**password** // (must be named "password")
**username** // (must be name "username")

# built-in email activation 
on signup the user will get an email to activate their account 
**note** - that require from you to have a domain name or smtp server to send the email. 
simply add the username and the password from your smtp account in the config.js file and you good to go. 
on activation - the user schema in the db will be updated with the value "true" on "active" prop. 
then passport can recognize the user as verified account. 
You can find smtp providers [here](https://github.com/discourse/discourse/blob/master/docs/INSTALL-email.md)

# built-in password reset using email
I added an end point for your users to reset their password if they need to

# React-frontend
the frontend use React and built with **react-router** by default. You can add your routes in the `/Main/Main.js` file 

# to use 
1. simply clone the repo, add the smtp cords as described above inside `/server/routes/config.js`.
```sh
cd server/ 
npm install && npm start
cd client/
npm install && npm start
```
Thats it! now your React front end run on `http://localhost:3000`. and your server run on `http://localhost:3010` 

**pull requests are welcome (:**



 