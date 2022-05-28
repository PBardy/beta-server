import * as Knex from 'knex';
import { faker } from '@faker-js/faker';

function userFactory() {
  const user = {
    uuid: faker.datatype.uuid(),
    email: faker.internet.email(),
    password: '',
    created_at: new Date(),
    updated_at: new Date(),
  };

  return user;
}

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert(new Array(20).fill(0).map(() => userFactory()));
}
