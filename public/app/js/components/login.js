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

            let userData = {
                email: this.DOMElement.querySelector('input[name="email"]').value,
                password: this.DOMElement.querySelector('input[name="password"]').value,
            }

            AuthCtrl.login(userData);

            return true;

        });

        this.DOMElement.querySelector('button[data-type="register"]').addEventListener('click', () => {

            let userData = {
                email: this.DOMElement.querySelector('input[name="email"]').value,
                password: this.DOMElement.querySelector('input[name="password"]').value,
                retype_password: this.DOMElement.querySelector('input[name="retype_password"]').value,
            }

            AuthCtrl.register(userData);

            return true;

        });

        // Change to Register inputs
        changeAuthTypeEl[0].addEventListener('click', () => { 

            for(let element of this.registerElements) {
                element.classList.remove('inactive');
            }

            for(let element of this.loginElements) {
                element.classList.add('inactive');
            }

            return true;
        });

        // CHange to Login inputs
        changeAuthTypeEl[1].addEventListener('click', () => { 

            for(let element of this.registerElements) {
                element.classList.add('inactive');
            }

            for(let element of this.loginElements) {
                element.classList.remove('inactive');
            }

            return true;
        });

    }

}

export default Login;