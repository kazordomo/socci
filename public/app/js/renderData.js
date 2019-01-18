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
                this.convertMatches(match, this.data);
            }
        }
        
        // Tell the loader we're done fetching the data.
        document.querySelector('async').remove();
        DOMElement.innerHTML = this.html;
    }

    renderLoops () {

        let templatesWithData = [];
        let completedTemplate = '';
        
        for (let data of this.data) {

            // Get all indexes - start (@for) and end (@endfor)
            let startIndexes = this.findAllOccur(this.html, this.loopStartStr).reverse();
            let endIndexes = this.findAllOccur(this.html, this.loopEndStr);

            let fullTemplate = this.html.substring(
                startIndexes[startIndexes.length - 1],
                endIndexes[endIndexes.length - 1] + this.loopEndStr.length
            );

            // All the templates with data from the current data-loop.
            let currentDoneTemplates = [];
            let templateWithData = fullTemplate;

            let getProp = template => {
                return template.substring(
                    template.indexOf(this.loopStartStr) + 5,
                    template.indexOf(')')
                );
            }

            while(startIndexes.length) {
                let startIndex = startIndexes[0];
                let endIndex = endIndexes[0];

                // Get the current template - needed if nested for loops.
                let currentTemplate = this.html.substring(
                    startIndex,
                    endIndex + this.loopEndStr.length
                );

                // Get the property in the data - if there is one (@for(prop)) -> data[prop].
                let prop = getProp(currentTemplate);

                // If a prop is specified we know that we are looking for a property in the array (data).
                let object = prop ? data[prop] : data;

                currentTemplate = this.convertMatches(currentTemplate, object);
                currentDoneTemplates.push(currentTemplate);
                
                startIndexes.shift();
                endIndexes.shift();
            }

            for (let template of currentDoneTemplates.reverse()) {
                startIndexes = this.findAllOccur(templateWithData, this.loopStartStr);
                endIndexes = this.findAllOccur(templateWithData, this.loopEndStr).reverse();

                let prop = getProp(template);

                // This is used to get the correct length of the @for(...).
                let forStartEndIndex = prop ? 
                    (this.loopStartStr.length + prop.length + 2) : 
                    (this.loopStartStr.length + 2);

                // Calculate the correct length of the @for() (differs if a prop is specified).
                let forStartString = template.substring(
                    template.indexOf(this.loopStartStr),
                    forStartEndIndex
                );

                // Get the position where to put the templateWithData.
                let replaceThis = templateWithData.substring(
                    startIndexes[0],
                    endIndexes[0] + this.loopEndStr.length
                );

                // Remove @for
                template = template.replace(forStartString, '');
                // Remove @endfor
                let templateEndIndexes = this.findAllOccur(template, this.loopEndStr).reverse();
                template = template.slice(0, templateEndIndexes[0]);
                
                templateWithData = templateWithData.replace(replaceThis, template);
            }
            templatesWithData.push(templateWithData);
        }

        /*
            Add all the templates from 
            templatesWithData together and 
            then replace in this.html.
        */

        for (let template of templatesWithData) {
            completedTemplate += template;
        }

        // TODO: DRY - this is needed however, in the solution we got right now.
        let startPositions = this.findAllOccur(this.html, this.loopStartStr).reverse();
        let endPositions = this.findAllOccur(this.html, this.loopEndStr);

        let replacePosition = this.html.substring(
            startPositions[startPositions.length - 1],
            endPositions[endPositions.length - 1] + this.loopEndStr.length
        );

        this.html = this.html.replace(replacePosition, completedTemplate);
    }

    getTemplate (startIndex, endIndex) {
        return this.html.substring(
            startIndex,
            endIndex
        );
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
        let convertedTemplate = (' ' + template).slice(1);
        let matches = this.getMatches(template);
        
        // Loop through matches and replace with data.
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
                // If no data is in the array, we will just replace the match with an empty string.
                if (!data.length) {
                    convertedTemplate = convertedTemplate.replace(match, '');   
                }
            } else {
                replace(data);
            }
        }

        return convertedTemplate;
    }
}

export default RenderData;