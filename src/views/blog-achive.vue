<template>
    <div>
        <dl>
        <template v-for="(group, month) in achive">
            <dt>{{ month }}</dt>
            <dd>
                <ul>
                    <li v-for="post in group">
                        <router-link :to="{name: 'blog-post', params: { filename: post.filename }}">{{ post.title }}</router-link>
                    </li>
                </ul>
            </dd>
        </template>
    </dl>
    </div>
</template>


<script>
import { groupBy } from 'lodash';
import usePostStore from '@/stores/post-store';

export default {
    inject: ['getMarkdownInfo'],
    setup() {
        const postStore = usePostStore();
        return { postStore };
    },
    data() {
        return {
            achive: [],
        }
    },
    mounted() {
        this.makeAchiveData();
    },
    methods: {
        makeAchiveData() {
            this.achive = groupBy(this.postStore.taffy({ kind: 'post' }).get(), (v) => {
                return v.filename.substring(0, 7);
            });
        },
    },
}
</script>