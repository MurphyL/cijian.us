import { selector, useRecoilValue } from 'recoil';



import { Routes, Route } from "react-router-dom";
import { taffy } from "taffydb";

import BlogLayout from '../plug/layout/blog-loyout/blog-loyout';

import PostList, { PostPage, PostsFilterResult } from "../view/blog-list";
import BlogPost from '../view/blog-post';

import BlogActive from '../view/blog-achive';
import MarkdownPage, { DynamicMarkdownPage } from '../view/markdown-page';


const fetchPosts = selector({
    key: 'fetch-posts',
    get: async () => {
        return fetch('/assets/posts.json').then(resp => resp.json()).then(data => {
            return { code: 200, posts: taffy(data) }
        }).catch(err => {
            return { code: 500, message: '加载数据出错：' + err.message }
        })
    }
});


export default function App() {
    const { code, posts, message } = useRecoilValue(fetchPosts);
    if (code === 200) {
        return (
            <Routes>
                <Route path="/" element={<BlogLayout posts={posts} />}>
                    <Route index={true} element={<PostList filters={{ pageNum: 1 }} pageable={true} />} />
                    <Route path="page/:num" element={<PostPage />} />
                    <Route path="post/:slug" element={<BlogPost />} />
                    <Route path="markdown/:slug" element={<DynamicMarkdownPage />} />
                    <Route path="posts" element={<PostsFilterResult />} />
                    <Route path="achive" element={<BlogActive />} />
                    <Route path="about" element={<MarkdownPage slug="about" />} />
                    <Route path="*" element={<div>404</div>} />
                </Route>
            </Routes>
        );
    } else {
        return (
            <div>加载错误 - {message}</div>
        );
    }
}

