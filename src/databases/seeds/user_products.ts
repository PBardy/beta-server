import * as Knex from 'knex';
import { faker } from '@faker-js/faker';

function userProductsFactory() {
  const now = new Date();

  const category = {
    user_id: faker.datatype.number({ min: 1, max: 20 }),
    product_id: faker.datatype.number({ min: 1, max: 20 }),
    amount: faker.datatype.number({ min: 1, max: 5 }),
    expiry_date: faker.datatype.datetime(),
    best_before_date: faker.datatype.datetime(),
    created_at: now,
    updated_at: now,
  };

  return category;
}

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('user_products').del();

  // Inserts seed entries
  await knex('user_products').insert(new Array(20).fill(0).map(() => userProductsFactory()));
}
