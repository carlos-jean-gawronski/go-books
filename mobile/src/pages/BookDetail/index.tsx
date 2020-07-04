import React, { useEffect, useState } from 'react';
import { Ionicons as Icon } from '@expo/vector-icons';
import { AntDesign as AntIcon } from '@expo/vector-icons';
import { Text, StyleSheet, View, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import { IBook } from '../Books';

interface Params {
  book: IBook;
}

const BookDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const routeParams = route.params as Params;
  function handleGoBack() {
    navigation.goBack();
  }
  function handleButtonPress(s: string) {
    let queryUrl;
    if (s === 'google') {
      queryUrl = `http://www.google.com/search?q=${routeParams.book.name}`;
    }
    if (s === 'amazon') {
      queryUrl = `https://www.amazon.com/s?k=${routeParams.book.name}`;
    }
    navigation.navigate('BookSearch', { queryUrl: queryUrl });
  }
  return (
    <View style={styles.container}>
      <View style={styles.goback}>
        <RectButton style={styles.gobackButton} onPress={handleGoBack}>
          <View>
            <AntIcon name="arrowleft" size={30} color="#f0f0f5" />
          </View>
          <Text style={styles.gobackText}>Go Back</Text>
        </RectButton>
      </View>
      <Text style={styles.bookTitle}>{routeParams.book.name}</Text>
      <Text style={styles.bookAuthor}>{routeParams.book.author}</Text>
      <Image
        source={{ uri: routeParams.book.image_url }}
        style={styles.image}
      />
      <Text style={styles.bookDescription}>{routeParams.book.description}</Text>
      <View style={styles.tags}>
        {routeParams.book.tags.map((tag) => (
          <Text style={styles.tagLabel} key={tag}>
            {tag}
          </Text>
        ))}
      </View>
      <Text style={styles.bookInfo}>
        Rate:{' '}
        {routeParams.book.rate > 3 ? (
          <Text style={{ marginLeft: 5, color: '#0b0', fontWeight: 'bold' }}>
            {routeParams.book.rate}
          </Text>
        ) : (
          <Text style={{ marginLeft: 5, color: '#e00', fontWeight: 'bold' }}>
            {routeParams.book.rate}
          </Text>
        )}
      </Text>
      <Text style={styles.bookInfo}>
        Price:{' '}
        {routeParams.book.rate === null ||
        routeParams.book.rate === undefined ||
        routeParams.book.rate === 0 ? (
          <Text style={{ marginLeft: 5, color: '#0b0', fontWeight: 'bold' }}>
            Free on the web
          </Text>
        ) : (
          <Text style={{ marginLeft: 5, color: '#e00', fontWeight: 'bold' }}>
            {routeParams.book.price}
          </Text>
        )}
      </Text>
      <View style={styles.buttonsContainer}>
        <RectButton
          style={{ ...styles.buttonsContent, backgroundColor: '#d13030' }}
          onPress={() => handleButtonPress('google')}
        >
          <View>
            <AntIcon name="google" size={25} color="#f0f0f5" />
          </View>
          <Text style={styles.buttonText}>Search on Google</Text>
        </RectButton>
        <RectButton
          style={{ ...styles.buttonsContent, backgroundColor: '#e89733' }}
          onPress={() => handleButtonPress('amazon')}
        >
          <View>
            <AntIcon name="amazon" size={25} color="#f0f0f5" />
          </View>
          <Text style={styles.buttonText}>Search on Amazon</Text>
        </RectButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookTitle: {
    color: '#333',
    fontSize: 30,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowRadius: 3,
  },
  bookAuthor: {
    color: '#444',
    fontSize: 16,
  },
  bookDescription: {
    color: '#777',
    marginBottom: 10,
  },
  bookInfo: {
    color: '#555',
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
  },
  buttonsContent: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 15,
  },
  buttonText: {
    marginLeft: 10,
    color: '#f0f0f5',
  },
  goback: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  gobackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#714abe',
    padding: 7,
    borderRadius: 20,
  },
  gobackText: {
    color: '#f0f0f5',
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 15,
  },
  tags: {},
  tagLabel: {},
});
export default BookDetail;
