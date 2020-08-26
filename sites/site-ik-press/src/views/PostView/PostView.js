import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Grid } from "@material-ui/core"

// import

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
    },
}))

const PostView = ({ pageContext }) => {
    const classes = useStyles()

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                wer
            </Grid>
        </Grid>
    )
}

export default PostView
