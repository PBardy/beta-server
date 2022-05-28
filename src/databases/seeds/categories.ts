import * as Knex from 'knex';
import { faker } from '@faker-js/faker';

function categoriesFactory() {
  const category = {
    uuid: faker.datatype.uuid(),
    color: faker.internet.color(),
    name: faker.name.firstName(),
    thumbnail: faker.image.food(),
    description: faker.lorem.paragraph(),
    created_by: faker.datatype.number({ min: 1, max: 20 }),
    created_at: new Date(),
    updated_at: new Date(),
  };

  return category;
}

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('categories').del();

  // Inserts seed entries
  await knex('categories').insert(new Array(20).fill(0).map(() => categoriesFactory()));
}
