class RenderData {

    // TODO: Refactor - works for now, but needs to be much more dynamic.

    constructor (DOMElement, data) {

        this.html = DOMElement.innerHTML;
        this.data = data;
        this.loopStartStr = '@for';
        this.loopEndStr = '@endfor';
        this.regExp = /\{{([^}}]+)/g;
        this.regExpArrProp = /\=!([^!=]+)/g;
        this.run(DOMElement, this.data);

    }

    run (DOMElement) {
        if (!this.getMatches(this.html, this.regExp)) {
            return document.querySelector('async').remove();
        }

        // If we got matches/data outside of an loop.
        this.replaceAllMatchesWithData();

        // Tell the loader we're done fetching the data.
        document.querySelector('async').remove();
        DOMElement.innerHTML = this.html;
    }

    replaceMatchWithData (match) {
        // Get the property. {{ this.data.test }} -> test.
        let prop = match.split('.')[1].trim();

        if (Array.isArray(this.data[prop])) {
            this.replaceLoopMatches(match, prop);
        }

        if (this.data[prop]) {
            // Add back the }} to be able to match in the html.
            match = match + '}}';
            // Replace the match with the correct property from this.data.
            this.html = this.html.replace(match, this.data[prop]);
        }
    }

    replaceLoopMatches (match, prop) {
        let htmlEl = match.split('.')[2].trim();
        let htmlElWithData = '';
        let currentHtmlElWithData = htmlEl;
        let arrProps = this.getMatches(htmlEl, this.regExpArrProp);

        for (let arrProp of arrProps) {
            let replaceArrProp = arrProp + '!=';
            arrProp = arrProp.slice(2, prop.length + 1);

            for (let object of this.data[prop]) {
                currentHtmlElWithData = currentHtmlElWithData.replace(replaceArrProp, object[arrProp]);
            }

            htmlElWithData += currentHtmlElWithData;
            console.log(htmlElWithData);
        }

        this.html = this.html.replace(match + '}}', htmlElWithData);
    }

    replaceAllMatchesWithData () {
        for(let match of this.getMatches(this.html, this.regExp)) {
            this.replaceMatchWithData(match);
        }
    }

    getMatches (string, regEx) {
        return string.match(regEx);
    }
}

export default RenderData;