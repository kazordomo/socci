class ActivityCtrl {

    static async getActivities () {

        try {

            let response = await fetch('/api/activity');
            let json = await response.json();

            return json;

        } catch (err) {

            console.log(err);

        }

    }

    static async createActivity (activity) {

        try {

            let response = await fetch('/api/activity', { 
                method: 'POST', 
                body: JSON.stringify(activity),
                headers: { 'Content-Type': 'application/json' }
            });

        } catch(err) {

            console.log(err);

        }
        
    }

    static async deleteActivity (id) {

        try {

            let response = fetch('/api/activity', { 
                method: 'DELETE',
                body: JSON.stringify({ id }),
                headers: { 'Content-Type': 'application/json' }
            });

        } catch(err) {

            console.log(err);

        }
    }

    static async attendActivity (attendee, activityId) {

        try {

            let response = await fetch(`/api/activity/attend/${activityId}`, { 
                method: 'POST', 
                body: JSON.stringify(attendee),
                headers: { 'Content-Type': 'application/json' }
            });

        } catch (err) {

            console.log(err);

        }

    }

    static async declineActivity (attendee, activityId) {

        console.log(attendee);

        try {

            let response = await fetch(`/api/activity/decline/${activityId}`, { 
                method: 'POST', 
                body: JSON.stringify(attendee),
                headers: { 'Content-Type': 'application/json' }
            });

        } catch (err) {

            console.log(err);

        }

    }

}

export default ActivityCtrl;