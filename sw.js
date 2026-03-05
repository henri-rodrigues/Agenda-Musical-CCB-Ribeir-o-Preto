self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(event) {
  // Mantém o app funcionando como PWA (sem barra de URL)
  // No futuro, você pode adicionar cache aqui
});
