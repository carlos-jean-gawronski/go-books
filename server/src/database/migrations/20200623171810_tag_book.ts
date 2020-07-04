import Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('tag_book', (table) => {
    table.increments('id').primary();
    table
      .integer('tag_id')
      .unsigned()
      .references('id')
      .inTable('tags')
      .notNullable();
    table
      .integer('book_id')
      .unsigned()
      .references('id')
      .inTable('books')
      .notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('tag_book');
}
