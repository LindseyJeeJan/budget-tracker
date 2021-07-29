const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/dist/manifest.json',
  '/assets/css/styles.css',
  '/dist/app.bundle.js',
  '/dist/db.bundle.js',
  '/dist/assets/icons/icon_192x192.png',
  '/dist/assets/icons/icon_512x512.png',
  'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
];

const STATIC_CACHE = "static-cache-v1";
const RUNTIME_CACHE = "runtime-cache";

/// Install the service worker
self.addEventListener('install', function(evt) {
    evt.waitUntil(
        caches.open(STATIC_CACHE).then(cache => {
            console.log('Your files were pre-cached successfully!');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});


// Activate the service worker and remove old data from the cache
self.addEventListener('activate', function(evt) {
    evt.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== STATIC_CACHE && key !== RUNTIME_CACHE) {
                        console.log('Removing old cache data', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});


self.addEventListener('fetch', function(evt) {
    if (evt.request.url.includes('/api/')) {
        evt.respondWith(
        caches
            .open(RUNTIME_CACHE)
            .then(cache => {
            return fetch(evt.request)
                .then(response => {
                if (response.status === 200) {
                    cache.put(evt.request.url, response.clone());
                }
                return response;
                })
                .catch(err => {
                return cache.match(evt.request);
                });
            })
            .catch(err => console.log(err))
        );
    
        return;
    }
    evt.respondWith(
        fetch(evt.request).catch(function() {
            return caches.match(evt.request).then(function(response) {
            if (response) {
                return response;
            } else if (evt.request.headers.get('accept').includes('text/html')) {
                return caches.match('/');
            }
            });
        })
    );
});