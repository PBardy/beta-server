import * as Knex from 'knex';
import { faker } from '@faker-js/faker';

function userCategoriesFactory() {
  const category = {
    user_id: faker.datatype.number({ min: 1, max: 20 }),
    category_id: faker.datatype.number({ min: 1, max: 20 }),
    created_at: new Date(),
    updated_at: new Date(),
  };

  return category;
}

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('user_categories').del();

  // Inserts seed entries
  await knex('user_categories').insert(new Array(20).fill(0).map(() => userCategoriesFactory()));
}
