import Router from './general/router';
import Layout from './general/layout';
import Page from './general/page';

new Router({
        login: new Page('login.html'),
        home: new Layout(new Page('menu.html'), new Page('home.html', 'home')),
        edit: new Page('edit.html', 'edit'),
        profile: new Page('profile.html', 'profile'),
        notFound: new Page('404.html'),
        '#default': new Page('login.html'),
    },
    document.querySelector('main')
);