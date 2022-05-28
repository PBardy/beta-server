import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', table => {
    table.bigIncrements('id').unsigned().primary().notNullable();
    table.uuid('uuid').notNullable();
    table.string('email').notNullable();
    table.string('password').nullable();
    table.date('deleted_at').nullable();
    table.date('verified_at').nullable();
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users');
}
