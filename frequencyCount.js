const MinHeap = require('./MinHeap')
const { stem } = require('./stemmer')
const { stopwords } = require('./stopwords')

const MAX_SIZE = 25;

function getFreqCount(text, filterstopWords) {
    if(text.length == 0) return;
    wordArr = text.trim().toLowerCase().split(' ');
    var heap = new MinHeap(MAX_SIZE);
    var map = {};

    for(var i=0; i<wordArr.length; i++) {
        var word = wordArr[i];
        if(filterstopWords == 'true'){
            if(!stopwords.includes(word)) {
                word = word.replace(/[^a-zA-Z]/g, "");
                if(!stopwords.includes(word) && word.length > 0) {
                    var root = stem(word);
                    if(map[root] != null) {
                        map[root]++;
                    } else {
                        map[root] = 1;
                    }
                    heap.insert(root, map[root])
                }
            }
        } else {
            word = word.replace(/[^a-zA-Z]/g, "");
            if(word.length > 0) {
                var root = stem(word);
                if(map[root] != null) {
                    map[root]++;
                } else {
                    map[root] = 1;
                }
                heap.insert(root, map[root])
            }
        }
        
    }
    
    return heap.getJSON();
}

module.exports = {
    getFreqCount: getFreqCount
};
