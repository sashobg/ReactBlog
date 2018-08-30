import React, {Component} from 'react';
import observer from '../../api/observer';

const DEFAULT_STATE = {
    message: null,
    success: null,
    error: null,
    loading: null
};

export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = DEFAULT_STATE;

        observer.subscribe(observer.events.notification, this.showNotification);
    }

    showNotification = data => {
        let message= data.message;
        let type = data.type;
        this.setState({ [type]: type, message: message });
    };

    hideNotification = ev => this.setState(DEFAULT_STATE);

    render = () => {
        let notificationClass;
        if (this.state.success) {
            notificationClass = 'alert alert-success alert-dismissible fade show';
        } else if (this.state.error) {
            notificationClass = 'alert alert-danger alert-dismissible fade show';
        } else if (this.state.loading) {
            notificationClass = 'alert alert-warning alert-dismissible fade show';
        }

        if (this.state.message) {
            return (<div class="alert alert-dismissible fade show" class={notificationClass} role="alert">
            {this.state.message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
                )
        } else {
            return null;
        }
    }

}