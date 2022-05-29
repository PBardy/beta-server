import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('user_products', table => {
    table.uuid('uuid').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('user_products', table => {
    table.dropColumn('uuid');
  });
}
