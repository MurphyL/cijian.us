<template>
    <div>
        <h2 v-text="postInfo.title"></h2>
        <pre>
            <code v-text="postInfo.markdown"></code>
        </pre>
    </div>
</template>


<script>
import usePostStore from '@/stores/post-store';

export default {
    inject: ['getMarkdownInfo'],
    setup() {
        const postStore = usePostStore();
        return { postStore };
    },
    data() {
        return {
            postInfo: {},
        };
    },
    mounted() {
        this.getPostInfo();
    },
    methods: {
        getPostInfo() {
            const postInfo = this.postStore.taffy({ filename: this.$route.params.filename }).first();
            if (postInfo) {
                if (postInfo.markdown) {
                    this.postInfo = postInfo;
                } else {
                    this.getMarkdownInfo(postInfo).then(res => {
                        this.postInfo = res;
                    });
                }
            } else {
                this.postInfo = { status: 404, filename: this.$route.params.filename };
            }
        },
    },
}
</script>