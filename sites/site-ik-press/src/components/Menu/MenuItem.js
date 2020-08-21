import React from "react"
import CreateLocalLink from "./CreateLocalLink"
import UniversalLink from "./UniversalLink"

const MenuItem = ({ menuItem, wordPressUrl, lang }) => {
    let label = null
    switch (lang) {
        case "ru":
            switch (menuItem.label) {
                case "Post 1":
                    label = "Статья 1"
                    break
                case "Post 2":
                    label = "Статья 2"
                    break
                case "Post 3":
                    label = "Статья 3"
                    break
                case "Products":
                    label = "Продукты"
                    break
                case "About Us":
                    label = "О нас"
                    break
            }
            break
        case "lv":
            switch (menuItem.label) {
                case "Post 1":
                    label = "Raksts 1"
                    break
                case "Post 2":
                    label = "Raksts 2"
                    break
                case "Post 3":
                    label = "Raksts 3"
                    break
                case "Products":
                    label = "Produkti"
                    break
                case "About Us":
                    label = "Par mums"
                    break
            }
            break
        default:
            label = menuItem.label
    }

    return (
        <UniversalLink
            activeClassName="active"
            activeStyle={{ color: "red" }}
            style={{ marginRight: "20px" }}
            to={CreateLocalLink(menuItem, wordPressUrl, lang)}
        >
            {/* {menuItem.label} */}
            {label}
        </UniversalLink>
    )
}

export default MenuItem
