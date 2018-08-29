let subscriptions = {
    'loginUser': [],
    'loggedOut': [],
    'notification': [],
    'redirect': []
};

export default {
    events: {
        loginUser: 'loginUser',
        notification: 'notification',
        loggedOut: 'loggedOut',
        redirect: 'redirect',
    },
    subscribe: (eventName, fn) =>
        subscriptions[eventName].push(fn),
    trigger: (eventName, data) =>
        subscriptions[eventName].forEach(fn => fn(data))
}