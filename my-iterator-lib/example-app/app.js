import { randomNumberGenerator, consumeIteratorWithTimeout } from 'my-iteration-lib';

const gen = randomNumberGenerator(1, 10);
console.log("Launch Demo-project...");

consumeIteratorWithTimeout(gen, 2); // Launch in 2 seconds