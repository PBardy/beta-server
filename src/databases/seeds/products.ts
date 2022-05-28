import * as Knex from 'knex';
import { faker } from '@faker-js/faker';

function productFactory() {
  const product = {
    uuid: faker.datatype.uuid(),
    name: faker.name.firstName(),
    thumbnail: faker.image.food(),
    description: faker.lorem.paragraph(),
    created_by: faker.datatype.number({ min: 1, max: 20 }),
    created_at: new Date(),
    updated_at: new Date(),
  };

  return product;
}

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('products').del();

  // Inserts seed entries
  await knex('products').insert(new Array(20).fill(0).map(() => productFactory()));
}
