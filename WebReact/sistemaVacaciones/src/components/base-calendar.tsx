import { Calendar } from "devextreme-react";
import { EmployeeDto } from "../models/employee.dto";
import { useCallback, useState } from "react";

interface IBaseCalendarProps {
  employee: EmployeeDto;
}

export function BaseCalendar({ employee }: IBaseCalendarProps) {
  const [daysSelected, setDaysSelected] = useState([]);

  function onValueChanged(e: any) {
    setDaysSelected(e.value);
  }

  function getDaysSelected() {
    return daysSelected.map((day: Date) => <div>{day.toDateString()}</div>);
  }

  return (
    <div className="row" style={{ border: "1px solid black" }}>
      <div className="col-12">{employee.name}</div>
      <div className="col-auto mb-3">
        <Calendar showWeekNumbers={true} selectionMode="multiple" onValueChanged={onValueChanged}></Calendar>
      </div>
      <div className="col">{getDaysSelected()}</div>
    </div>
  );
}
