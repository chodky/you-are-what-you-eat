/*
 * sw.js — Service Worker for the hosted (GitHub Pages) PWA.
 *
 * Only active when viewer.html is served over http(s); opening the file
 * from file:// never registers this worker, so the offline single-file
 * behaviour is unchanged.
 *
 * Strategy:
 *  - install   : precache the app shell (viewer.html, manifest, icons)
 *  - navigate  : network-first → updates land immediately when online,
 *                cached copy keeps the app working offline
 *  - other GET : cache-first, falling back to network (and caching it)
 *
 * Bump CACHE when icons / manifest change (viewer.html itself is always
 * refreshed by the network-first navigation path).
 */
const CACHE = 'yawye-v3.4.1';
const ASSETS = [
  './',
  './index.html',
  './viewer.html',
  './manifest.json',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() =>
          caches.match(req).then((cached) => cached || caches.match('./viewer.html'))
        )
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) =>
      cached ||
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((cache) => cache.put(req, copy));
        return res;
      })
    )
  );
});
