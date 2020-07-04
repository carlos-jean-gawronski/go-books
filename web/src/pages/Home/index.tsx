import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { GoBook } from 'react-icons/go';
import './styles.css';
import api from '../../services/api';

interface IBooks {
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

const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchBooks, setSearchBooks] = useState<IBooks[]>([]);
  const history = useHistory();
  function handleFormChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }
  function handleSpecific(book: IBooks) {
    history.push('/specific-book', { book });
  }
  async function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    await api.get(`search-book/${searchTerm}`).then((response) => {
      setSearchBooks(response.data);
    });
  }

  useEffect(() => {
    document.title = 'Home | Go-Books';
  }, []);
  return (
    <>
      <div id="content">
        <section>
          <h1>
            Welcome to Go-Books,
            <br /> your book review platform
          </h1>
          <p>The smart book finding</p>
          <div className="form">
            <form>
              <label>Search for your book</label>
              <div className="input">
                <input
                  type="text"
                  id="book"
                  value={searchTerm}
                  onChange={handleFormChange}
                />
                <button onClick={handleFormSubmit}>Search</button>
              </div>
            </form>
          </div>
          <div id="links">
            <Link to="/books">See all books</Link>
            <Link to="/register">Go to register page</Link>
          </div>
        </section>
        <div id="icon">
          <img
            src="http://localhost:3333/uploads/application/book-walpaper@web.jpg"
            alt=""
          />
          <GoBook />
        </div>
      </div>
      <div className="search-book-container">
        {searchBooks.length !== 0 && (
          <div className="search-books">
            {searchBooks.map((book) => (
              <div className="book-container" key={book.id}>
                <div id="book-image">
                  <img src={book.image_url} alt={book.name} />
                </div>
                <div id="book-content">
                  <h1>{book.name}</h1>
                  <h2>{book.author}</h2>
                  <p>{book.description}</p>
                  <div id="tags">
                    {book.tags.map((tag) => (
                      <p key={tag}>{tag}</p>
                    ))}
                  </div>
                  <div className="info">
                    <p>Rate:</p>
                    {book.rate > 3 ? (
                      <p id="good">{book.rate}</p>
                    ) : (
                      <p id="bad">{book.rate}</p>
                    )}
                  </div>
                  <div className="info">
                    <p>Price:</p>
                    {book.price === 0 ||
                    book.price === undefined ||
                    book.price === null ? (
                      <p id="good">Free on the Web</p>
                    ) : (
                      <p id="bad">{book.price}</p>
                    )}
                  </div>
                  <button onClick={() => handleSpecific(book)}>
                    Get to know
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
