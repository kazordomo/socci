import ActivityCtrl from '../controllers/activity';
import Slider from '../general/slider';
import RenderData from '../renderData';
import { animateIn, getLocal } from '../utils';

class Home {

    constructor() {
        this.DOMElement = document.querySelector('section#home');
        this.activities = [];
        this.user = getLocal();
        this.init();
    }

    async init () {
        this.activities = await ActivityCtrl.getActivities();
        new RenderData(this.DOMElement, this.activities);
        new Slider(this.activities, this.DOMElement);

        if (!this.activities.length) {
            this.DOMElement.querySelector('.wrapper').innerHTML = 'No activites at the moment!';
        }

        // When the dom is rendered we can connect the buttons with functions.
        this.sliderItemsOnClick();
        animateIn(this.DOMElement.querySelectorAll('.out'));

    }

    sliderItemsOnClick () {
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
        // TODO: Proper error handling.
        if (user.message) return console.log("Already attending.");
        this.updateAttendeeButton(true);
        sliderItem.classList.toggle('attending');
    }

    onDelete (id, sliderItem) {
        // TODO: Proper error handling.
        try {
            ActivityCtrl.deleteActivity(id);
            // Remove from the dom. No need to await server when in try/catch.
            this.DOMElement.querySelector('.wrapper').removeChild(sliderItem);
        } catch (err) {
            console.log(err);
        }
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