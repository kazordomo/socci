class Utils {

    static domWithData (DOMElement, data) {
        let html = DOMElement.innerHTML;

        let regExp = /\{{([^}}]+)/g;
        let matches = html.match(regExp);

        for(let match of matches) {
            let prop = match.split('.')[1].trim();
            if (data[prop]) {
                match = match + '}}';
                html = html.replace(match, data[prop]);
            }
        }

        return html;
    }

    static animateIn (elements) {
        let delay = 75;

        for (let element of elements) {
            setTimeout(() => element.classList.remove('out'), delay);
            delay += 75;
        }

        return true;
    }

}

export default Utils;