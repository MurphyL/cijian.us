import { createElement, useMemo } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';

import dayjs from 'dayjs';

import Markdown from 'react-markdown';

export default function BlogPost() {
    const { slug } = useParams();
    const db = useOutletContext();
    const { post } = useMemo(() => {
        const result = db({ kind: 'post', slug }).first();
        if (!result) {
            return { post: false };
        }
        const tags = result.tags;
        const x = db({ kind: 'post', slug: { '!is': slug } }, tags.map(tag => ({ tags: { has: tag } }))).limit(5).get()
        console.log(tags, x);
        return { post: result };
    }, [slug, db]);
    if (post) {
        return (
            <article className={post.layout || 'post'} data-filename={post.filepath}>
                <h2>{post.title}</h2>
                <div className="post-meta">
                    <DateLinks value={post.publishAt} />
                    <ul>
                        {(post.tags || []).map((tag, index) => (
                            <li key={index}>
                                <Link to={`/posts?tags=${tag}`}>{tag}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
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

export function DateLinks({ value = '' }) {
    const [year, month, date] = useMemo(() => {
        const parsed = dayjs(value);
        const year = parsed.format('YYYY')
        const month = parsed.format('MM')
        const date = parsed.format('DD')
        return [
            createElement(Link, {to: `/posts?publishYear=${year}`}, year), 
            createElement(Link, {to: `/posts?publishMonth=${year}-${month}`}, month), 
            createElement(Link, {to: `/posts?publishYear=${value}`}, date), 
        ]
    }, [value]);
    return (
        <div>
            {year}
            <span>-</span>
            {month}
            <span>-</span>
            {date}
        </div>
    );
}