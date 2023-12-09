// session.js
import { store } from '@/redux/store/store';
import { logout } from '@/redux/slices/authSlice';

let logoutTimer;

const setupSessionTimeout = () => {
    // Set the session timeout duration in milliseconds (e.g., 30 minutes)
    const sessionTimeoutDuration = 20 * 60 * 1000; //20 min

    // Clear any existing timers
    clearTimeout(logoutTimer);

    // Set a new timer for session timeout
    logoutTimer = setTimeout(() => {
        // Dispatch the logout action when the session expires
        store.dispatch(logout());
        window.location.href = '/login';

    }, sessionTimeoutDuration);
};

const setupEventListeners = () => {
    // Setup event listeners for user activity
    document.addEventListener('mousemove', setupSessionTimeout());
    document.addEventListener('keypress', setupSessionTimeout());
    window.addEventListener('beforeunload', () => {
        // Clear the timer when the window is closed
        clearTimeout(logoutTimer);
    });
};

export default setupEventListeners;
