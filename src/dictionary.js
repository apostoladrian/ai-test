var fs = require('fs');
var util = require('util');
var readFile = util.promisify(fs.readFile);

class Dictionary {

    constructor(inputFile) {
        this.inputFile = inputFile;
        this.content = [];
        this.dictionary = [];
    }

    async buildDictionary(f) {
        this.dictionary = new Set([]);
        var fileContents = '';
        try {
            fileContents = await readFile(f, 'utf8');
            
        } catch (err) {
            console.error(err);
        }

        this.content = fileContents.replace(/\n/g, '').split(' ');
        var tempDic = new Set(this.content);
        var length = tempDic.size ;
        [...tempDic].forEach( (val, index) => {
            this.dictionary[val] = index/length;
        } );
        // console.log(this.dictionary);
        return this.dictionary;
    }

    getDictionary() {
        return this.dictionary;
    }

    /**
     * 
     * We'll return an array of objects like this:
     * {
     * input: [0, 0, 0],
     * output: [0]
     * }
     * 
     * @param {Number} width      
     */
    buildTrainingSet(width) {
        var trainingSet = [];
        var startIndex = 0;
        var dictionaryLength = this.content.length;
        while (startIndex + width < dictionaryLength) {
            trainingSet.push( 
                {
                    input: [...this.getIndexes(this.content.slice(startIndex, startIndex + width))],
                    output: [ this.dictionary[ this.content[ startIndex + width ] ] ]
                }
            )
            startIndex++;
        }
        return trainingSet;
    }

    getIndexes( slice ) {
        var localIndexes = [];
        var self = this;
        slice.forEach( function(val) {
            localIndexes.push(self.dictionary[val]);
        });
        return localIndexes;
    }
}

module.exports = Dictionary;