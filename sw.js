const CACHE_NAME = 'agenda-musical-v9';

// Arquivos que serão salvos no celular do usuário
const assets = [
  './',
  './index.html',
  './gem.html',
  './manifest.json',
  'https://upload.wikimedia.org/wikipedia/commons/3/3e/Logo_oficial_CCB.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@600;700&display=swap'
];

// Instalação: Salva os arquivos no Cache
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

// Ativação: Limpa caches antigos se você atualizar a versão
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  return self.clients.claim();
});

// Fetch: Tenta buscar no Cache primeiro. Se não tiver, busca na rede.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
