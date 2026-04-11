// Bilash Oleksii | IM-52
// memoize.js (Версія 1)
function memoize(fn, options = {}) {
    const cache = new Map();
    const { maxSize = Infinity } = options;

    return function(...args) {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            return cache.get(key).value;
        }

        const result = fn(...args);
        
        if (cache.size >= maxSize) {
            const firstKey = cache.keys().next().value;
            cache.delete(firstKey);
        }

        cache.set(key, { value: result, timestamp: Date.now(), accessCount: 1 });
        return result;
    };
}

module.exports = memoize;