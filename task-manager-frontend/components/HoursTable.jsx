import {
  HTMLTable,
  Spinner,
  NonIdealState,
  Icon,
  Intent,
  Classes,
} from "@blueprintjs/core";

export default ({ rows, editWork, hoursPerDay }) => {
  const toText = (date) => new Date(date).toLocaleDateString();
  const byDate = (a, b) => new Date(b.Date) - new Date(a.Date);

  const firstRowOfDate = (i, rows) =>
    i > 0 && rows[i].Date !== rows[i - 1].Date;

  const hoursWorked = {};
  rows &&
    rows.forEach(
      ({ Date, Duration }) =>
        (hoursWorked[toText(Date)] =
          (hoursWorked[toText(Date)] || 0) + Duration)
    );

  if (typeof rows === "undefined") {
    return <Spinner />;
  } else if (!rows.length) {
    return (
      <NonIdealState
        icon="clean"
        title="Get Started"
        description="Looks like  you haven't logged any work yet."
      />
    );
  } else {
    return (
      <HTMLTable condensed interactive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Tasks</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          {rows.sort(byDate).map((row, i) => (
            <tr
              key={row.id}
              className={
                firstRowOfDate(i, rows) ? `${Classes.HTML_TABLE}--row` : null
              }
              onClick={() => editWork(row)}
            >
              <td>
                {(i === 0 || firstRowOfDate(i, rows)) && (
                  <span>
                    <Icon
                      className="u-mr-1"
                      icon={"error" || "endorsed"}
                      intent={
                        hoursWorked[toText(row.Date)] >= hoursPerDay
                          ? Intent.SUCCESS
                          : Intent.DANGER
                      }
                    />
                    {toText(row.Date)}
                  </span>
                )}
              </td>
              <td>{row.Task}</td>
              <td>{row.Duration}</td>
            </tr>
          ))}
        </tbody>
      </HTMLTable>
    );
  }
};
