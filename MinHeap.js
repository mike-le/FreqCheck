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
            var childIndex = this.leftChild(index);
            var sibIndex = childIndex-1;
            
            var node = this.heap[index];
            var childNode = this.heap[childIndex];
            var sibNode = this.heap[sibIndex];

            var toSwap = null;
            
            if(node != null && childNode != null && node.count > childNode.count) {
                toSwap = childIndex;
            }
            
            if(node != null && sibNode != null && node.count > sibNode.count && 
                (childNode == null || (childNode !== null && sibNode.count < childNode.count))) {
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
            var parent = this.parent(index);
            if(this.heap[parent] != null && this.heap[parent].count > this.heap[index].count) {
                this.swap(index, parent);
            }
            index = parent;
        }
    }
      
    insert(word, count) {
        var node = new Node(word, count);
        if(this.map[word] != null) {
            this.map[word].count = count;
            return;
        }
        if(this.size >= this.maxSize && node.count < this.heap[1].count) { 
            return; 
        } 
        if(this.size >= this.maxSize && node.count > this.heap[1].count) {
            this.extractMin();
        } 
        this.heap[++this.size] = node; 
        this.map[word] = node;
        this.bubble_up(this.size); 
    }

    extractMin() {
        var node = this.heap[1]; 
        this.heap[1] = this.heap[this.size--]; 
        this.bubble_down(1); 
        return node; 
    }

    minHeap() { 
        for(var index = Math.floor(this.size/2); index >= 1; index--) { 
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
  
    isLeaf(index) { 
        if(index >= Math.floor(this.size/2) && index <= this.size) { 
            return true; 
        } 
        return false; 
    }

    swap(first, second) {
        var temp = this.heap[first];
        this.heap[first] = this.heap[second];
        this.heap[second] = temp;
    }

    print() { 
        for (var i = 1; i <= this.size / 2; i++) { 
            if(this.heap[i] != null) {
                console.log("Current : " + this.heap[i].word + " " + this.heap[i].count);
            }
            if(this.heap[2*i] != null) {
                console.log("Left : " + this.heap[2*i].word + " " + this.heap[2*i].count);
            }
            if(this.heap[2*i+1] != null) {
                console.log("Right : " + this.heap[2*i+1].word + " " + this.heap[2*i+1].count);
            }
        } 
    }
}