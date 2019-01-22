const bcrypt = require('bcrypt-nodejs');
const { createObjectId, modelify } = require('../helpers');
const User = require('../../models/User');

const seeds = [
    {
        _id: createObjectId('user1'),
        email: 'user1@test.se',
        password: bcrypt.hashSync('test', bcrypt.genSaltSync(8), null),
        nickname: 'User1',
        friends: [
            createObjectId('user2'),
            createObjectId('user3'),
            createObjectId('user4')
        ]
    },
    {
        _id: createObjectId('user2'),
        email: 'user2@test.se',
        password: bcrypt.hashSync('test', bcrypt.genSaltSync(8), null),
        nickname: 'User2',
        friends: [
            createObjectId('user1'),
            createObjectId('user3'),
            createObjectId('user4')
        ]
    },
    {
        _id: createObjectId('user3'),
        email: 'user3@test.se',
        password: bcrypt.hashSync('test', bcrypt.genSaltSync(8), null),
        nickname: 'User3',
        friends: [
            createObjectId('user2'),
            createObjectId('user1'),
            createObjectId('user4')
        ]
    },
    {
        _id: createObjectId('user4'),
        email: 'user4@test.se',
        password: bcrypt.hashSync('test', bcrypt.genSaltSync(8), null),
        nickname: 'User4',
        friends: [
            createObjectId('user2'),
            createObjectId('user3'),
            createObjectId('user5')
        ]
    },
    {
        _id: createObjectId('user5'),
        email: 'user5@test.se',
        password: bcrypt.hashSync('test', bcrypt.genSaltSync(8), null),
        nickname: 'User5',
        friends: [
            createObjectId('user2'),
            createObjectId('user3'),
            createObjectId('user1')
        ]
    }
];


module.exports = seeds.map(object => modelify(object, User));