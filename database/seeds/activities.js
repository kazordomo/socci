const { createObjectId, modelify } = require('../helpers');
const Activity = require('../../models/Activity');

const seeds = [
    {
        title: 'Jag ska spela boll',
        information: 'Är det någon som vill haka på elle',
        time: '14:00',
        attendees: [],
        comments: [],
        _user: createObjectId('user1'),
    },
    {
        title: 'Kolla bio!',
        information: 'Tänkte mig på kvällen.',
        time: '19:00',
        attendees: [],
        comments: [],
        _user: createObjectId('user2'),
    },
    {
        title: 'Hang out anyone?',
        information: 'Watch some series/film whatever',
        time: '21:00',
        attendees: [],
        comments: [],
        _user: createObjectId('user3'),
    }
];


module.exports = seeds.map(object => modelify(object, Activity));