// This class will both be used to add new and edit existing event.

class Edit {

    constructor() {
        this.DOMElement = document.querySelector('section#edit');

        this.init();
        
    }

    init () {
        this.addAttendee();
    }

    addAttendee () {

        let buttonEl = this.DOMElement.querySelector('form button');
        let newAttendeeEl = this.DOMElement.querySelector('input[name="attendee"]');
        let attendeesEl = this.DOMElement.querySelector('.attendees');

        buttonEl.addEventListener('click', event => {

            event.preventDefault();

            attendeesEl.innerHTML += `, ${newAttendeeEl.value}`;
            
            newAttendeeEl.value = '';

        });

        return true;
    }

}

export default Edit;