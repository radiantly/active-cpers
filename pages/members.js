import MainContainer from "../components/MainContainer.js";
import styles from "../styles/Members.module.css";
import { useState } from "react";
import { fetchMembers } from "../lib/memberslist.js";
import { getSafeCfUserInfo } from "../lib/codeforces.js";
import { getSafeCodeChefUserInfo } from "../lib/codechef.js";
import { shuffleArray, ratingSort } from "../lib/util.js";

export default function Members(props) {
  // Whether only active or all members are shown
  const [displayAll, setDisplayAll] = useState(false);

  // Whether Codeforces ratings should be shown
  const [displayCF, setDisplayCF] = useState(false);

  // Whether CodeChef ratings should be shown
  const [displayCC, setDisplayCC] = useState(false);

  // What to sort by
  const [sortBy, setSortBy] = useState(false);

  const getSortedMembers = () => {
    if (sortBy == "Codeforces" || (displayCF && !displayCC))
      return ratingSort([...props.members], "Codeforces", props.cfUsers);

    if (sortBy == "CodeChef" || displayCC)
      return ratingSort([...props.members], "CodeChef", props.ccUsers);

    return props.members;
  };

  // Members list
  const membersList = getSortedMembers();

  // This function generates a <td> element of the table
  const generateTD = (member, heading, key) => {
    // If empty, return a <td> element with a dash (-)
    if (!member[heading]) return <td key={key} className={styles.empty}></td>;

    // If heading is CodeChef, link to Codechef profile
    if (heading == "CodeChef") {
      const ccUsername = member[heading];
      const { rating } = props.ccUsers[ccUsername] || {};
      const finalText =
        ccUsername + (rating && displayCC ? ` [${rating}]` : "");
      return (
        <td key={key}>
          <a
            target="_blank"
            href={`https://www.codechef.com/users/${member[heading]}`}
          >
            {finalText}
          </a>
        </td>
      );
    }

    // If heading is Codeforces, then link to Codeforces profile
    if (heading == "Codeforces") {
      const cfUsername = member[heading];
      const { rating, rank } = props.cfUsers[cfUsername] || {};
      // Add the Codeforces rating if it exists and if `displayCF` is true
      const finalText =
        cfUsername + (rating && displayCF ? ` [${rating}]` : "");
      return (
        <td key={key}>
          <a
            target="_blank"
            href={`https://codeforces.com/profile/${cfUsername}`}
            title={
              rank
                ? rank.replace(/(^\w)|(\s\w)/, (match) => match.toUpperCase()) +
                  ` ${cfUsername}`
                : null
            }
          >
            {finalText}
          </a>
        </td>
      );
    }
    return <td key={key}>{member[heading]}</td>;
  };

  const handleDisplayChange = (e, state) => {
    e.preventDefault();
    setDisplayAll(state);
  };

  return (
    <MainContainer title="Members">
      <p>
        This is a list of
        {displayAll ? " all our members." : " our currently active members."}
      </p>
      <table className={styles.memberTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th
              className={styles.clickable}
              onClick={(e) => {
                setSortBy(!displayCC && "CodeChef");
                setDisplayCC(!displayCC);
              }}
            >
              CodeChef {displayCC ? "▼" : "▲"}
            </th>
            <th
              className={styles.clickable}
              onClick={(e) => {
                setSortBy(!displayCF && "Codeforces");
                setDisplayCF(!displayCF);
              }}
            >
              Codeforces {displayCF ? "▼" : "▲"}
            </th>
          </tr>
        </thead>
        <tbody>
          {membersList
            .filter((member) => displayAll || member["Status"] != "Inactive")
            .map((member) => (
              <tr
                key={JSON.stringify(member)}
                className={
                  member["Status"] == "Inactive" ? styles.inactive : null
                }
              >
                {props.headings.map((heading) =>
                  generateTD(member, heading, heading)
                )}
              </tr>
            ))}
        </tbody>
      </table>
      <p>
        <a href="#" onClick={(e) => handleDisplayChange(e, !displayAll)}>
          Show {displayAll ? "only active" : "all"} members
        </a>
      </p>
    </MainContainer>
  );
}

export async function getStaticProps(context) {
  const expectedHeadings = ["Name", "CodeChef", "Codeforces"];
  let { headings, members } = await fetchMembers();
  headings = headings.filter((heading) => expectedHeadings.includes(heading));
  const cfUsernames = members
    .filter((member) => member["Codeforces"])
    .map((member) => member["Codeforces"]);
  const cfUsers = await getSafeCfUserInfo(cfUsernames);
  const ccUsers = await getSafeCodeChefUserInfo();
  shuffleArray(members);
  return {
    props: {
      headings,
      members,
      cfUsers,
      ccUsers,
    },
    revalidate: 300,
  };
}
