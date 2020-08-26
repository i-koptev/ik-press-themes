import React from "react"
import MainLayout from "../../layouts/Main"
import BlogView from "../../views/BlogView"

const Blog = ({ pageContext }) => {
    return (
        <MainLayout lang={pageContext.lang}>
            <BlogView pageContext={pageContext} />
        </MainLayout>
    )
}

export default Blog
