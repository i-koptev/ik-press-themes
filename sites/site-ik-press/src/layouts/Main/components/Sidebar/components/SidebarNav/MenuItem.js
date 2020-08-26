import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useTheme } from "@material-ui/core/styles"
import CreateLocalLink from "./CreateLocalLink"
import UniversalLink from "./UniversalLink"

const MenuItem = ({ menuItem, wordPressUrl, lang }) => {
    const titleLanguagesHash = {
        ru: {},
        lv: {},
    }
    // const titleLanguagesHash = {
    //     ru: {
    //         "Post 1": "Статья1",
    //         "Post 2": "Статья 2",
    //         "Post 3": "Статья 3",
    //         Products: "Продукты",
    //         "About Us": "О Нас",
    //     },
    //     lv: {
    //         "Post 1": "Raksts 1",
    //         "Post 2": "Raksts 2",
    //         "Post 3": "Raksts 3",
    //         Products: "Produkti",
    //         "About Us": "Par Mums",
    //     },
    // }

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
        <UniversalLink
            activeClassName="active"
            activeStyle={{
                color: theme.layouts.Main.SidebarNav.MenuItem.activeFontColor,
                fontWeight:
                    theme.layouts.Main.SidebarNav.MenuItem.activeFontWeight,
            }}
            to={CreateLocalLink(menuItem, wordPressUrl, lang)}>
            {/* {menuItem.label} */}
            {label}
        </UniversalLink>
    )
}

export default MenuItem
