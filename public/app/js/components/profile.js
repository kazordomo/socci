import SocialCtrl from '../controllers/social';
import AuthCtrl from '../controllers/auth';
import RenderData from '../renderData';
import Utils from '../utils';

class Profile {

    constructor () {
        this.DOMElement = document.querySelector('section#profile');
        this.friends = [];
        this.user = Utils.getLocal();
        this.init();
    }

    async init () {
        this.friends = await SocialCtrl.getFriends();
        this.DOMElement.querySelector('input[name="nickname"]').defaultValue = this.user.nickname;
        new RenderData(this.DOMElement, this.friends);
        
        let addButton = this.DOMElement.querySelector('.button.success');
        let changeNameButton = this.DOMElement.querySelector('.button.neutral');
        let deleteAccButton = this.DOMElement.querySelector('.button.danger');
        let deleteFriendEls = this.DOMElement.querySelectorAll('.friends div');
        let restrictedEl = this.DOMElement.querySelector('.restricted');
        addButton.addEventListener('click', this.onAddFriend.bind(this));
        changeNameButton.addEventListener('click', this.onChangeNickname.bind(this));
        deleteAccButton.addEventListener('click', AuthCtrl.delete.bind(this));
        restrictedEl.addEventListener('click', () => this.handleRestricted(restrictedEl));

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
        if (!element.classList.contains('active')) {
            element.classList.add('active');
        } else {
            element.classList.remove('active')
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