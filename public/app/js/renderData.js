class RenderData {

    constructor (DOMElement, data) {

        this.html = DOMElement.innerHTML;
        this.data = data;
        // Regex rule.
        this.regExp = /\{{([^}}]+)/g;
        // Get all values surrounded by {{ }}.
        this.matches = this.html.match(this.regExp);
        this.domWithData(DOMElement, this.data);

    }

    domWithData (DOMElement) {

        if (this.html.includes('@for') && Array.isArray(this.data)) {

            const start = '@for';
            const end = '@endfor'
    
            // Get the html we will apply in the loop.
            let loopString = this.html.substring(
                this.html.lastIndexOf(start) + start.length, 
                this.html.lastIndexOf(end)
            );

            for (let data of this.data) {

                for(let match of this.matches) {
                    this.renderArray(match, data);
                    this.convertWithData(match, data);
                }
                
                if (data !== this.data[this.data.length - 1]) {
                    // If there are still data to output we will append the loopString as an element to the html.
                    let position = this.html.lastIndexOf(end);
                    let appendedHtml = [this.html.slice(0, position), loopString, this.html.slice(position)].join('');

                    this.html = appendedHtml;
                }
            }

            this.html = this.html.replace(start, '');
            this.html = this.html.replace(end, '');

        } else {

            for(let match of this.matches) {
                this.renderArray(match);
                this.convertWithData(match,);
            }

        }

        // Tell the loader we're done fetching the data.
        document.querySelector('async').remove();

        DOMElement.innerHTML = this.html;
    }

    convertWithData (match, data = this.data) {

        // Get the property. {{ this.data.test }} -> test.
        let prop = match.split('.')[1].trim();

        if (data[prop]) {
            // Add back the }} to be able to match in the html.
            match = match + '}}';
            // Replace the match with the correct propert from this.data.
            this.html = this.html.replace(match, data[prop]);
        }

    }

    renderArray (match, data = this.data) {

        if (!match.includes('array')) return;

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
        this.html = this.html.replace(match, values);
    }

}

export default RenderData;