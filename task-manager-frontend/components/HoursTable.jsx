import {
  HTMLTable,
  Spinner,
  NonIdealState,
  Classes,
} from "@blueprintjs/core";

export default ({ rows, editWork }) =>
  typeof rows !== "undefined" ? (
    rows.length ? (
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
              onClick={() => editWork(row)}
            >
              <td>
                {i > 0 && row.Date === rows[i - 1].Date
                  ? ""
                  : new Date(row.Date).toLocaleDateString()}
              </td>
              <td>{row.Task}</td>
              <td>{row.Duration}</td>
            </tr>
          ))}
        </tbody>
      </HTMLTable>
    ) : (
      <NonIdealState
        icon="clean"
        title="Get Started"
        description="Looks like  you haven't logged any work yet."
      />
    )
  ) : (
    <Spinner />
  );
