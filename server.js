// Production entry point for hosts that start the app from a single file
// (Hostinger / LiteSpeed / Passenger). Local development still uses `npm run dev`.
process.env.NODE_ENV = process.env.NODE_ENV || "production";

const http = require("http");
const next = require("next");

const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

// PORT may be a number or a unix socket path, depending on the host.
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  http
    .createServer((req, res) => handle(req, res))
    .listen(port, () => console.log(`Digifted Hub ready on ${port}`));
});
