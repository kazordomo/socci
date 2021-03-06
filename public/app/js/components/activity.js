import ActivityCtrl from '../controllers/activity';
import SocialCtrl from '../controllers/social';
import { getLocal, storeLocal, getIdFromUrl, getInputValue } from '../utils';
import RenderData from '../renderData';

class Activity {

    constructor () {
        this.DOMElement = document.querySelector('section#activity');
        this.activity = {};
        this.user = getLocal();
        this.init();
    }

    async init () {
        const user = getLocal();
        const id = getIdFromUrl();

        this.activity = await ActivityCtrl.getActivity(id);
        new RenderData(this.DOMElement, this.activity);

        let declineButton = this.DOMElement.querySelector('.button.danger');
        let commentButton = this.DOMElement.querySelector('.button.success');
        let isUserAttending = !!this.activity.attendees.find(attendee => attendee._id === user._id);

        if (isUserAttending) {
            declineButton.addEventListener('click', this.declineActivity.bind(this));
        } else {
            declineButton.style.display = 'none';
        }

        commentButton.addEventListener('click', this.postComment.bind(this, id));
        this.DOMElement.addEventListener('keyup', event => (event.keyCode === 13) && commentButton.click());

        this.attendeesOnClick();
    }

    attendeesOnClick () {
        for(let attendee of this.DOMElement.querySelectorAll('.attendee')) {
            let icon = attendee.querySelector('i');
            let friendId = attendee.getAttribute('data-id');
            let isAlreadyFriends = this.user.friends.find(id => id === friendId);

            if (friendId === this.user._id || isAlreadyFriends) {
                icon.remove();
            } else {
                icon.addEventListener('click', () => this.addFriend(friendId, icon));
            }
        }
    }
    
    async addFriend (id, icon) {
        let result = await SocialCtrl.add(id);
        // TODO: result.succes: false or true = Proper error handling.
        if (result.id) {
            this.user.friends.push(result.id);
            storeLocal(this.user);
            icon.remove();
        } else {
            console.log(result.message);
        }
    }

    async postComment (activityId) {
        let comment = await ActivityCtrl.postComment(getInputValue(this.DOMElement, 'comment'), activityId);        
        if (comment) {
            this.DOMElement.querySelector('.comments').innerHTML += `${comment.comment} - ${comment.user}`;
        }
        this.DOMElement.querySelector('input[name="comment"').value = '';
    }

    async deleteComment (commentId, activityId) {
        let response = await ActivityCtrl.deleteComment(commentId, activityId);
        // TODO: remove from dom
        console.log(response);
    }

    async declineActivity () {
        let response = await ActivityCtrl.declineActivity(this.activity._id);
        if (response.status !== 200) return console.log('error');
        this.DOMElement.querySelector('.button.danger').style.display = 'none';
    }

}

export default Activity;