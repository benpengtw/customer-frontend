import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Typography, withStyles, Card } from '@material-ui/core'

const styles = (theme) => ({
  iconWrapper: {
    borderRadius: theme.shape.borderRadius,
    textAlign: 'center',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1) * 1.5,
  },
  card: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    marginTop: theme.spacing(2),
    border: `2px solid ${theme.palette.primary.dark}`,
    borderRadius: theme.shape.borderRadius * 2,
    height: '350px',
  },
})

function shadeColor(hex, percent) {
  const f = parseInt(hex.slice(1), 16)

  const t = percent < 0 ? 0 : 255

  const p = percent < 0 ? percent * -1 : percent

  const R = f >> 16

  const G = (f >> 8) & 0x00ff

  const B = f & 0x0000ff
  return `#${(
    0x1000000 +
    (Math.round((t - R) * p) + R) * 0x10000 +
    (Math.round((t - G) * p) + G) * 0x100 +
    (Math.round((t - B) * p) + B)
  )
    .toString(16)
    .slice(1)}`
}

function FeatureCard(props) {
  const { classes, Icon, color, headline, text } = props
  return (
    <div className={classes.card}>
      <div
        // We will set color and fill here, due to some prios complications
        className={classes.iconWrapper}
        style={{
          color: color,
          //backgroundColor: shadeColor(color, 0.5),
          fill: color,
        }}
      >
        {Icon}
      </div>
      <Typography variant="h5" paragraph>
        {headline}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {text}
      </Typography>
    </div>
  )
}

FeatureCard.propTypes = {
  classes: PropTypes.object.isRequired,
  Icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default withStyles(styles, { withTheme: true })(FeatureCard)
