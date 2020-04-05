import { useSelector } from "react-redux";
import { DateRangePicker, Classes } from "@blueprintjs/datetime";

import { uiActions } from "../redux";
import { useActions } from "../hooks";

export default ({ onChange }) => {
  const { range } = useSelector((state) => state.ui.filter);

  const oneDay = 24 * 60 * 60 * 1000;
  const today = new Date();
  const { setFilter } = useActions(uiActions);

  const changeFilter = ([start, end]) => {
    if (start && end) {
      setFilter({
        start: start ? start.toISOString() : today.toISOString(),
        end: end ? end.toISOString() : today.toISOString(),
      });
    }
  };

  const parsedFilter = range && [new Date(range.start), new Date(range.end)];

  return (
    <DateRangePicker
      className={Classes.POPOVER_DISMISS_OVERRIDE}
      defaultValue={parsedFilter || [today, today]}
      onChange={changeFilter}
      allowSingleDayRange="true"
      singleMonthOnly="true"
    />
  );
};
