import AuthCtrl from '../general/main';

class Menu {
    constructor() {
        this.DOMElement = document.querySelector('nav');
        this.init();
    }

    init () {
        this.DOMElement
            .querySelector('.button')
            .addEventListener('click', () => AuthCtrl.logout.bind(this));
    }
}

export default Menu;