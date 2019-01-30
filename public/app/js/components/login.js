import AuthCtrl from '../controllers/auth';
import { animateIn, animateOut, getInputValue } from '../utils';

class Login {

    constructor() {
        this.DOMElement = document.querySelector('section#login');
        this.activeState = 'login';
        this.changeAuthTypeEl = this.DOMElement.querySelector('.form_group a');
        this.init();
    }

    init() {
        this.DOMElement
            .querySelector('button[data-type="login"]')
            .addEventListener('click', () => this.onLogin());

        this.DOMElement
            .querySelector('button[data-type="register"]')
            .addEventListener('click', () => this.onRegister());
            
        this.DOMElement.addEventListener('keyup', event => {
            event.preventDefault();
            if (event.keyCode === 13) {
                this.DOMElement.querySelector('button:not(.inactive)').click();
            }
        })

        this.changeAuthTypeEl.addEventListener('click', this.changeAuthType.bind(this));
        animateIn(this.DOMElement.querySelectorAll('.out'));
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
             animateOut(elements);
             setTimeout(() => cb(), elements.length * 75);
        }, 300);
    }

    onLogin () {
        // TODO: proper error handling
        let email = getInputValue(this.DOMElement, 'email');
        let password = getInputValue(this.DOMElement, 'password');

        if (!email || !password) return;

        let userData = { email, password };
        this.successAnimation(() => AuthCtrl.login(userData));
    }

    onRegister () {
        let nickname = getInputValue(this.DOMElement, 'nickname');
        let email = getInputValue(this.DOMElement, 'email');
        let password = getInputValue(this.DOMElement, 'password')
        let retypePassword = getInputValue(this.DOMElement, 'retype_password');

        if (!email || !password || !retypePassword) return;

        let userData = {
            nickname,
            email,
            password,
            retypePassword
        }
        this.successAnimation(() => AuthCtrl.register(userData));
    }

    updateChanteAuthText () {
        return (this.activeState === 'login') ? "I'm already a member." : "I'm not a member yet.";
    }

    changeAuthType () {
        let elements = Array.from(this.DOMElement.querySelectorAll('[data-type]'));

        for(let element of elements) {
            if (element.getAttribute('data-type') === this.activeState) {
                element.classList.add('inactive');
            } else {
                element.classList.remove('inactive');
            }
        }
        
        this.activeState = (this.activeState === 'login') ? 'register' : 'login';
        this.changeAuthTypeEl.innerHTML = this.updateChanteAuthText();
    }

}

export default Login;