export default {
    defaultState: {
        title: '',
        author: '',
        description: '',
        imageUrl: '',
        content: '',
        category: '',
        id: ''
    },
    validate: data => {
        const {title, content} = data;

        if (!title) {
            return "Title is required";
        }
        if (!content) {
            return "Description is required.";
        }
        
        if (!content) {
            return "Content is required.";
        }
    }
};