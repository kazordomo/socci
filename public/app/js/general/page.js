import Login from '../components/login';
import Home from '../components/home';
import Edit from '../components/edit';
import Profile from '../components/profile';
import Activity from '../components/activity';
import Menu from './menu';
import Loader from './loader';

class Page {

    constructor (url, script = null) {
        this.url = `app/views/${url}`;
        this.script = script;
        this.interval = null;
    }

    load () {
        return fetch(this.url)
            .then(response => response.text())
            .then(data => this.html = data)
            .catch(err => this.html = 'Something went wrong!');
    }

    loadScript (script) {
        switch(script) {
            case 'login':
                new Login();
                break;
            case 'home':
                new Home();
                new Menu();
                break;
            case 'edit':
                new Edit();
                break;
            case 'profile':
                new Profile();
                break;
            case 'activity':
                new Activity();
                break;
            default:
                return false;
        }
    }

    render (element) {
        // If async element is present, we will start the loader. When the data is rdy, remove loader.
        if (this.html.includes('<async></async>')) {
            element.innerHTML = this.html;
            Loader.in();
            
            this.interval = setInterval(() => {
                if (element.querySelector('async')) return;
                Loader.out();
                // Reset interval when finished.
                clearInterval(this.interval);
                this.interval = null;
            }, 100);
        } else {
            element.innerHTML = this.html;
        }
        
        // Be sure that we render the html before the script
        setTimeout(() => this.loadScript(this.script), 0);
    }
}

export default Page;