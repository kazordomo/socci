class RenderData {

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

        if (Array.isArray(this.data)) {
            let loopTemplate = this.getTemplate(this.loopStartStr, this.loopEndStr);
            this.html = this.html.replace(loopTemplate, this.handleLoop(loopTemplate));
            this.html = this.html.replace(this.loopStartStr, '');
            this.html = this.html.replace(this.loopEndStr, '');
        } else {
            this.html = this.replaceAllMatchesWithData(this.html, this.data);
        }

        // Tell the loader we're done fetching the data.
        document.querySelector('async').remove();
        DOMElement.innerHTML = this.html;
    }

    handleLoop (template) {
        let templateeWithData = '';

        for (let data of this.data) {
            templateeWithData += this.replaceAllMatchesWithData(template, data);
        }

        return templateeWithData;
    }

    replaceAllMatchesWithData (template, data) {
        for(let match of this.getMatches(template, this.regExp)) {
            let prop = this.getProp(match);

            if (Array.isArray(data[prop])) {
                template = template.replace(match + '}}', this.replaceLoopMatches(data, match, prop));
            } else {
                let matchData = this.getDataFromMatch(data, prop);
                template = template.replace(match + '}}', matchData);
            }
        }

        return template;
    }

    replaceLoopMatches (data, match, prop) {
        let htmlTemplate = match.split('.')[2].trim();
        let htmlTemplateWithData = '';
        let currentHtmlTemplate = htmlTemplate;

        for (let object of data[prop]) {
            for (let arrProp of this.getMatches(htmlTemplate, this.regExpArrProp)) {
                let replaceArrProp = arrProp + '!=';
                arrProp = arrProp.slice(2, prop.length + 1);
                currentHtmlTemplate = currentHtmlTemplate.replace(replaceArrProp, object[arrProp]);
            }
            htmlTemplateWithData += currentHtmlTemplate;
            currentHtmlTemplate = htmlTemplate;
        }

        return htmlTemplateWithData;
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

    getDataFromMatch (data, prop) {
        // Get the property. {{ this.data.test }} -> test.
        if (data[prop]) return data[prop];
        return '';
    }

    getProp (match) {
        return match.split('.')[1].trim();
    }

}

export default RenderData;