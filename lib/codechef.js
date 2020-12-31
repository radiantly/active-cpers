import { timed } from "./util.js";

// Retrieve the Access token
async function getCodeChefAccessToken() {
  return (
    await fetch("https://api.codechef.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "client_credentials",
        scope: "public",
        client_id: process.env.CODECHEF_CLIENT_ID,
        client_secret: process.env.CODECHEF_CLIENT_SECRET,
        redirect_uri: "",
      }),
    }).then((response) => response.json())
  ).result.data.access_token;
}

async function getCodeChefUserInfo() {
  const users = {};
  try {
    const accessToken = await getCodeChefAccessToken();
    for (let i = 0; i < 5; i++) {
      const response = await fetch(
        `https://api.codechef.com/ratings/all?fields=username%2Crating&institution=Amrita%20School%20of%20Engineering%20Coimbatore&offset=${
          i * 25
        }&limit=25`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ).then((response) => response.json());
      const {
        status,
        result: {
          data: { content, code },
        },
      } = response;
      if (status !== "OK" || code !== 9001) throw response;
      for (const user of content) users[user.username] = user;
    }
  } catch (err) {
    console.error(err);
  }
  return users;
}

export async function getSafeCodeChefUserInfo() {
  return await Promise.race([getCodeChefUserInfo(), timed(10000, {})]);
}
