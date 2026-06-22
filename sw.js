const CACHE_NAME = 'kauekids-cache-v2'; // Mudei a versão para forçar o celular a atualizar
const assets = [
  '/',
  '/index.html',
  '/manifest.json',
  '/imagem.png'
];

// Instalar o Service Worker e guardar a estrutura básica no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Ativar e limpar caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Responder requisições buscando no cache primeiro ou indo na rede
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
