const MinHeap = require('./MinHeap')
const { stem } = require('./stemmer.js')

function getFreqCount(text) {
    wordArr = text.trim().split(' ');
    var heap = new MinHeap(25);
    var map = {};

    for(var i=0; i<wordArr.length; i++) {
        var root = stem(wordArr[i]);
        if(map[root] != null) {
            map[root]++;
        } else {
            map[root] = 1;
        }
        heap.insert(root, map[root])
    }

    return heap.getJSON();
}

module.exports = {
    getFreqCount: getFreqCount
};
