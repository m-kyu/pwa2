// Register a Service Worker.



function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

window.addEventListener('load',function(){


navigator.serviceWorker.register('./sw.js');

navigator.serviceWorker.ready
    .then(function (registration) {
        // Use the PushManager to get the user's subscription to the push service.
        return registration.pushManager.getSubscription()
            .then(async function (subscription) {

                // If a subscription was found, return it.
                if (subscription) {
                    return subscription;
                }

                // Get the server's public key
                const response = await fetch('http://localhost:3001/noti');
                const vapidPublicKey = await response.text();
                // Chrome doesn't accept the base64-encoded (string) vapidPublicKey yet
                // urlBase64ToUint8Array() is defined in /tools.js
                const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

                // Otherwise, subscribe the user (userVisibleOnly allows to specify that we don't plan to
                // send notifications that don't have a visible effect for the user).
                return registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: convertedVapidKey
                });
            });
    }).then(function (subscription) {

       
        // Send the subscription details to the server using the Fetch API.
        fetch('http://localhost:3001/sendNotification', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({subscription: subscription}),
        })
            .then(res => res.text())
            .then(res => {
                console.log(res.data)
            })

            
        document.getElementById('doIt').onclick = function () {
            
            // Ask the server to send the client a notification (for testing purposes, in actual
            // applications the push notification is likely going to be generated by some event
            // in the server).
            fetch('http://localhost:3001/sendNotification', {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    subscription: subscription,
                }),
            });
        };

    });
});