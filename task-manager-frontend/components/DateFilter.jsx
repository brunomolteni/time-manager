import { useSelector } from "react-redux";
import { DateRangePicker } from "@blueprintjs/datetime";

import { uiActions } from "../redux";
import { useActions } from "../hooks";

export default ({ onChange }) => {
  const { range } = useSelector((state) => state.ui.filter);

  const oneDay = 24 * 60 * 60 * 1000;
  const today = new Date();
  const yesterday = new Date(today.getTime() - oneDay);

  const { setFilter } = useActions(uiActions);

  const changeFilter = ([start, end]) => {
    if (start && end) {
      setFilter({
        start: start ? start.getTime() : yesterday.getTime(),
        end: end ? end.getTime() : today.getTime(),
      });
    }
  };

  const parsedFilter = range && [new Date(range.start), new Date(range.end)];

  return (
    <DateRangePicker
      defaultValue={parsedFilter || [yesterday, today]}
      onChange={changeFilter}
      allowSingleDayRange="true"
      singleMonthOnly="true"
    />
  );
};
