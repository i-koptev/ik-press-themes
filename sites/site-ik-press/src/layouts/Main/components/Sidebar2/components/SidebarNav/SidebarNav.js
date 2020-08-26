/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import clsx from "clsx"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/styles"
import { List, ListItem, Button } from "@material-ui/core"

import MenuItem from "./MenuItem"

const SIDEBAR2_MENU_QUERY = graphql`
    fragment MenuFields on WpMenuItem {
        id
        parentId
        label
        url
        connectedNode {
            node {
                __typename
            }
        }
    }

    query GETSIDEBAR2MAINMENU {
        allWpMenuItem(filter: { locations: { eq: PRIMARY } }) {
            nodes {
                ...MenuFields
            }
        }
        wp {
            generalSettings {
                url
            }
        }
    }
`

const useStyles = makeStyles(theme => ({
    root: {},
    item: {
        display: "flex",
        paddingTop: 0,
        paddingBottom: 0,
        "&:hover": {
            // backgroundColor: "#fee",
        },
    },
    button: {
        display: "flex",
        color: theme.layouts.Main.SidebarNav.MenuItem.fontColor,
        padding: "10px 8px",
        justifyContent: "flex-start",
        textTransform: "none",
        letterSpacing: 0.7,
        width: "100%",
        fontWeight: theme.typography.fontWeightMedium,
        textDecoration: "none",
        "&:hover": {
            backgroundColor:
                theme.layouts.Main.SidebarNav.MenuItem.hoverBackgroundColor,
        },
        "& svg": {
            color: theme.layouts.Main.SidebarNav.MenuItem.iconColor,
            width: "18px",
            height: "18px",
            transform: "translateY(4px)",
            marginRight: "12px",
        },
    },
    active: {
        color: theme.layouts.Main.SidebarNav.MenuItem.activeFontColor,
        fontWeight: theme.layouts.Main.SidebarNav.MenuItem.activeFontWeight,
        "&:hover": {
            color: theme.layouts.Main.SidebarNav.MenuItem.hoverActiveFontColor,
        },
    },
}))

const IkLink = props => (
    <div style={{ flexGrow: 1 }}>
        <Link {...props} />
    </div>
)

const SidebarNav = props => {
    const { lang, className, ...rest } = props

    const classes = useStyles()

    return (
        <StaticQuery
            query={SIDEBAR2_MENU_QUERY}
            render={data => {
                const notHierarchicalMenu =
                    data.allWpMenuItem && data.allWpMenuItem.nodes
                        ? data.allWpMenuItem.nodes
                        : null

                if (notHierarchicalMenu) {
                    const wordPressUrl = data.wp.generalSettings.url

                    return (
                        <List
                            {...rest}
                            className={clsx(classes.root, className)}>
                            {notHierarchicalMenu.map(node => (
                                <ListItem
                                    className={classes.item}
                                    disableGutters
                                    // key={page.title}>
                                    key={node.id}>
                                    <Button
                                        style={{
                                            width: "100%",
                                            padding: 0,
                                        }}>
                                        <MenuItem
                                            className={classes.button}
                                            activeClassName={classes.active}
                                            menuItem={node}
                                            wordPressUrl={wordPressUrl}
                                            lang={lang}
                                        />
                                    </Button>
                                    {/* <div className={classes.icon}>
                                            {page.icon}
                                        </div> */}
                                    {/* {page.title} */}
                                    {/* {node.label} */}
                                    {/* </Button> */}
                                </ListItem>
                            ))}
                        </List>
                    )
                } else {
                    return null
                }
            }}
        />
    )
}

SidebarNav.propTypes = {
    className: PropTypes.string,
    pages: PropTypes.array.isRequired,
}

export default SidebarNav
