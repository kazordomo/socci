import AuthCtrl from '../controllers/auth';

class Login {

    constructor() {
        this.DOMElement = document.querySelector('section#login');
        this.loginElements = this.DOMElement.querySelectorAll('[data-type="login"]');
        this.registerElements = this.DOMElement.querySelectorAll('[data-type="register"]');
        
        this.init();
    }

    init() {

        let changeAuthTypeEl = this.DOMElement.querySelectorAll('a[data-type]');

        this.DOMElement.querySelector('button[data-type="login"]').addEventListener('click', () => {
            this.onLogin();
        });
        this.DOMElement.querySelector('button[data-type="register"]').addEventListener('click', () => {
            this.onRegister();
        });

        // Change to Register inputs
        changeAuthTypeEl[0].addEventListener('click', () => { 
            this.changeAuthType(this.registerElements, this.loginElements);
        });
        // CHange to Login inputs
        changeAuthTypeEl[1].addEventListener('click', () => { 
            this.changeAuthType(this.loginElements, this.registerElements);
        });

        return true;
    }

    onLogin () {
        let userData = {
            email: this.DOMElement.querySelector('input[name="email"]').value,
            password: this.DOMElement.querySelector('input[name="password"]').value,
        }
        AuthCtrl.login(userData);
        return true;
    }

    onRegister () {
        let userData = {
            email: this.DOMElement.querySelector('input[name="email"]').value,
            password: this.DOMElement.querySelector('input[name="password"]').value,
            retype_password: this.DOMElement.querySelector('input[name="retype_password"]').value,
        }
        AuthCtrl.register(userData);
        return true;
    }

    changeAuthType (activeAlements, inactiveElements) {
        for(let element of activeAlements) {
            element.classList.remove('inactive');
        }
        for(let element of inactiveElements) {
            element.classList.add('inactive');
        }
        return true;
    }

}

export default Login;