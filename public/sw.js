const STATIC_CACHE = 'static_v2';
const DYNAMIC_CACHE = 'dynamic_v1';

self.addEventListener('install', (event) => {
    console.log("[Service Worker] Installing worker ", event);
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                cache.addAll([
                    '/',
                    '/index.html',
                    '/offline.html',
                    'src/css/app.css',
                    'src/js/app.js',
                    '/src/js/promise.js',
                    '/src/js/material.min.js',
                    '/src/images/main_photo.jpg',
                    'https://fonts.googleapis.com/css?family=Roboto:400,700',
                    'https://fonts.googleapis.com/icon?family=Material+Icons',
                    'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
                ]);
            })
    )
});

self.addEventListener('activate', (event) => {
    console.log("[Service Worker]: service worker activating", event);
    event.waitUntil(
        caches.keys()
            .then(keyList => {
                return Promise.all(keyList.map(key => {
                    if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
                        console.log("[Service Worker] removing old cache");
                        return caches.delete(key);
                    }
                }))
            })
    )
    return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request.url)
            .then(response => {
                if (response) {
                    return response;
                }

                return fetch(event.request)
                    .then(res => {
                        return caches.open(DYNAMIC_CACHE)
                            .then(cache => {
                                cache.put(event.request.url, res.clone());
                                return res;
                            })
                    })
                    .catch(() => {
                        return caches.open(STATIC_CACHE)
                            .then(function (cache) {
                                return cache.match('/offline.html');
                            });
                    });
            })
    )
});