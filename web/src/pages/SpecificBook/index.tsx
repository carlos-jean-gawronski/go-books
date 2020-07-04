import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaGoogle, FaAmazon } from 'react-icons/fa';

import { IBook } from '../Books';
import './styles.css';

interface IBookProp {
  book: IBook;
}

const SpecificBook = () => {
  const loc = useLocation<IBookProp>();
  const book: IBook = loc.state.book;
  useEffect(() => {
    document.title = `Book: ${book.name}| Go-Books`;
  }, []);
  return (
    <>
      <div className="container">
        <div id="img">
          <img src={book.image_url} alt={book.name} />
        </div>
        <div className="book-desc">
          <h1>{book.name}</h1>
          <p className="author">{book.author}</p>
          <p className="descrip">{book.description}</p>
          <div id="tags">
            {book.tags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </div>
          <div className="info">
            <p>Rate:</p>
            {book.rate > 3 ? (
              <p className="good">{book.rate}</p>
            ) : (
              <p className="bad">{book.rate}</p>
            )}
          </div>
          <div className="info price">
            <p>Price:</p>
            {book.price === undefined ||
            book.price === null ||
            book.price === 0 ? (
              <p className="good">Free on the web</p>
            ) : (
              <p className="bad">{book.price}</p>
            )}
          </div>
        </div>
      </div>
      <div className="lnks">
        <div className="google btn">
          <FaGoogle />
          <a
            href={`http://www.google.com/search?q=${book.name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Find it on Google
          </a>
        </div>
        <div className="amazon btn">
          <FaAmazon />
          <a
            href={`https://www.amazon.com/s?k=${book.name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Find it on Amazon
          </a>
        </div>
      </div>
    </>
  );
};

export default SpecificBook;
