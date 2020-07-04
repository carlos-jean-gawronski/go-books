import React from 'react';
import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';

interface Params {
  queryUrl: string;
}

const BookSearch = () => {
  const route = useRoute();

  const routeParams = route.params as Params;
  return (
    <>
      <StatusBar hidden />
      <WebView
        source={{ uri: routeParams.queryUrl }}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      />
    </>
  );
};

export default BookSearch;
