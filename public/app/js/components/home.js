import ActivityCtrl from '../controllers/activity';

class Home {

    constructor() {

        this.DOMElement = document.querySelector('section#home');
        this.activities = [];

        this.init();

    }

    async init () {

        this.activities = await ActivityCtrl.getActivities();

        for (let activity of this.activities) {

            this.createActivityEl(activity);

        }

        let delay = 75;

        for (let row of this.DOMElement.querySelectorAll('.row')) {
            
            setTimeout(() => row.classList.remove('out'), delay);
            delay += 75;

        }
        
    }

    createActivityEl (data) {

        let rowEl = document.createElement('div');
        let attendeesEl = document.createElement('div');
        let headerEl = document.createElement('div');
        let containerEl = document.createElement('div');
        let titleEl = document.createElement('h2');
        let timeEl = document.createElement('span');
        let attendEl = this.createAttendButton(data._id, rowEl);
        let deleteEl = this.createDeleteButton(data._id, rowEl);

        rowEl.className = 'row out';
        containerEl.className = 'container';

        titleEl.innerHTML = data.title;
        timeEl.innerHTML = data.time;

        headerEl.appendChild(titleEl);
        headerEl.appendChild(timeEl);

        // Wrap each attendee in a span and append to div
        for (let attendee of data.attendees) {

            let span = document.createElement('span');
            span.innerHTML = attendee.name;
            attendeesEl.appendChild(span);
            
        }

        containerEl.appendChild(attendeesEl);
        containerEl.appendChild(attendEl);
        containerEl.appendChild(deleteEl);
        rowEl.appendChild(headerEl);
        rowEl.appendChild(containerEl);

        rowEl.addEventListener('click', () => rowEl.classList.toggle('active'));

        this.DOMElement.querySelector('.wrapper').appendChild(rowEl);
        
        return true;
    }

    createAttendButton (id, rowEl) {
        let element = document.createElement('button');

        element.className = 'button success';
        element.innerHTML = 'Attend';

        element.addEventListener('click', async () => {

            if(!rowEl.classList.contains('attending')) {
                await ActivityCtrl.attendActivity({id: 999, name: 'Dummyname'}, id);
                element.innerHTML = 'Attend';
            } else {
                await ActivityCtrl.declineActivity({id: 999, name: 'Dummyname'}, id);
                element.innerHTML = 'Do Not Attend';
            }

            rowEl.classList.toggle('attending');

        });

        return element;
    }

    createDeleteButton (id, rowEl) {
        let element = document.createElement('button');

        element.className = 'button danger';
        element.innerHTML = 'Delete';

        element.addEventListener('click', () => {

            this.DOMElement.querySelector('.wrapper').removeChild(rowEl);
            ActivityCtrl.deleteActivity(id);

        });

        return element;
    }

}

export default Home;