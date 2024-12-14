<template>
    <div class="posts-list">
        <div class="post-summary" v-for="post in posts">
            <router-link :to="{ name: 'blog-post', params: { filename: post.filename } }">
                <h2 v-text="post.title"></h2>
            </router-link>
        </div>
    </div>
</template>

<script>
import usePostStore from '@/stores/post-store';

export default {
    inject: [ 'getMarkdownInfo'],
    setup() {
        const postStore = usePostStore();
        return { postStore };
    },
    data() {
        return { posts: [] };
    },
    mounted() {
        this.queryPosts();
    },
    methods: {
        queryPosts(pageInfo = {}) {
            this.posts = [];
            const requests = this.postStore.taffy({ kind: 'post' }).order('publishAt desc').start(pageInfo.start ?? 0).limit(pageInfo.limit ?? 10).map((v) => {
                if (v.markdown) {
                    return Promise.resolve(v);
                } else {
                    return this.getMarkdownInfo(v);
                }
            });
            Promise.all(requests).then(res => {
                this.posts = res ?? [];
                console.log(this.posts);
            })
        },
    },
};

</script>