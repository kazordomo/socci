// This class will both be used to add new and edit existing event.

class Edit {

    constructor() {
        this.DOMElement = document.querySelector('section#edit');

        this.init();
        
    }

    init () {

        this.addAttendee();

        this.DOMElement.querySelector('button[type="submit"]').addEventListener('click', event => {
            event.preventDefault();

            this.createEvent();
        })
        
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

    async createEvent () {

        let response = await fetch('/api/activity');
        let json = await response.json();
        console.log(json);
        
    }

}

export default Edit;