import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../constants/colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

const steps = [
  { label: 'Pagamento confirmado' },
  { label: 'Em preparo' },
  { label: 'Pronto para retirada' },
  { label: 'Finalizado' },
];

const STEP_DURATION = 5; // seconds per step

export default function Status() {
  const { order } = useLocalSearchParams();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const totalDuration = steps.length * STEP_DURATION;
  const progress = seconds / totalDuration;

  const remaining = Math.max(totalDuration - seconds, 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        const next = prev + 1;

        // update step based on time
        const stepIndex = Math.min(
          Math.floor(next / STEP_DURATION),
          steps.length - 1
        );
        setCurrentStep(stepIndex);

        if (next >= totalDuration) {
          clearInterval(interval);
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.header}>Status</Text>
      <Text style={styles.subtitle}>Pedido #{order}</Text>

      <Text style={styles.eta}>
        {remaining > 0
          ? `Pronto em ${remaining}s`
          : 'Pedido finalizado'}
      </Text>

      <View style={styles.progressBg}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>

      <View style={styles.card}>
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

      <Pressable
        style={styles.button}
        onPress={() => router.replace('/(tabs)/home')}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },

  header: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 5,
    paddingTop: 10,
  },

  subtitle: {
    color: Colors.textLight,
    marginBottom: 10,
  },

  eta: {
    color: Colors.text,
    marginBottom: 10,
    fontWeight: '600',
  },

  progressBg: {
    height: 8,
    backgroundColor: Colors.backgroundDark,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },

  progressFill: {
    height: 8,
    backgroundColor: Colors.accent,
  },

  card: {
    backgroundColor: Colors.backgroundDark,
    borderRadius: 16,
    padding: 15,
    paddingTop: 25,
    paddingBottom: 0,
    marginBottom: 20,
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

  button: {
    backgroundColor: Colors.accent,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
