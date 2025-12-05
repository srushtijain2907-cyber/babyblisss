// SERVICE WORKER FOR PWA ENABLEMENT

const CACHE_NAME = "my-ecommerce-app-v1";
const ASSETS_TO_CACHE = [
    "index.html",
    "style.css",
    "app.js",
    "login.html",
    "cart.html",
    "delivery.html",
    "images/p1.jpg",
    "images/p2.jpg",
    "images/p3.jpg",
    "images/p4.jpg",
    "images/logo.png"
];

// Install Event – Cache Files
self.addEventListener("install", event => {
    console.log("Service Worker Installed");

    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Caching app assets");
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Activate Event – Clear Old Cache
self.addEventListener("activate", event => {
    console.log("Service Worker Activated");

    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        console.log("Removing old cache:", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// Fetch Event – Serve Cached Files
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // Return cached file OR fetch from internet
            return response || fetch(event.request);
        })
    );
});
