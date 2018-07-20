import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button'; 
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

function SimpleMediaCard(props) {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="/iphone.png"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            iPhone X <p className="right-text-float">$450</p>
          </Typography>
          <Typography component="p">
            The iPhone X is Apple's new flagship 10th anniversary iPhone featuring a 5.8-inch OLED display, facial recognition
             and 3D camera functionality, a glass body, and an A11 Bionic processor. Launched November 3, 2017.
          </Typography>
        </CardContent>
        <div className="button-center">
          <CardActions>
              <Button size="large" color="primary">
                <Link to={"/posts/" + props.post} className="no-line">More Details</Link>
              </Button>
          </CardActions>
        </div>
      </Card>
    </div>
  );
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleMediaCard);
