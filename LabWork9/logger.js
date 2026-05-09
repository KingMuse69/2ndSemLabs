// Bilash Oleksii || IM-52

function log(level = "INFO") {
    return function (targetFunc) {
        return async function (...args) {
            const timestamp = new Date().toISOString();
            console.log(`[${timestamp}] [${level}] Calling ${targetFunc.name} with:`, args);

            try {
                // Support both sync and async functions by using await
                const result = await targetFunc(...args);
                
                if (level !== "ERROR") {
                    console.log(`[${timestamp}] [${level}] ${targetFunc.name} returned:`, result);
                }
                return result;
            } catch (error) {
                console.error(`[${timestamp}] [ERROR] Exception in ${targetFunc.name}:`, error.message);
                throw error;
            }
        };
    };
}