const CACHE = 'family-hub-v2';
const base = self.location.pathname.replace(/service-worker\.js$/, '');

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then(cache =>
      cache.addAll([
        base,                 // e.g., /family-hub/
        base + 'index.html',
        base + 'manifest.json',
        base + 'icon-192.png',
        base + 'icon-512.png'
      ])
    )
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
});