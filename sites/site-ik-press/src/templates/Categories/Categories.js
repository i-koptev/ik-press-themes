import React from "react"
import { graphql } from "gatsby"

import MainLayout from "../../layouts/Main"
import PostView from "../../views/PostView"

const Categories = props => {
    const { pageContext } = props
    return (
        <MainLayout lang={pageContext.lang}>
            {/* <PostView {...props} /> */}
            <div>
                <pre>{JSON.stringify(pageContext, null, 4)}</pre>
            </div>
        </MainLayout>
    )
}

export default Categories
