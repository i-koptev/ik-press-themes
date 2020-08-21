import React from "react"
import { Link } from "gatsby"

const LangSwitcher = () => {
    // eslint-disable-next-line no-restricted-globals
    let l = location.pathname
    let prefixedWithLocale =
        l.match(/^\/ru/) || l.match(/^\/en/) || l.match(/^\/lv/)
    return (
        <div>
            <Link
                to={
                    !prefixedWithLocale ? "/en" + l : l.replace(/ru|lv/i, "en")
                }>
                EN
            </Link>
            <br />
            <Link
                to={
                    !prefixedWithLocale ? "/ru" + l : l.replace(/en|lv/i, "ru")
                }>
                RU
            </Link>
            <br />
            <Link
                to={
                    !prefixedWithLocale ? "/lv" + l : l.replace(/en|ru/i, "lv")
                }>
                LV
            </Link>
        </div>
    )
}

export default LangSwitcher
