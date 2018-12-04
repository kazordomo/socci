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
            <h2>${data.title}</h2>
            <span>${data.time}</span>
            <div class="attendees">
                ${data.attendees.length ? 
                    data.attendees.map(attendee => `<span>${attendee.name}</span>`) : 
                    'No attendees at the moment.'
                }
            </div>
            <button class="button success">Attend</button>
            <button class="button danger">Delete</button>
        `;

        // Row element (most parent of the activity element).
        let activityEl = document.createElement('div');
            activityEl.className = 'activity out';
            activityEl.innerHTML = htmlString;

        activityEl.addEventListener('click', () => window.location.href = `#activity/${data._id}"`);
        activityEl.querySelector('button.success')
             .addEventListener('click', () => this.onAttend(data._id, activityEl));
        activityEl.querySelector('button.danger')
             .addEventListener('click', () => this.onDelete(data._id, activityEl));

        this.DOMElement.querySelector('.wrapper').appendChild(activityEl);
        
        return true;
    }

    async onAttend (id, activityEl) {

        // Dummy obj.
        const user = {id: 999, name: 'Dummyname'};
        let attendeesEl = this.DOMElement.querySelector('.container div')

        try {

            if(!activityEl.classList.contains('attending')) {
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

        activityEl.classList.toggle('attending');

        return true;
    }

    onDelete (id, activityEl) {

        try {
            ActivityCtrl.deleteActivity(id);
            // Remove from the dom. No need to await server when in try/catch.
            this.DOMElement.querySelector('.wrapper').removeChild(activityEl);
        } catch (err) {
            console.log(err);
        }

        return true;
    }

}

export default Home;