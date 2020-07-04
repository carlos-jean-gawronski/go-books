import Knex from 'knex';

export async function seed(knex: Knex) {
  const data = [
    {
      name: 'Drama',
    },
    {
      name: 'Horror',
    },
    {
      name: 'Action',
    },
    {
      name: 'Adventure',
    },
    {
      name: 'Comedia',
    },
  ];
  await knex('tags').insert(data);
}
