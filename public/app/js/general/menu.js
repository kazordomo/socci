import AuthCtrl from '../controllers/auth';

class Menu {
    constructor() {
        this.navElement = document.querySelector('nav');
        this.hamburgerElement = document.querySelector('#hamburger');
        this.isOpen = false;
        this.init();
    }

    init () {
        this.navElement
            .querySelector('.logout')
            .addEventListener('click', () => AuthCtrl.logout.bind(this));

        this.hamburgerElement.addEventListener('click', this.handleHamburgerClick.bind(this));
    }

    handleHamburgerClick () {
        if (!this.isOpen) {
            this.hamburgerElement.classList.add('active');
            this.navElement.classList.add('active');
            this.isOpen = true;
        } else {
            this.hamburgerElement.classList.remove('active');
            this.navElement.classList.remove('active');
            this.isOpen = false;
        }
    }
}

export default Menu;