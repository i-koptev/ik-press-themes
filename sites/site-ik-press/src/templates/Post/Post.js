import React from "react"
import MainLayout from "../../layouts/Main"
import PostView from "../../views/PostView"

const Post = props => {
    const { pageContext } = props
    return (
        <MainLayout lang={pageContext.lang}>
            <PostView {...props} />
        </MainLayout>
    )
}

export default Post

export const postById = graphql`
    query postByID($id: String!, $previousPostId: String, $nextPostId: String) {
        thisPost: wpPost(id: { eq: $id }) {
            slug
            uri
            title
            content
        }
        nextPost: wpPost(id: { eq: $nextPostId }) {
            slug
            uri
            title
            content
        }
        previousPost: wpPost(id: { eq: $previousPostId }) {
            slug
            uri
            title
            content
        }
    }
`
