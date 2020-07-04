import { Request, Response } from 'express';
import connection from '../database/connection';

class BookController {
  async getByName(request: Request, response: Response) {
    const { name } = request.params;
    const term = name.replace('%20', ' ');
    const books = await connection('books').select('*').where('name', term);
    if (!books) {
      return response
        .status(404)
        .send({ error: 'No books found with this name' });
    }
    const tags = await connection('tags').select('*');
    const tag_book = await connection('tag_book').select('*');

    const serializedBooks = books.map((book) => {
      const matchTags: string[] = [];
      for (let i = 0; i < tag_book.length; i++) {
        if (tag_book[i].book_id === book.id) {
          const tag = tag_book[i].tag_id;
          tags.map((item) => {
            if (item.id === tag) matchTags.push(String(item.name));
          });
        }
      }
      return {
        ...book,
        image_url: `http://${process.env.IMAGE_HOST}:3333/uploads/books/${book.image}`,
        tags: matchTags,
      };
    });

    return response.json(serializedBooks);
  }
  async index(request: Request, response: Response) {
    const books = await connection('books').select('*');
    const tags = await connection('tags').select('*');
    const tag_book = await connection('tag_book').select('*');

    const serializedBooks = books.map((book) => {
      const matchTags: string[] = [];
      for (let i = 0; i < tag_book.length; i++) {
        if (tag_book[i].book_id === book.id) {
          const tag = tag_book[i].tag_id;
          tags.map((item) => {
            if (item.id === tag) matchTags.push(String(item.name));
          });
        }
      }
      return {
        ...book,
        image_url: `http://${process.env.IMAGE_HOST}:3333/uploads/books/${book.image}`,
        tags: matchTags,
      };
    });

    return response.json(serializedBooks);
  }
  async show(request: Request, response: Response) {
    const book = await connection('books')
      .where('id', request.params.id)
      .first();
    if (!book) {
      return response.status(404).send({ error: 'Book not found' });
    }

    const tags = await connection('tags')
      .join('tag_book', 'tags.id', '=', 'tag_book.tag_id')
      .select('tags.name')
      .where('tag_book.book_id', request.params.id);

    book.image_url = `http://${process.env.IMAGE_HOST}:3333/uploads/books/${book.image}`;
    return response.json({ ...book, tags });
  }
  async create(request: Request, response: Response) {
    const { name, description, rate, author, price, tags } = request.body;
    const trx = await connection.transaction();

    const book = {
      image: request.file.filename,
      name,
      description,
      rate,
      author,
      price,
    };

    const insertedId = await trx('books').insert(book);
    const book_id = insertedId[0];

    const tagItems = tags
      .split(',')
      .map((tag: string) => Number(tag.trim()))
      .map((tag_id: number) => {
        return {
          book_id,
          tag_id,
        };
      });

    await trx('tag_book').insert(tagItems);
    await trx.commit();

    return response.json({
      id: book_id,
      book,
    });
  }
}

export default new BookController();
