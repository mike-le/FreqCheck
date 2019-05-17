const MinHeap = require('./MinHeap')
const { stem } = require('./stemmer')
const { stopwords } = require('./stopwords')

function getFreqCount(text) {
    if(text.length == 0) return;
    wordArr = text.trim().split(' ');
    var heap = new MinHeap(25);
    var map = {};

    for(var i=0; i<wordArr.length; i++) {
        var word = wordArr[i].toLowerCase();
        if(!stopwords.includes(word)){
            word = word.replace(/[^a-zA-Z]/g, "");
            if(word.length > 0){
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
