import ActivityCtrl from '../controllers/activity';
import Utils from '../utils';
import RenderData from '../renderData';

class Activity {

    constructor () {

        this.DOMElement = document.querySelector('section#activity');
        // TODO: This needs to be cached. We have already fetched this data once.
        this.activity = {};

        this.init();
    }

    async init () {
        let id = window.location.hash.substr(1);
            id = id.split('/')[1];

        this.activity = await ActivityCtrl.getActivity(id);
        new RenderData(this.DOMElement, this.activity);
        
        this.DOMElement.querySelector('button').addEventListener('click', () => {
            this.postComment(id);
            this.DOMElement.querySelector('input[name="comment"').value = '';
        });

        return true;
    }

    async postComment (id) {
        let comment = await ActivityCtrl.postComment(Utils.getInputValue(this.DOMElement, 'comment'), id);        
        if (comment) {
            this.DOMElement.querySelector('.comments').innerHTML += `${comment.comment} - ${comment.user}`;
        }
    }

}

export default Activity;