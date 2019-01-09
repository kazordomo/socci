import ActivityCtrl from '../controllers/activity';
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
            console.log(this.declineButton);
            this.declineButton.addEventListener('click', this.declineActivity.bind(this));
        } else {
            this.declineButton.style.display = 'none';
        }

        this.commentButton.addEventListener('click', this.postComment.bind(this, id));

        return true;
    }

    async postComment (id) {
        let comment = await ActivityCtrl.postComment(Utils.getInputValue(this.DOMElement, 'comment'), id);        
        if (comment) {
            this.DOMElement.querySelector('.comments').innerHTML += `${comment.comment} - ${comment.user}`;
        }
        this.DOMElement.querySelector('input[name="comment"').value = '';
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