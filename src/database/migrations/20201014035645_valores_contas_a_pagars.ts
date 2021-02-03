import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('valores_contas_a_pagars', (table: Knex.TableBuilder) => {
      table.increments('id');
  table.integer('contas_a_pagar_id');
    table.string('data_pagamento');

  table.integer('valor'); 
  table.timestamps();
  });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}

