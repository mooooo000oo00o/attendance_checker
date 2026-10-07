import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },

  scrollView: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    backgroundColor: '#102A43',
    borderRadius: 16,
    padding: 22,
    marginBottom: 20,
  },

  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
  },

  subtitle: {
    color: '#D9E2EC',
    fontSize: 14,
    marginTop: 5,
  },

  recordsButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
    marginLeft: 10,
  },

  recordsButtonText: {
    color: '#102A43',
    fontSize: 13,
    fontWeight: '700',
  },

  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#E1E8F0',
  },

  sectionLabel: {
    color: '#486581',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 7,
    letterSpacing: 0.5,
  },

  subjectLabel: {
    marginTop: 16,
  },

  sectionInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 15,
    color: '#102A43',
  },

  dateContainer: {
    marginTop: 16,
  },

  timeContainer: {
    marginTop: 14,
  },

  dateLabel: {
    color: '#486581',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  date: {
    color: '#102A43',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 4,
  },

  sectionTitle: {
    color: '#102A43',
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 10,
  },

  studentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 10,
  },

  studentsTitle: {
    color: '#102A43',
    fontSize: 19,
    fontWeight: '700',
  },

  studentCount: {
    color: '#627D98',
    fontSize: 13,
  },

  columnHeaders: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9F2FF',
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 12,
    marginBottom: 8,
  },

  nameHeader: {
    flex: 1,
    color: '#334E68',
    fontSize: 11,
    fontWeight: '700',
  },

  columnText: {
    width: 40,
    color: '#334E68',
    fontSize: 9,
    fontWeight: '700',
    textAlign: 'center',
  },

  studentsList: {
    marginBottom: 18,
  },

  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E1E8F0',
    padding: 24,
    alignItems: 'center',
  },

  emptyTitle: {
    color: '#243B53',
    fontSize: 16,
    fontWeight: '700',
  },

  emptyText: {
    color: '#829AB1',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 19,
  },

  saveButton: {
    backgroundColor: '#1976D2',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  recordsHeader: {
    backgroundColor: '#102A43',
    borderRadius: 16,
    padding: 22,
    marginBottom: 22,
  },

  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 18,
  },

  backButtonText: {
    color: '#102A43',
    fontSize: 13,
    fontWeight: '700',
  },

  recordsTitle: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '700',
  },

  recordsTitleDark: {
    color: '#102A43',
    fontSize: 25,
    fontWeight: '700',
    marginTop: 20,
  },

  recordsSubject: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    marginTop: 7,
  },

  recordsSubtitle: {
    color: '#D9E2EC',
    fontSize: 14,
    marginTop: 5,
  },

  recordsTime: {
    color: '#BCCCDC',
    fontSize: 13,
    marginTop: 5,
  },

  recordsSectionTitle: {
    color: '#102A43',
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 12,
  },

  sectionRecordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E1E8F0',
    padding: 18,
    marginBottom: 10,
  },

  sectionRecordContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  sectionRecordText: {
    flex: 1,
  },

  sectionRecordName: {
    color: '#102A43',
    fontSize: 17,
    fontWeight: '700',
  },

  sectionRecordCount: {
    color: '#627D98',
    fontSize: 13,
    marginTop: 5,
  },

  arrow: {
    color: '#1976D2',
    fontSize: 30,
    fontWeight: '300',
    marginLeft: 10,
  },

  dateRecordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E1E8F0',
    padding: 18,
    marginBottom: 10,
  },

  dateRecordContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dateRecordText: {
    flex: 1,
  },

  dateRecordName: {
    color: '#102A43',
    fontSize: 16,
    fontWeight: '700',
  },

  dateRecordTime: {
    color: '#1976D2',
    fontSize: 13,
    marginTop: 5,
  },

  dateRecordCount: {
    color: '#627D98',
    fontSize: 13,
    marginTop: 5,
  },

  emptyRecords: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E1E8F0',
    padding: 28,
    alignItems: 'center',
  },

  emptyRecordsTitle: {
    color: '#243B53',
    fontSize: 17,
    fontWeight: '700',
  },

  emptyRecordsText: {
    color: '#829AB1',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 7,
  },

  recordSummary: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E1E8F0',
    padding: 16,
    flexDirection: 'row',
    marginBottom: 22,
  },

  recordSummaryItem: {
    flex: 1,
    alignItems: 'center',
  },

  recordSummaryNumber: {
    color: '#102A43',
    fontSize: 20,
    fontWeight: '700',
  },

  recordSummaryLabel: {
    color: '#627D98',
    fontSize: 11,
    marginTop: 4,
  },

  attendanceRecordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E1E8F0',
    padding: 16,
    marginBottom: 10,
  },

  attendanceStudentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  attendanceStudentName: {
    flex: 1,
    color: '#243B53',
    fontSize: 15,
    fontWeight: '600',
    marginRight: 10,
  },

  statusBadgePresent: {
    backgroundColor: '#E8F5E9',
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },

  statusBadgeLate: {
    backgroundColor: '#FFF4E5',
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 7,
    alignItems: 'center',
  },

  statusBadgeAbsent: {
    backgroundColor: '#FDECEC',
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },

  statusBadgeText: {
    color: '#243B53',
    fontSize: 12,
    fontWeight: '700',
  },

  lateMinutesText: {
    color: '#627D98',
    fontSize: 10,
    marginTop: 2,
  },

  deleteRecordButton: {
    backgroundColor: '#B42318',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },

  deleteRecordButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default styles;