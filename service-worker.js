
const CACHE_NAME = 'kittybb-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/vignette_1.png',
  '/vignette_2.png',
  '/vignette_3.png',
  '/vignette_4.png',
  '/vignette_5.png',
  '/vignette_6.png',
  '/vignette_7.png',
  '/vignette_8.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
