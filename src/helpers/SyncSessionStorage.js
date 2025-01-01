// src/helpers/SyncSessionStorage.js
export const sessionStorageTransfer = (event) => {
    if (!event) {
      event = window.event; // IE support
    }
    if (!event.newValue) return; // Do nothing if no value to work with
  
    if (event.key === 'getSessionStorage') {
      // Another tab asked for sessionStorage -> send it
      localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
      localStorage.removeItem('sessionStorage'); // Clear after sending
    } else if (event.key === 'sessionStorage' && !sessionStorage.length) {
      // Another tab sent sessionStorage data -> receive it
      const data = JSON.parse(event.newValue);
      for (const key in data) {
        sessionStorage.setItem(key, data[key]);
      }
    }
  };
  
  export const initializeSessionStorageSync = () => {
    window.addEventListener('storage', sessionStorageTransfer);
  
    if (!sessionStorage.length) {
      localStorage.setItem('getSessionStorage', 'foobar');
      localStorage.removeItem('getSessionStorage');
    }
  };
  