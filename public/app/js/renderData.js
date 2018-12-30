class RenderData {

    constructor (DOMElement, data) {

        this.html = DOMElement.innerHTML;
        this.data = data;
        this.domWithData(DOMElement, this.data);

    }

    domWithData (DOMElement) {
        // Regex rule.
        let regExp = /\{{([^}}]+)/g;
        // Get all values surrounded by {{ }}.
        let matches = this.html.match(regExp);

        for(let match of matches) {

            // TODO: if the html contains {{ @for }} we should loop out them and remove the first.

            this.renderArray(match, this.data);

            // Get the property. {{ this.data.test }} -> test.
            let prop = match.split('.')[1].trim();

            if (this.data[prop]) {
                // Add back the }} to be able to match in the html.
                match = match + '}}';
                // Replace the match with the correct propert from this.data.
                this.html = this.html.replace(match, this.data[prop]);
            }
        }

        // Tell the loader we're done fetching the this.data.
        document.querySelector('async').remove();

        DOMElement.innerHTML = this.html;
    }

    renderArray (match) {

        if (!match.includes('array')) return;

        // array:values:element:prop
        let splitted = match.split(':').map(split => split.trim());
        let values = [];

        // If length === 4 we know that we have specified a prop in the obj in the arr.
        if(splitted.length === 4) {

            values = this.data[splitted[2].split('.')[1]].map(value => {
                return `<${splitted[1]}>${value[splitted[3]]}</${splitted[1]}>`;
            }).join('');

        } else {

            values = this.data[splitted[2].split('.')[1]].map(value => {
                return `<${splitted[1]}>${value}</${splitted[1]}>`;
            }).join('');

        }

        match = match + '}}';
        this.html = this.html.replace(match, values);
    }

    renderMultiple () {

    }
}

export default RenderData;