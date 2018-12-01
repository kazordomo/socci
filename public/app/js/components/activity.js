import ActivityCtrl from '../controllers/activity';

class Activity {

    constructor () {

        // TODO: This needs to be cached. We have already fetched this data once.
        this.activity = {};

        this.init();
    }

    async init () {
        let id = window.location.hash.substr(1);
            id = id.split('/')[1];

        this.activity = await ActivityCtrl.getActivity(id);
    }

}

export default Activity;