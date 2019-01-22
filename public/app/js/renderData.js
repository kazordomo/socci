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

        // if (Array.isArray(this.data)) {
        //     this.handleLoop();
        // } else {
        // }
        
        this.replaceAllMatchesWithData();

        // Tell the loader we're done fetching the data.
        document.querySelector('async').remove();
        DOMElement.innerHTML = this.html;
    }

    handleLoop () {
        let loopTemplate = this.getTemplate(this.loopStartStr, this.loopEndStr);

        for (let data of this.data) {
            this.replaceAllMatchesWithData();
        }
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

    replaceAllMatchesWithData () {
        for(let match of this.getMatches(this.html, this.regExp)) {
            this.replaceMatchWithData(match);
        }
    }

    replaceLoopMatches (match, prop) {
        let htmlTemplate = match.split('.')[2].trim();
        let htmlTemplateWithData = '';
        let currentHtmlTemplate = htmlTemplate;

        for (let object of this.data[prop]) {
            for (let arrProp of this.getMatches(htmlTemplate, this.regExpArrProp)) {
                let replaceArrProp = arrProp + '!=';
                arrProp = arrProp.slice(2, prop.length + 1);
                currentHtmlTemplate = currentHtmlTemplate.replace(replaceArrProp, object[arrProp]);
            }
            htmlTemplateWithData += currentHtmlTemplate;
            currentHtmlTemplate = htmlTemplate;
        }

        this.html = this.html.replace(match + '}}', htmlTemplateWithData);
    }

    getMatches (string, regEx) {
        return string.match(regEx);
    }

    getTemplate (startIndex, endIndex) {
        if (!startIndex) return false;
        return this.html.substring(
            this.html.indexOf(startIndex) + startIndex.length,
            this.html.indexOf(endIndex)
        );
    }

}

export default RenderData;