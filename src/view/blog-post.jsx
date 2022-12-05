import { useMemo } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

import Markdown from 'react-markdown';

export default function BlogPost() {
    const { slug } = useParams();
    const db = useOutletContext();
    const post = useMemo(() => db({ slug }).first(), [slug, db]);
    if (post) {
        return (
            <article className={post.layout || 'post'} data-filename={post.filepath}>
                <h2>{post.title}</h2>
                <PostContent layout={post.layout} content={post.content} />
            </article>
        );
    } else {
        return (
            <div>404</div>
        );
    }

}

export function PostContent({ layout, content }) {
    switch (layout) {
        case 'poem':
            return (
                <pre className="content">
                    <Markdown>{content}</Markdown>
                </pre>
            );
        default:
            return (
                <section className="content">
                    <Markdown>{content}</Markdown>
                </section>
            );
    }

}