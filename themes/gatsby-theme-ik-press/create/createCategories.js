const { resolve } = require(`path`)
const chunk = require(`lodash/chunk`)
const { dd } = require("dumper.js")
const { dump } = require("dumper.js")
const { test } = require("../data.js")

module.exports = async ({ actions, graphql }, options) => {
    const {
        perPage,
        allLanguages,
        defaultLanguage,
        defaultLanguageLocale,
        locales,
        languageHash,
        categoryHash,
    } = options

    const {
        data: {
            allWpCategory: { nodes: allCategoryDefaultLang },
            allWpPost: { nodes: allPosts },
        },
    } = await graphql(/* GraphQL */ `
    query allDefaultLangCategory {
        allWpCategory(
            filter: { language: { locale: { eq: "${defaultLanguageLocale}" } } }
            ) {
                nodes {
                    id
                    name
                    uri
                    translations {
                        name
                        id
                        uri
                        language {
                            locale
                            slug
                        }
                    }
                }
            }
            allWpPost(
                sort: { fields: modifiedGmt, order: DESC }
                filter: { language: { locale: { eq: "${defaultLanguageLocale}" } } }
                ) {
                    nodes {
                        id
                        uri
                        categories {
                            nodes {
                                uri
                            }
                        }
                    }
                }
            }
            `)

    const getPostIdsByCategoryUri = (categoryUri, lang = defaultLanguage) => {
        if (lang === defaultLanguage) {
            return allPosts
                .filter(post =>
                    post.categories.nodes.some(item => item.uri === categoryUri)
                )
                .map(item => item.id)
        } else {
            return allPosts
                .filter(post =>
                    post.categories.nodes.some(item => item.uri === categoryUri)
                )
                .map(item => languageHash[locales[language]][item.id])
        }
    }

    const allCategoryUris = []
    allCategoryDefaultLang.forEach(categoryItem => {
        allCategoryUris.push({ uri: categoryItem.uri, name: categoryItem.name })

        categoryItem.translations.forEach(translation => {
            categoryHash[translation.language.locale][categoryItem.name] =
                translation.name
        })
    })

    // for (categoryUri of allCategoryUris) {
    //     dump(categoryUri)
    //     dump(getPostIdsByCategoryUri(categoryUri, "ru"))
    // }

    // dd(getPostIdsByCategoryUri("#########################"))

    await Promise.all(
        // create a page with a list of all categories for all languages
        allLanguages.map(async language => {
            if (language === defaultLanguage) {
                const allCategoryContext = allCategoryDefaultLang.map(item => {
                    return {
                        uri: item.uri,
                        name: item.name,
                    }
                })
                const allCategoryContextDefaultLang = allCategoryDefaultLang.map(
                    item => {
                        return {
                            uri: `/${language}${item.uri}`,
                            name: item.name,
                        }
                    }
                )

                await actions.createPage({
                    component: resolve(
                        `src/templates/Categories/Categories.js`
                    ),
                    path: `category/`,
                    context: {
                        lang: `${language}`,
                        categories: allCategoryContext,
                    },
                })
                await actions.createPage({
                    component: resolve(
                        `src/templates/Categories/Categories.js`
                    ),
                    path: `${language}/category/`,
                    context: {
                        lang: `${language}`,
                        categories: allCategoryContextDefaultLang,
                    },
                })
            } else {
                const allCategoryContextLang = allCategoryDefaultLang.map(
                    item => {
                        return {
                            uri: `/${language}${item.uri}`,
                            name: categoryHash[locales[language]][item.name],
                        }
                    }
                )

                await actions.createPage({
                    component: resolve(
                        `src/templates/Categories/Categories.js`
                    ),
                    path: `${language}/category/`,
                    context: {
                        lang: `${language}`,
                        categories: allCategoryContextLang,
                    },
                })
            }
        })
    )

    await Promise.all(
        // create a page with a list of all categories for all languages
        allCategoryUris.map(async categoryUri => {
            for (language of allLanguages) {
                if (language === defaultLanguage) {
                    const categoryPosts = getPostIdsByCategoryUri(
                        categoryUri.uri,
                        language
                    )
                    await actions.createPage({
                        component: resolve(
                            `src/templates/Categories/Categories.js`
                        ),
                        path: categoryUri.uri,
                        context: {
                            name: categoryUri.name,
                            lang: `${language}`,
                            posts: categoryPosts,
                        },
                    })

                    await actions.createPage({
                        component: resolve(
                            `src/templates/Categories/Categories.js`
                        ),
                        path: `${language}${categoryUri.uri}`,
                        context: {
                            name: categoryUri.name,
                            lang: `${language}`,
                            posts: categoryPosts,
                        },
                    })
                } else {
                    // if not defaultLanguage
                    const categoryPosts = getPostIdsByCategoryUri(
                        categoryUri.uri,
                        language
                    )

                    await actions.createPage({
                        component: resolve(
                            `src/templates/Categories/Categories.js`
                        ),
                        path: `${language}${categoryUri.uri}`,
                        context: {
                            name:
                                categoryHash[locales[language]][
                                    categoryUri.name
                                ],
                            lang: `${language}`,
                            posts: categoryPosts,
                        },
                    })
                }
            }
        })
    )
}
