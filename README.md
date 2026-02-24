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
