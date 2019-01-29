import Utils from '../utils';

class AuthCtrl {

    static async getUser () {
        try {
            let response = await fetch('/auth/user');
            let json = await response.json();
            return json;
        } catch (err) {
            console.log(err);
        }
    }

    static async login (user) {
        try {
            let response = await fetch('/auth/login', { 
                method: 'POST', 
                body: JSON.stringify(user),
                headers: { 'Content-Type': 'application/json' }
            });
            let json = await response.json();
            if(response.status === 200) {
                Utils.storeLocal(json);
                window.location.href = 'http://localhost:3000/#home';
            }
        } catch(err) {
            console.log(err);
        }
        
    }

    static async register (user) {
        try {
            let response = await fetch('/auth/register', { 
                method: 'POST',
                body: JSON.stringify(user),
                headers: { 'Content-Type': 'application/json' }
            });
            let json = await response.json();
            if(response.status === 200) {
                Utils.storeLocal(json);
                window.location.href = 'http://localhost:3000/#home';
            }

        } catch(err) {
            console.log(err);
        }
    }

    static logout () {
        try {
            fetch('/auth/logout');
            window.location.href = 'http://localhost:3000/';
        } catch(err) {
            console.log(err);
        }
    }

    static async delete () {
        try {
            console.log("CLICKED");
            // fetch('/auth/user', { 
            //     method: 'DELETE',
            //     headers: { 'Content-Type': 'application/json' }
            // });
        } catch(err) {
            console.log(err);
        }
    }

}

export default AuthCtrl;