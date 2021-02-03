import { any } from "sequelize/types/lib/operators";
import knex from "./database";
class Modal {
  knex: any;
  constructor() {
    this.knex = knex;
  }
}
export default Modal;
