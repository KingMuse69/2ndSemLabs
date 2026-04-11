// Bilash Oleksii | IM-52
// memoize.js (Версія 1)
//==================================//
function memoize(fn, options = {}) {
    const cache = new Map();
    const { 
        maxSize = Infinity, 
        strategy = 'LRU', 
        ttl = null 
    } = options;

    const evict = () => {
        if (cache.size < maxSize) return;
        let keyToEvict = null;

        switch (strategy) {
            case 'LFU': // Least Frequently Used
                let minAccess = Infinity;
                for (let [key, entry] of cache) {
                    if (entry.accessCount < minAccess) {
                        minAccess = entry.accessCount;
                        keyToEvict = key;
                    }
                }
                break;
            case 'LRU':
            default: // Least Recently Used
                let oldestAccess = Infinity;
                for (let [key, entry] of cache) {
                    if (entry.lastAccessed < oldestAccess) {
                        oldestAccess = entry.lastAccessed;
                        keyToEvict = key;
                    }
                }
                break;
        }

        if (keyToEvict) {
            console.log(`[Eviction] Deleted by Strategy ${strategy}: ${keyToEvict}`);
            cache.delete(keyToEvict);
        }
    };

    return function(...args) {
        const key = JSON.stringify(args);
        const now = Date.now();

        if (cache.has(key)) {
            const entry = cache.get(key);
            if (ttl && (now - entry.timestamp > ttl)) {
                cache.delete(key);
            } else {
                entry.accessCount++;
                entry.lastAccessed = now;
                console.log(`[Cache Hit] Taken from cache: ${key}`);
                return entry.value;
            }
        }

        if (cache.size >= maxSize) evict();

        const result = fn(...args);
        cache.set(key, { value: result, timestamp: now, lastAccessed: now, accessCount: 1 });
        return result;
    };
}

module.exports = memoize;