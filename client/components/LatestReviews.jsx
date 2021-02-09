import React from 'react';
import moment from 'moment';
import styles from '../styles/latestReviews.module.css';

const LatestReviews = ({ reviews }) => {
  const top6 = (revs) => {
    // avoid empty obj before mounting
    if (JSON.stringify(revs) !== '{}') {
      return [...revs].slice(0, 6);
    }
    return [];
  };

  const latest6 = top6(reviews);
  return (
    <div className={styles.wrapper}>
      {latest6.map((review, i) => (
        <div className={styles.reviewWrapper} key={i}>
          <div className={styles.avatar}>
            <img
              src={review.avatar}
              className={styles.profileImg}
              alt='profile pic'
            />
          </div>
          <div className={styles.info}>
            <div className={styles.name}>{review.name}</div>
            <div className={styles.date}>
              {moment(review.date).format('MMMM YYYY')}
            </div>
          </div>
          <p className={styles.review}>{review.review}</p>
        </div>
      ))}
    </div>
  );
};

export default LatestReviews;
