// From https://stackoverflow.com/a/12646864/5302813
export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// A comparator function that sorts the members list based on contest
// ratings
// Returns -1 if member1 should be sorted higher
// Returns 0 if member1 and member 2 are equal
// Returns 1 if member2 should be sorted higher
export const ratingSort = (members, key, Users) => {
  return members.sort((member1, member2) => {
    // if any member object does not have a username, rank them
    // lower
    const Username1 = member1[key];
    const Username2 = member2[key];
    if (!Username1) return Username2 ? 1 : 0;
    if (!Username2) return -1;

    // Rank those users that don't have a User object lower
    const User1 = Users[Username1];
    const User2 = Users[Username2];
    if (!User1) return User2 ? 1 : 0;
    if (!User2) return -1;

    // If rating is undefined, set to zero
    const Rating1 = User1.rating || 0;
    const Rating2 = User2.rating || 0;

    return Rating2 - Rating1;
  });
};

// Returns a promise that resolves to `value` after `ms` milliseconds
export function timed(ms, value) {
  return new Promise((resolve) => setTimeout(resolve, ms, value));
}
