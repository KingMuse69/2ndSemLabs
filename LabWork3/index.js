// Bilash Oleksii | IM-52
// index.js
//===============================//

const memoize = require('./memoize');

const slowSquare = (n) => {
    console.log(`-- Calculate Square of ${n}`);
    return n * n;
};

//memoized version with a cache limit of 2 items

const memoSquare = memoize(slowSquare, { maxSize: 2, strategy: 'LRU' });

console.log(memoSquare(5)); // Calculate
console.log(memoSquare(5)); // Take from cache
console.log(memoSquare(10)); // Calculate
console.log(memoSquare(15)); // Evict 5, calculate 15
console.log(memoSquare(5)); // Calculate again, as 5 was evicted