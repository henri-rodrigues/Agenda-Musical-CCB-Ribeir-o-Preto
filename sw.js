// 1. Importa os scripts necessários do Firebase
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

// 2. Configurações do seu Firebase (Mesmas do index.html)
const firebaseConfig = {
    apiKey: "AIzaSyD4unyd0N0fjzrAleN_o-cul3sJEEtmiy8",
    authDomain: "test-699cb.firebaseapp.com",
    projectId: "test-699cb",
    messagingSenderId: "1024718520766",
    appId: "1:1024718520766:web:f4acdaa59756f8035bb9ef"
};

// 3. Inicializa o Firebase no Service Worker
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 4. Lógica para exibir a notificação quando o app está FECHADO (Background)
messaging.onBackgroundMessage((payload) => {
    console.log('Recebido mensagem em segundo plano: ', payload);

    const notificationTitle = payload.notification.title || "Agenda Musical CCB";
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Logo_oficial_CCB.png',
        badge: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Logo_oficial_CCB.png',
        data: payload.data // Permite passar links ou IDs de eventos
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// 5. Mantém sua lógica de Offline (Fetch)
self.addEventListener('fetch', function(event) {
    // Aqui você pode adicionar lógica de cache se desejar no futuro
});

// 6. Lógica para quando o usuário CLICA na notificação
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    
    // Abre o site da Agenda ao clicar na notificação
    event.waitUntil(
        clients.openWindow('https://henri-rodrigues.github.io/Agenda-Musical-CCB-Ribeir-o-Preto/')
    );
});
