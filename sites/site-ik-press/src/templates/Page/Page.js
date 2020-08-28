import React from "react"
import { graphql } from "gatsby"

import MainLayout from "../../layouts/Main"
import PageView from "../../views/PageView"

const Page = props => {
    const { pageContext } = props

    return (
        <MainLayout lang={pageContext.lang}>
            <PageView {...props} />
        </MainLayout>
    )
}

export default Page

export const pageQuery = graphql`
    query pageByID($id: String!) {
        wpPage(id: { eq: $id }) {
            id
            title
            content
        }
    }
`
