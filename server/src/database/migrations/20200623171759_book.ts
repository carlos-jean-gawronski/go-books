import Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('books', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.decimal('rate');
    table.string('author').notNullable();
    table.decimal('price').notNullable();
    table.string('image').nullable();
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('books');
}
