import { bosses } from "../data/bosses";
import { employees } from "../data/employees";
import { managingDirector } from "../data/managing-director";
import { BossDto } from "../models/boss.dto";
import { EmployeeDto } from "../models/employee.dto";
import { ManagingDirectorDto } from "../models/managing-director.dto";
import { BaseCalendar } from "./base-calendar";

export function GlobalCalendar() {
  const employeesData: EmployeeDto[] = employees;
  const bossesData: BossDto[] = bosses;
  const managingDirectorData: ManagingDirectorDto = managingDirector;

  return (
    <div className="row">
      <div className="col-4">
        {employeesData.map((employee: EmployeeDto) => (
          <BaseCalendar key={employee.id} employee={employee} />
        ))}
      </div>
      <div className="col-4">
        {bossesData.map((boss: BossDto) => (
          <BaseCalendar key={boss.id} employee={boss} />
        ))}
      </div>
      <div className="col-4">
        <BaseCalendar key={managingDirectorData.id} employee={managingDirectorData} />
      </div>
    </div>
  );
}
