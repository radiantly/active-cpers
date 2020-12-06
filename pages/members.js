import MainContainer from "../components/MainContainer.js";
import styles from "../styles/Members.module.css";
export default function Members() {
  return (
    <MainContainer title="Members">
      <p>This is a list of our currently active members</p>
      <table className={styles.memberTable}>
        <tr>
          <th>Name</th>
          <th>CodeChef</th>
          <th>Codeforces</th>
        </tr>
        <tr>
          <td>John Doe</td>
          <td>johncodes</td>
          <td>awesomejohn</td>
        </tr>
        <tr>
          <td>Jane Doe</td>
          <td>jest_123</td>
          <td>jest_123</td>
        </tr>
        <tr>
          <td>Member 1</td>
          <td>example</td>
          <td className={styles.empty}></td>
        </tr>
      </table>
    </MainContainer>
  );
}
