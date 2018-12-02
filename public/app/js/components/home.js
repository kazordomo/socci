import ActivityCtrl from '../controllers/activity';
import Utils from '../utils';

class Home {

    constructor() {

        this.DOMElement = document.querySelector('section#home');
        this.activities = [];

        this.init();

    }

    async init () {

        this.activities = await ActivityCtrl.getActivities();

        // Get the activites from the server and put them on the dom.
        for (let activity of this.activities) {
            this.createActivityEl(activity);
        }

        // Animate in.
        Utils.animateIn(this.DOMElement.querySelectorAll('.out'));
    }

    createActivityEl (data) {

        // The dom tree for the activity element.
        let htmlString = `
            <div class="top">
                <h2>${data.title}</h2>
                <span>${data.time}</span>
            </div>
            <div class="container">
                <div>
                    ${data.attendees.length ? 
                        data.attendees.map(attendee => `<span>${attendee.name}</span>`) : 
                        'No attendees at the moment.'
                    }
                </div>
                <button class="button success">Attend</button>
                <button class="button danger">Delete</button>
                <div><a href="#activity/${data._id}">Info</div>
            </div>
        `;

        // Row element (most parent of the activity element).
        let rowEl = document.createElement('div');
            rowEl.className = 'row out';
            rowEl.innerHTML = htmlString;

        rowEl.querySelector('.top')
             .addEventListener('click', () => rowEl.classList.toggle('active'));
        rowEl.querySelector('button.success')
             .addEventListener('click', () => this.onAttend(data._id, rowEl));
        rowEl.querySelector('button.danger')
             .addEventListener('click', () => this.onDelete(data._id, rowEl));

        this.DOMElement.querySelector('.wrapper').appendChild(rowEl);
        
        return true;
    }

    async onAttend (id, rowEl) {

        // Dummy obj.
        const user = {id: 999, name: 'Dummyname'};

        let attendeesEl = this.DOMElement.querySelector('.container div')

        try {

            if(!rowEl.classList.contains('attending')) {
                await ActivityCtrl.attendActivity(user, id);
                // TODO: It's the user that should be added to the attendee list.
                attendeesEl.innerHTML += `, ${user.name}`
            } else {
                await ActivityCtrl.declineActivity(user, id);
                // TODO: Remove the attendee from the DOM.
            }

        } catch (err) {
            console.log(err);
        }

        rowEl.classList.toggle('attending');

        return true;
    }

    onDelete (id, rowEl) {

        try {
            ActivityCtrl.deleteActivity(id);
            // Remove from the dom. No need to await server when in try/catch.
            this.DOMElement.querySelector('.wrapper').removeChild(rowEl);
        } catch (err) {
            console.log(err);
        }

        return true;
    }

}

export default Home;