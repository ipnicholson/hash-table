function HashTable(size) { // constructor function
  this.buckets = Array(size);
  this.numBuckets = this.buckets.length;
}

function HashNode(key, value, next) { // constructor function
  this.key = key;
  this.value = value;
  this.next = next || null; // default null if no next parameter
}

HashTable.prototype.hash = function(key) {
  let total = 0;
  // create hash
  for (let i = 0; i < key.length; i++) {
    total += key.charCodeAt(i);
  }
  const bucket = total % this.numBuckets; // set total from 0 to length of hash table
  return bucket;
}

HashTable.prototype.insert = function(key, value) {
  const newHashNode = new HashNode(key, value);
  const index = this.hash(key);
  // if bucket is empty
  if (!this.buckets[index]) {
    this.buckets[index] = newHashNode;
  }
  // bucket is not empty, key matches first node in bucket
  else if (this.buckets[index].key === key) {
    this.buckets[index].value = value;
  }
  // bucket is not empty, key does not match first node in bucket
  else {
    // go to end of linked list
    let currentNode = this.buckets[index];
    while (currentNode.next) {
      if (currentNode.next.key === key) {
        currentNode.next.value = value;
        return;
      }
      currentNode = currentNode.next
    }
    currentNode.next = newHashNode;
  }
}

HashTable.prototype.get = function(key) {
  const index = this.hash(key);
  // if nothing in bucket[index]
  if (!this.buckets[index]) {
    return null;
  }
  // if bucket[index] not empty
  else {
    let currentNode = this.buckets[index];
    while (currentNode) {
      if (currentNode.key === key) {
        return currentNode.value;
      }
      currentNode = currentNode.next;
    }
    return null;
  }
}

HashTable.prototype.retrieveAll = function() { // returns array of all hash nodes
  const result = [];
  for (let i=0; i < this.numBuckets; i++ ) {
    if (this.buckets[i]) {
      result.push(this.buckets[i]);
      // if there is more than one node in bucket
      let currentNode = this.buckets[i].next;
      while (currentNode) {
        result.push(currentNode);
        currentNode = currentNode.next;
      }
    }
  }
  return result;
}

const myHT = new HashTable(30);

myHT.insert('Becca', 'becca@gmail.com');
myHT.insert('Becca', 'b.bloom@gmail.com'); // same key, change value
myHT.insert('Bacce', 'baccebbe@gmail.com'); // hash collision, different key and value
myHT.insert('Sarah', 'sarahangel89@gmail.com');
myHT.insert('Christine', 'christine075@gmail.com');
myHT.insert('Sarah', 'sarah.carmichael24@gmail.com'); // same key, change value
myHT.insert('Charlotte', 'charl0tte@gmail.com');
myHT.insert('Wendy', 'wendyyyy@gmail.com');

console.log(myHT.retrieveAll());
