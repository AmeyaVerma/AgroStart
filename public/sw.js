// AgroStart service worker: lets the site open on slow or dropped connections (brief, section 8).
//  - Pages (navigations): network first, falling back to the last page shell that was cached.
//  - /assets/* files have hashed names, so they are served from cache first.
//  - Everything else on this site (icons, manifest, sitemap): show the cached copy, refresh it in the background.
//  - Requests to other sites (for example a future database or payment service) are never touched.
// Bump VERSION to clear old caches.
const VERSION = 'v1';
const CACHE = `agrostart-${VERSION}`;
const SHELL = '/index.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(['/', SHELL, '/manifest.webmanifest', '/icons/icon-192.png'])),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('agrostart-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

const remember = (request, response) => {
  if (response && response.ok) {
    const copy = response.clone();
    caches.open(CACHE).then((cache) => cache.put(request, copy));
  }
  return response;
};

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => remember(new Request(SHELL), response))
        .catch(() => caches.match(SHELL)),
    );
    return;
  }

  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(request).then((hit) => hit || fetch(request).then((response) => remember(request, response))),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((hit) => {
      const refresh = fetch(request).then((response) => remember(request, response)).catch(() => hit);
      return hit || refresh;
    }),
  );
});
