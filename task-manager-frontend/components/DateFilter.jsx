import { useSelector } from "react-redux";
import { DateRangePicker, Classes } from "@blueprintjs/datetime";

import { uiActions } from "../redux";
import { useActions } from "../hooks";

export default ({ onChange }) => {
  const { range } = useSelector((state) => state.ui.filter);

  const oneDay = 24 * 60 * 60 * 1000;
  const today = new Date();
  const aWeekAgo = new Date(today.getTime() - oneDay * 7);

  const { setFilter } = useActions(uiActions);

  const changeFilter = ([start, end]) => {
    if (start && end) {
      setFilter({
        start: start ? start.getTime() : aWeekAgo.getTime(),
        end: end ? end.getTime() : today.getTime(),
      });
    }
  };

  const parsedFilter = range && [new Date(range.start), new Date(range.end)];

  return (
    <DateRangePicker
      className={Classes.POPOVER_DISMISS_OVERRIDE}
      defaultValue={parsedFilter || [aWeekAgo, today]}
      onChange={changeFilter}
      allowSingleDayRange="true"
      singleMonthOnly="true"
    />
  );
};
