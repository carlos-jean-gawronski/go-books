import { Request, Response } from 'express';
import connection from '../database/connection';

class TagController {
  async index(request: Request, response: Response) {
    const tags = await connection('tags').select('*');
    const sanitizedTags = tags.map((tag) => {
      return {
        id: tag.id,
        name: tag.name,
      };
    });
    return response.json(sanitizedTags);
  }
  async show(request: Request, response: Response) {
    const tag = await connection('tags')
      .select('*')
      .where('id', request.params.id)
      .first();
    const sanitizedTags = {
      id: tag.id,
      name: tag.name,
    };
    return response.json(sanitizedTags);
  }
  async create(request: Request, response: Response) {
    const { name } = request.body;
    const tag = await connection('tags').insert({ name });
    return response.json({
      id: tag[0],
      name,
    });
  }
}

export default new TagController();
