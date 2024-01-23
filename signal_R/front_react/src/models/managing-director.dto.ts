import { BossDto } from "./boss.dto";
import { EmployeeDto } from "./employee.dto";

export class ManagingDirectorDto extends EmployeeDto {
  employees!: BossDto[];
}
