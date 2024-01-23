export class EmployeeDto {
  id!: number;
  name!: string;
  email!: string;
  phone!: string;
  address!: string;
  salary!: number;
  position!: string;
  status!: string;
  created_at!: Date;
  updated_at!: Date;
  boss_id!: number | null;
}
