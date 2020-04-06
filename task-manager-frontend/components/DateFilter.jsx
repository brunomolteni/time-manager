import { useSelector } from "react-redux";
import { DateRangePicker, Classes } from "@blueprintjs/datetime";

import { uiActions } from "../redux";
import { useActions } from "../hooks";

export default ({ totalHours = {}, hoursPerDay }) => {
  const { range } = useSelector((state) => state.ui.filter);

  const { setFilter } = useActions(uiActions);

  const changeFilter = ([start, end]) => {
    if (start && end) {
      setFilter({
        start: start.toISOString(),
        end: end.toISOString(),
      });
    }
  };

  const parsedFilter = [new Date(range.start), new Date(range.end)];

  const toISO = (date) => new Date(date).toISOString().split("T")[0];
  console.log(totalHours, hoursPerDay);
  const modifiers = {
    isEnough: (date) =>
      totalHours[toISO(date)] && totalHours[toISO(date)] >= hoursPerDay,
    isNotEnough: (date) =>
      totalHours[toISO(date)] && totalHours[toISO(date)] < hoursPerDay,
  };

  return (
    <DateRangePicker
      className={Classes.POPOVER_DISMISS_OVERRIDE}
      defaultValue={parsedFilter}
      onChange={changeFilter}
      allowSingleDayRange="true"
      singleMonthOnly="true"
      initialMonth={parsedFilter[1]}
      maxDate={new Date()}
      modifiers={modifiers}
    />
  );
};
