import MainContainer from "../components/MainContainer.js";
import styles from "../styles/Members.module.css";
import { useState } from "react";
import { fetchMembers, getSafeCfRatings } from "../lib/memberslist.js";
import { shuffleArray, cfRatingSort } from "../lib/util.js";

export default function Members(props) {
  // Whether only active or all members are shown
  const [displayAll, setDisplayAll] = useState(false);

  // Whether Codeforces ratings should be shown
  const [displayCF, setDisplayCF] = useState(false);

  // Members list - sort if `displayCF` is true
  const membersList = displayCF
    ? cfRatingSort([...props.members], props.cfRatings)
    : props.members;

  // This function generates a <td> element of the table
  const generateTD = (member, heading, key) => {
    // If empty, return a <td> element with a dash (-)
    if (!member[heading]) return <td key={key} className={styles.empty}></td>;

    // If heading is CodeChef, link to Codechef profile
    if (heading == "CodeChef")
      return (
        <td key={key}>
          <a
            target="_blank"
            href={`https://www.codechef.com/users/${member[heading]}`}
          >
            {member[heading]}
          </a>
        </td>
      );

    // If heading is Codeforces, then link to Codeforces profile
    if (heading == "Codeforces") {
      const cfUsername = member[heading];
      const cfRating = props.cfRatings[cfUsername];
      // Add the Codeforces rating if it exists and if `displayCF` is true
      const finalText =
        cfUsername + (cfRating && displayCF ? ` [${cfRating}]` : "");
      return (
        <td key={key}>
          <a
            target="_blank"
            href={`https://codeforces.com/profile/${member[heading]}`}
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
        <tr>
          <th>Name</th>
          <th>CodeChef</th>
          <th
            className={styles.clickable}
            onClick={(e) => setDisplayCF(!displayCF)}
          >
            Codeforces
          </th>
        </tr>
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
  let { headings, members } = await fetchMembers();
  headings = headings.filter((elem) => elem != "Status");
  const cfUsernames = members
    .filter((member) => member["Codeforces"])
    .map((member) => member["Codeforces"]);
  const cfRatings = await getSafeCfRatings(cfUsernames);
  console.log(cfUsernames, cfRatings);
  shuffleArray(members);
  return {
    props: {
      headings,
      members,
      cfRatings,
    },
    revalidate: 300,
  };
}
