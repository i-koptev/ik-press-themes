import React from "react"
import MainLayout from "../../layouts/Main"
import BlogView from "../../views/BlogView"

const Blog = props => {
    const { pageContext } = props
    return (
        <MainLayout lang={pageContext.lang}>
            <BlogView {...props} />
        </MainLayout>
    )
}

export default Blog
