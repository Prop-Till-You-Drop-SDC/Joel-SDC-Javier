const getRand = (min, max) => Math.floor(Math.random() * (max - min) + min);

const tagGenerator = () => {
  let tags = [];
  const tagSelection = ['Responsive host', 'Comfortable beds', 'Easy check-in',
    'Great location', 'Great restaurants', 'Great views', 'Helpful host',
    'Thoughtful touches', 'Friendly host', 'A quiet neighborhood'];
  for (let i = 0; i < getRand(1, tagSelection.length); i++) {
    tags.push(tagSelection[i])
  }
  return tags
};

module.exports = {
  getRand,
  tagGenerator,
};


