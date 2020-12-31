import { timed } from "./util.js";

// Retrieve codeforces user info given an array of usernames
async function getCfUserInfo(usernames) {
  const users = {};
  try {
    const response = await fetch(
      `https://codeforces.com/api/user.info?handles=${usernames.join(";")}`
    ).then((response) => response.json());
    const { status, result } = response;
    if (status !== "OK") throw response;
    for (const user of result) if (user.handle) users[user.handle] = user;
  } catch (err) {
    console.error(err);
  }
  return users;
}

// This function waits a maximum of 3 seconds before returning
export async function getSafeCfUserInfo(usernames) {
  return await Promise.race([getCfUserInfo(usernames), timed(3000, {})]);
}
