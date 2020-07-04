import React from 'react';
import { FontAwesome5 as Icon } from '@expo/vector-icons';
import { View, Text, StyleSheet, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { HOST_ADD } from '../../../credentials.json';

const Home = () => {
  const navigation = useNavigation();
  function handleNavigateToBooks() {
    navigation.navigate('Books');
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 170,
        }}
      >
        <Text style={styles.appName}>Go-Books</Text>
        <Image
          source={{
            uri: `http://${HOST_ADD}:3333/uploads/application/book-walpaper@web.jpg`,
          }}
          style={styles.image}
        />
      </View>
      <Text style={styles.desc}>The easiest way to find your good books</Text>
      <RectButton style={styles.button} onPress={handleNavigateToBooks}>
        <View style={styles.buttonIcon}>
          <Icon name="book" size={20} color="#f0f0f5" />
        </View>
        <Text style={styles.buttonText}>Go to books screen</Text>
      </RectButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    color: '#714abe',
    fontSize: 40,
    marginRight: 30,
    fontWeight: 'bold',
    textShadowColor: '#3c00ff',
    textShadowRadius: 7,
  },
  button: {
    backgroundColor: '#714abe',
    height: 60,
    width: 320,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 38,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
  },
  desc: {
    fontSize: 20,
    color: '#777',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default Home;
