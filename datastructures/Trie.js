function TrieNode(key) {
    this.key = key;
    this.parent = null;
    this.children = [];
    this.end = false;
    this.count = 0;
}

class Trie { 
    constructor() {
        this.root = new TrieNode(null);
    }

    // inserts a word into the trie at O(k)
    add(word) {
        var node = this.root;

        for(var i=0; i < word.length; i++) {
            if(!node.children[word[i]]) {
                node.children[word[i]] = new TrieNode(word[i]);
                node.children[word[i]].parent = node;
            }
        
            node = node.children[word[i]];

            if(i == word.length-1) {
                node.end = true;
                node.count = 1;
            }
        }
    };

    // Check if trie contains word at O(k)
    contains(word) {
        var node = this.root;

        for(var i=0; i < word.length; i++) {
            if(node.children[word[i]]) {
                node = node.children[word[i]];
            } else {
                return null;
            }  
        }
        return node;
    }
}

module.exports = Trie;