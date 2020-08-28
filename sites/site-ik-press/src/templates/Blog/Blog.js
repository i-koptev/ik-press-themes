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

export const blogByChunkPosts = graphql`
    query logByChunkPosts($chunkPosts: [String] = "") {
        allWpPost(filter: { id: { in: $chunkPosts } }) {
            nodes {
                id
                title
                excerpt
                content
            }
        }
    }
`
