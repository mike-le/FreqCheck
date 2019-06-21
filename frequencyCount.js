const MinHeap = require('./datastructures/MinHeap')
const { stem } = require('./stemmer')
const { stopwords } = require('./stopwords')

const MAX_SIZE = 25;

function getFreqCount(text, filterstopWords) {
    if(text.length == 0) return;
    text = text.replace(/[\r\n]+/g," ");
    wordArr = text.trim().toLowerCase().split(' ');
    let heap = new MinHeap(MAX_SIZE);
    let map = {};

    for(let i=0; i<wordArr.length; i++) {
        let word = wordArr[i];
        if(filterstopWords == 'true') {
            if(!stopwords.includes(word)) {
                word = word.replace(/[^a-zA-Z]/g, "");
                if(!stopwords.includes(word) && word.length > 1) {
                    processWord(stem(word), heap, map);
                }
            }
        } else {
            word = word.replace(/[^a-zA-Z]/g, "");
            if(word.length > 1) {
                processWord(stem(word), heap, map);
            }
        }
    }
    
    return heap.getJSON();
}

function processWord(root, heap, map){
    map[root] = map[root] != null ? map[root]+1 : 1;
    heap.insert(root, map[root])
}

module.exports = { getFreqCount: getFreqCount }
