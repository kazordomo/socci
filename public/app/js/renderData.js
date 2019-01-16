class RenderData {

    constructor (DOMElement, data) {

        this.html = DOMElement.innerHTML;
        this.data = data;
        this.loopStartStr = '@for';
        this.loopEndStr = '@endfor';
        this.regExp = /\{{([^}}]+)/g;
        this.domWithData(DOMElement, this.data);

    }

    // TODO: implement if / ifelse
    domWithData (DOMElement) {

        this.renderLoops();
        // If we got matches/data outside of an loop
        if (this.getMatches(this.html)) {
            for(let match of this.getMatches(this.html)) {
                this.convertWithData(match, this.data);
            }
        }
        
        // Tell the loader we're done fetching the data.
        document.querySelector('async').remove();
        DOMElement.innerHTML = this.html;
    }

    renderLoops () {
        // Reverse the @for indexes to match to the correct @endfor. Also, we need to get the nested loops first.
        let startIndexes = this.findAllOccur(this.html, this.loopStartStr).reverse();
        let endIndexes = this.findAllOccur(this.html, this.loopEndStr);
        let templateWithData = '';

        while (startIndexes.length) {
            let startIndex = startIndexes[0];
            let endIndex = endIndexes[0];

            // Get the template betweend startIndex and endIndex.
            let template = this.html.substring(
                startIndex,
                endIndex + this.loopEndStr.length
            );

            // Get the eventual object property.
            let prop = template.substring(
                template.indexOf(this.loopStartStr) + 5,
                template.indexOf(')')
            );

            let forStartEndIndex = prop ? 
                (this.loopStartStr.length + prop.length + 2) : 
                (this.loopStartStr.length + 2);

            let forStartString = template.substring(
                template.indexOf(this.loopStartStr),
                forStartEndIndex
            );

            let forEndString = template.substring(
                template.indexOf(this.loopEndStr),
                template.indexOf(this.loopEndStr) + this.loopEndStr.length
            );

            // Loop through the data.
            for (let data of this.data) {
                // Check if we are looking for a property (activities.attendees for instance).
                let object = prop ? data[prop] : data;
                // Populate the template with data.
                templateWithData += this.convertMatches(template, object);
                templateWithData = templateWithData.replace(forStartString, '');
                templateWithData = templateWithData.replace(forEndString, '');
            }

            // Replace the template with our templateWithData variable.
            this.html = this.html.replace(template, templateWithData);
            
            // Reset template.
            templateWithData = '';
            // Rerun to get updated indexes.
            startIndexes = this.findAllOccur(this.html, this.loopStartStr).reverse();
            endIndexes = this.findAllOccur(this.html, this.loopEndStr);
        }
    }

    findAllOccur (source, find) {
        const result = [];
        for (let i = 0; i < source.length; ++i) {
            if (source.substring(i, i + find.length) === find) {
                result.push(i);
            }
        }
        return result;
    }

    getMatches (string) {
        return string.match(this.regExp);
    }

    convertMatches (template, data) {

        let isArray = Array.isArray(data);

        // if (isArray && !data.length) return '';

        
        let convertedTemplate = (' ' + template).slice(1);
        let matches = this.getMatches(template);

        // TODO: If data is an array, we need to loop through it.
        
        // TODO: Loop through matches and replace with data.
        for (let match of matches) {

            let prop = match.split('.')[1].trim();
            // Add back the }} to be able to match in the html.
            match = match + '}}';

            let replace = obj => {
                if (obj[prop]) {
                    // Add back the }} to be able to match in the html.
                    // Replace the match with the correct propert from this.data.
                    convertedTemplate = convertedTemplate.replace(match, obj[prop]);
                } else {
                    convertedTemplate = convertedTemplate.replace(match, '');                    
                }
            }

            if (isArray) {
                for (let obj of data) {
                    replace(obj);
                }
            } else {
                replace(data);
            }

        }

        return convertedTemplate;
    }
}

export default RenderData;