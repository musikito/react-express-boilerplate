let config = {
	cookieParserSecret: "<SECRET>", // secret for cookie parser
    JWTsecret: "<SECRET>", // secret for JWT 
    nodemailerEmail:"smtp email", // your email client
    nodemailerPw:"<smtp login pw>", // your email password client
    smtp:"smtp.domain.com", // i.e 'smtp.domain.com'
    mongoUsername:"<mongo username>", // if you have your db
    mongoPw:"<mongo pw>", // if you have your db
    server:"http://localhost:3010", // your frontend server
    frontEndServer:"http://localhost:3000" // your front end server
};


module.exports = config