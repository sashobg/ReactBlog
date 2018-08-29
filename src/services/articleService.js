import requester from '../api/requester';
import observer from '../api/observer';

export default {
    create: {
        send: data => requester.post('appdata', 'articles', 'kinvey', data),
        success: function (res) {
            console.log(res);
            observer.trigger(observer.events.notification, {type: 'success', message: "Success."});
            observer.trigger(observer.events.redirect, '/blog')
        },
        fail: res => {
            observer.trigger(observer.events.notification, {
                type: 'error',
                message: res.responseJSON.description
            });
            console.log('Failed to submit article.');
        }
    },
    edit: {
        send: data => requester.update('appdata', 'articles/' + data.id, 'kinvey', data),
        success: function (res) {
            console.log(res);
            observer.trigger(observer.events.notification, {type: 'success', message: "Success."});
            observer.trigger(observer.events.redirect, '/MyArticles');
        },
        fail: res => {
            observer.trigger(observer.events.notification, {
                type: 'error',
                message: res.responseJSON.description
            });
            console.log('Failed to edit article.');
        }
    },
    delete: {
        send: data => requester.remove('appdata', 'articles/' + data.id, 'delete'),
        success: function (res) {
            console.log(res);
            observer.trigger(observer.events.notification, {type: 'success', message: "Success."});
            observer.trigger(observer.events.redirect, '/blog');
        },
        fail: res => {
            observer.trigger(observer.events.notification, {
                type: 'error',
                message: res.responseJSON.description
            });
            console.log('Failed to delete article.');
        }
    },

    createdBeforeDays: createdOnString => {
        function pluralize(value) {
            if (value !== 1) return 's';
            else return '';
        }

        let dateIsoFormat = createdOnString;

        let diff = new Date() - (new Date(dateIsoFormat));
        diff = Math.floor(diff / 60000);
        if (diff < 1) return 'less than a minute';
        if (diff < 60) return diff + ' minute' + pluralize(diff);
        diff = Math.floor(diff / 60);
        if (diff < 24) return diff + ' hour' + pluralize(diff);
        diff = Math.floor(diff / 24);
        if (diff < 30) return diff + ' day' + pluralize(diff);
        diff = Math.floor(diff / 30);
        if (diff < 12) return diff + ' month' + pluralize(diff);
        diff = Math.floor(diff / 12);
        return diff + ' year' + pluralize(diff);
    },
    getById: id =>
        requester.get('appdata', 'articles', 'kinvey', {id})
}