import events from '../../dummy/events';

class Home {

    constructor() {

        this.DOMElement = document.querySelector('section#home');
        this.events = events;

        this.init();

    }

    init () {

        console.log(events);
        for (let event of events) {

            this.createEventEl(event);

        }
        
    }

    createEventEl (data) {

        let rowEl = document.createElement('div');
        let attendeesEl = document.createElement('div');
        let titleEl = document.createElement('h2');
        let timeEl = document.createElement('span');

        // Order matters
        let appendEls = [ titleEl, attendeesEl, timeEl ];

        rowEl.classList.add('row');

        titleEl.innerHTML = data.title;
        timeEl.innerHTML = data.time;

        // Wrap each attendee in a span and append to div
        for (let attendee of data.attendees) {
            let span = document.createElement('span');
            span.innerHTML = attendee;
            attendeesEl.appendChild(span);
        }

        // Loop through all elements and append to the row/container
        for (let el of appendEls) {
            rowEl.appendChild(el)
        }


        this.DOMElement.querySelector('.wrapper').appendChild(rowEl);
        
        return true;
    }

}

export default Home;