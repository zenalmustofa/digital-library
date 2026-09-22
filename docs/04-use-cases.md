# USE CASE DOCUMENT

## SISTEM PERPUSTAKAAN DIGITAL

### MADRASAH HASAN MUCHYI KAPUREJO

**Versi:** 1.0
**Tanggal:** 3 September 2026
**Status:** Final Requirement
**Parent Document:** `docs/02-prd.md`
**Permission Reference:** `docs/03-roles-permissions.md`

---

# 1. TUJUAN DOKUMEN

Dokumen ini mendefinisikan seluruh interaksi antara pengguna dengan Sistem Perpustakaan Digital Madrasah Hasan Muchyi Kapurejo.

Use Case menjadi dasar untuk:

* User Flow
* Database/ERD
* API
* UI/UX
* Testing
* Acceptance Test

AI/Vibe Coder wajib menggunakan dokumen ini sebagai acuan.

AI tidak boleh menambahkan use case baru ke dalam MVP tanpa persetujuan.

---

# 2. ACTOR SISTEM

Sistem memiliki 6 actor utama:

```text
                    ┌─────────────────────────────┐
                    │  PERPUSTAKAAN DIGITAL       │
                    │  MADRASAH HASAN MUCHYI      │
                    └─────────────────────────────┘
                              │
        ┌───────────┬─────────┼─────────┬───────────┐
        │           │         │         │           │
      ADMIN      LIBRARY    TEACHER   STAFF      STUDENT
                  STAFF                          │
                                               ┌─┴─┐
                                              MTs  MA
```

Actor:

1. Administrator
2. Library Staff
3. Teacher
4. Education Staff
5. Student MTs
6. Student MA

---

# 3. GENERAL USE CASE MAP

Secara umum interaksi sistem:

```text
                         SISTEM
                           │
          ┌────────────────┼────────────────┐
          │                │                │
       ACCOUNT           LIBRARY          REPORT
          │                │                │
       Login          Catalog/Search     Statistics
       Logout         Book Detail        Export
       Profile        Reader
                      Bookmark
                      Progress
                      Notes
                      Highlight
```

---

# 4. USE CASE GROUP

Use Case dibagi menjadi beberapa kelompok:

```text
UC-A  Authentication & Account
UC-B  User Management
UC-C  Class Management
UC-D  Book Management
UC-E  Book Discovery
UC-F  Digital Reading
UC-G  Access Control
UC-H  Teacher Features
UC-I  Notification
UC-J  Dashboard
UC-K  Statistics & Reports
UC-L  Activity Log
```

---

# 5. UC-A — AUTHENTICATION & ACCOUNT

## UC-A01 — Login

**Actor:**

* Admin
* Library Staff
* Teacher
* Education Staff
* Student MTs
* Student MA

**Tujuan:**

Memungkinkan pengguna masuk ke sistem.

### Preconditions

* Akun pengguna telah terdaftar.
* Akun dalam status aktif.

### Main Flow

```text
1. User membuka halaman login.
2. User memasukkan Nama Lengkap.
3. User memasukkan NISN/credential.
4. User menekan Login.
5. Sistem memvalidasi data.
6. Sistem mengambil data user.
7. Sistem menentukan role.
8. Sistem membuat session/token.
9. Sistem mengarahkan user ke dashboard.
```

### Alternative Flow

Jika credential salah:

```text
Sistem
 ↓
Validasi gagal
 ↓
Tampilkan pesan error
 ↓
User tetap di halaman login
```

### Acceptance Criteria

* User valid berhasil login.
* User invalid ditolak.
* User nonaktif ditolak.
* Role dikenali sistem.
* Session dibuat dengan aman.

---

# 6. UC-A02 — Logout

**Actor:** Semua user

### Main Flow

```text
User
 ↓
Klik Logout
 ↓
Session/token dihapus atau diinvalidasi
 ↓
Kembali ke Login
```

---

# 7. UC-A03 — View Profile

**Actor:** Semua user

User dapat melihat data profilnya.

Data:

```text
Nama
NISN/Identifier
Role
Jenjang
Kelas
Status
```

User tidak dapat mengubah role sendiri.

---

# 8. UC-B — USER MANAGEMENT

# UC-B01 — View Users

**Actor:** Admin

Admin dapat melihat daftar user.

Fitur:

* Search
* Filter role
* Filter jenjang
* Filter kelas
* Filter status
* Pagination

---

# UC-B02 — Create User

**Actor:** Admin

Admin dapat membuat akun user baru.

Data:

```text
Nama
Identifier
Role
Jenjang
Kelas
Status
```

Sistem harus memvalidasi identifier agar tidak duplikat.

---

# UC-B03 — Update User

**Actor:** Admin

Admin dapat mengubah data user.

---

# UC-B04 — Activate / Deactivate User

**Actor:** Admin

Admin dapat mengaktifkan atau menonaktifkan akun.

User yang inactive:

```text
Tidak dapat Login
```

Data user tidak langsung dihapus.

---

# UC-B05 — Import Users

**Actor:** Admin

Admin dapat mengimpor data melalui:

```text
Excel
CSV
```

### Flow

```text
Upload File
 ↓
Validate Structure
 ↓
Validate Data
 ↓
Preview
 ↓
Confirm Import
 ↓
Insert / Update
 ↓
Import Result
```

Sistem harus memberikan informasi:

```text
Total Data
Success
Failed
Duplicate
Invalid
```

---

# 9. UC-C — CLASS MANAGEMENT

# UC-C01 — View Classes

**Actor:**

* Admin

Admin dapat melihat struktur kelas.

Contoh:

```text
MTs
├── VII A
├── VII B
├── VIII A
└── IX A

MA
├── IPS 1
├── IPS 2
└── Bahasa 1
```

---

# UC-C02 — Create Class

**Actor:** Admin

Admin dapat menambahkan kelas.

Data:

```text
Level
Class Name
Status
```

---

# UC-C03 — Update Class

**Actor:** Admin

Admin dapat mengubah informasi kelas.

---

# UC-C04 — Activate / Deactivate Class

**Actor:** Admin

Admin dapat mengaktifkan atau menonaktifkan kelas.

---

# 10. UC-D — BOOK MANAGEMENT

# UC-D01 — View Books

**Actor:**

* Admin
* Library Staff

Menampilkan daftar buku yang dikelola.

---

# UC-D02 — Create Book

**Actor:**

* Admin
* Library Staff

### Data buku

```text
Title
Cover
Description
Author
Publisher
Publication Year
ISBN
Category
Level
Language
Book Type
Source
License
Status
```

---

# UC-D03 — Update Book

**Actor:**

* Admin
* Library Staff

User dapat mengubah metadata buku sesuai permission.

---

# UC-D04 — Upload Ebook

**Actor:**

* Admin
* Library Staff

### Flow

```text
Select Book
 ↓
Upload File
 ↓
Validate File
 ↓
Store Securely
 ↓
Associate File With Book
```

File harus disimpan pada storage yang aman.

---

# UC-D05 — Publish Book

**Actor:**

* Admin
* Library Staff

Buku yang belum lengkap tidak dapat dipublish.

Minimal:

```text
Title
Cover
Author
Category
Ebook File
Source/License Information
```

---

# UC-D06 — Archive Book

**Actor:**

* Admin
* Library Staff sesuai permission

Buku sebaiknya di-archive daripada langsung dihapus apabila sudah memiliki histori aktivitas.

---

# 11. UC-D07 — Manage Categories

**Actor:**

* Admin
* Library Staff

Operasi:

```text
Create
View
Update
Archive
```

---

# 12. UC-D08 — Manage Authors

**Actor:**

* Admin
* Library Staff

Operasi:

```text
Create
View
Update
```

---

# 13. UC-D09 — Manage Publishers

**Actor:**

* Admin
* Library Staff

Operasi:

```text
Create
View
Update
```

---

# 14. UC-E — BOOK DISCOVERY

# UC-E01 — View Catalog

**Actor:** Semua user

User dapat melihat koleksi buku yang tersedia untuknya.

Catalog menampilkan:

```text
Cover
Title
Author
Category
Level
Access Status
```

---

# 15. UC-E02 — Search Books

**Actor:** Semua user

User dapat mencari buku.

Search berdasarkan:

```text
Title
Author
Publisher
ISBN
Category
```

---

# 16. UC-E03 — Filter Books

**Actor:** Semua user

Filter:

```text
Level
Category
Author
Publisher
Year
Book Type
```

---

# 17. UC-E04 — View Book Detail

**Actor:** Semua user

Detail buku:

```text
Cover
Title
Description
Author
Publisher
Year
ISBN
Category
Level
Availability
```

Jika user memiliki akses:

```text
[ Baca Buku ]
```

Jika tidak:

```text
Akses tidak tersedia
```

---

# 18. UC-F — DIGITAL READING

# UC-F01 — Read Book

**Actor:** User yang memiliki `books.read`

### Flow

```text
User
 ↓
Book Detail
 ↓
Click Read
 ↓
Authentication Check
 ↓
Authorization Check
 ↓
Book Permission Check
 ↓
Open Reader
```

Jika tidak memiliki permission:

```text
403 Forbidden
```

atau response UI yang sesuai.

---

# 19. UC-F02 — Navigate Pages

**Actor:** User

Reader mendukung:

```text
Previous
Next
Page Number
Table of Contents
```

---

# 20. UC-F03 — Zoom

User dapat memperbesar atau memperkecil tampilan halaman.

---

# 21. UC-F04 — Fullscreen

User dapat membaca dalam mode fullscreen.

---

# 22. UC-F05 — Search Text

User dapat mencari teks di dalam buku jika format ebook dan reader mendukung text extraction/search.

---

# 23. UC-F06 — Bookmark Page

**Actor:** User

### Flow

```text
Reader
 ↓
Bookmark Current Page
 ↓
Save Bookmark
```

User dapat menghapus bookmark.

---

# 24. UC-F07 — Save Reading Progress

Sistem menyimpan:

```text
Current Page
Progress Percentage
Last Read At
```

### Flow

```text
User Reads
 ↓
Page Changes
 ↓
Progress Updated
 ↓
Save
```

Sistem sebaiknya menggunakan mekanisme autosave yang efisien dan tidak melakukan request berlebihan.

---

# 25. UC-F08 — Highlight Text

User dapat menandai teks tertentu apabila reader mendukung text selection.

Data minimal:

```text
Book
Page
Selected Text
Position
User
```

---

# 26. UC-F09 — Create Note

User dapat membuat catatan pribadi.

Catatan terkait dengan bagian buku tertentu.

---

# 27. UC-F10 — View Reading History

User dapat melihat buku yang pernah dibaca.

Contoh:

```text
Continue Reading

Matematika VIII
Progress 65%

Bahasa Indonesia VIII
Progress 32%
```

---

# 28. UC-G — ACCESS CONTROL

# UC-G01 — Manage Book Access Rule

**Actor:**

* Admin
* Library Staff

Admin/Library Staff dapat menentukan siapa yang dapat mengakses buku.

Scope:

```text
Role
Level
Class
Specific User
```

---

# 29. UC-G02 — Check Book Access

**Actor:** System

Setiap kali user mencoba mengakses buku:

```text
Authentication
 ↓
User Status
 ↓
Role
 ↓
Book Status
 ↓
Access Rule
 ↓
Permission
 ↓
ALLOW / DENY
```

Ini merupakan **system use case** yang wajib berjalan sebelum akses ebook.

---

# 30. UC-G03 — Download Book

**Actor:** User dengan `books.download`

Download hanya diberikan jika:

```text
Book Permission
AND
License Policy
AND
User Permission
```

semuanya mengizinkan.

---

# 31. UC-G04 — Share Book Reference

**Actor:** User dengan permission share/reference

Sharing harus memperhatikan hak penggunaan ebook.

Sistem memprioritaskan sharing:

```text
Book Reference / Link
```

bukan distribusi file ebook secara bebas.

---

# 32. UC-H — TEACHER FEATURES

# UC-H01 — Create Reading List

**Actor:** Teacher

Guru dapat membuat reading list.

Data:

```text
Title
Description
Books
Target Class
Status
```

---

# 33. UC-H02 — Update Reading List

Teacher dapat mengubah reading list miliknya.

---

# 34. UC-H03 — Delete Reading List

Teacher dapat menghapus/arsip reading list miliknya.

---

# 35. UC-H04 — Add Book to Reading List

Teacher memilih buku dari katalog dan menambahkannya ke reading list.

---

# 36. UC-H05 — Publish Reading List

Teacher menentukan target kelas kemudian publish.

Contoh:

```text
Reading List
"Persiapan Ujian Bahasa Indonesia"

Target:
IX A
IX B
```

---

# 37. UC-H06 — View Student Reading Activity

Teacher dapat melihat aktivitas siswa sesuai scope.

Contoh:

```text
Teacher
 ↓
Class IX A
 ↓
Student
 ↓
Reading Activity
```

Data dapat berupa:

```text
Book
Progress
Last Read
Reading Status
```

---

# 38. UC-H07 — Recommend Book

Teacher dapat merekomendasikan buku.

Flow:

```text
Select Book
 ↓
Select Class
 ↓
Add Message
 ↓
Publish
 ↓
Student receives notification
```

---

# 39. UC-H08 — View Reading List

**Actor:**

* Student MTs
* Student MA
* Teacher

Student dapat melihat reading list yang ditujukan kepada kelasnya.

---

# 40. UC-I — NOTIFICATION

# UC-I01 — View Notifications

**Actor:** Semua user

User dapat melihat notification.

---

# 41. UC-I02 — Create Notification

**Actor:**

* Admin

Admin dapat membuat pengumuman.

Data:

```text
Title
Message
Target
Status
Publish Time
```

Target dapat:

```text
All Users
Role
Level
Class
```

---

# 42. UC-I03 — Receive Notification

System mengirim/menampilkan notification berdasarkan target.

MVP menggunakan:

```text
In-App Notification
```

Push notification menjadi fitur pengembangan selanjutnya.

---

# 43. UC-J — DASHBOARD

# UC-J01 — Student Dashboard

Student dapat melihat:

```text
Continue Reading
Reading Progress
Bookmark
Reading List
Teacher Recommendation
Recent Books
```

---

# 44. UC-J02 — Teacher Dashboard

Teacher dapat melihat:

```text
Reading Lists
Recommendations
Student Reading Activity
Recent Books
```

---

# 45. UC-J03 — Library Dashboard

Library Staff dapat melihat:

```text
Total Books
Total Readers
Most Read Books
Reading Activity
Active Users
```

---

# 46. UC-J04 — Admin Dashboard

Admin dapat melihat statistik sistem secara lebih luas:

```text
Users
Books
Reading Activity
Popular Books
Active Users
Class Statistics
Level Statistics
```

---

# 47. UC-K — STATISTICS & REPORT

# UC-K01 — View Statistics

**Actor:**

* Admin
* Library Staff
* Teacher sesuai scope

Statistik:

```text
User Count
Book Count
Most Read Books
Access Count
Reading Activity
Most Active Users
Class Statistics
Level Statistics
Period Statistics
```

---

# 48. UC-K02 — Filter Statistics

Filter:

```text
Daily
Weekly
Monthly
Yearly
Custom Range
```

---

# 49. UC-K03 — Export Excel

**Actor:**

* Admin
* Library Staff

Data:

```text
Users
Books
Reading Activity
Statistics
```

---

# 50. UC-K04 — Export PDF

**Actor:**

* Admin
* Library Staff

Sistem menghasilkan laporan dalam format PDF.

---

# 51. UC-L — ACTIVITY LOG

# UC-L01 — Record Activity

**Actor:** System

Sistem mencatat aktivitas penting.

Contoh:

```text
Login
Logout
Create User
Update User
Create Book
Update Book
Upload Ebook
Publish Book
Change Access Rule
Create Notification
```

---

# 52. UC-L02 — View Activity Log

**Actor:**

* Admin
* Library Staff sesuai permission

Data:

```text
Actor
Action
Resource
Timestamp
IP/Context jika diperlukan
Result
```

---

# 53. COMPLETE USE CASE LIST

| ID     | Use Case                  | Actor                   |
| ------ | ------------------------- | ----------------------- |
| UC-A01 | Login                     | All                     |
| UC-A02 | Logout                    | All                     |
| UC-A03 | View Profile              | All                     |
| UC-B01 | View Users                | Admin                   |
| UC-B02 | Create User               | Admin                   |
| UC-B03 | Update User               | Admin                   |
| UC-B04 | Activate/Deactivate User  | Admin                   |
| UC-B05 | Import Users              | Admin                   |
| UC-C01 | View Classes              | Admin                   |
| UC-C02 | Create Class              | Admin                   |
| UC-C03 | Update Class              | Admin                   |
| UC-C04 | Activate/Deactivate Class | Admin                   |
| UC-D01 | View Books                | Admin, Library          |
| UC-D02 | Create Book               | Admin, Library          |
| UC-D03 | Update Book               | Admin, Library          |
| UC-D04 | Upload Ebook              | Admin, Library          |
| UC-D05 | Publish Book              | Admin, Library          |
| UC-D06 | Archive Book              | Admin, Library          |
| UC-D07 | Manage Categories         | Admin, Library          |
| UC-D08 | Manage Authors            | Admin, Library          |
| UC-D09 | Manage Publishers         | Admin, Library          |
| UC-E01 | View Catalog              | All                     |
| UC-E02 | Search Books              | All                     |
| UC-E03 | Filter Books              | All                     |
| UC-E04 | View Book Detail          | All                     |
| UC-F01 | Read Book                 | Authorized User         |
| UC-F02 | Navigate Pages            | Reader                  |
| UC-F03 | Zoom                      | Reader                  |
| UC-F04 | Fullscreen                | Reader                  |
| UC-F05 | Search Text               | Reader                  |
| UC-F06 | Bookmark                  | User                    |
| UC-F07 | Reading Progress          | User                    |
| UC-F08 | Highlight                 | User                    |
| UC-F09 | Notes                     | User                    |
| UC-F10 | Reading History           | User                    |
| UC-G01 | Manage Access Rule        | Admin, Library          |
| UC-G02 | Check Book Access         | System                  |
| UC-G03 | Download Book             | Authorized User         |
| UC-G04 | Share Reference           | Authorized User         |
| UC-H01 | Create Reading List       | Teacher                 |
| UC-H02 | Update Reading List       | Teacher                 |
| UC-H03 | Delete Reading List       | Teacher                 |
| UC-H04 | Add Book to Reading List  | Teacher                 |
| UC-H05 | Publish Reading List      | Teacher                 |
| UC-H06 | View Student Activity     | Teacher                 |
| UC-H07 | Recommend Book            | Teacher                 |
| UC-H08 | View Reading List         | Student, Teacher        |
| UC-I01 | View Notifications        | All                     |
| UC-I02 | Create Notification       | Admin                   |
| UC-I03 | Receive Notification      | All                     |
| UC-J01 | Student Dashboard         | Student                 |
| UC-J02 | Teacher Dashboard         | Teacher                 |
| UC-J03 | Library Dashboard         | Library                 |
| UC-J04 | Admin Dashboard           | Admin                   |
| UC-K01 | View Statistics           | Admin, Library, Teacher |
| UC-K02 | Filter Statistics         | Authorized              |
| UC-K03 | Export Excel              | Admin, Library          |
| UC-K04 | Export PDF                | Admin, Library          |
| UC-L01 | Record Activity           | System                  |
| UC-L02 | View Activity Log         | Admin, Library          |

---

# 54. USE CASE DEPENDENCIES

Beberapa use case bergantung pada use case lain.

```text
UC-A01 Login
     ↓
Authentication
     ↓
Most protected use cases
```

Book reading:

```text
UC-E04 View Book Detail
          ↓
UC-G02 Check Book Access
          ↓
UC-F01 Read Book
```

Download:

```text
UC-G02 Check Book Access
          ↓
UC-G03 Download Book
```

Teacher Reading List:

```text
UC-E01 Catalog
      ↓
UC-H04 Add Book
      ↓
UC-H01 Create Reading List
      ↓
UC-H05 Publish
      ↓
UC-H08 Student View
```

---

# 55. GLOBAL SYSTEM RULES

## RULE-01

User harus terautentikasi untuk mengakses fitur yang membutuhkan akun.

## RULE-02

Authorization harus dilakukan server-side.

## RULE-03

Role tidak boleh menentukan akses secara frontend saja.

## RULE-04

Book permission harus diperiksa sebelum ebook diberikan.

## RULE-05

`Read`, `Download`, dan `Share` merupakan permission berbeda.

## RULE-06

Student hanya dapat melihat data miliknya sendiri kecuali data yang memang dibagikan kepada kelas.

## RULE-07

Teacher hanya dapat melihat aktivitas siswa dalam scope yang diizinkan.

## RULE-08

User tidak dapat mengakses resource yang tidak dimilikinya hanya dengan mengubah ID pada URL/request.

Contoh:

```text
/books/123
/books/124
```

Sistem tetap harus melakukan authorization.

## RULE-09

File ebook tidak boleh memiliki akses public yang melewati authorization.

## RULE-10

Data penting tidak boleh langsung dihapus jika masih dibutuhkan untuk histori/audit.

Gunakan archive/soft delete jika sesuai.

---

# 56. USE CASE TO FEATURE MAPPING

| Feature            | Use Case   |
| ------------------ | ---------- |
| Login              | UC-A01     |
| User Management    | UC-B01–B05 |
| Class Management   | UC-C01–C04 |
| Book Management    | UC-D01–D09 |
| Catalog            | UC-E01     |
| Search             | UC-E02     |
| Filter             | UC-E03     |
| Book Detail        | UC-E04     |
| Reader             | UC-F01–F05 |
| Bookmark           | UC-F06     |
| Progress           | UC-F07     |
| Highlight          | UC-F08     |
| Notes              | UC-F09     |
| History            | UC-F10     |
| Access Control     | UC-G01–G04 |
| Reading List       | UC-H01–H05 |
| Teacher Monitoring | UC-H06     |
| Recommendation     | UC-H07     |
| Notification       | UC-I01–I03 |
| Dashboard          | UC-J01–J04 |
| Statistics         | UC-K01–K02 |
| Export             | UC-K03–K04 |
| Audit Log          | UC-L01–L02 |

---

# 57. ACCEPTANCE CRITERIA GLOBAL

Use Case dianggap berhasil apabila:

1. Setiap role hanya dapat menjalankan use case yang diizinkan.
2. Authentication berjalan dengan benar.
3. Authorization diterapkan pada setiap resource sensitif.
4. User tidak dapat mengakses data user lain secara ilegal.
5. User tidak dapat membaca buku restricted tanpa permission.
6. Download mengikuti permission.
7. Teacher hanya dapat melihat aktivitas siswa sesuai scope.
8. Admin dapat mengelola sistem sesuai permission.
9. Library Staff dapat mengelola koleksi sesuai permission.
10. Aktivitas penting tercatat.
11. Reading progress tersimpan.
12. Reading list dapat dibuat dan dibagikan.
13. Dashboard menampilkan data sesuai role.

---

# 58. TRACEABILITY

Setiap Use Case harus dapat ditelusuri ke:

```text
PRD
 ↓
Role & Permission
 ↓
Use Case
 ↓
User Flow
 ↓
API
 ↓
UI
 ↓
Test Case
```

Contoh:

```text
PRD:
Digital Reader

      ↓

Permission:
books.read

      ↓

Use Case:
UC-F01 Read Book

      ↓

User Flow:
Book Detail → Authorization → Reader

      ↓

API:
GET protected book resource

      ↓

UI:
Digital Reader

      ↓

Test:
Authorized user can read
Unauthorized user cannot read
```

---

# 59. RULE UNTUK AI/VIBE CODER

AI wajib:

1. Menggunakan ID Use Case dalam implementasi dan dokumentasi jika relevan.
2. Tidak mengimplementasikan fitur yang tidak memiliki dasar requirement.
3. Tidak mengubah actor tanpa approval.
4. Tidak memberikan permission yang tidak didefinisikan.
5. Tidak melewati authorization.
6. Tidak menganggap frontend sebagai security boundary.
7. Memastikan resource ownership.
8. Menulis test berdasarkan acceptance criteria.
9. Melaporkan apabila implementasi membutuhkan perubahan Use Case.
10. Tidak mengubah business flow tanpa persetujuan.

---

# END OF USE CASE DOCUMENT

**Dokumen:** Use Case
**Produk:** Sistem Perpustakaan Digital Madrasah Hasan Muchyi Kapurejo
**Versi:** 1.0
**Status:** Ready for User Flow Design
