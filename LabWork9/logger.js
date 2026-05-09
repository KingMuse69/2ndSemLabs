// Bilash Oleksii || IM-52

const logger = (options = {}) => {
    const { 
        level = "INFO", 
        formatter = (data) => data
    } = options;

    return (targetFunc) => {
        return async function (...args) {
            const start = performance.now();
            const timestamp = new Date().toISOString();
            
            let logData = {
                timestamp,
                level,
                functionName: targetFunc.name,
                arguments: args,
            };
            try {
                const result = await targetFunc(...args);
                const end = performance.now();

                if (level !== "ERROR") {
                    logData.result = result;
                    logData.executionTime = `${(end - start).toFixed(2)}ms`;
                    console.log(JSON.stringify(formatter(logData), null, 2));
                }

                return result;
            } catch (error) {
                const end = performance.now();
                logData.level = "ERROR";
                logData.error = error.message;
                logData.executionTime = `${(end - start).toFixed(2)}ms`;
                
                console.error(JSON.stringify(formatter(logData), null, 2));
                throw error;
            }
        };
    };
};

// Testing

async function fetchData(id) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ id, status: "success" }), 500);
    });
}

function divide(a, b) {
    if (b === 0) throw new Error("Division by zero!");
    return a / b;
}

const monitoredFetch = logger({ level: "INFO" })(fetchData);
const monitoredDivide = logger({ level: "ERROR" })(divide);

(async () => {
    console.log("--- Test 1: INFO level with Async ---");
    await monitoredFetch(101);

    console.log("\n--- Test 2: ERROR level with Exception ---");
    try {
        await monitoredDivide(10, 0);
    } catch (e) {
    }
})();