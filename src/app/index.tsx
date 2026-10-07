import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

import AddStudent from '../components/AddStudent';
import AttendanceSummary from '../components/AttendanceSummary';
import StudentRow, {
  AttendanceStatus,
} from '../components/StudentRow';

import styles from '../styles/attendanceStyles';

type Student = {
  id: number;
  name: string;
  status: AttendanceStatus;
  lateMinutes: string;
};

type AttendanceRecord = {
  subject?: string;
  date: string;
  time: string;
  students: Student[];
};

type AttendanceRecords = Record<
  string,
  AttendanceRecord[]
>;

const RECORDS_STORAGE_KEY = 'attendance_records';

export default function AttendanceChecker() {
  const [section, setSection] = useState('');
  const [subject, setSubject] = useState('');
  const [students, setStudents] = useState<Student[]>([]);

  const [showRecords, setShowRecords] =
    useState(false);

  const [selectedSection, setSelectedSection] =
    useState<string | null>(null);

  const [selectedSubject, setSelectedSubject] =
    useState<string | null>(null);

  const [selectedDate, setSelectedDate] =
    useState<string | null>(null);

  const [savedRecords, setSavedRecords] =
    useState<AttendanceRecords>({});

  /*
   * AUTOMATIC DATE AND TIME
   */
  const today = new Date();

  const formattedDate = today.toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  const formattedTime = today.toLocaleTimeString(
    'en-US',
    {
      hour: 'numeric',
      minute: '2-digit',
    }
  );

  const presentCount = useMemo(
    () =>
      students.filter(
        (student) =>
          student.status === 'present'
      ).length,
    [students]
  );

  const lateCount = useMemo(
    () =>
      students.filter(
        (student) =>
          student.status === 'late'
      ).length,
    [students]
  );

  const absentCount = useMemo(
    () =>
      students.filter(
        (student) =>
          student.status === 'absent'
      ).length,
    [students]
  );

  /*
   * LOAD SAVED RECORDS
   */
  const loadRecords = async () => {
    try {
      const storedRecords =
        await AsyncStorage.getItem(
          RECORDS_STORAGE_KEY
        );

      if (storedRecords) {
        setSavedRecords(
          JSON.parse(storedRecords)
        );
      } else {
        setSavedRecords({});
      }
    } catch (error) {
      console.log(
        'Load records error:',
        error
      );
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  /*
   * OPEN RECORDS
   */
  const handleOpenRecords = async () => {
    await loadRecords();

    setShowRecords(true);
    setSelectedSection(null);
    setSelectedSubject(null);
    setSelectedDate(null);
  };

  /*
   * BACK TO ATTENDANCE
   */
  const handleBackToAttendance = () => {
    setShowRecords(false);
    setSelectedSection(null);
    setSelectedSubject(null);
    setSelectedDate(null);
  };

  /*
   * OPEN SECTION
   */
  const handleOpenSection = (
    sectionName: string
  ) => {
    setSelectedSection(sectionName);
    setSelectedSubject(null);
    setSelectedDate(null);
  };

  /*
   * BACK TO SECTIONS
   */
  const handleBackToSections = () => {
    setSelectedSection(null);
    setSelectedSubject(null);
    setSelectedDate(null);
  };

  /*
   * OPEN SUBJECT
   */
  const handleOpenSubject = (
    subjectName: string
  ) => {
    setSelectedSubject(subjectName);
    setSelectedDate(null);
  };

  /*
   * BACK TO SUBJECTS
   */
  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setSelectedDate(null);
  };

  /*
   * OPEN DATE
   */
  const handleOpenDate = (date: string) => {
    setSelectedDate(date);
  };

  /*
   * BACK TO DATES
   */
  const handleBackToDates = () => {
    setSelectedDate(null);
  };

  /*
   * CHANGE ATTENDANCE STATUS
   */
  const handleStatusChange = (
    id: number,
    status: AttendanceStatus
  ) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === id
          ? {
              ...student,
              status,
              lateMinutes:
                status === 'late'
                  ? student.lateMinutes
                  : '',
            }
          : student
      )
    );
  };

  /*
   * CHANGE LATE MINUTES
   */
  const handleLateMinutesChange = (
    id: number,
    minutes: string
  ) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === id
          ? {
              ...student,
              lateMinutes: minutes,
            }
          : student
      )
    );
  };

  /*
   * DELETE STUDENT
   */
  const handleDeleteStudent = (id: number) => {
    setStudents((currentStudents) =>
      currentStudents.filter(
        (student) =>
          student.id !== id
      )
    );
  };

  /*
   * ADD STUDENT
   */
  const handleAddStudent = (name: string) => {
    const newStudent: Student = {
      id: Date.now(),
      name,
      status: null,
      lateMinutes: '',
    };

    setStudents((currentStudents) => [
      ...currentStudents,
      newStudent,
    ]);
  };

  /*
   * SAVE ATTENDANCE
   */
  const handleSaveAttendance = async () => {
    if (section.trim() === '') {
      Alert.alert(
        'Section Required',
        'Please enter the section first.'
      );
      return;
    }

    if (subject.trim() === '') {
      Alert.alert(
        'Subject Required',
        'Please enter the subject first.'
      );
      return;
    }

    if (students.length === 0) {
      Alert.alert(
        'No Students',
        'Please add at least one student.'
      );
      return;
    }

    const hasUnmarkedStudents =
      students.some(
        (student) =>
          student.status === null
      );

    if (hasUnmarkedStudents) {
      Alert.alert(
        'Attendance Incomplete',
        'Please mark Present, Late, or Absent for every student.'
      );
      return;
    }

    const hasLateWithoutMinutes =
      students.some(
        (student) =>
          student.status === 'late' &&
          student.lateMinutes.trim() === ''
      );

    if (hasLateWithoutMinutes) {
      Alert.alert(
        'Minutes Required',
        'Please enter the minutes late for every late student.'
      );
      return;
    }

    try {
      const existingData =
        await AsyncStorage.getItem(
          RECORDS_STORAGE_KEY
        );

      const allRecords: AttendanceRecords =
        existingData
          ? JSON.parse(existingData)
          : {};

      const sectionName = section.trim();
      const subjectName = subject.trim();

      if (!allRecords[sectionName]) {
        allRecords[sectionName] = [];
      }

      const newRecord: AttendanceRecord = {
        subject: subjectName,
        date: formattedDate,
        time: formattedTime,
        students: students,
      };

      /*
       * SAME SECTION + SUBJECT + DATE
       * WILL UPDATE THE EXISTING RECORD
       */
      const existingDateIndex =
        allRecords[sectionName].findIndex(
          (record) =>
            record.date === formattedDate &&
            (record.subject ||
              'No Subject') ===
              subjectName
        );

      if (existingDateIndex >= 0) {
        allRecords[sectionName][
          existingDateIndex
        ] = newRecord;
      } else {
        allRecords[sectionName].unshift(
          newRecord
        );
      }

      await AsyncStorage.setItem(
        RECORDS_STORAGE_KEY,
        JSON.stringify(allRecords)
      );

      setSavedRecords(allRecords);

      Alert.alert(
        'Attendance Saved',
        `Attendance for ${sectionName} - ${subjectName} has been saved successfully.`
      );
    } catch (error) {
      console.log(
        'Save attendance error:',
        error
      );

      Alert.alert(
        'Save Error',
        'Something went wrong while saving the attendance.'
      );
    }
  };

  /*
   * DELETE ONE SAVED RECORD
   */
  const handleDeleteRecord = () => {
    if (
      selectedSection === null ||
      selectedSubject === null ||
      selectedDate === null
    ) {
      return;
    }

    Alert.alert(
      'Delete Record',
      `Are you sure you want to delete the attendance record for ${selectedSubject} on ${selectedDate}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const existingData =
                await AsyncStorage.getItem(
                  RECORDS_STORAGE_KEY
                );

              if (!existingData) {
                return;
              }

              const allRecords: AttendanceRecords =
                JSON.parse(existingData);

              const sectionRecords =
                allRecords[selectedSection] ||
                [];

              const updatedRecords =
                sectionRecords.filter(
                  (record) =>
                    !(
                      record.date ===
                        selectedDate &&
                      (record.subject ||
                        'No Subject') ===
                        selectedSubject
                    )
                );

              if (updatedRecords.length === 0) {
                delete allRecords[
                  selectedSection
                ];
              } else {
                allRecords[
                  selectedSection
                ] = updatedRecords;
              }

              await AsyncStorage.setItem(
                RECORDS_STORAGE_KEY,
                JSON.stringify(allRecords)
              );

              setSavedRecords(allRecords);

              setSelectedDate(null);

              Alert.alert(
                'Record Deleted',
                `The attendance record for ${selectedSubject} on ${selectedDate} has been deleted.`
              );
            } catch (error) {
              console.log(
                'Delete record error:',
                error
              );

              Alert.alert(
                'Delete Error',
                'Something went wrong while deleting the record.'
              );
            }
          },
        },
      ]
    );
  };

  /*
   * RECORDS - STUDENT DETAILS
   */
  if (
    showRecords &&
    selectedSection !== null &&
    selectedSubject !== null &&
    selectedDate !== null
  ) {
    const sectionRecords =
      savedRecords[selectedSection] || [];

    const selectedRecord =
      sectionRecords.find(
        (record) =>
          record.date === selectedDate &&
          (record.subject ||
            'No Subject') ===
            selectedSubject
      );

    if (!selectedRecord) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <Pressable
              style={styles.backButton}
              onPress={handleBackToDates}
            >
              <Text
                style={styles.backButtonText}
              >
                ← Dates
              </Text>
            </Pressable>

            <Text
              style={styles.recordsTitleDark}
            >
              Record Not Found
            </Text>
          </View>
        </SafeAreaView>
      );
    }

    const recordPresentCount =
      selectedRecord.students.filter(
        (student) =>
          student.status === 'present'
      ).length;

    const recordLateCount =
      selectedRecord.students.filter(
        (student) =>
          student.status === 'late'
      ).length;

    const recordAbsentCount =
      selectedRecord.students.filter(
        (student) =>
          student.status === 'absent'
      ).length;

    return (
      <SafeAreaView
        style={styles.safeArea}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={
            styles.content
          }
          showsVerticalScrollIndicator={false}
        >
          <View
            style={styles.recordsHeader}
          >
            <Pressable
              style={styles.backButton}
              onPress={handleBackToDates}
            >
              <Text
                style={styles.backButtonText}
              >
                ← Dates
              </Text>
            </Pressable>

            <Text
              style={styles.recordsTitle}
            >
              {selectedSection}
            </Text>

            <Text
              style={styles.recordsSubject}
            >
              {selectedSubject}
            </Text>

            <Text
              style={styles.recordsSubtitle}
            >
              {selectedDate}
            </Text>

            <Text
              style={styles.recordsTime}
            >
              {selectedRecord.time}
            </Text>
          </View>

          <View
            style={styles.recordSummary}
          >
            <View
              style={
                styles.recordSummaryItem
              }
            >
              <Text
                style={
                  styles.recordSummaryNumber
                }
              >
                {selectedRecord.students.length}
              </Text>

              <Text
                style={
                  styles.recordSummaryLabel
                }
              >
                Total
              </Text>
            </View>

            <View
              style={
                styles.recordSummaryItem
              }
            >
              <Text
                style={
                  styles.recordSummaryNumber
                }
              >
                {recordPresentCount}
              </Text>

              <Text
                style={
                  styles.recordSummaryLabel
                }
              >
                Present
              </Text>
            </View>

            <View
              style={
                styles.recordSummaryItem
              }
            >
              <Text
                style={
                  styles.recordSummaryNumber
                }
              >
                {recordLateCount}
              </Text>

              <Text
                style={
                  styles.recordSummaryLabel
                }
              >
                Late
              </Text>
            </View>

            <View
              style={
                styles.recordSummaryItem
              }
            >
              <Text
                style={
                  styles.recordSummaryNumber
                }
              >
                {recordAbsentCount}
              </Text>

              <Text
                style={
                  styles.recordSummaryLabel
                }
              >
                Absent
              </Text>
            </View>
          </View>

          <Text
            style={styles.recordsSectionTitle}
          >
            Student Attendance
          </Text>

          {selectedRecord.students.map(
            (student) => (
              <View
                key={student.id}
                style={
                  styles.attendanceRecordCard
                }
              >
                <View
                  style={
                    styles.attendanceStudentInfo
                  }
                >
                  <Text
                    style={
                      styles.attendanceStudentName
                    }
                  >
                    {student.name}
                  </Text>

                  {student.status ===
                    'present' && (
                    <View
                      style={
                        styles.statusBadgePresent
                      }
                    >
                      <Text
                        style={
                          styles.statusBadgeText
                        }
                      >
                        ✓ Present
                      </Text>
                    </View>
                  )}

                  {student.status === 'late' && (
                    <View
                      style={
                        styles.statusBadgeLate
                      }
                    >
                      <Text
                        style={
                          styles.statusBadgeText
                        }
                      >
                        ⏰ Late
                      </Text>

                      <Text
                        style={
                          styles.lateMinutesText
                        }
                      >
                        {student.lateMinutes}{' '}
                        minutes
                      </Text>
                    </View>
                  )}

                  {student.status === 'absent' && (
                    <View
                      style={
                        styles.statusBadgeAbsent
                      }
                    >
                      <Text
                        style={
                          styles.statusBadgeText
                        }
                      >
                        ✕ Absent
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            )
          )}

          <Pressable
            style={
              styles.deleteRecordButton
            }
            onPress={handleDeleteRecord}
          >
            <Text
              style={
                styles.deleteRecordButtonText
              }
            >
              Delete Record
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /*
   * RECORDS - DATE LIST
   */
  if (
    showRecords &&
    selectedSection !== null &&
    selectedSubject !== null
  ) {
    const sectionRecords =
      savedRecords[selectedSection] || [];

    const subjectRecords =
      sectionRecords.filter(
        (record) =>
          (record.subject ||
            'No Subject') ===
          selectedSubject
      );

    return (
      <SafeAreaView
        style={styles.safeArea}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={
            styles.content
          }
          showsVerticalScrollIndicator={false}
        >
          <View
            style={styles.recordsHeader}
          >
            <Pressable
              style={styles.backButton}
              onPress={handleBackToSubjects}
            >
              <Text
                style={styles.backButtonText}
              >
                ← Subjects
              </Text>
            </Pressable>

            <Text
              style={styles.recordsTitle}
            >
              {selectedSubject}
            </Text>

            <Text
              style={styles.recordsSubtitle}
            >
              {selectedSection}
            </Text>

            <Text
              style={styles.recordsTime}
            >
              Attendance history
            </Text>
          </View>

          {subjectRecords.length === 0 ? (
            <View
              style={styles.emptyRecords}
            >
              <Text
                style={
                  styles.emptyRecordsTitle
                }
              >
                No Attendance Records
              </Text>

              <Text
                style={
                  styles.emptyRecordsText
                }
              >
                There are no saved attendance
                records for this subject.
              </Text>
            </View>
          ) : (
            <View>
              <Text
                style={
                  styles.recordsSectionTitle
                }
              >
                Dates
              </Text>

              {subjectRecords.map(
                (record) => (
                  <Pressable
                    key={`${record.date}-${record.time}`}
                    style={
                      styles.dateRecordCard
                    }
                    onPress={() =>
                      handleOpenDate(
                        record.date
                      )
                    }
                  >
                    <View
                      style={
                        styles.dateRecordContent
                      }
                    >
                      <View
                        style={
                          styles.dateRecordText
                        }
                      >
                        <Text
                          style={
                            styles.dateRecordName
                          }
                        >
                          {record.date}
                        </Text>

                        <Text
                          style={
                            styles.dateRecordTime
                          }
                        >
                          🕐 {record.time}
                        </Text>

                        <Text
                          style={
                            styles.dateRecordCount
                          }
                        >
                          {
                            record.students
                              .length
                          }{' '}
                          student
                          {record.students
                            .length !== 1
                            ? 's'
                            : ''}
                        </Text>
                      </View>

                      <Text
                        style={styles.arrow}
                      >
                        ›
                      </Text>
                    </View>
                  </Pressable>
                )
              )}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  /*
   * RECORDS - SUBJECT LIST
   */
  if (
    showRecords &&
    selectedSection !== null
  ) {
    const sectionRecords =
      savedRecords[selectedSection] || [];

    const subjects = Array.from(
      new Set(
        sectionRecords.map(
          (record) =>
            record.subject ||
            'No Subject'
        )
      )
    );

    return (
      <SafeAreaView
        style={styles.safeArea}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={
            styles.content
          }
          showsVerticalScrollIndicator={false}
        >
          <View
            style={styles.recordsHeader}
          >
            <Pressable
              style={styles.backButton}
              onPress={handleBackToSections}
            >
              <Text
                style={styles.backButtonText}
              >
                ← Sections
              </Text>
            </Pressable>

            <Text
              style={styles.recordsTitle}
            >
              {selectedSection}
            </Text>

            <Text
              style={styles.recordsSubtitle}
            >
              Attendance history
            </Text>
          </View>

          {subjects.length === 0 ? (
            <View
              style={styles.emptyRecords}
            >
              <Text
                style={
                  styles.emptyRecordsTitle
                }
              >
                No Attendance Records
              </Text>

              <Text
                style={
                  styles.emptyRecordsText
                }
              >
                There are no saved attendance
                records for this section.
              </Text>
            </View>
          ) : (
            <View>
              <Text
                style={
                  styles.recordsSectionTitle
                }
              >
                Subjects
              </Text>

              {subjects.map(
                (subjectName) => {
                  const count =
                    sectionRecords.filter(
                      (record) =>
                        (record.subject ||
                          'No Subject') ===
                        subjectName
                    ).length;

                  return (
                    <Pressable
                      key={subjectName}
                      style={
                        styles.sectionRecordCard
                      }
                      onPress={() =>
                        handleOpenSubject(
                          subjectName
                        )
                      }
                    >
                      <View
                        style={
                          styles.sectionRecordContent
                        }
                      >
                        <View
                          style={
                            styles.sectionRecordText
                          }
                        >
                          <Text
                            style={
                              styles.sectionRecordName
                            }
                          >
                            {subjectName}
                          </Text>

                          <Text
                            style={
                              styles.sectionRecordCount
                            }
                          >
                            {count}{' '}
                            saved attendance
                            {count !== 1
                              ? 's'
                              : ''}
                          </Text>
                        </View>

                        <Text
                          style={styles.arrow}
                        >
                          ›
                        </Text>
                      </View>
                    </Pressable>
                  );
                }
              )}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  /*
   * RECORDS - SECTION LIST
   */
  if (showRecords) {
    const sections =
      Object.keys(savedRecords);

    return (
      <SafeAreaView
        style={styles.safeArea}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={
            styles.content
          }
          showsVerticalScrollIndicator={false}
        >
          <View
            style={styles.recordsHeader}
          >
            <Pressable
              style={styles.backButton}
              onPress={handleBackToAttendance}
            >
              <Text
                style={styles.backButtonText}
              >
                ← Back
              </Text>
            </Pressable>

            <Text
              style={styles.recordsTitle}
            >
              Records
            </Text>

            <Text
              style={styles.recordsSubtitle}
            >
              Saved attendance by section
            </Text>
          </View>

          {sections.length === 0 ? (
            <View
              style={styles.emptyRecords}
            >
              <Text
                style={
                  styles.emptyRecordsTitle
                }
              >
                No Records Yet
              </Text>

              <Text
                style={
                  styles.emptyRecordsText
                }
              >
                Saved attendance records will
                appear here.
              </Text>
            </View>
          ) : (
            <View>
              <Text
                style={
                  styles.recordsSectionTitle
                }
              >
                Sections
              </Text>

              {sections.map(
                (sectionName) => (
                  <Pressable
                    key={sectionName}
                    style={
                      styles.sectionRecordCard
                    }
                    onPress={() =>
                      handleOpenSection(
                        sectionName
                      )
                    }
                  >
                    <View
                      style={
                        styles.sectionRecordContent
                      }
                    >
                      <View
                        style={
                          styles.sectionRecordText
                        }
                      >
                        <Text
                          style={
                            styles.sectionRecordName
                          }
                        >
                          {sectionName}
                        </Text>

                        <Text
                          style={
                            styles.sectionRecordCount
                          }
                        >
                          {
                            savedRecords[
                              sectionName
                            ].length
                          }{' '}
                          saved attendance
                          {savedRecords[
                            sectionName
                          ].length !== 1
                            ? 's'
                            : ''}
                        </Text>
                      </View>

                      <Text
                        style={styles.arrow}
                      >
                        ›
                      </Text>
                    </View>
                  </Pressable>
                )
              )}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  /*
   * MAIN ATTENDANCE SCREEN
   */
  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={
          styles.content
        }
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.title}>
              Attendance Checker
            </Text>

            <Pressable
              style={styles.recordsButton}
              onPress={handleOpenRecords}
            >
              <Text
                style={
                  styles.recordsButtonText
                }
              >
                Records
              </Text>
            </Pressable>
          </View>

          <Text style={styles.subtitle}>
            Daily attendance management
          </Text>
        </View>

        {/* CLASS INFORMATION */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionLabel}>
            SECTION
          </Text>

          <TextInput
            style={styles.sectionInput}
            value={section}
            onChangeText={setSection}
            placeholder="Enter section"
            placeholderTextColor="#4982eb"
          />

          <Text
            style={[
              styles.sectionLabel,
              styles.subjectLabel,
            ]}
          >
            SUBJECT
          </Text>

          <TextInput
            style={styles.sectionInput}
            value={subject}
            onChangeText={setSubject}
            placeholder="Enter subject"
            placeholderTextColor="#8A94A6"
          />

          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>
              DATE
            </Text>

            <Text style={styles.date}>
              {formattedDate}
            </Text>
          </View>

          <View style={styles.timeContainer}>
            <Text style={styles.dateLabel}>
              TIME
            </Text>

            <Text style={styles.date}>
              {formattedTime}
            </Text>
          </View>
        </View>

        {/* SUMMARY */}
        <Text style={styles.sectionTitle}>
          Attendance Summary
        </Text>

        <AttendanceSummary
          total={students.length}
          present={presentCount}
          late={lateCount}
          absent={absentCount}
        />

        {/* STUDENTS */}
        <View style={styles.studentHeader}>
          <Text style={styles.studentsTitle}>
            Students
          </Text>

          <Text style={styles.studentCount}>
            {students.length} student
            {students.length !== 1
              ? 's'
              : ''}
          </Text>
        </View>

        {students.length > 0 && (
          <View style={styles.columnHeaders}>
            <Text style={styles.nameHeader}>
              Student Name
            </Text>

            <Text style={styles.columnText}>
              Present
            </Text>

            <Text style={styles.columnText}>
              Late
            </Text>

            <Text style={styles.columnText}>
              Absent
            </Text>
          </View>
        )}

        <View style={styles.studentsList}>
          {students.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>
                No students added
              </Text>

              <Text style={styles.emptyText}>
                Add your students below to start
                taking attendance.
              </Text>
            </View>
          ) : (
            students.map((student) => (
              <StudentRow
                key={student.id}
                name={student.name}
                status={student.status}
                lateMinutes={
                  student.lateMinutes
                }
                onStatusChange={(status) =>
                  handleStatusChange(
                    student.id,
                    status
                  )
                }
                onLateMinutesChange={
                  (minutes) =>
                    handleLateMinutesChange(
                      student.id,
                      minutes
                    )
                }
                onDelete={() =>
                  handleDeleteStudent(
                    student.id
                  )
                }
              />
            ))
          )}
        </View>

        {/* ADD STUDENT */}
        <Text style={styles.sectionTitle}>
          Add a Student
        </Text>

        <AddStudent
          onAddStudent={handleAddStudent}
        />

        {/* SAVE ATTENDANCE */}
        <Pressable
          style={styles.saveButton}
          onPress={handleSaveAttendance}
        >
          <Text
            style={styles.saveButtonText}
          >
            Save Attendance
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}