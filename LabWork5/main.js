//Bilash Oleksii | IM-52

const { mapAsyncCallback, mapAsyncPromise, mapAsyncWithAbort } = require('./asyncMap');

const data = [1, 2, 3];

console.log("--- Starting Tests ---");

mapAsyncCallback(data, (item, done) => done(item * 2), (res) => {
    console.log("1. Le Callback Result:", res);
});

async function runDemos() {
    const promiseRes = await mapAsyncPromise(data, async (x) => x * 10);
    console.log("2. Le Promise Result:", promiseRes);

    const controller = new AbortController();
    setTimeout(() => controller.abort(), 50); 

    try {
        await mapAsyncWithAbort(data, async (x) => {
            await new Promise(r => setTimeout(r, 100)); 
            return x + 100;
        }, controller.signal);
    } catch (err) {
        console.log("3. Abort Demo:", err.message);
    }
}

runDemos();