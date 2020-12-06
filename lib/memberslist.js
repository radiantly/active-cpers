const sheetsURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTmBiWDjAgl5TY7bE5FL4FXdVylY3d55ycjtDUTu08Z_U7ZCi58rrJZbqef2SlFlcBHomk4S8o2APQO/pub?gid=287525817&single=true&output=csv";

export async function fetchMembers() {
  const data = await fetch(sheetsURL).then((response) => response.text());
  const lines = data.split(/\r\n/);
  const headings = lines.shift().split(",");
  const members = lines.map((line) =>
    line.split(",").reduce((obj, elem, idx) => {
      obj[headings[idx]] = elem;
      return obj;
    }, {})
  );
  return { headings, members };
}
