import { useMemo } from "react";

import { useOutletContext, useParams } from 'react-router-dom';

import mingo from "mingo";

import { PostContent } from "./blog-post";

export default function MarkdownPage({ slug }) {
    const blog = useOutletContext();
    // const page = useMemo(() => db({ source: 'markdown', slug }).first(), [slug, db]);
    const page = useMemo(() => {
        const [result] = mingo.find(blog, { source: 'markdown', slug }).limit(1).all();
        return result
    }, [slug, db]);
    console.log(slug);
    return (
        <article>
            <h2>{page.title}</h2>
            <PostContent layout={page.layout} content={page.content} />
        </article>
    );
}

export function DynamicMarkdownPage() {
    const { slug } = useParams();
    return (
        <MarkdownPage slug={slug} />
    );
}