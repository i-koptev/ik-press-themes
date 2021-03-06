let activeEnv =
    process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

console.log(`Using environment config: '${activeEnv}'`)

require("dotenv").config({
    path: `.env.${activeEnv}`,
})

console.log(`This WordPress Endpoint is used: '${process.env.WORDPRESS_URL}'`)

module.exports = {
    plugins: [
        {
            resolve: "@i-koptev/gatsby-theme-ik-press",
            options: {
                wordPressUrl: process.env.WORDPRESS_URL,
            },
        },
        "gatsby-plugin-top-layout",
        {
            resolve: "gatsby-plugin-material-ui",
            // If you want to use styled components you should change the injection order.
            options: {
                // stylesProvider: {
                //   injectFirst: true,
                // },
            },
        },
        "gatsby-plugin-transition-link",
    ],
}
