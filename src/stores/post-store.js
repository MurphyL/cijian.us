import { defineStore } from 'pinia';

import { taffy } from 'taffydb';

export default defineStore('posts-holder', {
    state() {
        return {
            manifest: [],
        };
    },
    getters: {
        taffy() {
            return taffy(this.manifest);
        },
    },
});