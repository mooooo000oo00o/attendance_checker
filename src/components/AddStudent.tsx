import { useState } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

type AddStudentProps = {
  onAddStudent: (name: string) => void;
};

export default function AddStudent({
  onAddStudent,
}: AddStudentProps) {
  const [name, setName] = useState('');

  const handleAddStudent = () => {
    const trimmedName = name.trim();

    if (trimmedName === '') {
      return;
    }

    onAddStudent(trimmedName);
    setName('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter student name"
        value={name}
        onChangeText={setName}
      />

      <Pressable
        style={styles.button}
        onPress={handleAddStudent}
      >
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },

  input: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },

  button: {
    backgroundColor: '#222222',
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});