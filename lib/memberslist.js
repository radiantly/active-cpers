const sheetsURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTmBiWDjAgl5TY7bE5FL4FXdVylY3d55ycjtDUTu08Z_U7ZCi58rrJZbqef2SlFlcBHomk4S8o2APQO/pub?gid=287525817&single=true&output=csv";

export async function fetchMembers() {
  const data = await fetch(sheetsURL).then((response) => response.text());
  const lines = data.split(/\r\n/);
  const headings = lines.shift().split(",");

  // Convert lines from response to an object
  const members = lines.map((line) =>
    line.split(",").reduce((obj, elem, idx) => {
      obj[headings[idx]] = elem.trim();
      return obj;
    }, {})
  );
  return { headings, members };
}

// Retrieve codeforces ratings given an array of usernames
async function getCfRatings(usernames) {
  try {
    const { status, result } = await fetch(
      `https://codeforces.com/api/user.info?handles=${usernames.join(";")}`
    ).then((response) => response.json());
    if (status != "OK") return {};
    const ratings = {};
    for (const { handle, rating } of result) {
      if (rating) ratings[handle] = rating;
    }
    return ratings;
  } catch (err) {
    console.error(err);
    return {};
  }
}

// Returns a promise that resolves to `value` after `ms` milliseconds
function timed(ms, value) {
  return new Promise((resolve) => setTimeout(resolve, ms, value));
}

// This function waits a maximum of 3 seconds before returning
export async function getSafeCfRatings(usernames) {
  return await Promise.race([getCfRatings(usernames), timed(3000, {})]);
}
