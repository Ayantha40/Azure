if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => console.log('Service worker registered', reg))
      .catch((err) => console.error('Service worker not registered', err));
  }
  