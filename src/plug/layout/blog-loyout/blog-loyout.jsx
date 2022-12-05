import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

import './blog-loyout.css';

export default function BlogLayout({ context }) {
    return (
        <Fragment>
            <header>
                <Container>
                    <figure className="logo">
                        <Link to="/">{ document.title }</Link>
                    </figure>
                    <nav className="navi">
                        <Link to="/about">关于</Link>
                    </nav>
                </Container>
            </header>
            <main>
                <Container>
                    <Outlet context={context} />
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