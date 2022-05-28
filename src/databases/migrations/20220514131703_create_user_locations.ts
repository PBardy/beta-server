import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_locations', table => {
    table.bigIncrements('id').unsigned().primary().notNullable();
    table.bigInteger('user_id').unsigned().references('id').inTable('users');
    table.bigInteger('product_id').unsigned().references('id').inTable('locations');
    table.date('deleted_at').nullable();
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_locations');
}
