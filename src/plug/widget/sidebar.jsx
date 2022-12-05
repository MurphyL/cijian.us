import { Fragment } from "react";

export default function Sidebar({ title, children }) {
    return (
        <Fragment>
            <dt>{ title }</dt>
            <dd>{ children }</dd>
        </Fragment>
    )
}