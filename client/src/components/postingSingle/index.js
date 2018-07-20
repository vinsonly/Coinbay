import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import './postingSingle.css'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function CenteredGrid(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>

        <Grid item xs={12} md={6}>
          <img id="postingPicture"src="https://i.kinja-img.com/gawker-media/image/upload/s--zIoxCmxH--/c_scale,f_auto,fl_progressive,q_80,w_800/e83aktlptf1pybjfkcex.jpg"></img>
        </Grid>
        <Grid item xs={12} md={6}>
            <div class="postingInfo">
                <h1>Lambourghini Huracan Performante</h1>
                <h2>$100,000</h2>
                <p>The Huracán Performante has reworked the concept of super sports cars and taken the notion of performance to levels never seen before. The vehicle has been re-engineered in its entirety, as regards its weight, engine power, chassis and above all by introducing an innovative system of active aerodynamics: ALA. The use of the awarded Forged Composites®, a shapable forged carbon fiber material patented by Automobili Lamborghini, is a real nice touch and it contributes to make the vehicle even lighter in weight. Besides its extraordinary technological properties, it also conveys a new idea of beauty.</p>
                <h3>Seller: Vinson Ly</h3>
                <div class="sellerRating">
                  <h3>Rating</h3>
                  <i class="material-icons">
                    star_rate
                  </i>
                  <i class="material-icons">
                    star_rate
                  </i>
                  <i class="material-icons">
                    star_rate
                  </i>
                  <i class="material-icons">
                    star_rate
                  </i>
                  <i class="material-icons">
                    star_rate
                  </i>
                </div>
                <Button variant="contained" color="primary" className={classes.button}>
                  Buy Now
                </Button>
            </div>
        </Grid>
      </Grid>
    </div>
  );
}

CenteredGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredGrid);