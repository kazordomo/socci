import events from '../../dummy/events';

class Home {

    constructor() {

        this.DOMElement = document.querySelector('section#home');
        this.events = events;

        this.init();

    }

    init () {

        for (let event of events) {

            this.createEventEl(event);

        }

        let delay = 75;

        for (let row of this.DOMElement.querySelectorAll('.row')) {
            
            setTimeout(() => row.classList.remove('out'), delay);
            delay += 75;

        }
        
    }

    createEventEl (data) {

        let rowEl = document.createElement('div');
        let attendeesEl = document.createElement('div');
        let headerEl = document.createElement('div');
        let containerEl = document.createElement('div');
        let titleEl = document.createElement('h2');
        let timeEl = document.createElement('span');
        let attendEl = document.createElement('button');

        rowEl.className = 'row out';
        containerEl.className = 'container';
        attendEl.className = 'button';

        titleEl.innerHTML = data.title;
        timeEl.innerHTML = data.time;
        attendEl.innerHTML = 'Attend';

        headerEl.appendChild(titleEl);
        headerEl.appendChild(timeEl);

        // Wrap each attendee in a span and append to div
        for (let attendee of data.attendees) {
            let span = document.createElement('span');
            span.innerHTML = attendee;
            attendeesEl.appendChild(span);
        }

        containerEl.appendChild(attendeesEl);
        containerEl.appendChild(attendEl);
        rowEl.appendChild(headerEl);
        rowEl.appendChild(containerEl);

        rowEl.addEventListener('click', () => rowEl.classList.toggle('active'));

        this.DOMElement.querySelector('.wrapper').appendChild(rowEl);
        
        return true;
    }

}

export default Home;