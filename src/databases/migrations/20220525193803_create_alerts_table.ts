import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('alerts', table => {
    table.bigIncrements('id').unsigned().primary().notNullable();
    table.string('title').notNullable();
    table.string('description').nullable();
    table.json('data').nullable();
    table.date('date_read').nullable();
    table.date('date_sent').nullable();
    table.date('date_queued').nullable();
    table.date('deleted_at').nullable();
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('alerts');
}
