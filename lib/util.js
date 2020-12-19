// From https://stackoverflow.com/a/12646864/5302813
export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// A comparator function that sorts the members list based on codeforces
// ratings
// Returns -1 if member1 should be sorted higher
// Returns 0 if member1 and member 2 are equal
// Returns 1 if member2 should be sorted higher
export const cfRatingSort = (members, cfUsers) => {
  return members.sort((member1, member2) => {
    // if any member object does not have a codeforces username, rank them
    // lower
    const cfUsername1 = member1.Codeforces;
    const cfUsername2 = member2.Codeforces;
    if (!cfUsername1) return cfUsername2 ? 1 : 0;
    if (!cfUsername2) return -1;

    // Rank those users that don't have a cfUser object lower
    const cfUser1 = cfUsers[cfUsername1];
    const cfUser2 = cfUsers[cfUsername2];
    if (!cfUser1) return cfUser2 ? 1 : 0;
    if (!cfUser2) return -1;

    // If rating is undefined, set to zero
    const cfRating1 = cfUser1.rating || 0;
    const cfRating2 = cfUser2.rating || 0;

    return cfRating2 - cfRating1;
  });
};
