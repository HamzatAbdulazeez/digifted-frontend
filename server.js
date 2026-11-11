// Production entry point for hosts that start the app from a single file
// (Hostinger / LiteSpeed / Passenger). Local development still uses `npm run dev`.
process.env.NODE_ENV = process.env.NODE_ENV || "production";

const http = require("http");
const next = require("next");

const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

// PORT may be a number or a unix socket path, depending on the host.
const port = process.env.PORT || 3000;

// Hostinger's CDN caches by URL and ignores Next's `Vary: rsc` header, so it
// mixes up full pages and the navigation data <Link> fetches for the same URL,
// which breaks client-side links. Only the fingerprinted build assets are safe
// to cache; everything else must bypass shared caches.
const NO_STORE = "private, no-cache, no-store, max-age=0, must-revalidate";

function disableSharedCaching(res) {
  const setHeader = res.setHeader.bind(res);
  const writeHead = res.writeHead.bind(res);
  const isCacheHeader = (name) => /^(cache-control|cdn-cache-control|expires|etag|last-modified)$/i.test(name);

  res.setHeader = (name, value) => (isCacheHeader(name) ? res : setHeader(name, value));
  res.writeHead = (status, ...rest) => {
    const headers = rest[rest.length - 1];
    if (headers && typeof headers === "object" && !Array.isArray(headers)) {
      for (const name of Object.keys(headers)) if (isCacheHeader(name)) delete headers[name];
    }
    setHeader("Cache-Control", NO_STORE);
    setHeader("CDN-Cache-Control", "no-store");
    return writeHead(status, ...rest);
  };
}

app.prepare().then(() => {
  http
    .createServer((req, res) => {
      if (!req.url.startsWith("/_next/static/")) {
        // Never answer 304 here: a 304 lets the CDN keep (and refresh) a copy
        // it cached earlier, including one stored under the wrong content type.
        delete req.headers["if-none-match"];
        delete req.headers["if-modified-since"];
        disableSharedCaching(res);
      }
      handle(req, res);
    })
    .listen(port, () => console.log(`Digifted Hub ready on ${port}`));
});
