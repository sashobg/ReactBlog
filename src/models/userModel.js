export default {
    defaultState: {
        username: '',
        password: '',
    },
    validate: data => {
        const {username, password} = data;

        if (!username) {
            return "Username is required";
        }
        if (!password) {
            return "Password is required.";
        }
    }
};