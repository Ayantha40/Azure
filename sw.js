const staticCacheName = 'site-static';
const dynamicCacheName = 'site-dynamic - v1'
const assets = [
    '/',
    '/Index.html',
    'js/app.js',
    'css/style.css',
    'img/apple-touch-icon.png',
    'css/bootstrap.min.css',
    'css/animate.css',
    'css/owl.carousel.min.css',
    'css/all.css',
    'css/flaticon.css',
    'css/themify-icons.css',
    'css/magnific-popup.css',
    'css/slick.css',
    'manifest.json',  
    'img/Azure Logo.png',
    'img/body_bg.png',
    '/Fall_Back.html'
];

// install service worker
self.addEventListener('install',evt => {
  // console.log('service worker has been installed');
  evt.waitUntil(caches.open(staticCacheName).then(cache => {
    console.log('caching shell assets');
    cache.addAll(assets); 
   })
  )

});

// activate event
self.addEventListener('activate', evt =>{
   // console.log('service worker has been activated');
   evt.waitUntil(
    caches.keys().then(keys => {
        //console.log(keys);
        return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName) 
        .nap(key => caches.delete(key))
        )
    })
   );
});

// fetch event
self.addEventListener('fetch', evt => {
   // console.log('fetch event', evt);
   evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
        return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
            })
        });  
    }).catch(() => caches.match('/Fall_Back.html'))
   );
});
