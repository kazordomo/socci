// This class will both be used to add new and edit existing event.
import ActivityCtrl from '../controllers/activity';
import Utils from '../utils';

class Edit {

    constructor() {
        this.DOMElement = document.querySelector('section#edit');

        this.attendees = [];
        // Used to give an id to the attendee elements
        this.attendeeId = 1;

        this.init();
    }

    init () {

        this.addAttendee();

        this.DOMElement.querySelector('button[type="submit"]').addEventListener('click', event => {
            event.preventDefault();
            this.createEvent();
        });

        if (!this.attendees.length) {
            this.DOMElement.querySelector('.attendees').innerHTML += 'No attendees added.';
        }
        
        return true;
    }

    createEvent ()  {

        let activityData = {
            title: Utils.getInputValue(this.DOMElement, 'title'),
            information: Utils.getInputValue(this.DOMElement, 'information'),
            time: Utils.getInputValue(this.DOMElement, 'time'),
            attendees: this.attendees.map(attendee => attendee.name),
        };

        ActivityCtrl.createActivity(activityData);

        return true;
    }
    

    addAttendee () {

        let buttonEl = this.DOMElement.querySelector('form button');
        let newAttendeeEl = this.DOMElement.querySelector('input[name="attendee"]');
        let attendeesEl = this.DOMElement.querySelector('.attendees');

        buttonEl.addEventListener('click', event => {

            event.preventDefault();

            if (!this.attendees.length) {
                // Remove pre-default text.
                this.DOMElement.querySelector('.attendees').innerHTML = '<h2>Attendees</h2>';
            }

            this.attendees.push({id: this.attendeeId, name: newAttendeeEl.value});
            attendeesEl.appendChild(this.createAttendeeEl(this.attendeeId, newAttendeeEl.value));
            this.attendeeId++;
            
            newAttendeeEl.value = '';
        });


        return true;
    }

    createAttendeeEl (id, attendee) {

        let spanEl = document.createElement('span');
            spanEl.innerHTML = attendee;

        spanEl.addEventListener('click', () => {

            // Remove from dom
            this.DOMElement.querySelector('.attendees').removeChild(spanEl);
            // Get the elements index in the attendee list
            let targetIndex = 
                this.attendees.indexOf(this.attendees.find(attendee => attendee.id === id));
            // Remove from list
            this.attendees.splice(targetIndex, 1);

            if (!this.attendees.length) {
                this.DOMElement.querySelector('.attendees').innerHTML += 'No attendees added.';
            }

            return true;
        });

        return spanEl;
    }
}

export default Edit;