import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { useTheme } from "@material-ui/core/styles"
import { List, ListItem, Button, colors } from "@material-ui/core"
import SettingsIcon from "@material-ui/icons/Settings"
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks"

import CreateLocalLink from "./CreateLocalLink"
import UniversalLink from "./UniversalLink"

const MenuItem = props => {
    const { menuItem, wordPressUrl, lang, activeClassName, className } = props
    const titleLanguagesHash = {
        ru: {},
        lv: {},
    }

    const data = useStaticQuery(graphql`
        {
            allWpPage(filter: { language: { locale: { eq: "en_US" } } }) {
                nodes {
                    title
                    translations {
                        title
                        language {
                            slug
                        }
                    }
                }
            }
            allWpPost(filter: { language: { locale: { eq: "en_US" } } }) {
                nodes {
                    title
                    translations {
                        title
                        language {
                            slug
                        }
                    }
                }
            }
        }
    `)
    const {
        allWpPage: { nodes: allPages },
    } = data
    const {
        allWpPost: { nodes: allPosts },
    } = data

    allPages.forEach(page => {
        page.translations.forEach(translation => {
            titleLanguagesHash[translation.language.slug][page.title] =
                translation.title
        })
    })
    allPosts.forEach(post => {
        post.translations.forEach(translation => {
            titleLanguagesHash[translation.language.slug][post.title] =
                translation.title
        })
    })

    const titleToLocaleTitle = (lang, menuItem) =>
        titleLanguagesHash[lang][menuItem.label]

    let label = null
    label = lang === "en" ? menuItem.label : titleToLocaleTitle(lang, menuItem)

    const theme = useTheme()
    return (
        <div style={{ flexGrow: 1, display: "flex" }}>
            <UniversalLink
                // {...props}
                className={className}
                activeClassName={activeClassName}
                to={CreateLocalLink(menuItem, wordPressUrl, lang)}>
                {/* <SettingsIcon */}
                <LibraryBooksIcon />
                {label}
            </UniversalLink>
        </div>
    )
}

export default MenuItem
