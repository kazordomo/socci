// This class will both be used to add new and edit existing event.
import ActivityCtrl from '../controllers/activity';
import { getInputValue } from '../utils';

class Edit {

    constructor() {
        this.DOMElement = document.querySelector('section#edit');
        this.attendees = [];
        this.attendeeId = 1;
        this.init();
    }

    init () {
        this.DOMElement
            .querySelector('form button')
            .addEventListener('click', event => {
                event.preventDefault();
                this.addAttendee();
        });
        this.DOMElement
            .querySelector('button[type="submit"]')
            .addEventListener('click', event => {
                event.preventDefault();
                this.createEvent();
        });
        if (!this.attendees.length) this.handleNoAttendees();
    }

    async createEvent ()  {
        let activityData = {
            title: getInputValue(this.DOMElement, 'title'),
            information: getInputValue(this.DOMElement, 'information'),
            time: getInputValue(this.DOMElement, 'time'),
            attendees: this.attendees.map(attendee => attendee.name),
        };
        // TODO: Proper error handling.
        await ActivityCtrl.createActivity(activityData);
        window.location.href = '#home';
    }
    

    addAttendee () {
        let newAttendeeEl = this.DOMElement.querySelector('input[name="attendee"]');

        // TODO: "No name added"
        if (!newAttendeeEl.value) return;
        if (!this.attendees.length) {
            // Remove pre-default text.
            this.DOMElement.querySelector('.attendees').innerHTML = '<h2>Attendees</h2>';
        }

        this.attendees.push({id: this.attendeeId, name: newAttendeeEl.value});
        this.DOMElement
            .querySelector('.attendees')
            .appendChild(this.createAttendeeEl(this.attendeeId, newAttendeeEl.value));
        this.attendeeId++;
        newAttendeeEl.value = '';
    }

    removeAttende (id, element) {
        this.DOMElement.querySelector('.attendees').removeChild(element);
        // Get the elements index in the attendee list
        let targetIndex = 
            this.attendees.indexOf(this.attendees.find(attendee => attendee.id === id));
        // Remove from list
        this.attendees.splice(targetIndex, 1);
        if (!this.attendees.length) this.handleNoAttendees();
    }

    createAttendeeEl (id, attendee) {
        let spanEl = document.createElement('span');
            spanEl.innerHTML = attendee;
            spanEl.addEventListener('click', () => this.removeAttende(id, spanEl));
        return spanEl;
    }

    handleNoAttendees () {
        return this.DOMElement.querySelector('.attendees').innerHTML += 'No attendees added.';
    }
}

export default Edit;