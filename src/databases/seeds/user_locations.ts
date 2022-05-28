import * as Knex from 'knex';
import { faker } from '@faker-js/faker';

function userLocationsFactory() {
  const category = {
    user_id: faker.datatype.number({ min: 1, max: 20 }),
    location_id: faker.datatype.number({ min: 1, max: 20 }),
    created_at: new Date(),
    updated_at: new Date(),
  };

  return category;
}

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('user_locations').del();

  // Inserts seed entries
  await knex('user_locations').insert(new Array(20).fill(0).map(() => userLocationsFactory()));
}
