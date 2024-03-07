// session.js
import { store } from '@/redux/store/store';
import { logout } from '@/redux/slices/authSlice';

let logoutTimer;

const setupSessionTimeout = () => {
    
    const sessionTimeoutDuration = 15 * 60 * 1000; //20 min
    // const sessionTimeoutDuration = 5 * 1000; // 5 seconds


    // Clear any existing timers
    clearTimeout(logoutTimer);

    // Set a new timer for session timeout
    logoutTimer = setTimeout(() => {
        // Dispatch the logout action when the session expires
        store.dispatch(logout());
        window.location.href = '/login';

    }, sessionTimeoutDuration);

    // Update the active tabs list in localStorage
    const activeTabs = JSON.parse(localStorage.getItem('activeTabs')) || [];
    const currentTabId = Date.now().toString();
    activeTabs.push(currentTabId);
    localStorage.setItem('activeTabs', JSON.stringify(activeTabs));

    // Listen for storage events to detect changes in the active tabs
    window.addEventListener('storage', (event) => {
        if (event.key === 'activeTabs') {
            const updatedTabs = JSON.parse(event.newValue) || [];
            if (!updatedTabs.includes(currentTabId)) {
                // The current tab is no longer in the active tabs list, logout
                store.dispatch(logout());
                window.location.href = '/login';
            }
        }
    });
};

const setupEventListeners = () => {
    // Setup event listeners for user activity
    document.addEventListener('mousemove', setupSessionTimeout);
    document.addEventListener('keypress', setupSessionTimeout);
  
    // Listen for the 'beforeunload' event to detect when the window is about to be closed or reloaded
    window.addEventListener('beforeunload', (event) => {
        const activeTabs = JSON.parse(localStorage.getItem('activeTabs')) || [];
        const currentTabId = Date.now().toString();
        const updatedTabs = activeTabs.filter(tabId => tabId !== currentTabId);
        localStorage.setItem('activeTabs', JSON.stringify(updatedTabs));
        
        // Comment out or remove the logout dispatch to avoid unintended logout on reload
        // store.dispatch(logout());
      });
  };
  
  export default setupEventListeners;

