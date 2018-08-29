import requester from '../api/requester';
import observer from '../api/observer';

export default {
    login: {
        send: data => requester.post('user', 'login', 'basic', data),
        success: function(res) {
            console.log(res);
            sessionStorage.setItem('username', res.username);
            sessionStorage.setItem('authtoken', res._kmd.authtoken);
            sessionStorage.setItem('userRole', res.Roles);
            observer.trigger(observer.events.loginUser, res.username);
            observer.trigger(observer.events.notification, { type: 'success', message: "Success." });
        },
        fail: res => {
            observer.trigger(observer.events.notification, {
                type: 'error',
                message: res.responseJSON.description
            });
            console.log('Failed to login.');
            this.setState({ username: '', password: '' });
        }
    },
    register: {
        send: data => requester.post('user', '', 'basic', data),
        success: function(res) {
            observer.trigger(observer.events.loginUser, res.username);
            sessionStorage.setItem('username', res.username);
            sessionStorage.setItem('authtoken', res._kmd.authtoken);
            sessionStorage.setItem('userRoles', res.Roles.join(','))
        },
        fail: function(res) {
            observer.trigger(observer.events.notification, {
                type: 'error',
                message: res.responseJSON.description
            });
            console.log('failed to register');
            this.setState({ username: '', password: '' });
        }
    },
    delete:{
        send: data => requester.remove('user', data, 'delete'),
        success: function() {
            observer.trigger(observer.events.notification, { type: 'success', message: "Success." });
        },
        fail: function(res) {
            observer.trigger(observer.events.notification, {
                type: 'error',
                message: res.responseJSON.description
            });
            console.log('failed to delete the user');
        }
    },
    getByUsername: username =>
        requester.get('user', '', 'kinvey', { username })
}