import { HTMLTable } from "@blueprintjs/core";

export default ({ rows }) => (
  <main>
    <HTMLTable bordered condensed interactive striped>
      <thead>
        <tr>
          <th>Task</th>
          <th>Date</th>
          <th>Hours</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(row => {
          <tr>
            <td>{row.task}</td>
            <td>{row.hours}</td>
            <td>{row.date}</td>
          </tr>;
        })}
      </tbody>
    </HTMLTable>
  </main>
);
