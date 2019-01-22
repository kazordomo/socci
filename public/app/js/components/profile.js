import SocialCtrl from '../controllers/social';
import AuthCtrl from '../controllers/auth';
import RenderData from '../renderData';
import Utils from '../utils';

class Profile {

    constructor () {
        this.DOMElement = document.querySelector('section#profile');
        this.friends = [];
        this.init();
    }

    async init () {
        const user = Utils.getLocal();
        this.friends = await SocialCtrl.getFriends();
        this.DOMElement.querySelector('input[name="nickname"]').defaultValue = user.nickname;
        new RenderData(this.DOMElement, this.friends);
        
        let addButton = this.DOMElement.querySelector('.button.success');
        let changeNameButton = this.DOMElement.querySelector('.button.neutral');
        let logoutButton = this.DOMElement.querySelector('.button.yellow');
        let deleteAccButton = this.DOMElement.querySelector('.button.danger');
        let deleteFriendEls = this.DOMElement.querySelectorAll('.friends div');
        addButton.addEventListener('click', this.onAddFriend.bind(this));
        changeNameButton.addEventListener('click', this.onChangeNickname.bind(this));
        logoutButton.addEventListener('click', AuthCtrl.logout.bind(this));
        deleteAccButton.addEventListener('click', AuthCtrl.delete.bind(this));

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

    async deleteFriend (id, element) {
        await SocialCtrl.deleteFriend(id);
        element.remove();
    }

}

export default Profile;