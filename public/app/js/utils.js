class Utils {

    static animateIn (elements) {
        let delay = 75;

        for (let element of elements) {
            setTimeout(() => element.classList.remove('out'), delay);
            delay += 75;
        }

        return true;
    }

    static animateOut (elements) {
        let delay = 75;

        for (let element of elements) {
            setTimeout(() => element.classList.add('out'), delay);
            delay += 75;
        }

        return true;
    }

    static getInputValue (DOMElement, name) {
        return DOMElement.querySelector(`input[name="${name}"]`).value;
    }

    static storeLocal (object, name = 'user') {
        localStorage.setItem(name, JSON.stringify(object));
    }

    static getLocal (name = 'user') {
        return JSON.parse(localStorage.getItem(name));
    }

    static getIdFromUrl () {
        let id = window.location.hash.substr(1);
        id = id.split('/')[1];
        return id;
    }

}

export default Utils;