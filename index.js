let express = require('express')
let massive = require('massive')
let bodyParser = require('body-parser')
require('dotenv').config()

let {
    CONNECTION_STRING,
    SERVER_PORT,
    SECRET_SESSION
} = process.env;
let app = express();
app.use(bodyParser.json())

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SECRET_SESSION
}))

app.get('/read', (req, res) => {
    let db = app.get('db');
    console.log('going deeper a level');
    db.users.read_users().then(users => {
        res.status(200).send(users);
    })
})

massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance);
    app.listen(SERVER_PORT, () => console.log('massive-testing on ' + SERVER_PORT));
})
