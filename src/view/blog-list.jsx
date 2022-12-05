import { Fragment, useMemo } from "react";
import { Link, useOutletContext, useParams, useSearchParams } from "react-router-dom";

export default function BlogList({ filters, pageable = false }) {
    const db = useOutletContext();
    const { posts, totalPage, currentPage } = useMemo(() => {
        const pageSize = 10;
        const { pageNum, ...queryParams } = filters;
        const query = db(queryParams);
        const totalElements = query.count();
        return {
            totalElements,
            currentPage: pageNum,
            totalPage: Math.ceil(totalElements / pageSize),
            posts: query.order('publishAt desc').start((pageNum - 1) * pageSize).limit(pageSize).get(),

        };
    }, [db, filters]);
    return (
        <Fragment>
            <dl className="posts-list">
                {posts.map(post => (
                    <Fragment key={post.filepath}>
                        <dt>
                            <Link to={`/post/${post.slug}`}>{post.title}</Link>
                        </dt>
                    </Fragment>
                ))}
            </dl>
            {pageable ? (
                <nav className="page-navi">
                    {Array(totalPage).fill(1).map((num, index) => {
                        const current = num + index;
                        if (currentPage === current) {
                            return (
                                <span key={index} className="page-num">{current}</span>
                            );
                        } else {
                            return (
                                <Link key={index} className="page-num" to={`/page/${current}`}>{current}</Link>
                            );
                        }
                    })}
                </nav>
            ) : null}
        </Fragment>
    );
}

export function PostPage() {
    const { num } = useParams();
    const db = useOutletContext();
    return (
        <BlogList filters={{ pageNum: parseInt(num) }} pageable={true} />
    );
}

export function PostsFilterResult() {
    const [searchParams] = useSearchParams();
    const filters = useMemo(() => {
        const result = Object.fromEntries(Array.from(searchParams.entries()));
        if (result.tags) {
            result.tags = { has: result.tags };
        }
        if (result.publishMonth) {
            result.publishAt = { left: result.publishMonth };
            delete result.publishMonth;
        }
        if (result.publishYear) {
            result.publishAt = { left: result.publishYear };
            delete result.publishYear;
        }
        return result;
    }, [searchParams]);
    return (
        <BlogList filters={filters} />
    );
}