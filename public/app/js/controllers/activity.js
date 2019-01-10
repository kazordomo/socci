import Utils from '../utils';

class ActivityCtrl {

    static async getActivity (id) {
        try {
            let response = await fetch(`/api/activity/${id}`);
            let json = await response.json();

            return json;

        } catch (err) {
            console.log(err);
        }
    }

    static async getActivities () {
        try {
            let response = await fetch('/api/activites');
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

    static async attendActivity (activityId) {
        try {
            let response = await fetch(`/api/activity/attend/${activityId}`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            let json = await response.json();

            return json;
        } catch (err) {
            console.log(err);
        }
    }

    static async declineActivity (activityId) {
        const user = Utils.getLocal();
        try {
            let response = await fetch(`/api/activity/decline/${activityId}`, { 
                method: 'POST', 
                body: JSON.stringify({ userId: user._id }),
                headers: { 'Content-Type': 'application/json' }
            });
            
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    static async postComment (comment, activityId) {
        try {
            let response = await fetch(`/api/activity/comment/${activityId}`, { 
                method: 'POST', 
                body: JSON.stringify({id: activityId, comment}),
                headers: { 'Content-Type': 'application/json' }
            });
            let json = await response.json();

            return json;
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteComment (commentId, activityId) {
        try {
            let response = await fetch(`/api/activity/comment/${activityId}/${commentId}`, { 
                method: 'DELETE', 
                headers: { 'Content-Type': 'application/json' }
            });
            let json = await response.json();

            return json;
        } catch (err) {
            console.log(err);
        }
    }

}

export default ActivityCtrl;