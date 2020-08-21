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
    ],
}
