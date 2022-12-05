import { useMemo } from "react";

import { useOutletContext, useParams } from 'react-router-dom';

import { PostContent } from "./blog-post";

export default function MarkdownPage({ slug }) {
    const db = useOutletContext();
    const page = useMemo(() => db({ slug }).first(), [slug, db]);
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