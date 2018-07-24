export default async function setUpRatingArrays(insertedRating) {

    let rating = parseInt(insertedRating)

    let blackStars = Math.floor(rating/2);

    let halfStar = 0;

    let halfStarArray;

    if((10 - rating) %2 != 0) {
      halfStarArray = [1];
      halfStar = 1;
    } else {
      halfStarArray = [];
    }

    let emptyStars = 5 - blackStars - halfStar;

    let i, j, blackStarArray = [], emptyStarArray = [];

    for(i = 0; i < blackStars; i++) {
      await blackStarArray.push(1);
    }

    for(j = 0; j < emptyStars; j++) {
      await emptyStarArray.push(1);
    }

    let obj = {
      blackStarArray: blackStarArray,
      halfStarArray: halfStarArray,
      emptyStarArray: emptyStarArray 
    }
    // this.setState(obj);    

    return obj; 

  }