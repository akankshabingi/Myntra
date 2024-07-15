import React from 'react';
import {SafeAreaView} from 'react-native';
import BodyShapeCalculator from './BodyShapeCalculator'; // Adjust the path if needed

const App: React.FC = () => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{flex: 1}}>
      <BodyShapeCalculator />
    </SafeAreaView>
  );
};

export default App;
