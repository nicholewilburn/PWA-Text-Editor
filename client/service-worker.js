import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

// Precache specified assets and routes during installation
precacheAndRoute(self.__WB_MANIFEST);

// Precache your app shell (HTML) during installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('app-shell').then((cache) => {
      return cache.addAll(['/index.html']);
    })
  );
});

// Asset caching strategy (e.g., CSS, JavaScript, images)
const assetCacheStrategy = new CacheFirst({
  cacheName: 'asset-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxEntries: 100, // Adjust the maximum number of entries to cache as needed
      maxAgeSeconds: 30 * 24 * 60 * 60, // Cache assets for 30 days (adjust as needed)
    }),
  ],
});

// Page caching strategy (HTML, app shell)
const pageCacheStrategy = new StaleWhileRevalidate({
  cacheName: 'page-cache',
});

// Define routes for your assets and use the caching strategy
registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image',
  assetCacheStrategy
);

// Define a route for navigation requests, which will use the page caching strategy
registerRoute(
  ({ request }) => request.mode === 'navigate',
  pageCacheStrategy
);

// Implement a fallback strategy for offline requests
const offlineFallbackStrategy = new StaleWhileRevalidate({
  cacheName: 'offline-fallback',
});

// Register the same asset caching strategy for offline assets
registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image',
  offlineFallbackStrategy
);