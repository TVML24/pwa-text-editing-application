const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);


// use stale while revalidate pattern to repsond with a cached response if available
registerRoute(
//designates what should be cached based on the request destination
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  new StaleWhileRevalidate({
// defines the cache and gives it a name, presumably so we can access it
    cacheName: "assets-cache",
    plugins: [
// caches the response for us
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);


registerRoute();
