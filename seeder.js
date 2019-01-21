const mongoose = require('mongoose');
const keys = require('./config/keys');
const users = require('./database/seeds/users');
const activities = require('./database/seeds/activities');

// Connect to DB.
mongoose.connect(keys.mongoURI, { useNewUrlParser: true , useCreateIndex: true });
const db = mongoose.connection;

// Remove old records.
let removeCollection = collection => {
    db.collection(collection).deleteMany({});
}

// Seed the database with data.
let seedEventes = async (col, colString) => {
    removeCollection(colString);
    await Promise.all(col.map(async object => await object.save()));
    db.close();
    console.log('Database seeded!');
}

seedEventes(users, 'users');
seedEventes(activities, 'activities');