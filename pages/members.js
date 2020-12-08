import MainContainer from "../components/MainContainer.js";
import styles from "../styles/Members.module.css";
import { fetchMembers } from "../lib/memberslist.js";
import { shuffleArray } from "../lib/util.js";
export default function Members(props) {
  const generateTD = (member, heading, key) => {
    if (!member[heading]) return <td key={key} className={styles.empty}></td>;

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

    if (heading == "Codeforces")
      return (
        <td key={key}>
          <a
            target="_blank"
            href={`https://codeforces.com/profile/${member[heading]}`}
          >
            {member[heading]}
          </a>
        </td>
      );
    return <td key={key}>{member[heading]}</td>;
  };

  return (
    <MainContainer title="Members">
      <p>This is a list of our currently active members</p>
      <table className={styles.memberTable}>
        <tr>
          {props.headings.map((heading) => (
            <th key={heading}>{heading}</th>
          ))}
        </tr>
        {props.members
          .filter((member) => member["Status"] != "Inactive")
          .map((member) => (
            <tr key={JSON.stringify(member)}>
              {props.headings.map((heading, idx) =>
                generateTD(member, heading, idx)
              )}
            </tr>
          ))}
      </table>
    </MainContainer>
  );
}

export async function getStaticProps(context) {
  let { headings, members } = await fetchMembers();
  headings = headings.filter((elem) => elem != "Status");
  shuffleArray(members);
  return {
    props: { headings, members },
    revalidate: 300,
  };
}
