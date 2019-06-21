function Node(word, count) {
    this.word = word;
    this.count = count;
}

class MinHeap {
    constructor(size) {
        this.heap = [];
        this.maxSize = size;
        this.size = 0;
        this.map = {};
    }

    bubble_down(index) {
        while(true) {
            let leftIndex = this.leftChild(index);
            let rightIndex = this.rightChild(index);
            let sibIndex = leftIndex-1;
            
            let node = this.heap[index];
            let leftNode = this.heap[leftIndex];
            let rightNode = this.heap[rightIndex];
            let sibNode = this.heap[sibIndex];

            let toSwap = null;
            
            if(node != null && leftNode != null && node.count > leftNode.count) {
                toSwap = leftIndex;
            }

            if(toSwap == null && node != null && rightNode != null && node.count > rightNode.count){
                toSwap = rightIndex;
            }
            
            if(node != null && sibNode != null && node.count > sibNode.count && 
                (leftNode == null || (leftNode !== null && sibNode.count < leftNode.count))) {
                toSwap = sibIndex;
            }
            
            if(toSwap == null) {
                break;
            }
            
            this.swap(index, toSwap);
            index = toSwap;
        }
    }

    bubble_up(index) {
        while(index > 1) {
            let parent = this.parent(index);
            if(this.heap[parent] != null && this.heap[parent].count > this.heap[index].count) {
                this.swap(index, parent);
            }
            index = parent;
        }
    }
      
    insert(word, count) {
        let node = new Node(word, count);
        if(this.map[word] != null) {
            this.map[word].count = count;
            this.heapify()
            return;
        }
        if(this.size >= this.maxSize && node.count <= this.heap[1].count) { 
            return; 
        } 
        if(this.size >= this.maxSize) {
            this.extractMin();
        } 
        this.heap[++this.size] = node; 
        this.map[word] = node;
        this.bubble_up(this.size); 
    }

    extractMin() {
        let node = this.heap[1]; 
        this.heap[1] = this.heap[this.size--]; 
        this.heap.pop();
        this.bubble_down(1); 
        return node; 
    }

    heapify() { 
        for(let index = Math.floor(this.size/2); index >= 1; index--) { 
            this.bubble_down(index); 
        } 
    }

    parent(index) { 
        return Math.floor(index / 2); 
    }
  
    leftChild(index) { 
        return (2 * index); 
    }
  
    rightChild(index) { 
        return (2 * index) + 1; 
    }

    swap(first, second) {
        let temp = this.heap[first];
        this.heap[first] = this.heap[second];
        this.heap[second] = temp;
    }

    getJSON() {
        let jsonData = [];
        while(this.size > 0){
            let node = this.extractMin();
            let pair = {};
            pair[node.word] = node.count;
            if(node.count > 0) jsonData.push(pair);
        }
        jsonData.reverse();
        return JSON.stringify(jsonData);
    }
}

module.exports = MinHeap;