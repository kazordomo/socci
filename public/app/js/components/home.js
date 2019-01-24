import ActivityCtrl from '../controllers/activity';
import Slider from '../general/slider';
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
        new Slider(this.activities, this.DOMElement);

        if (!this.activities.length) {
            this.DOMElement.querySelector('.wrapper').innerHTML = 'No activites at the moment!';
        }

        // When the dom is render we can connect the buttons with functions.
        this.eventListenerInit();

        Utils.animateIn(this.DOMElement.querySelectorAll('.out'));

    }

    eventListenerInit () {
        for (let sliderItem of this.DOMElement.querySelectorAll('.item_outer')) {
            const dataId = sliderItem.getAttribute('data-id');

            let isUserAttending = !!this.activities
                .find(activity => activity._id === dataId).attendees
                .find(attendee => attendee._id === this.user._id);

                sliderItem
                .querySelector('button.neutral')
                .addEventListener('click', () => window.location.href = `#activity/${dataId}`);

            this.updateAttendeeButton(isUserAttending, sliderItem);
        }
    }

    async onAttend (id, sliderItem) {
        const { user } = await ActivityCtrl.attendActivity(id);
        const isFirstAttendee = sliderItem.querySelector('.no-attendees');

        // TODO: proper error handling...
        if (user.message) {
            return console.log("Already attending.");
        }
        // Remove the text about "no attendees".
        if (isFirstAttendee) {
            sliderItem.querySelector('.no-attendees').remove();
        }
        // Add a comma and a space if not the first attendee
        sliderItem.querySelector('.attendees').innerHTML += `${isFirstAttendee ? '' :', '}${user}`
        this.updateAttendeeButton(true);

        sliderItem.classList.toggle('attending');
        return true;
    }

    onDelete (id, sliderItem) {
        try {
            ActivityCtrl.deleteActivity(id);
            // Remove from the dom. No need to await server when in try/catch.
            this.DOMElement.querySelector('.wrapper').removeChild(sliderItem);
        } catch (err) {
            console.log(err);
        }

        return true;
    }

    updateAttendeeButton (isAttending, sliderItem) {
        let button = sliderItem.querySelector('button.success');
        
        if (isAttending) {
            button.classList.remove('active');
            button.innerHTML = '<i class="fas fa-check"></i>';
        } else {
            button.classList.add('active');
            button.innerHTML = '<i class="fas fa-plus-circle"></i>';
            button.addEventListener('click', () => this.onAttend(dataId, sliderItem));
        }
    }

}

export default Home;