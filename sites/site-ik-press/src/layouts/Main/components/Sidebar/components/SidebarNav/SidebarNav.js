/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef } from "react"
import { StaticQuery, graphql } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"

import clsx from "clsx"
import PropTypes from "prop-types"

import {
    makeStyles,
    styled,
    withTheme,
    useTheme,
} from "@material-ui/core/styles"
import { colors } from "@material-ui/core"
import ListSubheader from "@material-ui/core/ListSubheader"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Collapse from "@material-ui/core/Collapse"
import InboxIcon from "@material-ui/icons/MoveToInbox"
import DraftsIcon from "@material-ui/icons/Drafts"
import SendIcon from "@material-ui/icons/Send"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import StarBorder from "@material-ui/icons/StarBorder"

import MenuItem from "./MenuItem"

const SIDEBAR_MENU_QUERY = graphql`
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

    query GETSIDEBARMAINMENU {
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
        color:
            theme.layouts.Main.SidebarNav.MenuItem.clickRippleBackgroundColor,
        padding: 0,
        paddingLeft: "5px",
        justifyContent: "flex-start",
        textTransform: "none",
        letterSpacing: 0,
        width: "100%",
        // fontWeight: theme.typography.fontWeightMedium,
        fontWeight: 500,
        "&:hover": {
            backgroundColor:
                theme.layouts.Main.SidebarNav.MenuItem.hoverBackgroundColor,
            fontWeight: 900,
        },
    },

    icon: {
        // color: theme.palette.icon,
        color: theme.layouts.Main.SidebarNav.MenuItem.iconColor,
        width: 24,
        height: 24,
        display: "flex",
        alignItems: "center",
        marginRight: theme.spacing(1),
    },
    active: {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
        "& $icon": {
            color: theme.palette.primary.main,
        },
    },
}))

const CustomAniLink = forwardRef((props, ref) => (
    <div ref={ref} style={{ flexGrow: 1 }}>
        <AniLink {...props} />
    </div>
))

//** ==========================================================================
//* Jason Bahl's function --> https://docs.wpgraphql.com/getting-started/menus/
//** ==========================================================================

const flatListToHierarchical = (
    data = [],
    { idKey = "id", parentKey = "parentId", childrenKey = "children" } = {}
) => {
    const tree = []
    const childrenOf = {}
    data.forEach(item => {
        const newItem = { ...item }
        const { [idKey]: id, [parentKey]: parentId = 0 } = newItem
        childrenOf[id] = childrenOf[id] || []
        newItem[childrenKey] = childrenOf[id]
        parentId
            ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
            : tree.push(newItem)
    })
    return tree
}

const SidebarNav = props => {
    const { lang, pages, className, ...rest } = props

    const classes = useStyles()

    const renderMenuItem = (menuItem, wordPressUrl, lang) => {
        if (menuItem.children && menuItem.children.length) {
            return renderSubMenu(menuItem, wordPressUrl, lang)
        } else {
            return (
                <ListItem
                    className={classes.item}
                    button
                    // disableGutters
                    key={menuItem.id}>
                    <DraftsIcon className={classes.icon} />

                    <MenuItem
                        style={{ flexGrow: 1 }}
                        menuItem={menuItem}
                        wordPressUrl={wordPressUrl}
                        lang={lang}
                    />
                </ListItem>
            )
        }
    }
    const renderSubMenu = (menuItem, wordPressUrl, lang) => {
        return (
            <>
                <ListItem
                    className={classes.item}
                    button
                    disableGutters
                    key={menuItem.id}>
                    <div className={classes.icon}>rertet</div>
                    <MenuItem
                        style={{ flexGrow: 1 }}
                        menuItem={menuItem}
                        wordPressUrl={wordPressUrl}
                        lang={lang}
                    />
                </ListItem>
                <ListItem
                    className={classes.item}
                    button
                    disableGutters
                    key={menuItem.id}>
                    {menuItem.children.map(item =>
                        renderMenuItem(item, wordPressUrl, lang)
                    )}
                </ListItem>
            </>
        )
    }

    return (
        <StaticQuery
            query={SIDEBAR_MENU_QUERY}
            render={data => {
                const hierarchicalMenu =
                    data.allWpMenuItem && data.allWpMenuItem.nodes
                        ? flatListToHierarchical(data.allWpMenuItem.nodes)
                        : null

                if (hierarchicalMenu) {
                    const wordPressUrl = data.wp.generalSettings.url
                    return (
                        <List
                            component="nav"
                            {...rest}
                            className={clsx(classes.root, className)}>
                            <pre>
                                {JSON.stringify(hierarchicalMenu, null, 2)}
                            </pre>
                            {/* {pages.map(page => ( */}
                            {hierarchicalMenu.map(menuItem => {
                                if (menuItem.children.length) {
                                    return renderSubMenu(
                                        menuItem,
                                        wordPressUrl,
                                        lang
                                    )
                                } else {
                                    return renderMenuItem(
                                        menuItem,
                                        wordPressUrl,
                                        lang
                                    )
                                }

                                // <ListItem
                                //     className={classes.item}
                                //     disableGutters
                                //     key={menuItem.id}>
                                //     <Button
                                //         activeClassName={classes.active}
                                //         className={classes.button}
                                //         component={CustomAniLink}
                                //         to={menuItem.url}>
                                //         <div className={classes.icon}>
                                //             {/* {page.icon} */}
                                //         </div>
                                //         {menuItem.label}
                                //     </Button>
                                // </ListItem>
                            })}
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
