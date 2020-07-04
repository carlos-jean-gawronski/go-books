import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export interface IBook {
  author: string;
  description: string;
  id: number;
  image: string;
  image_url: string;
  name: string;
  price: number;
  rate: number;
  tags: string[];
}

const Books = () => {
  const [books, setBooks] = useState<IBook[]>();
  async function loadBooks() {
    await api.get('/book').then((response) => {
      setBooks(response.data);
    });
  }
  const history = useHistory();
  function handleGoSpecific(book: IBook) {
    history.push('/specific-book', { book });
  }
  useEffect(() => {
    loadBooks();
    document.title = 'Books | Go-Books';
  }, []);
  return (
    <div id="container">
      <div className="content">
        <h1>Find a book for yourself</h1>
        {books === undefined || books.length === 0 ? (
          <h1 className="nbf">No book found</h1>
        ) : (
          books.map((book) => (
            <section key={book.id}>
              <div className="book">
                <img src={book.image_url} alt={book.name} />
                <div className="desc">
                  <h1>{book.name}</h1>
                  <p className="author">{book.author}</p>
                  <div id="tags">
                    {book.tags.map((tag) => (
                      <p key={tag}>{tag}</p>
                    ))}
                  </div>
                  <p>{book.description}</p>
                  <div className="info">
                    <p>Rate: </p>
                    {book.rate > 3 ? (
                      <p className="good">{book.rate}</p>
                    ) : (
                      <p className="bad">{book.rate}</p>
                    )}
                  </div>
                  <div className="info price">
                    <p>Price: </p>
                    {book.price === undefined ||
                    book.price === null ||
                    book.price === 0 ? (
                      <p className="good">Free on the web</p>
                    ) : (
                      <p className="bad">{book.price}</p>
                    )}
                  </div>

                  <button
                    className="get-know"
                    onClick={() => handleGoSpecific(book)}
                  >
                    Get to know
                  </button>
                </div>
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
};

export default Books;
