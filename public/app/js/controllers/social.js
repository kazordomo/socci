class SocialCtrl {

    static async add (email) {
        try {

            let response = await fetch(`/api/social/add/${email}`);
            let json = await response.json();

            return json;

        } catch (err) {
            console.log(err);
        }

    }

}

export default SocialCtrl;