import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Grid } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
    },
    header: {
        padding: "1rem",
    },
}))

const BlogView = ({ pageContext }) => {
    const classes = useStyles()

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Typography
                    className={classes.header}
                    variant="h3"
                    component="h1"
                    align="center">
                    BlogView
                </Typography>

                <div
                    style={{
                        fontSize: "10px",
                        backgroundColor: "#345",
                        color: "#eee",
                        padding: "1rem",
                    }}>
                    <pre>
                        <b>Template:</b> {__filename}
                    </pre>
                    <pre>
                        <b>Page context:</b>
                        <br />
                        {JSON.stringify(pageContext, null, 2)}
                    </pre>
                    {/* <pre>
                            <b>Page data:</b>
                            <br />
                            {JSON.stringify(data, null, 2)}
                        </pre> */}
                </div>
            </Grid>
        </Grid>
    )
}

export default BlogView
