import React from "react"
// import { Link as GatsbyLink } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"
// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
const UniversalLink = ({
    children,
    to,
    activeClassName,
    partiallyActive,
    ...other
}) => {
    // Tailor the following test to your environment.
    // This example assumes that any internal link (intended for Gatsby)
    // will start with exactly one slash, and that anything else is external.
    const internal = /^\/(?!\/)/.test(to)
    // Use Gatsby Link for internal links, and <a> for others
    if (internal) {
        return (
            // <GatsbyLink
            <AniLink
                fade
                duration={0.5}
                to={to}
                activeClassName={activeClassName}
                partiallyActive={partiallyActive}
                {...other}>
                {children}
            </AniLink>
            // </GatsbyLink>
        )
    }
    return (
        <a href={to} {...other} target="_blank" rel="noopener noreferrer">
            {children}
        </a>
    )
}
export default UniversalLink
