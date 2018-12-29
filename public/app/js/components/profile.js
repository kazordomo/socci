import SocialCtrl from '../controllers/social';

class Profile {

    constructor () {

        this.DOMElement = document.querySelector('section#profile');
        this.init();

    }

    init () {

        let addButton = this.DOMElement.querySelector('button');
        addButton.addEventListener('click', this.onAddFriend.bind(this));

    }

    async onAddFriend () {

        let friendsContainer = this.DOMElement.querySelector('.friends');
        let emailInput = this.DOMElement.querySelector('input');
        let friend = await SocialCtrl.add(emailInput.value);

        if (friend.status === 404) {
            friendsContainer.innerHTML += friend.message;
            return;
        }
        
        friendsContainer.innerHTML += friend.email;
    }

}

export default Profile;