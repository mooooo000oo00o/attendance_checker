import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export type AttendanceStatus =
  | 'present'
  | 'late'
  | 'absent'
  | null;

type StudentRowProps = {
  name: string;
  status: AttendanceStatus;
  lateMinutes: string;
  onStatusChange: (status: AttendanceStatus) => void;
  onLateMinutesChange: (minutes: string) => void;
  onDelete: () => void;
};

export default function StudentRow({
  name,
  status,
  lateMinutes,
  onStatusChange,
  onLateMinutesChange,
  onDelete,
}: StudentRowProps) {
  const handleDelete = () => {
    Alert.alert(
      'Remove Student',
      `Are you sure you want to remove ${name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: onDelete,
        },
      ]
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text
          style={styles.name}
          numberOfLines={1}
        >
          {name}
        </Text>

        <View style={styles.statusColumn}>
          <Pressable
            style={[
              styles.box,
              status === 'present' && styles.selectedBox,
            ]}
            onPress={() =>
              onStatusChange('present')
            }
          >
            <Text style={styles.check}>
              {status === 'present' ? '✓' : ''}
            </Text>
          </Pressable>
        </View>

        <View style={styles.statusColumn}>
          <Pressable
            style={[
              styles.box,
              status === 'late' && styles.selectedBox,
            ]}
            onPress={() =>
              onStatusChange('late')
            }
          >
            <Text style={styles.check}>
              {status === 'late' ? '✓' : ''}
            </Text>
          </Pressable>
        </View>

        <View style={styles.statusColumn}>
          <Pressable
            style={[
              styles.box,
              status === 'absent' && styles.selectedBox,
            ]}
            onPress={() =>
              onStatusChange('absent')
            }
          >
            <Text style={styles.check}>
              {status === 'absent' ? '✓' : ''}
            </Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.deleteText}>
            Delete
          </Text>
        </Pressable>
      </View>

      {status === 'late' && (
        <View style={styles.lateContainer}>
          <Text style={styles.lateLabel}>
            Minutes late:
          </Text>

          <TextInput
            style={styles.lateInput}
            value={lateMinutes}
            onChangeText={onLateMinutesChange}
            placeholder="0"
            keyboardType="number-pad"
          />

          <Text style={styles.minuteText}>
            minutes
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 8,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E1E8F0',
  },

  name: {
    flex: 1,
    color: '#243B53',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
  },

  statusColumn: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  box: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: '#9FB3C8',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  selectedBox: {
    backgroundColor: '#1976D2',
    borderColor: '#1976D2',
  },

  check: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
  },

  deleteButton: {
    width: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },

  deleteText: {
    color: '#B42318',
    fontSize: 11,
    fontWeight: '600',
  },

  lateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E1E8F0',
  },

  lateLabel: {
    color: '#627D98',
    fontSize: 13,
    marginRight: 8,
  },

  lateInput: {
    width: 60,
    height: 34,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    paddingHorizontal: 8,
    textAlign: 'center',
    color: '#243B53',
    backgroundColor: '#F8FAFC',
  },

  minuteText: {
    color: '#627D98',
    fontSize: 13,
    marginLeft: 6,
  },
});