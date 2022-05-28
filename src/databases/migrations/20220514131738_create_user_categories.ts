import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_categories', table => {
    table.bigIncrements('id').unsigned().primary().notNullable();
    table.bigInteger('user_id').unsigned().references('id').inTable('users');
    table.bigInteger('category_id').unsigned().references('id').inTable('categories');
    table.date('deleted_at').nullable();
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_categories');
}
