import SocialCtrl from '../controllers/social';
import AuthCtrl from '../controllers/auth';
import RenderData from '../renderData';
import Utils from '../utils';

class Profile {

    constructor () {
        this.DOMElement = document.querySelector('section#profile');
        this.friends = [];
        this.user = Utils.getLocal();
        this.isRestrictedOpen = false;
        this.init();
    }

    // TODO: REFACTOR
    // TODO: On lost focus / every 3s - run save function for the input values.

    async init () {
        this.friends = await SocialCtrl.getFriends();
        this.DOMElement.querySelector('input[name="nickname"]').defaultValue = this.user.nickname;
        this.DOMElement.querySelector('input[name="email"]').defaultValue = this.user.email;
        new RenderData(this.DOMElement, this.friends);
        
        let addButton = this.DOMElement.querySelector('.button.success');
        let deleteAccButton = this.DOMElement.querySelector('.button.danger');
        let deleteFriendEls = this.DOMElement.querySelectorAll('.friends div');
        let openRestricted = this.DOMElement.querySelector('.restricted');
        let closeRestricted = this.DOMElement.querySelector('.restricted_area i.close');
        let restrictedEl = this.DOMElement.querySelector('.restricted_area');
        addButton.addEventListener('click', this.onAddFriend.bind(this));
        deleteAccButton.addEventListener('click', AuthCtrl.delete.bind(this));
        openRestricted.addEventListener('click', () => this.handleRestricted(restrictedEl));
        closeRestricted.addEventListener('click', () => this.handleRestricted(restrictedEl));

        for (let element of Array.from(deleteFriendEls)) {
            let id = element.getAttribute('data-id');
            let deleteIcon = element.querySelector('i');
            deleteIcon.addEventListener('click', () => this.deleteFriend(id, element));
        }
    }

    async onAddFriend () {
        let friendsContainer = this.DOMElement.querySelector('.friends');
        let addUserInput = this.DOMElement.querySelector('input[name="user"]');
        let addUser = await SocialCtrl.add(addUserInput.value);

        if (!addUser.email) {
            friendsContainer.innerHTML += addUser.message;
            return;
        }
        
        friendsContainer.innerHTML += `<div>${addUser.email}</div>`;
    }

    onChangeNickname (event) {
        event.preventDefault();
        let newName = Utils.getInputValue(this.DOMElement, 'nickname');
        SocialCtrl.nickname(newName);
    }

    handleRestricted (element) {
        if (!this.isRestrictedOpen) {
            element.classList.add('active');
            this.isRestrictedOpen = true;
        } else {
            element.classList.remove('active')
            this.isRestrictedOpen = false;
        }
    }

    async deleteFriend (id, element) {
        await SocialCtrl.deleteFriend(id);
        this.user.friends.splice(this.user.friends.indexOf(id), 1);
        Utils.storeLocal(this.user);
        element.remove();
    }

}

export default Profile;