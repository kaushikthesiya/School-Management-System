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

### Get Multi-Class Assignments (Overhaul)
- **URL**: `/api/students/multi-class?classId=CLASS_ID&section=A&studentId=STUDENT_ID`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`
- **Query Params**: `classId`, `section`, `studentId` (all optional). If `studentId` is provided, fetches ONLY that student's assignments.
- **Response**: Array of objects grouped by student:
```json
[
    {
        "student": { ... },
        "assignments": [ { "class": "...", "section": "...", "academicYear": "..." } ]
    }
]
```

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

### Bulk Update Multi-Class Assignments (New)
- **URL**: `/api/students/:id/multi-class/bulk`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "primaryClass": "CLASS_ID",
    "primarySection": "A",
    "assignments": [
        {
            "classId": "SECONDARY_CLASS_ID",
            "section": "B",
            "academicYearId": "SESSION_ID"
        }
    ]
}
```
- **Note**: This will replace all existing secondary assignments for the student and optionally update their primary class/section.

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

---

## 15. Inventory Management

### Get Categories
- **URL**: `/api/inventory/category`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`

### Add Category
- **URL**: `/api/inventory/category`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "name": "Stationery",
    "description": "Office and student stationery"
}
```

### Get Items
- **URL**: `/api/inventory/item`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`

### Add Item
- **URL**: `/api/inventory/item`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "name": "Ball Pen",
    "category": "CATEGORY_ID",
    "unit": "Pcs",
    "description": "Blue ink pen"
}
```

### Get Stores/Warehouses
- **URL**: `/api/inventory/store`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`

### Add Store
- **URL**: `/api/inventory/store`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "name": "Main Store",
    "code": "STR001",
    "description": "Primary inventory storage"
}
```

### Get Suppliers
- **URL**: `/api/inventory/supplier`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`

### Add Supplier
- **URL**: `/api/inventory/supplier`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body**:
```json
{
    "name": "General Traders",
    "email": "contact@generaltraders.com",
    "mobile": "+919988776655",
    "address": "Market Street, City",
    "contactPerson": "Mr. Sharma"
}
```

### Inventory Transactions (Receive/Sell/Issue)
- **URL**: `/api/inventory/transaction`
- **Method**: `POST`
- **Headers**: `Authorization`, `x-school-slug`
- **Body (Receive)**:
```json
{
    "item": "ITEM_ID",
    "supplier": "SUPPLIER_ID",
    "store": "STORE_ID",
    "quantity": 100,
    "price": 5.50,
    "transactionType": "Receive",
    "date": "2026-02-25",
    "referenceNo": "REC-001"
}
```
- **Body (Sell)**:
```json
{
    "item": "ITEM_ID",
    "quantity": 10,
    "price": 10.00,
    "transactionType": "Sell",
    "role": "Student",
    "buyerName": "Kaushik",
    "paymentMethod": "Cash"
}
```
- **Body (Issue)**:
```json
{
    "item": "ITEM_ID",
    "quantity": 2,
    "transactionType": "Issue",
    "role": "Staff",
    "buyerName": "John Member",
    "date": "2026-02-25",
    "dueDate": "2026-03-25"
}
```

### Get Transactions
- **URL**: `/api/inventory/transaction?type=Receive`
- **Method**: `GET`
- **Headers**: `Authorization`, `x-school-slug`
- **Query Params**: `type` (Optional: `Receive`, `Sell`, `Issue`)

---



## Exam management in offline schools 

Efficient Examination Management: Our Examination Management System module streamlines and manages examination activities, including defining examination schemes and timetables, setting grading and passing criteria, paper evaluation, and automatic generation of final report cards. This ensures a clash-free and organized exam schedule.
Seamless Board Coordination: The module enables school administrators to seamlessly supervise pre-exam, exam conduction, and post-exam processes for various boards, such as CBSE, ICSE, IB, and more. It also automates the generation of grade books using a pre-designed template of the institution.
Simplified Faculty Tasks: It simplifies exam-related tasks for school faculty, assisting invigilators in managing their duties, such as duty exchanges, and preventing any mismanagement during exams.
Timely Report Card Distribution: The module ensures the timely entry of marks into the ERP system, facilitating the prompt distribution of report cards to students and parents.





## transport management in offline schools 

Real-Time GPS Tracking: Our school ERP utilizes state-of-the-art GPS tracking technology to monitor the exact location of school buses, providing precise data to the relevant authorities. This feature ensures the safety and security of students during their journey.
Driver Accountability and Speed Monitoring: We prioritize student safety by enabling real-time monitoring of bus speed and ensuring driver accountability. This proactive approach helps prevent potential emergencies and promotes responsible driving.
Scheduled Timings and Optimized Routing: Our software maintains accurate records of scheduled bus timings and optimizes routing for maximum efficiency. This ensures that students arrive at school and return home on time, minimizing disruptions to their daily schedules.
Fees Management: Our school ERP simplifies fee management related to transportation. It offers a transparent and efficient system for parents and the school to handle transportation fees.
Attendance Updates: The software allows for real-time attendance updates for students during their bus journey, providing parents and school management with instant insights into student whereabouts.
Transport Alerts for Parents: We prioritize the safety of each student by offering real-time transport alerts to parents. These alerts can be received through a mobile application, allowing parents to take immediate action in case of any mishap or emergency during the journey.
Pick-up and Drop-off Timings: Our system keeps parents informed about the correct pick-up and drop-off timings for their wards. This feature offers complete peace of mind to parents, knowing that their children are in safe hands.





## Leave Management in Offline Schools

1. Efficient Leave Requests
Employees can submit leave requests online, specifying the type of leave (e.g., sick leave, vacation) and desired dates. This streamlines the leave application process.

2. Workflow Automation
The module automates the leave approval workflow, routing requests to the appropriate supervisors or administrators for review and approval. Notifications keep everyone informed of leave status.

3. Leave Balances
Employees can view their leave balances in real time, helping them plan their time off effectively and preventing leave conflicts.

4. Calendar Integration
Leave requests are integrated with the school calendar, allowing administrators to visualize and plan for staff absences and replacements.

5. Detailed Reporting
The module generates reports on leave utilization, patterns, and trends, enabling HR managers to make data-driven decisions about leave policies and staffing.




## Certificate Management 

Create Custom Certificate Templates:
Our module empowers schools to design and customize certificate templates for various purposes, including academic achievements, sports accolades, and participation in school events. Certificates can be designed to align with the school's branding and style.

Digital Archive of Certificates:
The module maintains a secure digital archive of all issued certificates. This repository ensures easy access to past certificates for verification or reprinting, enhancing certificate management and retrieval.

Efficient Electronic Certificate Distribution:
Schools can streamline the distribution of certificates electronically, eliminating the need for physical printing and delivery. This not only reduces administrative costs but also has a positive environmental impact.

Bulk Certificate Printing:
For physical certificates, our module supports bulk printing to expedite the process, especially during events or graduation ceremonies. Administrators can efficiently print certificates in batches, ensuring a smooth certificate distribution process.

By implementing our School ERP Certificate Management Module, educational institutions can simplify certificate design, management, and distribution, whether in digital or physical format. Experience the benefits of a comprehensive certificate management system with our ERP solution.




## Biometric Integration

1. Enhanced Security
Biometric integration enhances security by using unique biological identifiers such as fingerprints or facial recognition for access control. This ensures that only authorized individuals can enter secure areas.

2. Attendance Tracking
Biometric integration automates attendance tracking for both students and staff. It eliminates the need for manual attendance registers and reduces the risk of attendance fraud.

3. Streamlined Processes
Biometric authentication simplifies various processes, including library book checkouts, cafeteria payments, and exam attendance verification, streamlining school operations.

4. Data Accuracy
Biometric data is highly accurate, reducing errors in attendance records and access control. It provides a reliable and tamper-resistant method for identity verification.

5. Visitor Management
The module can extend biometric authentication to visitor management, ensuring that visitors are properly identified and authorized before entering the premises.

6. Audit Trails
Detailed audit trails of biometric authentication events are maintained, allowing for traceability and accountability in case of security incidents or breaches.

7. Integration Flexibility
Biometric integration can be customized to integrate with various school systems, including access control, attendance management, and library management.



## News & Events 

1. Announcements
The module allows schools to post news and event announcements, keeping students, parents, and staff informed about important updates, deadlines, and activities.

2. Event Details
Detailed information about upcoming events, including dates, times, venues, and descriptions, can be easily accessed through the module.

3. Archived News
The module maintains an archive of past news articles and event listings, allowing users to access historical information.



## Inventory Management 


1. Real-Time Inventory Tracking
The module provides real-time tracking of inventory levels, enabling staff to monitor stock availability and prevent shortages or overstock situations.

2. Supplier Management
It includes tools for managing supplier information, orders, and procurement. Schools can efficiently communicate with suppliers and manage purchase orders.

3. Asset Lifecycle Management
Beyond consumable inventory, the module also tracks assets' lifecycles, including maintenance schedules, depreciation, and retirement or disposal.

4. Inventory Valuation
Inventory valuation methods are supported, allowing schools to determine the value of their inventory accurately for financial reporting and decision-making.

5. Automated Reordering
The module can automate the reordering of inventory items based on predefined thresholds, ensuring that essential supplies are always available.




## Report & Result Analysis

1. Visual Analytics
The module allows for the creation of visually appealing performance charts and graphs, making it easier for teachers, students, and parents to interpret and understand academic data.

2. Accessibility
Parents and students can securely access report cards online, view grades, attendance records, and teacher comments. This accessibility promotes transparency and keeps stakeholders informed.

3. Teacher Comments
Teachers can add personalized comments and feedback on report cards, providing qualitative insights into a student's strengths, areas for improvement, and overall performance.

4. Comparative Analysis
The module enables teachers and administrators to conduct comparative analysis by tracking individual student progress over time and comparing it with class or school averages.

5. Performance Trends
Through historical data and trend analysis, the module helps educators identify patterns and trends in student performance. This information guides curriculum adjustments and teaching strategies.

6. Parent-Teacher Conferencing
Integrated scheduling tools allow parents to book appointments for parent-teacher meetings based on their child's report card, fostering effective communication between teachers and parents.

7. Data Export and Printing
Users can export report card data for record-keeping or printing hard copies when needed, ensuring compliance with traditional documentation requirements.



## Holiday & School Planner

Comprehensive School Calendar:
Our School Calendar module provides a detailed and comprehensive calendar that includes holidays, special events, academic terms, examination dates, and extracurricular activities. Users can access thorough information about each event, ensuring everyone stays informed.

Detailed Event Descriptions and Information:
For each event, the module allows administrators to provide in-depth descriptions, event schedules, venue details, and contact information. This ensures that all stakeholders have easy access to essential event information.

Automated Event Notifications:
The module automatically generates event notifications and reminders, sending them to parents, students, and staff members. These notifications ensure that everyone is well-informed and prepared for upcoming events.

Event Registration and RSVP:
For select events, the module supports event registration and RSVP functionality. Users can easily register for events, and administrators can manage attendance lists and logistics efficiently.

Color-Coding and Categorization:
Events on the calendar can be color-coded or categorized, simplifying the identification of different types of events at a glance. This feature enhances calendar navigation and usability.

Integration with Academic Calendar:
The module seamlessly integrates with the academic calendar, ensuring that academic events, such as examinations and parent-teacher meetings, are well-coordinated with other school activities.

By implementing our School ERP Calendar Management Module, educational institutions can enhance event management, improve communication, and ensure that everyone remains updated about important school events and activities. Experience the benefits of comprehensive calendar management with our ERP solution.



## Online Payment Gateway


Secure Payment Processing:
Our module prioritizes secure and encrypted online payment transactions, ensuring the protection of sensitive financial data. It adheres to industry-standard security protocols, including SSL encryption, to safeguard payment information.

Flexible Payment Options:
We offer a range of payment options to accommodate the preferences of parents and guardians. Users can make payments via credit/debit cards, net banking, mobile wallets, and UPI, ensuring a convenient and accessible payment experience.

Real-Time Payment Confirmation:
The module provides real-time payment confirmation, instantly notifying users of successful transactions. This feature is especially valuable during peak fee payment periods, where quick confirmation is essential.

Convenient Recurring Payments:
For recurring expenses such as tuition fees, our module allows parents to set up automated recurring payments. This simplifies fee payments and reduces the administrative burden on parents.

Transparent Payment History and Records:
Users have access to a comprehensive payment history, including transaction details, dates, and amounts. This transparency empowers parents to track their financial contributions to the school effectively.

Seamless Payment Gateway Integration:
Our module seamlessly integrates with popular payment gateways, ensuring a smooth and reliable payment experience. It supports multiple currencies and is compatible with various banking systems.



