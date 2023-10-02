import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
// if ('serviceWorker' in navigator) {
//   // register workbox service worker
//   const workboxSW = new Workbox('/src-sw.js');
//   workboxSW.register();
// } else {
//   console.error('Service workers are not supported in this browser.');
// }
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(error => {
      console.error('Service Worker registration failed:', error);
    });
}

// Your JavaScript code for handling the "Install" button
if ('serviceWorker' in navigator && 'beforeinstallprompt' in window) {
  // Reference to the install button
  const installButton = document.getElementById('install-button');

  // Prevent the default behavior of the install button
  installButton.addEventListener('click', (event) => {
    event.preventDefault();

    // Trigger the installation prompt
    let deferredPrompt;
    const promptEvent = new Event('beforeinstallprompt', {
      bubbles: true,
      cancelable: true,
    });

    // Dispatch the custom event
    installButton.dispatchEvent(promptEvent);

    // Capture the prompt event
    promptEvent
      .then((event) => {
        // Store the deferred event to use later
        deferredPrompt = event;

        // Show the install prompt to the user
        return deferredPrompt.prompt();
      })
      .then((userChoice) => {
        if (userChoice.outcome === 'accepted') {
          console.log('User accepted the installation');
        } else {
          console.log('User dismissed the installation');
        }

        // Clear the deferred prompt
        deferredPrompt = null;
      });
  });
}

