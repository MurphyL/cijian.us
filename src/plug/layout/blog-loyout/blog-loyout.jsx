import { Fragment, useMemo } from "react";
import { Link, Outlet } from "react-router-dom";

// import Sidebar from "../../widget/sidebar";

import './blog-loyout.css';

export default function BlogLayout({ posts }) {
    // const tags = useMemo(() => posts({ kind: 'tags' }).first(), [posts]);
    // console.log(tags.items);
    return (
        <Fragment>
            <header>
                <Container>
                    <figure className="logo">
                        <Link to="/">{document.title}</Link>
                    </figure>
                    <nav className="navi">
                        <Link to="/achive">归档</Link>
                        <Link to="/about">关于</Link>
                    </nav>
                </Container>
            </header>
            <main>
                <Container>
                    <div className="stage">
                        <Outlet context={posts} />
                    </div>
                    {/* <dl className="aside">
                        <Sidebar title="标签">
                            {tags.items.map((tag, index) => (
                                <Link key={index}>{tag}</Link>
                            ))}
                        </Sidebar>
                    </dl> */}
                </Container>
            </main>
            <footer>
                <Container>
                    <div>©2012 <a href="http://murphyl.com" target="_blank">MurphyL</a>. All rights reserved.</div>
                    <div>Hosted by <a href="https://docs.github.com/en/pages" target="_blank">Github Pages</a>.</div>
                </Container>
            </footer>
        </Fragment>
    );
}


function Container({ children }) {
    return (
        <div className="container">{children}</div>
    );
}