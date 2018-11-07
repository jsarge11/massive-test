let express = require('express')
let massive = require('massive')
require('dotenv').config()

let {
    CONNECTION_STRING,
} = process.env;
let app = express();

app.get('/read', (req, res) => {
    let db = app.get('db');
    db.read_users().then(users => {
        res.status(200).send(users);
    })
})

massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance);
    app.listen(4040, () => console.log('massive-testing on 4040'));
})