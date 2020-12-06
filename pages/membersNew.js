import MainContainer from "../components/MainContainer.js";
import styles from "../styles/Members.module.css";
import { fetchMembers } from "../lib/memberslist.js";
import { shuffleArray } from "../lib/util.js";
export default function Members(props) {
  const generateTD = (member, heading) => {
    if (!member[heading]) return <td className={styles.empty}></td>;

    if (heading == "CodeChef")
      return (
        <td>
          <a href={`https://www.codechef.com/users/${member[heading]}`}>
            {member[heading]}
          </a>
        </td>
      );

    if (heading == "Codeforces")
      return (
        <td>
          <a href={`https://codeforces.com/profile/${member[heading]}`}>
            {member[heading]}
          </a>
        </td>
      );
    return <td>{member[heading]}</td>;
  };

  return (
    <MainContainer title="Members">
      <p>This is a list of our currently active members</p>
      <table className={styles.memberTable}>
        <tr>
          {props.headings.map((heading, idx) => (
            <th key={idx}>{heading}</th>
          ))}
        </tr>
        {props.members.map((member) => (
          <tr>
            {props.headings.map((heading) => generateTD(member, heading))}
          </tr>
        ))}
      </table>
    </MainContainer>
  );
}

export async function getStaticProps(context) {
  const { headings, members } = await fetchMembers();
  // console.log(memberData);
  shuffleArray(members);
  return {
    props: { headings, members },
    revalidate: 300,
  };
}