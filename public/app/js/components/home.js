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

        let htmlString = `
            <div class="top">
                <h2>${data.title}</h2>
                <span>${data.time}</span>
            </div>
            <div class="container">
                <div>
                    ${data.attendees.map(attendee => `<span>${attendee.name}</span>`)}
                </div>
                <button class="button success">Attend</button>
                <button class="button danger">Delete</button>
            </div>
        `;

        let rowEl = document.createElement('div');
            rowEl.classList.add('row');
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

        rowEl.classList.toggle('attending');

        if(!rowEl.classList.contains('attending')) {
            await ActivityCtrl.attendActivity({id: 999, name: 'Dummyname'}, id);
        } else {
            await ActivityCtrl.declineActivity({id: 999, name: 'Dummyname'}, id);
        }

    }

    async onDelete (id, rowEl) {

        this.DOMElement.querySelector('.wrapper').removeChild(rowEl);
        ActivityCtrl.deleteActivity(id);

    }

}

export default Home;