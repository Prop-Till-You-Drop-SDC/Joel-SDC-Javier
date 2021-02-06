/* eslint-disable import/extensions */
import React from 'react';
import ReviewAvgs from './ReviewAvgs.jsx';
import LatestReviews from './LatestReviews.jsx';
import ReviewsModal from './ReviewsModal.jsx';
import styles from '../styles/app.module.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: {},
      averages: {},
      tags: [],
      showAllReviews: false,
    };
    this.showAll = this.showAll.bind(this);
  }

  componentDidMount() {
    const getRand = (min, max) => Math.floor(Math.random() * (max - min) + min);

    fetch(`/reviews/${getRand(1, 100)}`)
      // fetch(`/reviews/${getRand(1, 100)}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const sortedData = data.reviews.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        const avg = this.averages(data);
        this.setState({
          reviews: sortedData,
          averages: avg,
          tags: data.reviews[0].tags,
        });
      });
  }

  // eslint-disable-next-line class-methods-use-this
  averages(data) {
    const allReviews = data.reviews;
    const totalReviewsCount = allReviews.length;

    const value = {
      cleanliness: 0,
      accuracy: 0,
      comm: 0,
      location: 0,
      checkIn: 0,
      value: 0,
    };

    allReviews.forEach((review) => {
      value.cleanliness += review.cleanliness;
      value.accuracy += review.accuracy;
      value.comm += review.comm;
      value.location += review.location;
      value.checkIn += review.check_in;
      value.value += review.value;
    });

    value.cleanliness /= totalReviewsCount;
    value.accuracy /= totalReviewsCount;
    value.comm /= totalReviewsCount;
    value.location /= totalReviewsCount;
    value.checkIn /= totalReviewsCount;
    value.value /= totalReviewsCount;

    const round = (num, dec) => Math.round(num * dec) / dec;
    let overall = 0;
    Object.entries(value).forEach((val) => {
      value[val[0]] = round(val[1], 10);
      overall += val[1];
    });

    value.overall = round(overall / 6, 100);
    value.totalReviews = totalReviewsCount;

    return value;
  }

  showAll() {
    this.setState((state) => ({ showAllReviews: !state.showAllReviews }));
  }

  render() {
    const { reviews, averages, tags, showAllReviews } = this.state;
    return (
      <div className={styles.reviewSection}>
        <hr />
        {/* Main Section  */}
        <div className={styles.wrapper}>
          <ReviewAvgs averages={averages} tags={tags} />
          <div className={styles.reviews}>
            <LatestReviews reviews={reviews} />
            <button
              type='button'
              className={styles.btn}
              onClick={this.showAll}
              id={styles.showAll}
            >
              Show all {averages.totalReviews} reviews
            </button>
          </div>
        </div>
        {/* All Reviews Pop Up Modal */}
        {showAllReviews ? (
          <ReviewsModal
            reviews={reviews}
            averages={averages}
            tags={tags}
            showAll={this.showAll}
          />
        ) : null}
        <hr />
      </div>
    );
  }
}

export default App;
