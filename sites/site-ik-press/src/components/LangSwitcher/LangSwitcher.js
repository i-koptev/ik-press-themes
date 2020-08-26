import React from "react"
import { Link } from "gatsby"
// import TransitionLink from "gatsby-plugin-transition-link"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { useLocation } from "@reach/router"
import { makeStyles } from "@material-ui/styles"
// eslint-disable-next-line no-restricted-globals

const LangSwitcher = () => {
    const location = useLocation()
    let l = location.pathname
    let prefixedWithLocale =
        l.match(/^\/ru/) || l.match(/^\/en/) || l.match(/^\/lv/)

    const useStyles = makeStyles(theme => ({
        root: {
            marginRight: "20px",
        },
        link: {
            textDecoration: "none",
            color: "white",
            marginRight: "0.7rem",
            fontWeight: 700,
        },
    }))
    const classes = useStyles()
    return (
        <div className={classes.root}>
            {l.match(/^\/ru/) || l.match(/^\/lv/) ? (
                <AniLink
                    className={classes.link}
                    fade
                    to={
                        !prefixedWithLocale
                            ? "/en" + l
                            : l.replace(/ru|lv/i, "en")
                    }
                    duration={0.7}>
                    EN
                </AniLink>
            ) : null}

            {l.match(/^\/en/) ||
            l.match(/^\/lv/) ||
            (!l.match(/^\/ru/) && !l.match(/^\/lv/) && !l.match(/^\/en/)) ? (
                <AniLink
                    className={classes.link}
                    fade
                    to={
                        !prefixedWithLocale
                            ? "/ru" + l
                            : l.replace(/en|lv/i, "ru")
                    }
                    duration={0.7}>
                    RU
                </AniLink>
            ) : null}
            {l.match(/^\/en/) ||
            l.match(/^\/ru/) ||
            (!l.match(/^\/ru/) && !l.match(/^\/lv/) && !l.match(/^\/en/)) ? (
                <AniLink
                    className={classes.link}
                    fade
                    to={
                        !prefixedWithLocale
                            ? "/lv" + l
                            : l.replace(/en|ru/i, "lv")
                    }
                    duration={0.7}>
                    LV
                </AniLink>
            ) : null}
        </div>
    )
}

export default LangSwitcher
