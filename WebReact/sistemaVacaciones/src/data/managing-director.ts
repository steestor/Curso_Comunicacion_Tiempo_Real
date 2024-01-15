import { ManagingDirectorDto } from "../models/managing-director.dto";
import { bosses } from "./bosses";

export const managingDirector: ManagingDirectorDto = {
  id: 1,
  name: "Pedro",
  email: "pedromanagingdirector.company@gmail.com",
  phone: "699742115",
  address: "Calle de test, 20",
  salary: 600000,
  position: "Managing Director",
  status: "",
  created_at: new Date(),
  updated_at: new Date(),
  employees: [bosses[0], bosses[1]],
  boss_id: null,
};
