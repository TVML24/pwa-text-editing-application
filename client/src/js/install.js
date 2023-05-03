const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
// the event here is the prompt to install the application
window.addEventListener('beforeinstallprompt', (event) => {    
    window.deferredPrompt = event;
// unhides the button
    butInstall.classList.toggle("hidden", false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;
  }
  promptEvent.prompt();
  window.deferredPrompt = null;
  butInstall.classList.toggle("hidden", true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
// resets the prompt
    window.deferredPrompt = null;
// hides the button again as it's already installed
    butInstall.classList.toggle("hidden", true);
});
