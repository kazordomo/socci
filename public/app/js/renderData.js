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

        let loops = this.getLoopObjects();

        for (let loopObj of loops) {

            debugger;

            let array = loopObj.prop ? this.data[loopObj.prop] : this.data;
            if (array) {
                for (let data of array) {
                    for (let match of this.getMatches(loopObj.string)) {
                        this.convertWithData(match, data);
                    }
    
                    if (data !== array[array.length - 1]) {
                        // If there are still data to output we will append the loopString as an element to the html.
                        let position = this.html.lastIndexOf('@endfor');
                        let appendedHtml = [this.html.slice(0, position), loopObj.string, this.html.slice(position)].join('');
                        this.html = appendedHtml;
                    }
    
                }
            }

            // this.html = this.html.replace('@for', '');
            // this.html = this.html.replace('@endfor', '');
        }
    }

    getLoopObjects () {
        let objects = [];
        // Creating a copy of the html to work with.
        let htmlCopy = (' ' + this.html).slice(1);

        // Reverse the @for indexes to match to the correct @endfor. Also, we need to get the nested loops first.
        let startIndexes = this.findAllOccur(htmlCopy, this.loopStartStr).reverse();
        let endIndexes = this.findAllOccur(htmlCopy, this.loopEndStr);

        for(let [i, startIndex] of startIndexes.entries()) {
            let endIndex = endIndexes[i];

            let resultString = htmlCopy.substring(
                startIndex,
                endIndex + this.loopEndStr.length
            );
            // Get the prop between the brackets - @for(comments) <-
            let prop = resultString.substring(
                resultString.indexOf(this.loopStartStr) + 5,
                resultString.indexOf(')')
            );

            let forStartEndIndex = prop ? 
                (this.loopStartStr.length + prop.length + 2) : 
                (this.loopStartStr.length + 2);

            let forStartString = resultString.substring(
                resultString.indexOf(this.loopStartStr),
                forStartEndIndex
            );

            let forEndString = resultString.substring(
                resultString.indexOf(this.loopEndStr),
                resultString.indexOf(this.loopEndStr) + this.loopEndStr.length
            );

            htmlCopy = htmlCopy.replace(resultString, '');

            resultString = resultString.replace(forStartString, '');
            resultString = resultString.replace(forEndString, '');

            objects.push({ string: resultString, prop: prop ? prop : null });

        }

        return objects;
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

    convertWithData (match, data = this.data) {
        // Get the property. {{ this.data.test }} -> test.
        let prop = match.split('.')[1].trim();
        match = match + '}}';

        if (data[prop]) {
            // Add back the }} to be able to match in the html.
            // Replace the match with the correct propert from this.data.
            this.html = this.html.replace(match, data[prop]);
        } else {
            this.html = this.html.replace(match, '');
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