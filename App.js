import { StyleSheet, Text, View } from 'react-native';
import StepCounter from './components/StepCounter';
export default function App() {
  return (
    <View style={styles.container}>
      <StepCounter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
