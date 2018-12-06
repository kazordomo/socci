import ActivityCtrl from '../controllers/activity';
import Utils from '../utils';
import Loader from '../general/loader';

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

        // TODO: the loader should be baked in to the router.
        Loader.in();
        this.activity = await ActivityCtrl.getActivity(id);
        this.DOMElement.innerHTML = Utils.domWithData(this.DOMElement, this.activity);
        Loader.out();
        // END LOADER HERE
        
        this.DOMElement.querySelector('button').addEventListener('click', () => {
            ActivityCtrl.postComment(Utils.getInputValue(this.DOMElement, 'comment'), id);
            this.DOMElement.querySelector('input[name="comment"').value = '';
        });

        return true;
    }

}

export default Activity;