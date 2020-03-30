import { HTMLTable, EditableText } from "@blueprintjs/core";

export default ({ rows = [] }) => (
  <main>
    <HTMLTable condensed interactive>
      <thead>
        <tr>
          <th>Date</th>
          <th>Tasks</th>
          <th>Hours</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={row.id}>
            <td>
              {i > 0 && row.Date === rows[i - 1].Date
                ? ""
                : new Date(row.Date).toLocaleDateString()}
            </td>
            <td>
              <EditableText onConfirm={console.log} defaultValue={row.Task} />
            </td>
            <td>{row.Duration}</td>
          </tr>
        ))}
      </tbody>
    </HTMLTable>
  </main>
);
