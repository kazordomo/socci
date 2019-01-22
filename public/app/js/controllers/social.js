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

    static async add (email) {
        try {
            let response = await fetch(`/api/social/add/${email}`);
            let json = await response.json();
            return json;
        } catch (err) {
            console.log(err);
        }

    }

    static async nickname (newName) {
        let response = await fetch('/api/social/nickname', { 
            method: 'POST', 
            body: JSON.stringify({ nickname: newName }),
            headers: { 'Content-Type': 'application/json' }
        });
        let json = await response.json();
    }

}

export default SocialCtrl;