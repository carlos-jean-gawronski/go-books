import Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('tags', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('tags');
}
