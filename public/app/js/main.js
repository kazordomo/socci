import Router from './general/router';
import Layout from './general/layout';
import Page from './general/page';



const router = new Router({
        login: new Page('login.html'),
        home: new Layout(new Page('menu.html'), new Page('home.html')),
        notFound: new Page('404.html'),
        '#default': new Page('login.html'),
    },
    document.querySelector('main')
);