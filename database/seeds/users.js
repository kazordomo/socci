const bcrypt = require('bcrypt-nodejs');
const { createObjectId, modelify } = require('../helpers');
const User = require('../../models/User');

const seeds = [
    {
        _id: createObjectId('user1'),
        email: 'user1@test.se',
        password: bcrypt.hashSync('test', bcrypt.genSaltSync(8), null),
        nickname: 'User1',
        friends: []
    },
    {
        _id: createObjectId('user2'),
        email: 'user2@test.se',
        password: bcrypt.hashSync('test', bcrypt.genSaltSync(8), null),
        nickname: 'User2',
        friends: []
    },
    {
        _id: createObjectId('user3'),
        email: 'user3@test.se',
        password: bcrypt.hashSync('test', bcrypt.genSaltSync(8), null),
        nickname: 'User3',
        friends: []
    }
];


module.exports = seeds.map(object => modelify(object, User));