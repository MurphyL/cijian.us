import { Fragment, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import dayjs from 'dayjs';

export default function BlogActive() {
    const db = useOutletContext();
    const groups = useMemo(() => {
        const posts = db({ kind: 'post' }).order('publishAt').get();
        const result = {};
        if (posts) {
            posts.forEach(post => {
                const publishMonth = dayjs(post.publishAt).format('YYYY-MM')
                if (!result[publishMonth]) {
                    result[publishMonth] = [];
                }
                result[publishMonth].push(post);
            })
        }
        return result;
    }, [db]);
    return (
        <dl>
            {Object.entries(groups).map(([group, posts]) => (
                <Fragment key={group}>
                    <dt>
                        <Link to={`/posts?publishMonth=${group}`}>{group}</Link>
                    </dt>
                    <dd>
                        <ul>
                            {posts.map(post => (
                                <li key={post.filepath}>{post.title}</li>
                            ))}
                        </ul>
                    </dd>
                </Fragment>
            ))}

        </dl>
    );
}