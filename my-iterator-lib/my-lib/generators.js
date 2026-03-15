export function* randomNumberGenerator(min = 1, max = 100) {
    while (true) {
        yield Math.floor(Math.random() * (max - min + 1)) + min;
    }
}