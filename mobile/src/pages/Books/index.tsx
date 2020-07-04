import React, { useEffect, useState } from 'react';
import { Ionicons as Icon } from '@expo/vector-icons';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import api from '../../services/api';

export interface IBook {
  id: number;
  name: string;
  image_url: string;
  image: string;
  tags: string[];
  description: string;
  rate: number;
  author: string;
  price: number;
}

const Books = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const navigation = useNavigation();
  async function loadBooks() {
    await api.get('book').then((response) => {
      setBooks(response.data);
    });
  }

  function handleButtonPress(book: IBook) {
    navigation.navigate('BookDetail', { book: book });
  }
  useEffect(() => {
    loadBooks();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.booksTitle}>Books</Text>
        {books !== undefined ? (
          books.map((book) => (
            <View style={styles.wrapper} key={book.id}>
              <View style={styles.bookContainer}>
                <View style={styles.imageCont}>
                  <Image
                    source={{ uri: book.image_url }}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.content}>
                  <Text style={styles.bookTitle}>{book.name}</Text>
                  <Text style={styles.bookAuthor}>{book.author}</Text>
                  <View style={styles.tagsCont}>
                    {book.tags.map((tag) => (
                      <Text style={styles.tags} key={tag}>
                        {tag}
                      </Text>
                    ))}
                  </View>
                  <Text style={styles.bookDescrip}>
                    {book.description.length > 40
                      ? `${book.description.slice(0, 40)}...`
                      : book.description}
                  </Text>
                  <Text style={styles.bookInfo}>
                    Rate:{' '}
                    {book.rate > 3 ? (
                      <Text
                        style={{
                          color: '#0b0',
                          fontWeight: 'bold',
                          marginLeft: 3,
                        }}
                      >
                        {book.rate}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color: '#e00',
                          fontWeight: 'bold',
                          marginLeft: 3,
                        }}
                      >
                        {book.rate}
                      </Text>
                    )}
                  </Text>
                  <Text style={styles.bookInfo}>
                    Price:{' '}
                    {book.rate === null ||
                    book.rate === undefined ||
                    book.rate === 0 ? (
                      <Text
                        style={{
                          color: '#0b0',
                          fontWeight: 'bold',
                          marginLeft: 3,
                        }}
                      >
                        Free on the web
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color: '#e00',
                          fontWeight: 'bold',
                          marginLeft: 3,
                        }}
                      >
                        {book.price}
                      </Text>
                    )}
                  </Text>
                </View>
              </View>
              <RectButton
                style={styles.button}
                onPress={() => handleButtonPress(book)}
              >
                <View style={styles.buttonIcon}>
                  <Icon name="ios-search" size={25} color="#f0f0f5" />
                </View>
                <Text style={styles.buttonText}>Check it out</Text>
              </RectButton>
            </View>
          ))
        ) : (
          <View />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    width: 350,
    height: 200,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  bookContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  booksTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#714abe',
    marginVertical: 10,
    marginTop: 40,
  },
  imageCont: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
    padding: 5,
    borderRadius: 5,
  },
  content: {
    marginLeft: 7,
  },
  bookTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  bookAuthor: {
    color: '#777',
    marginBottom: 5,
  },
  bookDescrip: {
    color: '#444',
  },
  bookInfo: {},
  button: {
    backgroundColor: '#714abe',
    height: 50,
    width: 300,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 5,
  },
  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontSize: 16,
  },
  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagsCont: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  tags: {
    color: '#333',
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#eee',
    marginRight: 5,
  },
});

export default Books;
