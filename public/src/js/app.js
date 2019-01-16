let defferedPrompt;

if (!window.Promise) {
    window.promise = Promise;
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(() => {
            console.log('Service worker registered!');
        })
        .catch((err) => {
            console.log(err);
        });
}

window.addEventListener('beforeinstallprompt', (event) => {
    console.log('beforeinstall prompt fired');
    event.preventDefault();
    defferedPrompt = event;
    return false;
})