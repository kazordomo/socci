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
        attendees: [
            {
                _id: createObjectId('user1'),
                nickname: 'User1'
            },
            {
                _id: createObjectId('user5'),
                nickname: 'User5'
            }
        ],
        comments: [],
        _user: createObjectId('user2'),
    },
    {
        title: 'Hang out?',
        information: 'Watch some series/film whatever',
        time: '21:00',
        attendees: [
            {
                _id: createObjectId('user2'),
                nickname: 'User2'
            },
            {
                _id: createObjectId('user5'),
                nickname: 'User5'
            }
        ],
        comments: [],
        _user: createObjectId('user3'),
    },
    {
        title: 'Fiska',
        information: 'Ska till lötsjjön, hänka!',
        time: '21:00',
        attendees: [
            {
                _id: createObjectId('user2'),
                nickname: 'User2'
            },
            {
                _id: createObjectId('user5'),
                nickname: 'User5'
            }
        ],
        comments: [],
        _user: createObjectId('user3'),
    },
    {
        title: 'Koda hemsidor',
        information: '',
        time: '20:00',
        attendees: [
            {
                _id: createObjectId('user3'),
                nickname: 'User3'
            },
            {
                _id: createObjectId('user4'),
                nickname: 'User4'
            }
        ],
        comments: [],
        _user: createObjectId('user5'),
    },
    {
        title: 'Shop with me',
        information: 'Please shop with me someone. I do not want to go alone!',
        time: '12:00',
        attendees: [
            {
                _id: createObjectId('user4'),
                nickname: 'User4'
            },
            {
                _id: createObjectId('user2'),
                nickname: 'User2'
            }
        ],
        comments: [],
        _user: createObjectId('user1'),
    },
    {
        title: 'Koda hemsidor',
        information: '',
        time: '20:00',
        attendees: [
            {
                _id: createObjectId('user3'),
                nickname: 'User3'
            },
            {
                _id: createObjectId('user4'),
                nickname: 'User4'
            }
        ],
        comments: [],
        _user: createObjectId('user5'),
    },
    {
        title: 'Hämta på dagis',
        information: 'Det blir inte kul alls men det e bra.',
        time: '14:00',
        attendees: [
            {
                _id: createObjectId('user5'),
                nickname: 'User5'
            },
            {
                _id: createObjectId('user2'),
                nickname: 'User2'
            },
            {
                _id: createObjectId('user3'),
                nickname: 'User3'
            }
        ],
        comments: [],
        _user: createObjectId('user1'),
    }
];


module.exports = seeds.map(object => modelify(object, Activity));