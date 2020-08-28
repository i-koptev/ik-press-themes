import React from "react"
import clsx from "clsx"
import PropTypes from "prop-types"

import { makeStyles } from "@material-ui/styles"
import { Grid } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
        [theme.breakpoints.up("lg")]: {
            // backgroundColor: "tomato",
        },
    },
    header: {
        padding: "1rem",
    },
}))

const BlogView = props => {
    const { className, ...rest } = props

    const classes = useStyles()

    return (
        <Grid
            container
            spacing={4}
            {...rest}
            className={clsx(classes.root, className)}>
            <Grid item xs={12}>
                <Typography
                    className={classes.header}
                    variant="h3"
                    component="h1"
                    align="center">
                    BlogView
                </Typography>
                <DebugDataContext {...props} />
            </Grid>
        </Grid>
    )
}

BlogView.propTypes = {
    className: PropTypes.string,
}

export default BlogView

export const DebugDataContext = props => {
    const { pageContext = null, data = null } = props

    return (
        <div
            style={{
                fontSize: "18px",
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
            <pre>
                <b>Page data:</b>
                <br />
                {JSON.stringify(data, null, 2)}
            </pre>
            <pre>
                <b>All Props:</b>
                {JSON.stringify(props, null, 2)}
            </pre>
        </div>
    )
}
