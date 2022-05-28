import * as Knex from 'knex';
import { faker } from '@faker-js/faker';

function locationFactory() {
  const location = {
    uuid: faker.datatype.uuid(),
    color: faker.internet.color(),
    name: faker.name.firstName(),
    thumbnail: faker.image.food(),
    description: faker.lorem.paragraph(),
    created_by: faker.datatype.number({ min: 1, max: 20 }),
    created_at: new Date(),
    updated_at: new Date(),
  };

  return location;
}

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('locations').del();

  // Inserts seed entries
  await knex('locations').insert(new Array(20).fill(0).map(() => locationFactory()));
}
