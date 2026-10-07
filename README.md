# Attendance Checker

A simple mobile attendance management application designed for teachers. The app allows teachers to add students, record their attendance, and save attendance records for future viewing.

## 📱 Features

* Add student names manually
* Mark students as:

  * ✅ Present
  * ⏰ Late
  * ❌ Absent
* Record the number of minutes a student is late
* Enter the class section
* Enter the subject
* Automatically display the current date and time
* View attendance summaries
* Save attendance records
* View saved records by:

  * Section
  * Subject
  * Date
* View individual student attendance details
* Delete saved attendance records
* Records remain saved after closing and reopening the app

## 🛠️ Technologies Used

* React Native
* Expo
* TypeScript
* AsyncStorage
* Visual Studio Code

## 📂 Project Structure

```text
AttendanceChecker
└── src
    ├── app
    │   ├── _layout.tsx
    │   └── index.tsx
    │
    ├── components
    │   ├── AttendanceSummary.tsx
    │   ├── StudentRow.tsx
    │   ├── AddStudent.tsx
    │   └── LateMinutes.tsx
    │
    └── styles
        └── attendanceStyles.ts
```

## ⚙️ How It Works

### 1. Enter Class Information

The teacher enters the class section and subject.

Example:

```text
Section: BSIT 4A
Subject: ITM101
```

The application automatically displays the current date and time from the device.

### 2. Add Students

The teacher enters student names manually using the **Add Student** field.

Each student is added to the attendance list.

### 3. Mark Attendance

Each student can be marked as:

* Present
* Late
* Absent

Only one attendance status can be selected for each student.

### 4. Record Late Minutes

If a student is marked as Late, a field appears where the teacher can enter the number of minutes late.

Example:

```text
Late: 10 minutes
```

### 5. Save Attendance

After all students have been marked, the teacher can press **Save Attendance**.

The attendance record contains:

* Section
* Subject
* Date
* Time
* Student names
* Attendance status
* Late minutes

### 6. View Records

Saved attendance can be accessed through the **Records** button.

Records are organized like this:

```text
Section
   ↓
Subject
   ↓
Date
   ↓
Student Attendance Details
```

For example:

```text
BSIT 4A
   └── ITM101
        ├── Oct 7
        └── Oct 6
```

### 7. Persistent Storage

The application uses **AsyncStorage** to save attendance records on the device.

This allows saved records to remain available even after the application is closed and opened again.

## 🧩 Main Components

### `index.tsx`

The main part of the application.

It handles:

* Section
* Subject
* Students
* Attendance status
* Late minutes
* Saving attendance
* Loading records
* Records navigation
* Deleting records

### `StudentRow.tsx`

Displays each student and allows the teacher to:

* Mark Present
* Mark Late
* Mark Absent
* Enter late minutes
* Delete a student

### `AddStudent.tsx`

Handles adding new student names to the attendance list.

### `AttendanceSummary.tsx`

Displays the attendance totals:

```text
Total
Present
Late
Absent
```

### `LateMinutes.tsx`

A separate component created for handling late-minute input. The current attendance interface handles the late-minute input directly inside `StudentRow.tsx`.

### `attendanceStyles.ts`

Contains the application's styles and controls the visual appearance of the interface.

## 💾 Data Storage

The application uses:

```text
AsyncStorage
```

to store attendance records locally.

JavaScript objects are converted into text using:

```text
JSON.stringify()
```

and converted back into JavaScript objects using:

```text
JSON.parse()
```

## 🚀 Installation

Make sure Node.js is installed on your computer.

Clone or download the project, then open the project folder in Visual Studio Code.

Install the project dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npx expo start
```

The application can then be opened using Expo Go or an available emulator.

## 🎓 Project Purpose

Attendance Checker was created as a school project to demonstrate the use of mobile application development concepts, including:

* React Native components
* TypeScript
* State management
* User input
* Component communication
* Event handling
* Conditional rendering
* Local data storage
* Basic CRUD operations

## 👩‍💻 Developer

Created as a college IT school project.

---

**Attendance Checker — Simple, organized, and teacher-friendly attendance management.**
