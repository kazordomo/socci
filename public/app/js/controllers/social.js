class SocialCtrl {

    static async getFriends () {
        let response = await fetch(`/api/social/friends`);
        let json = await response.json();
        return json;
    }

    static async deleteFriend (id) {
        try {
            let response = fetch('/api/social/delete', { 
                method: 'DELETE',
                body: JSON.stringify({ id }),
                headers: { 'Content-Type': 'application/json' }
            });
        } catch(err) {
            console.log(err);
        }
    }

    static async add (parameter) {
        try {
            let response = await fetch(`/api/social/add/${parameter}`);
            let json = await response.json();
            return json;
        } catch (err) {
            console.log(err);
        }

    }

    static async update (obj) {
        let response = await fetch('/api/social/update', { 
            method: 'POST', 
            body: JSON.stringify(obj),
            headers: { 'Content-Type': 'application/json' }
        });
        let json = await response.json();
    }

}

export default SocialCtrl;