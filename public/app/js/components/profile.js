import SocialCtrl from '../controllers/social';
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
        
        let addButton = this.DOMElement.querySelector('button');
        addButton.addEventListener('click', this.onAddFriend.bind(this));
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

}

export default Profile;