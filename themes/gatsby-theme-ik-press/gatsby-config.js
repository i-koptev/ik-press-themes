const path = require("path")

module.exports = ({ wordPressUrl }) => ({
    siteMetadata: {
        title: "IK-Press Theme",
    },
    plugins: [
        {
            resolve: `gatsby-source-wordpress-experimental`,
            options: {
                url: `${wordPressUrl}/graphql`,
                verbose: true,
                develop: {
                    nodeUpdateInterval: 1000,
                    hardCacheMediaFiles: true,
                },
                html: {
                    imageMaxWidth: 2048,
                    fallbackImageMaxWidth: 800,
                    imageQuality: 100,
                },
                type: {
                    Post: {
                        // perPage: 5, // default is 10
                        // sortFields: `slug`, // default is date
                        // sortOrder: `ASC`, // default is DESC
                        limit:
                            // process.env.NODE_ENV === `development`
                            `development` === `development`
                                ? // Lets just pull 50 posts in development to make it easy on ourselves.
                                  35
                                : // And then we can pull all posts in production
                                  null,
                    },
                },
                reports: {
                    templateRouting: true,
                },
            },
        },
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sharp",
    ],
})
