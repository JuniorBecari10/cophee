import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

const steps = [
  { label: 'Pagamento confirmado' },
  { label: 'Em preparo' },
  { label: 'Pronto para retirada' },
  { label: 'Finalizado' },
];

export default function Status() {
  const { order } = useLocalSearchParams();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      i++;
      if (i >= steps.length) {
        clearInterval(interval);
        return;
      }

      setCurrentStep(i);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedido #{order}</Text>

      {steps.map((step, index) => (
        <View key={index} style={styles.row}>
          
          <View style={styles.timeline}>
            <View
              style={[
                styles.dot,
                index <= currentStep && styles.activeDot,
              ]}
            />
            {index < steps.length - 1 && (
              <View
                style={[
                  styles.line,
                  index < currentStep && styles.activeLine,
                ]}
              />
            )}
          </View>

          <Text
            style={[
              styles.text,
              index <= currentStep && styles.activeText,
            ]}
          >
            {step.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },

  title: {
    fontSize: 22,
    marginBottom: 30,
    color: Colors.text,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  timeline: {
    alignItems: 'center',
    marginRight: 12,
  },

  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.textLight,
  },

  activeDot: {
    backgroundColor: Colors.accent,
  },

  line: {
    width: 2,
    height: 40,
    backgroundColor: Colors.textLight,
  },

  activeLine: {
    backgroundColor: Colors.accent,
  },

  text: {
    color: Colors.textLight,
    marginBottom: 30,
  },

  activeText: {
    color: Colors.text,
    fontWeight: '600',
  },
});
