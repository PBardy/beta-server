import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_alerts', table => {
    table.bigIncrements('id').unsigned().primary().notNullable();
    table.bigInteger('user_id').unsigned().references('id').inTable('users');
    table.bigInteger('alert_id').unsigned().references('id').inTable('alerts');
    table.date('queued_at').nullable();
    table.date('read_at').nullable();
    table.date('sent_at').nullable();
    table.date('deleted_at').nullable();
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_alerts');
}
