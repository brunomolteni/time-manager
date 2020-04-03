import { HTMLTable, EditableText, Spinner, Classes } from "@blueprintjs/core";

export default ({ rows }) =>
  typeof rows !== "undefined" ? (
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
          <tr
            key={row.id}
            className={
              i > 0 && row.Date !== rows[i - 1].Date
                ? `${Classes.HTML_TABLE}--row`
                : null
            }
          >
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
  ) : (
    <Spinner />
  );
