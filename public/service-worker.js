const cacheName = 'task-manager-cache-v1';
const assetsToCache = [
  '/',
  '/index.html',
  '/register.html',
  '/login.html',
  '/tasks.html',
  '/style.css',
];

// Instala o Service Worker e armazena no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assetsToCache);
    })
  );
});

// Ativa o Service Worker e remove caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      );
    })
  );
});

// Intercepta solicitações de rede e serve recursos do cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
