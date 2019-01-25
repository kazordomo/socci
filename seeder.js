const mongoose = require('mongoose');
const keys = require('./config/keys');
const users = require('./database/seeds/users');
const activities = require('./database/seeds/activities');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true , useCreateIndex: true });
const db = mongoose.connection;

// TODO: Async?
let removeCollection = collection => {
    db.collection(collection).deleteMany({});
}

let seedCollection = async (col, colString) => {
    removeCollection(colString);
    await Promise.all(col.map(async object => object.save()));
    console.log(`${colString} seeded!`);
}

let seeder = () => {
    Promise.all([
        seedCollection(users, 'users'), 
        seedCollection(activities, 'activities')
    ]).then(() => {
        console.log('Everything seeded - closing database.');
        // TODO: DB closes even if not all thins are seeded.
        // db.close();
    }).catch(err => console.log(err));
}

seeder();