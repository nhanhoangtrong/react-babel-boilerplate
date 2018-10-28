const storage = {
    get: (key) => {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (err) {
            return null;
        }
    },
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
};

if (__DEV__) {
    storage.set('debug', true);
}

export default storage;
