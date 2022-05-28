import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_products', table => {
    table.bigIncrements('id').unsigned().primary().notNullable();
    table.bigInteger('user_id').unsigned().references('id').inTable('users');
    table.bigInteger('product_id').unsigned().references('id').inTable('products');
    table.integer('amount').unsigned().notNullable();
    table.date('expiry_date').nullable();
    table.date('best_before_date').nullable();
    table.date('deleted_at').nullable();
    table.bigInteger('created_by').unsigned().references('id').inTable('users');
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_products');
}
