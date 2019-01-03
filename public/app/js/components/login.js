import AuthCtrl from '../controllers/auth';
import Utils from '../utils';

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

    successAnimation (cb) {
        let elements = [
            this.DOMElement.querySelector('.col_b .corner'),
            ...this.DOMElement.querySelectorAll('input'),
            ...this.DOMElement.querySelectorAll('button'),
            ...this.DOMElement.querySelectorAll('a')
        ];

        this.DOMElement.querySelector('.col_b').style.marginLeft = '-50%';

        setTimeout(() => {
             Utils.animateOut(elements);
             setTimeout(() => cb(), elements.length * 75);
        }, 300)
        

    }

    onLogin () {
        let email = this.DOMElement.querySelector('input[name="email"]').value;;
        let password = this.DOMElement.querySelector('input[name="password"]').value;

        if(!email || !password) {
            return;
        }

        let userData = {
            email: this.DOMElement.querySelector('input[name="email"]').value,
            password: this.DOMElement.querySelector('input[name="password"]').value,
        }

        this.successAnimation(() => AuthCtrl.login(userData));
    }

    onRegister () {
        let email = this.DOMElement.querySelector('input[name="email"]').value;;
        let password = this.DOMElement.querySelector('input[name="password"]').value;
        let retypePassword = this.DOMElement.querySelector('input[name="retype_password"]').value;

        if (!email || !password || !retypePassword) {
            return;
        }

        let userData = {
            email,
            password,
            retypePassword
        }

        this.successAnimation(() => AuthCtrl.register(userData));
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