import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Dropzone from '../../components/Dropzone';
import api from '../../services/api';
import './styles.css';

interface IFetchTags {
  id: number;
  name: string;
}
const Register = () => {
  const [tag, setTag] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [fetchTags, setFetchTags] = useState<IFetchTags[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    description: '',
    price: '',
    rate: '',
  });

  useEffect(() => {
    document.title = 'Register new Book or Tag | Go-Books';
    api.get('/tags').then((response) => {
      setFetchTags(response.data);
    });
  }, []);
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSelectTag(id: number) {
    const alreadySelected = selectedTags.findIndex((tag) => tag === id);

    if (alreadySelected >= 0) {
      const filteredTags = selectedTags.filter((tag) => tag !== id);
      setSelectedTags(filteredTags);
    } else {
      setSelectedTags([...selectedTags, id]);
    }
    console.log(selectedTags);
  }

  function handleTagChange(e: ChangeEvent<HTMLInputElement>) {
    setTag(e.target.value);
  }
  async function handleTagSubmit(e: FormEvent) {
    e.preventDefault();
    await api.post('/tags', { name: tag });
    alert(`New tag: ${tag} created`);
  }

  async function handleBookSubmit(e: FormEvent) {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('author', formData.author);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('rate', formData.rate);
    data.append('tags', selectedTags.join(','));

    if (selectedFile) {
      data.append('image', selectedFile);
    }
    api.post('/book', data);
    alert(`New book: ${formData.name} created`);
  }
  return (
    <main>
      <section>
        <h1>Create a new book register</h1>
        <form>
          <Dropzone onFileUploaded={setSelectedFile} />
          <label htmlFor="bookName">Title of this book:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            onChange={handleInputChange}
          />
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            name="author"
            id="author"
            required
            onChange={handleInputChange}
          />
          <label htmlFor="desc">Description:</label>
          <input
            type="text"
            name="description"
            required
            id="description"
            onChange={handleInputChange}
          />
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            name="price"
            id="price"
            required
            onChange={handleInputChange}
          />
          <label htmlFor="rate">Rate:</label>
          <input
            type="text"
            name="rate"
            id="rate"
            required
            onChange={handleInputChange}
          />
          <label>Tags:</label>
          <ul className="tags">
            {fetchTags.map((tag) => (
              <li
                className={selectedTags.includes(tag.id) ? 'selected' : ''}
                key={tag.id}
                onClick={() => handleSelectTag(tag.id)}
              >
                {tag.name}
              </li>
            ))}
          </ul>
          <button onClick={handleBookSubmit}>Create</button>
        </form>
      </section>
      <section className="tag">
        <h1>Create a new tag</h1>
        <form>
          <label htmlFor="tagName">Name for this tag:</label>
          <input
            required
            type="text"
            name="tagName"
            value={tag}
            onChange={handleTagChange}
          />
          <button onClick={handleTagSubmit}>Create</button>
        </form>
      </section>
    </main>
  );
};

export default Register;
