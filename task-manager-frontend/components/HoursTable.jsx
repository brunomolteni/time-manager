import { HTMLTable } from "@blueprintjs/core";

export default ({ rows = [] }) => (
  <main>
    <HTMLTable bordered condensed interactive striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>Tasks</th>
          <th>Hours</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row.id}>
            <td>{row.Date}</td>
            <td>{row.Task}</td>
            <td>{row.Duration}</td>
          </tr>
        ))}
      </tbody>
    </HTMLTable>
  </main>
);
