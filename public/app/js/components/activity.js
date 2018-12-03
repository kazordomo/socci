import ActivityCtrl from '../controllers/activity';
import Utils from '../utils';

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
        this.DOMElement.innerHTML = Utils.domWithData(this.DOMElement, this.activity);
        Utils.animateIn(this.DOMElement.querySelectorAll('.out'));

        return true;
    }

}

export default Activity;