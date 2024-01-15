import { BossDto } from "../models/boss.dto";
import { employees } from "./employees";

export const bosses: BossDto[] = [
  {
    id: 1,
    name: "Juan",
    email: "juanboss.company@gmail.com",
    phone: "665874112",
    address: "Calle de test, 17",
    salary: 45000,
    position: "Boss",
    status: "",
    created_at: new Date(),
    updated_at: new Date(),
    employees: [employees[0], employees[1]],
    boss_id: null,
  },
  {
    id: 2,
    name: "Sofia",
    email: "pedroboss.company@gmail.com",
    phone: "665987223",
    address: "Calle de test, 18",
    salary: 50000,
    position: "Boss",
    status: "",
    created_at: new Date(),
    updated_at: new Date(),
    employees: [employees[2], employees[3]],
    boss_id: null,
  },
];
