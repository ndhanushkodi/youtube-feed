var ids = {
facebook: {
 // clientID: process.env.FacebookID,
 // clientSecret: process.env.FacebookSecret,
 //callbackURL: process.env.callback || 
 clientID: "456765331140181",
 clientSecret: "c4941ebc78aeda1ff9d5c2863fb4b1b0",
 callbackURL: 'http://localhost:3000/auth/facebook/callback'
},
twitter: {
 consumerKey: 'get_your_own',
 consumerSecret: 'get_your_own',
 callbackURL: "http://127.0.0.1:1337/auth/twitter/callback"
},
github: {
 clientID: 'get_your_own',
 clientSecret: 'get_your_own',
 callbackURL: "http://127.0.0.1:1337/auth/github/callback"
},
google: {
 returnURL: 'http://127.0.0.1:1337/auth/google/callback',
 realm: 'http://127.0.0.1:1337'
}
}

module.exports = ids