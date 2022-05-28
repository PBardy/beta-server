import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('locations', table => {
    table.bigIncrements('id').unsigned().primary().notNullable();
    table.uuid('uuid').notNullable();
    table.string('name').notNullable();
    table.string('color').nullable();
    table.string('description').nullable();
    table.string('thumbnail').nullable();
    table.date('deleted_at').nullable();
    table.bigInteger('created_by').unsigned().references('id').inTable('users');
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('locations');
}
