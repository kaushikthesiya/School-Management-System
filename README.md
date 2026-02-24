# School Management System - API Documentation

This document provides details for testing the backend APIs using Postman.

## Base URL
- **Local**: `http://localhost:5000`

## Required Headers
Most protected routes require the following headers:
- `Authorization`: `Bearer <your_jwt_token>`
- `x-school-slug`: `your-school-slug` (e.g., `aspire-intl`)

---

## 1. Authentication

### Login
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body**:
```json
{
    "email": "admin@example.com",
    "password": "password123"
}
```
- **Response**: Use the `token` from the response in the `Authorization` header for other requests.

### Portal Login Credentials
Default passwords for newly admitted students and parents:

- **Student User**:
  - **Email**: Student's personal email
  - **Password**: `Student@` + last 4 digits of phone number (e.g., `Student@1234`)
- **Parent User**:
  - **Email**: Guardian's email
  - **Password**: `Parent@` + last 4 digits of guardian phone number (e.g., `Parent@1234`)

---

## 2. Student Management

### Add New Student
- **URL**: `/api/students`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "academicYear": "SESSION_ID",
    "class": "CLASS_ID",
    "section": "A",
    "admissionNumber": "88991",
    "admissionDate": "2026-02-18",
    "roll": "101",
    "firstName": "Kaushik",
    "lastName": "Thesiya",
    "gender": "Male",
    "dob": "2010-05-20",
    "phone": "+919876543210",
    "email": "kaushikthesiya@example.com",
    "fatherName": "Bhaveshbhai",
    "guardianName": "Bhaveshbhai",
    "guardianEmail": "bhavesh@example.com",
    "guardianPhone": "+919876543210",
    "guardianRelation": "Father",
    "currentAddress": "123 Street, City",
    "permanentAddress": "123 Street, City",
    "category": "General",
    "bloodGroup": "O+",
    "panNo": "ABCDE1234F"
}
```

### Get Students (Filterable)
- **URL**: `/api/students?classId=CLASS_ID&section=A&search=Kaushik`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`

### Get Student Details
- **URL**: `/api/students/:id`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`

### Update Student
- **URL**: `/api/students/:id`
- **Method**: `PUT`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**: Partial or full fields from the Add Student body.

### Delete Student
- **URL**: `/api/students/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization`, `x-school-slug`

### Toggle Student Status
- **URL**: `/api/students/:id/toggle-status`
- **Method**: `PATCH`
- **Headers**: `Authorization`, `x-school-slug`

### Bulk Promote Students
- **URL**: `/api/students/promote`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "studentIds": ["ID1", "ID2"],
    "targetClassId": "TARGET_CLASS_ID",
    "targetSection": "B"
}
```

### Bulk Fetch Students
- **URL**: `/api/students/bulk-fetch`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "ids": ["ID1", "ID2", "ID3"]
}
```

### Partial Update Student
- **URL**: `/api/students/:id`
- **Method**: `PATCH`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**: Partial fields from the Add Student body.

### Add Multi-Class Assignment
- **URL**: `/api/students/multi-class`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "studentId": "STUDENT_ID",
    "classId": "CLASS_ID",
    "section": "A",
    "academicYearId": "SESSION_ID"
}
```

### Delete Multi-Class Assignment
- **URL**: `/api/students/multi-class/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization`, `x-school-slug`

### Add Document to Student
- **URL**: `/api/students/:id/documents`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "name": "Birth Certificate",
    "url": "https://example.com/doc.pdf"
}
```

### Toggle Student Login Permission
- **URL**: `/api/students/:id/login-toggle`
- **Method**: `PATCH`
- **Headers**: `Authorization`, `x-school-slug`

---

## 3. Student/Parent Portal APIs
Use a **Student Token** or **Parent Token** for these requests.

### Get My Student Profile (For Students)
- **URL**: `/api/students/me`
- **Method**: `GET`
- **Headers**: `Authorization` (Student Token), `x-school-slug`

### Update My Profile (For Students)
- **URL**: `/api/students/me`
- **Method**: `PUT`
- **Headers**: `Authorization` (Student Token), `x-school-slug`
- **Body**: Partial fields (email, phone, address, etc.)

### Get My Children (For Parents)
- **URL**: `/api/students/my-children`
- **Method**: `GET`
- **Headers**: `Authorization` (Parent Token), `x-school-slug`
- **Response**: Array of student objects linked to the parent.

### Get Child Attendance
- **URL**: `/api/attendance/student/:student_id`
- **Method**: `GET`
- **Headers**: `Authorization` (Parent Token), `x-school-slug`

### Get Child Fees
- **URL**: `/api/fees/records?studentId=:student_id`
- **Method**: `GET`
- **Headers**: `Authorization` (Parent Token), `x-school-slug`

### Get School Announcements
- **URL**: `/api/announcements`
- **Method**: `GET`
- **Headers**: `Authorization` (Parent Token), `x-school-slug`

---

## 4. Academic Data (Helper APIs)

### Get Classes
- **URL**: `/api/academic/classes`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`
- **Response**: Returns classes with `sectionCounts` and `totalStudentCount`.

### Create Class
- **URL**: `/api/academic/classes`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "name": "Class 10",
    "medium": "English",
    "sections": ["A", "B"]
}
```

### Update Class
- **URL**: `/api/academic/classes/:id`
- **Method**: `PUT`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**: Full or partial class fields.

### Delete Class
- **URL**: `/api/academic/classes/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization`, `x-school-slug`
- **Constraint**: Cannot delete if students are assigned to the class.

### Get Sections
- **URL**: `/api/academic/sections`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`

### Create Section
- **URL**: `/api/academic/sections`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**: `{ "name": "E" }`

### Delete Section
- **URL**: `/api/academic/sections/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization`, `x-school-slug`

### Get Academic Structure (Mediums/Shifts/Streams)
- **URL**: `/api/academic/structure`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`

### Update Academic Structure
- **URL**: `/api/academic/structure`
- **Method**: `PUT`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "mediums": ["English", "Hindi"],
    "shifts": ["Morning", "Afternoon"],
    "streams": ["Science", "Commerce"]
}
```

### Get Sessions (Academic Years)
- **URL**: `/api/academic/sessions`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`

### Create Session
- **URL**: `/api/academic/sessions`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "year": "2024-2025",
    "status": "Active" 
}
```

### Update Session
- **URL**: `/api/academic/sessions/:id`
- **Method**: `PATCH`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "status": "Completed"
}
```

### Delete Session
- **URL**: `/api/academic/sessions/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization`, `x-school-slug`

### Get Student Categories
- **URL**: `/api/academic/student-categories`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`

### Create Student Category
- **URL**: `/api/academic/student-categories`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "category": "EWS"
}
```

### Delete Student Category
- **URL**: `/api/academic/student-categories/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization`, `x-school-slug`

---

## 5. Admin Section (ID Cards & Search)

### Search Students (for ID Cards)
- **URL**: `/api/admin-section/students/search?classId=CLASS_ID&section=A`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`
- **Response**: Returns students with `name` and `admissionNo` formatted for ID cards.

### Search Staff (for ID Cards)
- **URL**: `/api/admin-section/staff/search`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`
- **Response**: Returns staff members with `admissionNo` mapped to `staffId`.

### Create ID Card Template
- **URL**: `/api/admin-section/id-cards`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`, `Content-Type: multipart/form-data`
- **Body (Multipart)**:
    - `title`: String
    - `adminLayout`: "Horizontal" | "Vertical"
    - `applicability`: "Student" | "Staff" | "Guardian"
    - `roles[]`: Array of staff roles
    - `pageLayoutWidth`: String (e.g. "87")
    - `pageLayoutHeight`: String (e.g. "55")
    - `userPhotoStyle`: "Square" | "Rounded" | "Circle"
    - `userPhotoSizeWidth`: String
    - `userPhotoSizeHeight`: String
    - `layoutSpacingTop`: String
    - `layoutSpacingBottom`: String
    - `layoutSpacingLeft`: String
    - `layoutSpacingRight`: String
    - `schoolLogo`: File
    - `backgroundImage`: File
    - `signature`: File
    - `showAdmissionNo`, `showName`, etc.: Boolean (Visibility flags)

---

## 6. Academic Subjects

### Get Subjects
- **URL**: `/api/academic/subjects?classId=CLASS_ID`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`
- **Query Params**: `classId` (Optional) to filter subjects by class.

### Create Subject
- **URL**: `/api/academic/subjects`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "name": "Mathematics",
    "code": "MATH101",
    "type": "Theory",
    "class": "CLASS_ID"
}
```

---

## 7. Homework

### Get Homework List (Filterable)
- **URL**: `/api/homework?classId=CLASS_ID&section=A&status=Assigned`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`
- **Query Params**: `classId`, `section`, `status`, `from`, `to` (all optional)

### Add Homework
- **URL**: `/api/homework`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "class": "CLASS_ID",
    "section": "A",
    "subject": "SUBJECT_ID",
    "topic": "Chapter 5 - Fractions",
    "description": "Solve all exercises from page 45",
    "assignDate": "2026-02-24",
    "dueDate": "2026-02-27",
    "maxMarks": 20
}
```

### Delete Homework
- **URL**: `/api/homework/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization`, `x-school-slug`

---

## 8. Behaviour Records (Discipline)

### Get All Incidents (Filterable)
- **URL**: `/api/discipline?category=Behavior&status=Open`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`
- **Query Params**: `studentId`, `classId`, `category`, `status`, `from`, `to` (all optional)

### Assign Incident to Student
- **URL**: `/api/discipline`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "student": "STUDENT_ID",
    "class": "CLASS_ID",
    "category": "Behavior",
    "description": "Disruptive behaviour during class",
    "date": "2026-02-24",
    "status": "Open"
}
```
- **Category options**: `Uniform`, `Behavior`, `Late`, `Homework`, `Other`
- **Status options**: `Open`, `Under Review`, `Action Taken`, `Closed`

### Delete Incident
- **URL**: `/api/discipline/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization`, `x-school-slug`

---

## 9. Library

### Get Book List (Filterable)
- **URL**: `/api/library/books?category=Fiction&search=harry`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`
- **Query Params**: `category`, `search` (both optional)

### Add Book
- **URL**: `/api/library/books`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "title": "The Great Gatsby",
    "isbn": "978-3-16-148410-0",
    "author": "F. Scott Fitzgerald",
    "category": "Fiction",
    "subject": "English Literature",
    "shelf": "A-12",
    "publisher": "Scribner",
    "publishDate": "1925-04-10",
    "copies": 5,
    "price": 299,
    "description": "A classic novel set in the Jazz Age."
}
```

### Delete Book
- **URL**: `/api/library/books/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization`, `x-school-slug`

- **Response**: Array of distinct category strings (e.g. `["Fiction", "Science", "History"]`)

### Get Library Subjects
- **URL**: `/api/library/subjects`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`

### Add Library Subject
- **URL**: `/api/library/subjects`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**: `{ "name": "English Literature" }`

### Get Library Members
- **URL**: `/api/library/members?search=Kaushik`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`

### Add Library Member
- **URL**: `/api/library/members`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**: `{ "memberId": "STUDENT_OR_STAFF_ID", "memberType": "Student", "name": "Kaushik" }`

### Issue Book
- **URL**: `/api/library/books/:id/issue`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "memberId": "MEMBER_ID",
    "memberName": "Kaushik",
    "memberType": "Student",
    "dueDate": "2026-03-10"
}
```

### Return Book
- **URL**: `/api/library/books/:id/return`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`

---

## 10. Transport

### Get Vehicles
- **URL**: `/api/transport/vehicles`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`

### Add Vehicle
- **URL**: `/api/transport/vehicles`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "vehicleNumber": "GJ05AB1234",
    "type": "Bus",
    "vehicleModel": "Tata Starbus",
    "yearMade": "2022",
    "driverName": "Ramesh Patel",
    "driverPhone": "+919876543210",
    "driverLicense": "DL-1234567890",
    "capacity": 40,
    "route": "ROUTE_ID",
    "note": "Main route bus"
}
```

### Update Vehicle
- **URL**: `/api/transport/vehicles/:id`
- **Method**: `PUT`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**: Any fields from Add Vehicle body.

### Delete Vehicle
- **URL**: `/api/transport/vehicles/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization`, `x-school-slug`

### Get Transport Routes
- **URL**: `/api/transport/routes`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`

### Add Transport Route
- **URL**: `/api/transport/routes`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "title": "Route A - North Zone",
    "stops": ["Main Gate", "City Mall", "Railway Station"],
    "fare": 1500
}
```

### Update Transport Route
- **URL**: `/api/transport/routes/:id`
- **Method**: `PUT`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**: Any fields from Add Route body.

### Delete Transport Route
- **URL**: `/api/transport/routes/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization`, `x-school-slug`

### Get Student Transport Assignments
- **URL**: `/api/transport/assignments?routeId=ROUTE_ID`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`
- **Query Params**: `routeId` (optional, filter by route)
- **Response**: Array of students with their assigned `transportRoute` and `transportStop`.

### Assign Student to Transport Route
- **URL**: `/api/transport/assignments`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "studentId": "STUDENT_ID",
    "routeId": "ROUTE_ID",
    "stopName": "City Mall"
}
```

### Remove Student Transport Assignment
- **URL**: `/api/transport/assignments/:studentId`
- **Method**: `DELETE`
- **Headers**: `Authorization`, `x-school-slug`

---

## 11. Dormitory

### Get Dormitories
- **URL**: `/api/dormitory`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`

### Add Dormitory
- **URL**: `/api/dormitory`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "name": "Boys Hostel A",
    "type": "Boys",
    "capacity": 100,
    "warden": "Suresh Kumar",
    "description": "Main boys dormitory block"
}
```

### Update Dormitory
- **URL**: `/api/dormitory/:id`
- **Method**: `PUT`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**: Any fields from Add Dormitory body.

### Delete Dormitory
- **URL**: `/api/dormitory/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization`, `x-school-slug`

### Get Dormitory Rooms
- **URL**: `/api/dormitory/rooms`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`

### Add Dormitory Room
- **URL**: `/api/dormitory/rooms`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "dormitory": "DORMITORY_ID",
    "roomNumber": "101",
    "type": "Double",
    "capacity": 2,
    "floor": "Ground"
}
```

### Delete Dormitory Room
- **URL**: `/api/dormitory/rooms/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization`, `x-school-slug`

### Get Room Types
- **URL**: `/api/dormitory/room-types`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`

### Add Room Type
- **URL**: `/api/dormitory/room-types`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**: `{ "name": "AC", "description": "Air Conditioned Room" }`

### Delete Room Type
- **URL**: `/api/dormitory/room-types/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization`, `x-school-slug`

---

## 12. Attendance

### Mark Attendance
- **URL**: `/api/attendance/mark`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "classId": "CLASS_ID",
    "date": "2026-02-24",
    "subjectId": "SUBJECT_ID",
    "students": [
        { "id": "STUDENT_ID_1", "status": "Present" },
        { "id": "STUDENT_ID_2", "status": "Absent" }
    ]
}
```

### Get Attendance Records
- **URL**: `/api/attendance?classId=CLASS_ID&date=2026-02-24&subjectId=SUBJECT_ID`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`

### Get Student Attendance History
- **URL**: `/api/attendance/student/:id`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`

---

## 13. Front Office (Admission Query & Visitors)

### Get Admission Queries (Enquiries)
- **URL**: `/api/online-admission/enquiries`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`

### Add Admission Query
- **URL**: `/api/online-admission/enquiries`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "name": "Jane Doe",
    "phone": "+919988776655",
    "email": "jane@example.com",
    "description": "Looking for class 5 admission",
    "source": "Newspaper",
    "assigned": "Staff Member",
    "status": "Active",
    "class": "CLASS_ID",
    "date": "2026-02-24"
}
```

### Add Follow Up to Query
- **URL**: `/api/online-admission/enquiries/:id/follow-up`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "date": "2026-02-25",
    "nextFollowUpDate": "2026-03-01",
    "note": "Parent will visit the school on Monday."
}
```

### Add Visitor
- **URL**: `/api/admin-section/visitors`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "name": "John Visitor",
    "phone": "+919988776655",
    "purpose": "Inquiry",
    "visitorId": "", 
    "date": "2026-02-24",
    "inTime": "10:00 AM",
    "outTime": "11:00 AM"
}
```
- **Note**: `visitorId` will be auto-generated if left empty.

---

## 14. Human Resource

### Get Designations
- **URL**: `/api/hr/designations`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`

### Add Designation
- **URL**: `/api/hr/designations`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**: `{ "name": "Senior Teacher" }`
