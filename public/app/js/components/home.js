import ActivityCtrl from '../controllers/activity';
import Utils from '../utils';
import RenderData from '../renderData';

class Home {

    constructor() {

        this.DOMElement = document.querySelector('section#home');
        this.activities = [];

        this.init();
    }

    async init () {

        this.activities = await ActivityCtrl.getActivities();
        new RenderData(this.DOMElement, this.activities);
        // When the dom is render we can connect the buttons with functions.
        this.eventListenerInit();

        // Animate in.
        Utils.animateIn(this.DOMElement.querySelectorAll('.out'));
    }

    eventListenerInit () {

        for (let activityEl of this.DOMElement.querySelectorAll('.activity')) {
            let dataId = activityEl.getAttribute('data-id');

            activityEl.addEventListener('click', () => window.location.href = `#activity/${dataId}`);
            activityEl
                .querySelector('button.success')
                .addEventListener('click', () => this.onAttend(dataId, activityEl));
            activityEl
                .querySelector('button.danger')
                .addEventListener('click', () => this.onDelete(dataId, activityEl));
        }

    }

    async onAttend (id, activityEl) {

        // Dummy obj.
        const user = {id: 999, name: 'Dummyname'};
        let attendeesEl = this.DOMElement.querySelector('.container div')

        try {

            if(!activityEl.classList.contains('attending')) {
                let user = await ActivityCtrl.attendActivity(id);
                attendeesEl.innerHTML += `, ${user}`
            } else {
                await ActivityCtrl.declineActivity(user, id);
                // TODO: Remove the attendee from the DOM.
            }

        } catch (err) {
            console.log(err);
        }

        activityEl.classList.toggle('attending');

        return true;
    }

    onDelete (id, activityEl) {

        try {
            ActivityCtrl.deleteActivity(id);
            // Remove from the dom. No need to await server when in try/catch.
            this.DOMElement.querySelector('.wrapper').removeChild(activityEl);
        } catch (err) {
            console.log(err);
        }

        return true;
    }

}

export default Home;