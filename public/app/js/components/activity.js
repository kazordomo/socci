import ActivityCtrl from '../controllers/activity';
import SocialCtrl from '../controllers/social';
import Utils from '../utils';
import RenderData from '../renderData';

class Activity {

    constructor () {
        this.DOMElement = document.querySelector('section#activity');
        // TODO: This needs to be cached. We have already fetched this data once.
        this.activity = {};
        this.declineButton = null;
        this.commentButton = null;
        this.init();
    }

    async init () {
        const user = Utils.getLocal();
        let id = window.location.hash.substr(1);
            id = id.split('/')[1];

        this.activity = await ActivityCtrl.getActivity(id);
        new RenderData(this.DOMElement, this.activity);
        // Because the dom is rerendered, putting this in the constructor would get lost.
        this.declineButton = this.DOMElement.querySelector('.button.danger');
        this.commentButton = this.DOMElement.querySelector('.button.success');

        let isUserAttending = !!this.activity.attendees
                .find(attendee => attendee._id === user._id);

        if (isUserAttending) {
            this.declineButton.addEventListener('click', this.declineActivity.bind(this));
        } else {
            this.declineButton.style.display = 'none';
        }

        this.commentButton.addEventListener('click', this.postComment.bind(this, id));
        this.DOMElement.addEventListener('keyup', event => {
            if (event.keyCode === 13) {
                this.commentButton.click();
            }
        });

        console.log(this.activity);

        return true;
    }

    // TODO: add to init.
    // TODO: if the attendee is already a friend - do not show icon.
    handleAttendees () {
        let attendeeEls = Array.from(document.querySelectorAll('.attendees span'));
        // TODO: add this directly to view when renderData is fixed.
        let icon = '<i class="fas fa-plus-circle"></i>';
        for (let el of attendeeEls) {
            let friend = this.activity.attendees.find(a => a.nickname === el.innerHTML);
            // Only attendees added to the users friendslist will have email specified.
            if (friend.email) {
                icon.addAttendee(friend.email);
                el.innerHTML += icon;
            }
        }
    }

    async addAttendee (email) {
        try {
            await SocialCtrl.add(email);
            console.log('Friend added!');
        } catch(err) {
            console.log(err);
        }
    }

    async postComment (activityId) {
        let comment = await ActivityCtrl.postComment(Utils.getInputValue(this.DOMElement, 'comment'), activityId);        
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
        if (response.status !== 200) {
            return console.log('error');
        }
        this.declineButton.style.display = 'none';
    }

}

export default Activity;