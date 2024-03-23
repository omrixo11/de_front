// session.js
import { store } from '@/redux/store/store';
import { logout } from '@/redux/slices/authSlice';

let logoutTimer;

const setLastActivityTimestamp = () => {
    const timestamp = new Date().getTime();
    localStorage.setItem('lastActivityTimestamp', timestamp.toString());
};

const getLastActivityTimestamp = () => {
    const timestamp = localStorage.getItem('lastActivityTimestamp');
    return timestamp ? parseInt(timestamp, 10) : null;
};

const checkForInactivity = () => {
    const lastActivityTimestamp = getLastActivityTimestamp();
    const currentTime = new Date().getTime();
    const maxInactivityTime = 30 * 60 * 1000; 

    if (lastActivityTimestamp && (currentTime - lastActivityTimestamp > maxInactivityTime)) {
        // User has been inactive longer than the allowed period, log them out
        if (!window.location.pathname.startsWith('/login')) { // Check if not already on the login page
            store.dispatch(logout());
            window.location.href = '/login';
        }
    } else {
        // User has not exceeded inactivity time, reset the timer
        const remainingTime = maxInactivityTime - (currentTime - lastActivityTimestamp);
        resetLogoutTimer(remainingTime);
    }
};

const resetLogoutTimer = (timeoutDuration = 30 * 60 * 1000) => {
    //  const resetLogoutTimer = (timeoutDuration = 5 * 1000) => { 
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
        store.dispatch(logout());
        clearTimeout(logoutTimer); 
        window.location.href = '/login';
    }, timeoutDuration);
    setLastActivityTimestamp();
};

const setupSessionTimeout = () => {
    resetLogoutTimer();
    setLastActivityTimestamp();
};

const setupEventListeners = () => {
    // Example for adding and removing event listeners properly
    const resetTimer = () => {

        resetLogoutTimer();
    };

    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('keypress', resetTimer);

    window.addEventListener('beforeunload', () => {
        // Perform cleanup or dispatch logout action here
        localStorage.removeItem('authToken');
        localStorage.removeItem('lastActivityTimestamp');
        // navigator.sendBeacon('/logout');
        // store.dispatch(logout());
        
    });
    // Cleanup event listeners on logout or component unmount
    return () => {
        document.removeEventListener('mousemove', resetTimer);
        document.removeEventListener('keypress', resetTimer);
    };
};

export default setupEventListeners;
