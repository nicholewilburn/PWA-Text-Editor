import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

// Define a strategy for precaching assets during installation
// Precache specified assets and routes during installation
precacheAndRoute(self.__WB_MANIFEST);

// Define a strategy for caching assets (e.g., CSS, JavaScript, images)
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

// Define routes for your assets and use the caching strategy
// This example assumes your assets are in a 'static' directory
registerRoute(
  ({ request }) =>
    request.destination === 'style' || request.destination === 'script' || request.destination === 'image',
  assetCacheStrategy
);

// Implement a fallback strategy for offline requests (e.g., for assets that are not in the cache)
// This ensures that, even if an asset is not cached, the service worker will still try to fetch it
const offlineFallbackStrategy = new StaleWhileRevalidate({
  cacheName: 'offline-fallback',
});

registerRoute(
  ({ request }) =>
    request.destination === 'style' || request.destination === 'script' || request.destination === 'image',
  offlineFallbackStrategy
);

// Define a route for navigation requests, which will use the StaleWhileRevalidate strategy
// This is important to ensure that the app shell (HTML) is served from cache
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new StaleWhileRevalidate({
    cacheName: 'app-shell',
  })
);
