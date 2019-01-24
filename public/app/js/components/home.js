import ActivityCtrl from '../controllers/activity';
import Utils from '../utils';
import RenderData from '../renderData';

class Home {

    constructor() {
        this.DOMElement = document.querySelector('section#home');
        this.activities = [];
        this.NO_ATTENDEES_ELEMENT = '<span class="no-attendees">No attendees yet.</span>';
        this.user = Utils.getLocal();
        this.init();
    }

    async init () {
        this.activities = await ActivityCtrl.getActivities();
        new RenderData(this.DOMElement, this.activities);

        if (!this.activities.length) {
            this.DOMElement.querySelector('.wrapper').innerHTML = 'No activites at the moment!';
        }

        // When the dom is render we can connect the buttons with functions.
        this.eventListenerInit();
        // Animate in.
        Utils.animateIn(this.DOMElement.querySelectorAll('.out'));
    }

    eventListenerInit () {
        for (let activityEl of this.DOMElement.querySelectorAll('.activity')) {
            const dataId = activityEl.getAttribute('data-id');

            let isUserAttending = !!this.activities
                .find(activity => activity._id === dataId).attendees
                .find(attendee => attendee._id === this.user._id);

            activityEl
                .querySelector('button.neutral')
                .addEventListener('click', () => window.location.href = `#activity/${dataId}`);

            this.updateAttendeeButton(isUserAttending, activityEl);
        }
    }

    async onAttend (id, activityEl) {
        const { user } = await ActivityCtrl.attendActivity(id);
        const isFirstAttendee = activityEl.querySelector('.no-attendees');

        // TODO: proper error handling...
        if (user.message) {
            return console.log("Already attending.");
        }
        // Remove the text about "no attendees".
        if (isFirstAttendee) {
            activityEl.querySelector('.no-attendees').remove();
        }
        // Add a comma and a space if not the first attendee
        activityEl.querySelector('.attendees').innerHTML += `${isFirstAttendee ? '' :', '}${user}`
        this.updateAttendeeButton(true);

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

    updateAttendeeButton (isAttending, activityEl) {
        let button = activityEl.querySelector('button.success');
        
        if (isAttending) {
            button.classList.remove('active');
            button.innerHTML = '<i class="fas fa-check"></i>';
        } else {
            button.classList.add('active');
            button.innerHTML = '<i class="fas fa-plus-circle"></i>';
            button.addEventListener('click', () => this.onAttend(dataId, activityEl));
        }
    }


}

export default Home;