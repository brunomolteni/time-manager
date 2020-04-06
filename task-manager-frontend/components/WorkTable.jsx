import { useSelector } from "react-redux";

import {
  HTMLTable,
  Spinner,
  NonIdealState,
  Button,
  Icon,
  Intent,
  Classes,
} from "@blueprintjs/core";

import { useActions } from "../hooks";
import { uiActions } from "../redux";

const HoursTable = ({ rows, totalHours }) => {
  const { hoursPerDay } = useSelector((state) => state.user);
  const { searching } = useSelector((state) => state.ui.filter);

  const firstRowOfDate = (i, rows) =>
    i > 0 && rows[i].date !== rows[i - 1].date;

  const toLocale = (date) => new Date(date).toLocaleDateString();
  const toISO = (date) => new Date(date).toISOString().split("T")[0];
  const { toggleForm, startEditing } = useActions(uiActions);

  if (typeof rows === "undefined") {
    //  ----------------------- Spinner ------------------------
    return <Spinner />;
  } else if (!rows.length) {
    //  ----------------------- Empty State --------------------
    return (
      <NonIdealState
        icon={searching ? "search" : "clean"}
        title={searching ? "Nothing to show" : "Get Started"}
        description={
          searching
            ? "Looks like you didn't log anything on these dates"
            : "Looks like  you haven't logged any work yet."
        }
        action={
          !searching && (
            <Button icon="add" intent="primary" onClick={() => toggleForm()}>
              Log Work
            </Button>
          )
        }
      />
    );
  } else {
    //  ----------------------- Table ------------------------
    return (
      <HTMLTable condensed interactive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Tasks</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.id}
              className={
                firstRowOfDate(i, rows) ? `${Classes.HTML_TABLE}--row` : null
              }
              onClick={() => startEditing(row)}
            >
              <td>
                {(i === 0 || firstRowOfDate(i, rows)) && (
                  <span>
                    <Icon
                      className="u-mr-1"
                      icon={"error" || "endorsed"}
                      intent={
                        totalHours[toISO(row.date)] >= hoursPerDay
                          ? Intent.SUCCESS
                          : Intent.DANGER
                      }
                    />
                    {toLocale(row.date)}
                  </span>
                )}
              </td>
              <td>{row.task}</td>
              <td>{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </HTMLTable>
    );
  }
};

HoursTable.displayName = "HoursTable";

export default HoursTable;
