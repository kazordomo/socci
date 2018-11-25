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

            if(response.status === 200) {
                window.location.href = 'http://localhost:3000/#home';
            }

        } catch(err) {

            console.log(err);

        }
        
    }

    static async register (user) {

        try {

            let response = fetch('/auth/register', { 
                method: 'POST',
                body: JSON.stringify(user),
                headers: { 'Content-Type': 'application/json' }
            });

            if(response.status === 200) {
                window.location.href = 'http://localhost:3000/#home';
            }

        } catch(err) {

            console.log(err);

        }
    }

    static async delete (id) {

        try {

            let response = fetch('/auth/user', { 
                method: 'DELETE',
                body: JSON.stringify({ id }),
                headers: { 'Content-Type': 'application/json' }
            });

        } catch(err) {

            console.log(err);

        }
    }

}

export default AuthCtrl;