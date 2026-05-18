// Bilash Oleksii || IM-52
// main.js

const LabWork4 = require('./PriorityQueue');

const myQueue = new LabWork4();

myQueue.enqueue("Task А", 10);
myQueue.enqueue("Task Б", 50);
myQueue.enqueue("Task В", 30);

console.log("Highest Priority:", myQueue.peek('highest')); // Expecting Task Б

console.log("Oldest (FIFO):", myQueue.peek('oldest'));   // Expecting Task А

console.log("Removing Lowest:", myQueue.dequeue('lowest')); // Removing Task А (Priority 10)

console.log("Newest (LIFO):", myQueue.peek('newest')); // Expecting Task В