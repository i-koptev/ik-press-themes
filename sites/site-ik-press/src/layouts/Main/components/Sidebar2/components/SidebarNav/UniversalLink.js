import React from "react"
import { Link } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"
// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    root: {
        // padding: "10px 8px",
        // width: "100%",
        // textDecoration: "none",
        color: theme.layouts.Main.SidebarNav.MenuItem.fontColor,
        "&:hover": {
            // color: theme.layouts.Main.SidebarNav.MenuItem.hoverFontColor,
            // fontWeight: theme.layouts.Main.SidebarNav.MenuItem.hoverFontWeight,
        },
    },
}))

const UniversalLink = ({
    className,
    children,
    to,
    activeClassName,
    partiallyActive,
    ...other
}) => {
    const classes = useStyles()
    // Tailor the following test to your environment.
    // This example assumes that any internal link (intended for Gatsby)
    // will start with exactly one slash, and that anything else is external.
    const internal = /^\/(?!\/)/.test(to)
    // Use Gatsby Link for internal links, and <a> for others
    if (internal) {
        return (
            // <GatsbyLink
            <AniLink
                className={clsx(classes.root, className)}
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
