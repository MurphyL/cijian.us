import axios from 'axios';

export default {
    install: (app, options) => {
        app.config.globalProperties.$http = axios.create({
            baseURL: '/assets',
            timeout: 1000,
            headers: { 'X-Custom-Header': 'foobar' }
        });
    },
};
