import { Fragment, useMemo } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";

export default function BlogList({ pageNum = 1 }) {
    const db = useOutletContext();
    const { posts, totalPage } = useMemo(() => {
        const pageSize = 10;
        const query = db();
        const totalElements = query.count();
        return {
            totalElements,
            totalPage: Math.ceil(totalElements / pageSize),
            posts: query.order('publishAt desc').start((pageNum - 1) * pageSize).limit(pageSize).get(),
            
        };
    }, [db, pageNum]);
    return (
        <Fragment>
            <dl data-view="blog-list">
                {posts.map(post => (
                    <Fragment key={post.filepath}>
                        <dt>
                            <Link to={`/post/${post.slug}`}>{post.title}</Link>
                        </dt>
                    </Fragment>
                ))}
            </dl>
            <div className="page-navi">
                {Array(totalPage).fill(1).map((num, index) => {
                    const current = num + index;
                    if (pageNum === current) { 
                        return (
                            <span key={index} className="page-num">{current}</span>
                        );
                    } else {
                        return (
                            <Link key={index} className="page-num" to={`/page/${current}`}>{current}</Link>
                        );
                    }
                })}
            </div>
        </Fragment>
    );
}

export function BlogPage() {
    const { num } = useParams();
    return (
        <BlogList pageNum={parseInt(num)} />
    );
}