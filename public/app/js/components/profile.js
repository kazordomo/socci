import SocialCtrl from '../controllers/social';
import AuthCtrl from '../controllers/auth';
import RenderData from '../renderData';
import { getLocal, storeLocal, getInputValue } from '../utils';

class Profile {

    constructor () {
        this.DOMElement = document.querySelector('section#profile');
        this.friends = [];
        this.user = getLocal();
        this.init();
    }

    // TODO: REFACTOR
    // TODO: On lost focus / every 3s - run save function for the input values.

    async init () {
        this.friends = await SocialCtrl.getFriends();
        this.DOMElement.querySelector('input[name="nickname"]').defaultValue = this.user.nickname;
        this.DOMElement.querySelector('input[name="email"]').defaultValue = this.user.email;
        new RenderData(this.DOMElement, this.friends);

        this.eventListenersInit();

        for (let element of Array.from(this.DOMElement.querySelectorAll('.friends div'))) {
            let id = element.getAttribute('data-id');
            element.querySelector('i')
                .addEventListener('click', () => this.deleteFriend(id, element));
        }
    }

    eventListenersInit () {
        let restrictedAreaEl = this.DOMElement.querySelector('.restricted_area');

        this.DOMElement
            .querySelector('.button.success')
            .addEventListener('click', this.onAddFriend.bind(this));
        this.DOMElement
            .querySelector('.button.danger')
            .addEventListener('click', AuthCtrl.delete.bind(this));
        this.DOMElement
            .querySelector('.restricted')
            .addEventListener('click', () => restrictedAreaEl.classList.add('active'));
        this.DOMElement
            .querySelector('.restricted_area i.close')
            .addEventListener('click', () => restrictedAreaEl.classList.remove('active'));
    }

    onChangeNickname (event) {
        event.preventDefault();
        let newName = getInputValue(this.DOMElement, 'nickname');
        SocialCtrl.nickname(newName);
    }

    async onAddFriend () {
        let friendsContainer = this.DOMElement.querySelector('.friends');
        let addUserInput = this.DOMElement.querySelector('input[name="user"]');
        let addUser = await SocialCtrl.add(addUserInput.value);

        if (!addUser.email) {
            return friendsContainer.innerHTML += addUser.message;
        }
        
        friendsContainer.innerHTML += `<div>${addUser.email}</div>`;
    }

    async deleteFriend (id, element) {
        await SocialCtrl.deleteFriend(id);
        this.user.friends.splice(this.user.friends.indexOf(id), 1);
        storeLocal(this.user);
        element.remove();
    }

}

export default Profile;