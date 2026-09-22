# 08 — API SPECIFICATION

**Project:** Digital Library Madrasah Hasan Muchyi Kapurejo
**Version:** 1.0
**Status:** Development Reference

---

# 1. Tujuan

Dokumen ini mendefinisikan kontrak komunikasi antara frontend dan backend Digital Library.

API menjadi penghubung:

```text
Frontend
   ↓
HTTP Request
   ↓
API
   ↓
Backend Business Logic
   ↓
Database / Storage
   ↓
HTTP Response
   ↓
Frontend
```

Dokumen ini digunakan sebagai acuan implementasi frontend dan backend.

---

# 2. API Principles

API harus:

1. Konsisten.
2. Menggunakan HTTP method sesuai fungsi.
3. Menggunakan status code yang sesuai.
4. Memvalidasi input di backend.
5. Menggunakan authentication untuk protected endpoint.
6. Menggunakan authorization untuk permission.
7. Tidak membocorkan data sensitif.
8. Tidak memberikan URL ebook private secara sembarangan.
9. Menggunakan pagination untuk data besar.
10. Menggunakan format response yang konsisten.

---

# 3. Base URL

Development:

```text
/api
```

Production:

```text
https://[domain]/api
```

Domain production belum ditentukan.

---

# 4. HTTP Methods

| Method | Fungsi                            |
| ------ | --------------------------------- |
| GET    | Mengambil data                    |
| POST   | Membuat data / menjalankan action |
| PUT    | Mengubah data                     |
| PATCH  | Perubahan sebagian                |
| DELETE | Menghapus data                    |

Contoh:

```text
GET /api/books
```

artinya mengambil daftar buku.

```text
POST /api/books
```

artinya membuat buku baru.

---

# 5. Authentication

Endpoint protected membutuhkan authentication.

Contoh:

```text
Authorization: Bearer <token>
```

atau secure session cookie sesuai teknologi final.

Mekanisme final akan mengikuti keputusan Tech Stack.

---

# 6. Response Standard

Response sukses:

```json
{
  "success": true,
  "data": {},
  "message": "Success"
}
```

Response error:

```json
{
  "success": false,
  "message": "Error message",
  "errors": {}
}
```

Response list:

```json
{
  "success": true,
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "total_pages": 5
  }
}
```

---

# 7. HTTP Status Code

Gunakan:

| Status | Meaning                       |
| ------ | ----------------------------- |
| 200    | Success                       |
| 201    | Created                       |
| 204    | Success without response body |
| 400    | Bad Request                   |
| 401    | Unauthorized                  |
| 403    | Forbidden                     |
| 404    | Not Found                     |
| 409    | Conflict                      |
| 422    | Validation Error              |
| 429    | Too Many Requests             |
| 500    | Internal Server Error         |

---

# 8. Authentication API

## POST `/auth/login`

Login user.

### Request

```json
{
  "username": "Nama Lengkap",
  "nisn": "1234567890"
}
```

### Process

```text
Request
 ↓
Validate
 ↓
Find User
 ↓
Check Credential
 ↓
Check Status
 ↓
Create Session/Token
 ↓
Return User
```

### Success

`200 OK`

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "full_name": "Nama User",
      "role": "STUDENT_MTS",
      "class": "VII A"
    }
  },
  "message": "Login berhasil"
}
```

### Error

`401 Unauthorized`

```json
{
  "success": false,
  "message": "Nama lengkap atau NISN salah"
}
```

---

# 9. POST `/auth/logout`

Logout current user.

Authentication required.

### Response

`200 OK`

```json
{
  "success": true,
  "message": "Logout berhasil"
}
```

---

# 10. GET `/auth/me`

Mengambil informasi user yang sedang login.

Authentication required.

### Response

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "full_name": "Nama User",
    "role": "STUDENT_MA",
    "level": "MA",
    "class": "IPS 1",
    "status": "ACTIVE"
  }
}
```

---

# 11. User API

## GET `/users`

Permission:

```text
users.view
```

Query:

```text
?page=1
&limit=20
&search=zaenal
&role=STUDENT_MA
&class_id=uuid
&status=ACTIVE
```

---

## GET `/users/:id`

Melihat detail user.

Permission:

```text
users.view
```

---

## POST `/users`

Membuat user.

Permission:

```text
users.create
```

Request:

```json
{
  "full_name": "Nama Lengkap",
  "username": "Nama Lengkap",
  "nisn": "1234567890",
  "role_id": "uuid",
  "class_id": "uuid",
  "status": "ACTIVE"
}
```

---

## PUT `/users/:id`

Mengubah user.

Permission:

```text
users.update
```

---

## PATCH `/users/:id/status`

Mengaktifkan/nonaktifkan user.

Permission:

```text
users.update
```

Request:

```json
{
  "status": "INACTIVE"
}
```

---

# 12. Import User API

## POST `/users/import`

Permission:

```text
users.import
```

Content-Type:

```text
multipart/form-data
```

Input:

```text
file
```

Flow:

```text
Upload
 ↓
Validate File
 ↓
Parse Data
 ↓
Validate Rows
 ↓
Preview/Result
 ↓
Import
```

Jika sistem menggunakan mode preview, proses import final harus menunggu konfirmasi administrator.

---

# 13. Class API

## GET `/classes`

Mengambil daftar kelas.

Authentication required.

Query:

```text
?level_id=uuid
&academic_year=2026/2027
&status=ACTIVE
```

---

## POST `/classes`

Permission:

```text
classes.create
```

Request:

```json
{
  "level_id": "uuid",
  "name": "VII A",
  "grade": "VII",
  "academic_year": "2026/2027"
}
```

---

## PUT `/classes/:id`

Permission:

```text
classes.update
```

---

## DELETE `/classes/:id`

Permission:

```text
classes.delete
```

Hard delete harus dibatasi oleh foreign key/data dependency.

Jika kelas telah digunakan oleh user, gunakan deactivation/archive strategy.

---

# 14. Level API

## GET `/levels`

Mengambil jenjang.

Contoh:

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "code": "MTs",
      "name": "MTs"
    },
    {
      "id": "uuid",
      "code": "MA",
      "name": "MA"
    }
  ]
}
```

---

# 15. Book API

## GET `/books`

Mengambil catalog buku.

Authentication required.

Query:

```text
?page=1
&limit=20
&search=matematika
&category_id=uuid
&author_id=uuid
&publisher_id=uuid
&level_id=uuid
&status=PUBLISHED
```

Response:

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Matematika",
      "slug": "matematika",
      "cover_url": "...",
      "authors": [],
      "categories": [],
      "publisher": {},
      "page_count": 200,
      "status": "PUBLISHED"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "total_pages": 1
  }
}
```

---

# 16. GET `/books/:id`

Mengambil detail buku.

Authentication required.

Backend harus mempertimbangkan akses user ketika menentukan informasi yang dapat diberikan.

---

# 17. POST `/books`

Membuat metadata buku.

Permission:

```text
books.create
```

Request:

```json
{
  "title": "Judul Buku",
  "description": "Deskripsi",
  "isbn": "123456789",
  "publication_year": 2026,
  "publisher_id": "uuid",
  "language": "id",
  "page_count": 200
}
```

Status awal:

```text
DRAFT
```

---

# 18. PUT `/books/:id`

Permission:

```text
books.update
```

Digunakan untuk mengubah metadata buku.

---

# 19. POST `/books/:id/publish`

Permission:

```text
books.publish
```

Flow:

```text
Book Draft
 ↓
Validate Metadata
 ↓
Validate File
 ↓
Validate Access Rule
 ↓
Publish
```

Response:

```json
{
  "success": true,
  "message": "Buku berhasil dipublish"
}
```

---

# 20. POST `/books/:id/archive`

Permission:

```text
books.archive
```

Mengubah status:

```text
PUBLISHED → ARCHIVED
```

---

# 21. Book File API

## POST `/books/:id/files`

Permission:

```text
books.upload
```

Content-Type:

```text
multipart/form-data
```

Input:

```text
file
```

Backend melakukan:

```text
Validate
 ↓
Store
 ↓
Create book_files
```

---

# 22. GET `/books/:id/files`

Permission:

```text
books.view
```

Mengambil metadata file, bukan public storage URL.

---

# 23. Book Access API

## GET `/books/:id/access`

Mengambil informasi permission user terhadap buku.

Authentication required.

Response:

```json
{
  "success": true,
  "data": {
    "can_read": true,
    "can_download": false,
    "can_share": false
  }
}
```

---

# 24. POST `/books/:id/access-rules`

Permission:

```text
books.access_rules.manage
```

Request:

```json
{
  "role_id": "uuid",
  "level_id": null,
  "class_id": "uuid",
  "user_id": null,
  "can_read": true,
  "can_download": false,
  "can_share": false
}
```

---

# 25. PUT `/books/:id/access-rules/:ruleId`

Mengubah access rule.

---

# 26. DELETE `/books/:id/access-rules/:ruleId`

Menghapus access rule.

---

# 27. Read Book API

## GET `/books/:id/read`

Authentication required.

Flow:

```text
Authentication
 ↓
Global Permission
 ↓
Book Access Rule
 ↓
File Validation
 ↓
Secure Reader Access
```

Jika allowed:

```text
200 OK
```

Jika tidak:

```text
403 Forbidden
```

Response harus memberikan resource/access mechanism yang aman sesuai implementasi storage.

Jangan mengembalikan permanent public URL.

---

# 28. Download API

## GET `/books/:id/download`

Authentication required.

Required permission:

```text
books.download
```

Kemudian:

```text
Book Access Rule
```

Jika tidak diizinkan:

```text
403 Forbidden
```

Jika diizinkan:

```text
Secure Download
```

Aktivitas dicatat:

```text
BOOK_DOWNLOAD
```

---

# 29. Share API

## POST `/books/:id/share`

Authentication required.

Required permission:

```text
books.share
```

Flow:

```text
Check Authentication
 ↓
Check Permission
 ↓
Check Book Access Rule
 ↓
Generate share reference
 ↓
Return share result
```

Share reference tidak boleh memberikan bypass terhadap authorization.

---

# 30. Reading Progress API

## GET `/books/:id/progress`

Authentication required.

Response:

```json
{
  "success": true,
  "data": {
    "current_page": 35,
    "progress_percentage": 35,
    "last_read_at": "2026-09-17T10:00:00Z"
  }
}
```

---

## PUT `/books/:id/progress`

Request:

```json
{
  "current_page": 35,
  "progress_percentage": 35
}
```

User hanya dapat mengubah progress miliknya.

---

# 31. Bookmark API

## GET `/books/:id/bookmarks`

Authentication required.

---

## POST `/books/:id/bookmarks`

Request:

```json
{
  "page": 35,
  "label": "Rumus penting"
}
```

---

## DELETE `/bookmarks/:id`

User hanya dapat menghapus bookmark miliknya.

---

# 32. Highlight API

## GET `/books/:id/highlights`

Authentication required.

---

## POST `/books/:id/highlights`

Request:

```json
{
  "page": 35,
  "selected_text": "Contoh teks",
  "position_data": {}
}
```

---

## PUT `/highlights/:id`

User hanya dapat mengubah highlight miliknya.

---

## DELETE `/highlights/:id`

User hanya dapat menghapus highlight miliknya.

---

# 33. Notes API

## GET `/books/:id/notes`

Authentication required.

---

## POST `/books/:id/notes`

Request:

```json
{
  "page": 35,
  "content": "Catatan saya",
  "position_data": {}
}
```

---

## PUT `/notes/:id`

User hanya dapat mengubah note miliknya.

---

## DELETE `/notes/:id`

User hanya dapat menghapus note miliknya.

---

# 34. Reading History API

## GET `/reading-history`

Authentication required.

Query:

```text
?page=1
&limit=20
```

User hanya melihat history miliknya.

---

## GET `/books/:id/history`

Authentication required.

Mengambil informasi reading history user terhadap buku tertentu.

---

# 35. Reading List API

## GET `/reading-lists`

Menampilkan reading list yang dapat diakses user.

---

## POST `/reading-lists`

Permission:

```text
reading_lists.create
```

Request:

```json
{
  "name": "Bacaan Kelas VII",
  "description": "Daftar bacaan",
  "status": "DRAFT"
}
```

---

## GET `/reading-lists/:id`

Mengambil detail reading list.

---

## PUT `/reading-lists/:id`

Mengubah reading list.

---

## DELETE `/reading-lists/:id`

Menghapus reading list sesuai ownership/permission.

---

# 36. Reading List Items

## POST `/reading-lists/:id/books`

Request:

```json
{
  "book_id": "uuid"
}
```

---

## DELETE `/reading-lists/:id/books/:bookId`

Menghapus buku dari reading list.

---

# 37. Reading List Targets

## POST `/reading-lists/:id/targets`

Request:

```json
{
  "class_id": "uuid"
}
```

Target harus berada dalam scope teacher.

---

# 38. Publish Reading List

## POST `/reading-lists/:id/publish`

Permission:

```text
reading_lists.publish
```

Flow:

```text
Validate
 ↓
Publish
 ↓
Determine recipients
 ↓
Create notification
```

---

# 39. Recommendation API

## GET `/recommendations`

Menampilkan rekomendasi yang dapat dilihat user.

---

## POST `/recommendations`

Permission:

```text
recommendations.create
```

Request:

```json
{
  "book_id": "uuid",
  "target_class_id": "uuid",
  "target_level_id": "uuid",
  "title": "Buku rekomendasi",
  "message": "Silakan dibaca."
}
```

---

## PUT `/recommendations/:id`

Mengubah recommendation milik creator sesuai permission.

---

## DELETE `/recommendations/:id`

Menghapus recommendation sesuai permission.

---

# 40. Notification API

## GET `/notifications`

Authentication required.

Query:

```text
?page=1
&limit=20
&is_read=false
```

---

## GET `/notifications/:id`

Mengambil detail notification.

---

## PATCH `/notifications/:id/read`

Menandai notification sebagai dibaca.

User hanya dapat mengubah status notification yang menjadi recipient dirinya.

---

# 41. Admin Notification API

## POST `/notifications`

Permission:

```text
notifications.create
```

Request:

```json
{
  "title": "Pengumuman Perpustakaan",
  "message": "Informasi baru.",
  "target_type": "CLASS",
  "target_id": "uuid"
}
```

Target type dapat berupa:

```text
ALL
ROLE
LEVEL
CLASS
USER
```

---

# 42. Statistics API

## GET `/statistics/overview`

Permission:

```text
statistics.view
```

Response konseptual:

```json
{
  "success": true,
  "data": {
    "total_users": 500,
    "total_books": 200,
    "total_reading_activity": 1000,
    "active_users": 300
  }
}
```

Angka di atas hanya contoh response, bukan data aktual.

---

# 43. Statistics Filter

Query:

```text
?start_date=2026-01-01
&end_date=2026-09-17
&level_id=uuid
&class_id=uuid
```

Backend harus memvalidasi scope user.

---

# 44. Popular Books API

## GET `/statistics/popular-books`

Permission:

```text
statistics.view
```

Query:

```text
?period=monthly
&limit=10
```

Data dapat dihitung berdasarkan reading history/access activity.

---

# 45. Class Statistics API

## GET `/statistics/classes/:id`

Permission:

```text
statistics.view
```

Teacher hanya boleh menggunakan endpoint ini untuk class yang berada dalam scope-nya.

Admin dapat memiliki scope lebih luas sesuai permission.

---

# 46. Report API

## GET `/reports/reading-activity`

Permission:

```text
reports.export
```

Query:

```text
?start_date=2026-01-01
&end_date=2026-09-17
&format=xlsx
```

Format:

```text
xlsx
pdf
```

---

# 47. Activity Log API

## GET `/activity-logs`

Permission:

```text
activity_logs.view
```

Query:

```text
?page=1
&limit=50
&user_id=uuid
&action=BOOK_READ
&start_date=2026-09-01
&end_date=2026-09-17
```

---

# 48. Author API

## GET `/authors`

Public/authenticated catalog data sesuai kebutuhan.

---

## POST `/authors`

Permission:

```text
authors.create
```

Request:

```json
{
  "name": "Nama Penulis",
  "biography": "Biografi"
}
```

---

## PUT `/authors/:id`

Permission:

```text
authors.update
```

---

## DELETE `/authors/:id`

Permission:

```text
authors.delete
```

Deletion harus mempertimbangkan relasi dengan buku.

---

# 49. Category API

## GET `/categories`

---

## POST `/categories`

Permission:

```text
categories.create
```

Request:

```json
{
  "name": "Matematika",
  "description": "Kategori Matematika"
}
```

---

## PUT `/categories/:id`

Permission:

```text
categories.update
```

---

## DELETE `/categories/:id`

Permission:

```text
categories.delete
```

---

# 50. Publisher API

## GET `/publishers`

---

## POST `/publishers`

Permission:

```text
publishers.create
```

---

## PUT `/publishers/:id`

Permission:

```text
publishers.update
```

---

## DELETE `/publishers/:id`

Permission:

```text
publishers.delete
```

---

# 51. Authorization Matrix

| Endpoint Group   | Student        | Teacher              | Staff                | Admin         |
| ---------------- | -------------- | -------------------- | -------------------- | ------------- |
| Catalog          | Read           | Read                 | Read                 | Full          |
| Book Read        | Based on rule  | Based on rule        | Based on rule        | Based on rule |
| Bookmark         | Own            | Own                  | Own                  | Own           |
| Highlight        | Own            | Own                  | Own                  | Own           |
| Notes            | Own            | Own                  | Own                  | Own           |
| Book CRUD        | No             | According permission | Yes                  | Yes           |
| User Management  | No             | No                   | Limited              | Yes           |
| Class Management | No             | Scope                | Limited              | Yes           |
| Reading List     | Read           | Manage own           | According permission | Yes           |
| Recommendation   | Read           | Manage own           | According permission | Yes           |
| Statistics       | Personal/scope | Scope                | According permission | Yes           |
| Reports          | No             | Scope if permitted   | According permission | Yes           |
| Activity Logs    | No             | Limited              | According permission | Yes           |

Detail permission mengikuti `03-roles-permissions.md`.

---

# 52. Pagination Standard

List endpoint menggunakan:

```text
?page=1
&limit=20
```

Default:

```text
page = 1
limit = 20
```

Maximum:

```text
limit = 100
```

Backend harus membatasi nilai `limit`.

---

# 53. Sorting

Format:

```text
?sort=created_at
&order=desc
```

Backend hanya boleh menerima field yang masuk whitelist.

Jangan langsung memasukkan parameter sorting user ke SQL.

---

# 54. Search

Contoh:

```text
GET /books?search=matematika
```

Search dilakukan server-side.

Backend harus menggunakan parameterized query/ORM.

---

# 55. API Validation

Setiap endpoint harus memiliki validation schema.

Contoh:

```text
POST /books
```

Validasi:

```text
title → required
publication_year → integer
page_count → integer
publisher_id → valid UUID
```

Invalid:

```text
422 Unprocessable Entity
```

---

# 56. API Security

API harus:

* menggunakan HTTPS pada production
* authentication pada protected route
* server-side authorization
* input validation
* rate limiting untuk endpoint sensitif
* secure headers
* CORS configuration
* parameterized queries/ORM
* secure file access
* tidak mengirim password hash ke frontend
* tidak membocorkan credential storage
* tidak mengembalikan stack trace

---

# 57. Rate Limiting

Minimal pertimbangkan rate limit untuk:

```text
/auth/login
/auth/*
/users/import
/book upload
/report generation
```

Tujuannya mencegah abuse dan resource exhaustion.

---

# 58. API Versioning

Untuk MVP dapat menggunakan:

```text
/api/v1/
```

Contoh:

```text
/api/v1/books
/api/v1/auth/login
/api/v1/users
```

Penggunaan versioning membuat API lebih mudah dikembangkan tanpa memutus client lama.

---

# 59. API Naming Convention

Gunakan plural noun:

```text
/books
/users
/classes
/categories
/authors
/publishers
/notifications
```

Gunakan action endpoint jika operasi bukan CRUD biasa:

```text
/books/:id/publish
/books/:id/archive
/books/:id/download
/reading-lists/:id/publish
```

Hindari:

```text
/getBooks
/createBook
/deleteBook
```

---

# 60. API Error Example

Validation:

```json
{
  "success": false,
  "message": "Data tidak valid",
  "errors": {
    "title": [
      "Judul wajib diisi"
    ]
  }
}
```

Unauthorized:

```json
{
  "success": false,
  "message": "Anda harus login"
}
```

Forbidden:

```json
{
  "success": false,
  "message": "Anda tidak memiliki akses"
}
```

Not Found:

```json
{
  "success": false,
  "message": "Buku tidak ditemukan"
}
```

Conflict:

```json
{
  "success": false,
  "message": "Data sudah tersedia"
}
```

---

# 61. API Ownership Rules

User hanya boleh memodifikasi resource yang menjadi miliknya apabila endpoint menggunakan ownership rule.

Contoh:

```text
PUT /notes/:id
```

Backend:

```text
note.user_id == authenticated_user.id
```

Jika tidak:

```text
403 Forbidden
```

---

# 62. Teacher Scope Rules

Untuk endpoint teacher:

```text
Teacher
 ↓
Requested Class
 ↓
Check Teacher Scope
 ↓
Allowed?
```

Jika tidak:

```text
403 Forbidden
```

Frontend tidak boleh menentukan scope.

---

# 63. File Security Rules

API file tidak boleh:

```text
GET /public/books/book.pdf
```

Gunakan:

```text
GET /api/v1/books/:id/read
```

dan backend menentukan apakah user memiliki akses.

---

# 64. API Transaction Rules

Gunakan transaction untuk operasi:

* Import user
* Publish book
* Publish reading list
* Create notification recipients
* Multi-table update

Tujuannya menjaga konsistensi database.

---

# 65. API Logging

Log minimal:

```text
request_id
user_id
endpoint
method
status_code
timestamp
duration
```

Jangan mencatat:

```text
password
NISN secara sembarangan
authentication token
storage secret
```

---

# 66. API Acceptance Criteria

API dianggap siap jika:

* Endpoint mengikuti naming convention.
* Authentication diterapkan.
* Authorization diterapkan.
* Role permission terhubung.
* Teacher scope diterapkan.
* Ownership diterapkan.
* Validation tersedia.
* Error response konsisten.
* Pagination tersedia pada list endpoint.
* File ebook aman.
* Download memiliki permission.
* Share memiliki permission.
* Activity logging tersedia.
* Rate limiting dipertimbangkan.
* API versioning tersedia.
* Database transaction digunakan pada operasi kritis.

---

# 67. API Development Order

Implementasi API dilakukan bertahap:

```text
01 Authentication
      ↓
02 Users & Roles
      ↓
03 Levels & Classes
      ↓
04 Books
      ↓
05 Authors / Categories / Publishers
      ↓
06 Book Files
      ↓
07 Access Control
      ↓
08 Reader
      ↓
09 Progress / Bookmark / Highlight / Notes
      ↓
10 Reading Lists
      ↓
11 Recommendations
      ↓
12 Notifications
      ↓
13 Statistics
      ↓
14 Reports
      ↓
15 Activity Logs
```

---

# 68. API Contract Rule

Frontend dan backend harus mengacu pada dokumen API ini.

Jika API berubah:

```text
API Change
 ↓
Update Documentation
 ↓
Update Backend
 ↓
Update Frontend
 ↓
Test
```

Jangan mengubah response API secara diam-diam.

---

# 69. AI Coding Agent Rules

AI coding agent wajib:

1. Mengikuti endpoint yang telah ditentukan.
2. Tidak membuat endpoint duplikat.
3. Tidak mengubah response contract tanpa approval.
4. Tidak melewati authorization.
5. Tidak mempercayai permission dari frontend.
6. Tidak mengembalikan credential sensitif.
7. Tidak membuat public ebook URL.
8. Menggunakan validation.
9. Menggunakan transaction pada operasi kritis.
10. Menggunakan pagination pada list besar.
11. Menggunakan ownership check.
12. Menggunakan teacher scope check.
13. Menulis test untuk endpoint kritis.
14. Jika endpoint belum didefinisikan tetapi diperlukan implementasi, laporkan terlebih dahulu atau dokumentasikan perubahan sesuai change request.
15. Jika terdapat konflik dengan PRD, Use Case, User Flow, atau Database, **STOP dan laporkan konflik**.

---

# 70. Current Project Status

```text
01 Requirements        ✅
02 PRD                 ✅
03 Roles & Permission  ✅
04 Use Cases           ✅
05 User Flows          ✅
06 Database / ERD      ✅
07 Architecture       ✅
08 API Specification   ✅
09 UI/UX               ⏭️
10 AI Coding Rules     ⏭️
11 Test Plan           ⏭️
12 Development Sprint  ⏭️
```

Tahap berikutnya adalah:

**09 — UI/UX Specification**

UI/UX akan menerjemahkan seluruh flow menjadi halaman dan komponen:

```text
Login
Dashboard
Catalog
Book Detail
Reader
Reading List
Notifications
Profile
Admin Dashboard
User Management
Class Management
Book Management
Statistics
Reports
Activity Logs
```

Setiap halaman akan ditentukan:

* tujuan
* siapa yang dapat mengakses
* layout
* komponen
* state
* loading
* empty state
* error state
* responsive behavior
* action
* permission
* hubungan dengan API
