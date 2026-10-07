import { StyleSheet, Text, View } from 'react-native';

type AttendanceSummaryProps = {
  total: number;
  present: number;
  late: number;
  absent: number;
};

export default function AttendanceSummary({
  total,
  present,
  late,
  absent,
}: AttendanceSummaryProps) {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.number}>{total}</Text>
        <Text style={styles.label}>Total</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.number}>{present}</Text>
        <Text style={styles.label}>Present</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.number}>{late}</Text>
        <Text style={styles.label}>Late</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.number}>{absent}</Text>
        <Text style={styles.label}>Absent</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },

  item: {
    alignItems: 'center',
    flex: 1,
  },

  number: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  label: {
    fontSize: 13,
    color: '#666666',
    marginTop: 4,
  },
});