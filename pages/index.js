import MainContainer from "../components/MainContainer.js";
import Link from "../components/Link.js";

export default function Home() {
  return (
    <MainContainer title="Home">
      <h2>Hey there 👋</h2>
      <p>
        Welcome to the Active CPers website! We're a friendly community that
        does competitive programming actively.
      </p>
      <h2>Tell me more!</h2>
      <p>
        We're students of Amrita Coimbatore and we currenty do the following
        competitive programming contests regularly:
      </p>
      <ul>
        <li>Codechef</li>
        <li>Codeforces</li>
        <li>
          Anything that the ACCC hosts (the Amrita Codechef Campus Chapter)
        </li>
      </ul>
      <h2>Sounds cool! Can I join?</h2>
      <p>Sure, but a bit of backstory first:</p>
      <p>
        So, you're probably part of multiple <em>dead</em> whatsapp groups.
        Maybe it was originally started for coding something cool, or discussing
        the latest tech.
      </p>
      <p>
        When we started, we didn't want the group to eventually die. Thus, we
        enforce one simple rule on all members.
      </p>
      <h2>What's this rule? 👀</h2>
      <ul>
        <li>
          To stay a part of the group, you must{" "}
          <strong>regularly participate</strong> in competitive programming
          contests.
        </li>
        <li>
          If you're busy with exams/placements/assignments and miss{" "}
          <strong>three contests in a row</strong>, you will have to{" "}
          <strong>leave the group temporarily</strong>. Once you're free, make
          sure to message one of the active CPers to be added in the group again
          :)
        </li>
      </ul>
      <p>
        Sounds good? Join us <Link href="/join">here</Link>.
      </p>
    </MainContainer>
  );
}
