class Utils {

    static domWithData (DOMElement, data) {

        // Get the DOM as a tring.
        let html = DOMElement.innerHTML;
        // Regex rule.
        let regExp = /\{{([^}}]+)/g;
        // Get all values surrounded by {{ }}.
        let matches = html.match(regExp);

        for(let match of matches) {

            if(match.includes('array')) {
                // array:values:element:prop
                let splitted = match.split(':').map(split => split.trim());
                let values = [];

                // If length === 4 we know that we have specified a prop in the obj in the arr.
                if(splitted.length === 4) {

                    values = data[splitted[2].split('.')[1]].map(value => {
                        return `<${splitted[1]}>${value[splitted[3]]}</${splitted[1]}>`;
                    }).join('');

                } else {

                    values = data[splitted[2].split('.')[1]].map(value => {
                        return `<${splitted[1]}>${value}</${splitted[1]}>`;
                    }).join('');

                }

                match = match + '}}';
                html = html.replace(match, values);
            }

            // Get the property. {{ data.test }} -> test.
            let prop = match.split('.')[1].trim();

            if (data[prop]) {
                // Add back the }} to be able to match in the html.
                match = match + '}}';
                // Replace the match with the correct propert from data.
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

    static getInputValue (DOMElement, name) {
        return DOMElement.querySelector(`input[name="${name}"]`).value;
    }

}

export default Utils;