import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import BookController from './controllers/BookController';
import TagController from './controllers/TagController';

const routes = Router();
const upload = multer(multerConfig);

routes.get('/book', BookController.index);
routes.get('/book/:id', BookController.show);
routes.get('/search-book/:name', BookController.getByName);
routes.post('/book', upload.single('image'), BookController.create);

routes.get('/tags', TagController.index);
routes.get('/tags/:id', TagController.show);
routes.post('/tags', TagController.create);

export default routes;
