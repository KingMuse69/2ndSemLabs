const http = require('http');
// Bilash Oleksii || IM-52
const AuthStrategies = {
    apiKey: (headers) => {
        headers['X-API-KEY'] = 'my-secret-api-key-123';
    },
    jwt: (headers) => {
        headers['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`;
    }
};

class AuthProxy {
    constructor(targetHost, targetPort) {
        this.targetHost = targetHost;
        this.targetPort = targetPort;
        this.currentStrategy = 'apiKey';
        this.tokenExpiry = Date.now() + 5000;
    }

    setStrategy(strategyName) {
        if (AuthStrategies[strategyName]) {
            this.currentStrategy = strategyName;
            console.log(`[Proxy] Switched to ${strategyName} strategy.`);
        }
    }

    checkAndRenewToken() {
        if (Date.now() > this.tokenExpiry) {
            console.log("[Proxy] Token expired. Renewing...");
            this.tokenExpiry = Date.now() + 10000; // Reset expiry
            return true;
        }
        return false;
    }

    handleRequest(clientReq, clientRes) {
        console.log(`[Proxy] Intercepted: ${clientReq.method} ${clientReq.url}`);

        this.checkAndRenewToken();

        const headers = { ...clientReq.headers };
        delete headers.host;

        AuthStrategies[this.currentStrategy](headers);

        const options = {
            hostname: this.targetHost,
            port: this.targetPort,
            path: clientReq.url,
            method: clientReq.method,
            headers: headers
        };


        const proxyReq = http.request(options, (proxyRes) => {
            console.log(`[Proxy] Response from API: ${proxyRes.statusCode}`);
            clientRes.writeHead(proxyRes.statusCode, proxyRes.headers);
            proxyRes.pipe(clientRes, { end: true });
        });

        proxyReq.on('error', (err) => {
            console.error(`[Proxy] Error: ${err.message}`);
            clientRes.statusCode = 502;
            clientRes.end('Proxy Error');
        });

        clientReq.pipe(proxyReq, { end: true });
    }

    start(port) {
        const server = http.createServer((req, res) => this.handleRequest(req, res));
        server.listen(port, () => {
            console.log(`[Proxy] Running at http://localhost:${port}`);
        });
    }
}

// --- TESTING ---

const dummyApi = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
        message: "Success!", 
        receivedHeaders: req.headers 
    }));
});
dummyApi.listen(4000);


const proxy = new AuthProxy('localhost', 4000);
proxy.start(8080);


setTimeout(() => proxy.setStrategy('jwt'), 3000);