const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('toggle-top').addEventListener('click', () => {
        // Send a message to the main process to toggle the always on top property
        ipcRenderer.send('toggle-always-on-top');
    });
});