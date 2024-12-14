<template>
    <div class="app">
        <Header />
        <template v-if="status === 200">
            <router-view />
        </template>
        <Footer />
    </div>
</template>

<script>
import Header from './components/header.vue';
import Footer from './components/footer.vue';

import usePostStore from '../stores/post-store';

export default {
    setup() {
        const postStore = usePostStore();
        return { postStore };
    },
    components: {
        Header, Footer
    },
    data() {
        return {
            status: 100,
        };
    },
    provide: {
        getMarkdownInfo(v = {}) {
            return this.$http(`/markdown/${v.filename}`).then(res => {
                if (res?.status === 200) {
                    this.postStore.taffy({ filename: v.filename }).update({ status: res?.status ?? 404, markdown: res?.data });
                }
                return { ...v, status: res?.status ?? 404, markdown: res?.data };
            });
        }
    },
    mounted() {
        this.fetchManifest();
    },
    methods: {
        fetchManifest(pageInfo = {}) {
            this.$http('/manifest.json').then(res => {
                if (res?.status === 200) {
                    this.status = 200;
                    this.postStore.$patch({ manifest: res.data ?? {} })
                }
            })
        }
    },
};
</script>

<style lang="less">
html,
body {
    margin: 0;
    padding: 0;
}

.app {}
</style>