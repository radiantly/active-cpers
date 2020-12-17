import MainContainer from "../components/MainContainer.js";
import { fetchMembers } from "../lib/memberslist";
import styles from "../styles/Join.module.css";
export default function Join({ members }) {
  return (
    <MainContainer title="Join us!">
      <p>
        <details>
          <summary className={styles.summary}>
            What are the requirements?
          </summary>
          <p>
            There are no requirements! We accept anyone, regardless of what
            branch or year you are currently in. All we require from you is the
            enthusiasm to participate in competitive programming contests 😎
          </p>
        </details>
      </p>
      <p>
        Glad you're interesting in joining us! To join, just send a message
        to&nbsp;
        {members
          .map((member) => (
            <a key={member.Contact} href={member.Contact}>
              {member.Name}
            </a>
          ))
          .reduce((prev, curr) => [prev, " or ", curr])}
        .
      </p>
    </MainContainer>
  );
}

export async function getStaticProps(context) {
  let { members } = await fetchMembers();
  members = members.filter((member) => member.Contact);
  return {
    props: {
      members,
    },
    revalidate: 1800,
  };
}
