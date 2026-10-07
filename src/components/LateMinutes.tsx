import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type LateMinutesProps = {
  minutes: string;
  onMinutesChange: (minutes: string) => void;
  onSave: () => void;
};

export default function LateMinutes({
  minutes,
  onMinutesChange,
  onSave,
}: LateMinutesProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How many minutes late?</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={minutes}
          onChangeText={onMinutesChange}
          placeholder="Minutes"
          keyboardType="number-pad"
        />

        <Text style={styles.minutesText}>minutes</Text>

        <Pressable style={styles.button} onPress={onSave}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    marginTop: 10,
    marginBottom: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  input: {
    width: 90,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 9,
    fontSize: 15,
  },

  minutesText: {
    fontSize: 14,
    color: '#555555',
  },

  button: {
    backgroundColor: '#222222',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});