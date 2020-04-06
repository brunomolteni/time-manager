import { useSelector } from "react-redux";
import { Button, Popover } from "@blueprintjs/core";
import Link from "next/link";

import { DateFilter } from "../components";
import { useActions } from "../hooks";
import { uiActions } from "../redux";
import { exportData } from "../util";

export default ({ totalHours }) => {
  const { filter } = useSelector((state) => state.ui);
  const { role } = useSelector((state) => state.user);

  const { toggleForm, toggleFiltering } = useActions(uiActions);

  return (
    <>
      <Button icon="add" intent="primary" onClick={() => toggleForm()}>
        Log Work
      </Button>
      <Popover
        content={<DateFilter totalHours={totalHours} />}
        onInteraction={(shouldOpen) =>
          filter.selecting && !shouldOpen && toggleFiltering()
        }
        isOpen={filter.selecting}
      >
        <Button
          icon="filter"
          onClick={() => toggleFiltering()}
          className="u-ml-1"
        >
          Filter
        </Button>
      </Popover>
      <Button icon="export" onClick={() => exportData(log)} className="u-ml-1">
        Export
      </Button>
      {role === "manager" && (
        <Link href="/users">
          <Button icon="user" className="u-ml-1">
            Users
          </Button>
        </Link>
      )}
    </>
  );
};
