const butInstall = document.getElementById('buttonInstall');

let deferredPrompt; // To store the deferred prompt

// Logic for installing the PWA
// Event handler for the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default behavior
  event.preventDefault();

  // Store the event for later use
  deferredPrompt = event;

  // Show the install button to the user
  butInstall.style.display = 'block';
});

// Event handler for the click event on the 'butInstall' element
butInstall.addEventListener('click', async () => {
  // Ensure the deferred prompt is available
  if (deferredPrompt) {
    // Show the installation prompt
    deferredPrompt.prompt();

    // Wait for the user's choice
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the installation');
    } else {
      console.log('User dismissed the installation');
    }

    // Clear the deferred prompt
    deferredPrompt = null;
  }

  // Hide the install button
  butInstall.style.display = 'none';
});

// Event handler for the 'appinstalled' event
window.addEventListener('appinstalled', (event) => {
  console.log('App installed successfully');
  // You can perform additional actions here if needed
});