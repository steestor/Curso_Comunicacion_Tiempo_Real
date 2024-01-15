import { EmployeeDto } from "./employee.dto";

export class BossDto extends EmployeeDto {
  employees!: EmployeeDto[];
}
