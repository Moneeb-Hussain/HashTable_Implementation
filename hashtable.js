class listNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}
class hashTable {
    constructor(capacity = 10) {
        this.capacity = capacity;
        this.buckets = new Array(capacity).fill(null)
    }
    hashCode(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = ((hash + key.charCodeAt(i)))
        }
        return hash;
    }
    hashCodetoBucketIndex(key) {
        return this.hashCode(key) % this.capacity
    }
    insert(key, value) {
        const index = this.hashCodetoBucketIndex(key);
        if (!this.buckets[index]) {
            this.buckets[index] = new listNode(key, value)
        }
        else {
            let currentNode = this.buckets[index];
            while (currentNode.next) {
                if (currentNode.key === key) {
                    currentNode.value = value;
                    return;
                }
                currentNode = currentNode.next;
            }
            if (currentNode.key === key) {
                currentNode.value = value;
            }
            else {
                currentNode.next = new listNode(key, value)
            }
        }
    }
    delete(key) {
        const index = this.hashCodetoBucketIndex(key);
        if (!this.buckets[index]) {
            console.log("Key not found")
            return;
        }

        if (this.buckets[index].key === key) {
            this.buckets[index] = this.buckets[index].next;
            return;
        }
        let prevNode = this.buckets[index];
        let currentNode = prevNode.next;
        while (currentNode) {
            if (currentNode.key === key) {
                prevNode.next = currentNode.next;
                return;
            }
            prevNode = currentNode;
            currentNode = currentNode.next;
        }
    }
    get(key) {
        const index = this.hashCodetoBucketIndex(key);
        let currentNode = this.buckets[index]
        while (currentNode) {
            if (currentNode.key == key) {
                console.log(`\nkey:${currentNode.key}, value:${currentNode.value} \n`)
                return
            }
            currentNode = currentNode.next
        }
        console.log(`\nKey not found \n`);
    }
    print() {
        for (let i = 0; i < this.capacity; i++) {
            const bucket = this.buckets[i];
            if (bucket) {
                console.log(`Bucket--> ${i} \n`);
                let currentNode = bucket;
                while (currentNode) {
                    console.log(`key:${currentNode.key}, value:${currentNode.value} \n`);
                    currentNode = currentNode.next;
                }
            }
            else {
                console.log(`Bucket--> ${i} -----> null`);
            }
        }
    }
}
let myHash = new hashTable()
myHash.insert("apple", 2)
myHash.insert("melon", 3)
myHash.insert("melon", 4)
myHash.insert("lemon", 4)
myHash.insert("lemno", 8)
myHash.insert("lemno", 23)
myHash.insert("lmeno", 200)
myHash.insert("tea", 200)
myHash.insert("eat", 200)
myHash.insert("aet",22)
myHash.insert("Cake",22)
myHash.delete("eat")
myHash.delete("lemno")
myHash.insert("apple", 4)
myHash.get("tea")
myHash.print()