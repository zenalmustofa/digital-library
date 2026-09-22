# 05 — User Flows

**Project:** Digital Library Madrasah Hasan Muchyi Kapurejo
**Version:** 1.0
**Status:** Approved for Development Reference

---

## 1. Tujuan Dokumen

Dokumen ini mendefinisikan alur interaksi pengguna dengan sistem Digital Library Madrasah Hasan Muchyi Kapurejo.

User Flow menjadi penghubung antara:

```text
PRD
 ↓
Role & Permission
 ↓
Use Case
 ↓
USER FLOW
 ↓
DATABASE
 ↓
SYSTEM ARCHITECTURE
 ↓
IMPLEMENTATION
```

AI coding agent wajib mengikuti flow yang didefinisikan di dokumen ini.

AI **tidak boleh membuat alur bisnis baru** tanpa persetujuan.

---

# 2. Aktor Sistem

Sistem memiliki 6 role utama:

| Role                 | Kode              |
| -------------------- | ----------------- |
| Administrator        | `ADMIN`           |
| Petugas Perpustakaan | `LIBRARY_STAFF`   |
| Guru                 | `TEACHER`         |
| Tenaga Kependidikan  | `EDUCATION_STAFF` |
| Siswa MTs            | `STUDENT_MTS`     |
| Siswa MA             | `STUDENT_MA`      |

---

# 3. Prinsip Umum User Flow

Semua aktivitas pengguna mengikuti pola:

```text
User
 ↓
Authentication
 ↓
Authorization
 ↓
Access Feature
 ↓
Business Rule Validation
 ↓
Action
 ↓
Database Update
 ↓
Activity Log
 ↓
Response
```

Authorization harus dilakukan di **server/backend**, bukan hanya pada frontend.

Contoh:

```text
User membuka buku
        ↓
Backend menerima request
        ↓
Cek user aktif?
        ↓
Cek buku tersedia?
        ↓
Cek user memiliki akses?
        ↓
Cek permission read?
        ↓
Berikan akses
        ↓
Catat aktivitas
```

---

# 4. Common Authentication Flow

## 4.1 Login

### Input

* Nama Lengkap
* NISN

### Flow

```text
START
  ↓
Buka halaman Login
  ↓
Input Nama Lengkap
  ↓
Input NISN
  ↓
Klik Login
  ↓
Validasi input
  ↓
Cari user berdasarkan credential
  ↓
User ditemukan?
 ├── NO → tampilkan error login
 │          ↓
 │        END
 │
 └── YES
       ↓
   User aktif?
    ├── NO → tampilkan akun tidak aktif
    │          ↓
    │        END
    │
    └── YES
          ↓
       Buat session/token
          ↓
       Simpan login activity
          ↓
       Redirect Dashboard
          ↓
         END
```

### Error

* Nama lengkap kosong
* NISN kosong
* Credential salah
* Akun tidak aktif
* Terjadi kesalahan server

---

# 5. Logout Flow

```text
Dashboard
   ↓
Klik Logout
   ↓
Konfirmasi/logout action
   ↓
Invalidate session/token
   ↓
Catat aktivitas logout
   ↓
Redirect Login
```

---

# 6. Profile Flow

```text
Login
 ↓
Dashboard
 ↓
Profile
 ↓
Tampilkan data pengguna
```

User dapat melihat data sesuai permission masing-masing.

Informasi dapat meliputi:

* Nama
* Role
* Jenjang
* Kelas
* Status akun
* Informasi akademik yang relevan

User tidak boleh mengubah data sensitif seperti role melalui frontend.

---

# 7. Student Flow

Berlaku untuk:

* `STUDENT_MTS`
* `STUDENT_MA`

---

## 7.1 Student Dashboard

```text
Login
 ↓
Dashboard
 ├── Buku terbaru
 ├── Lanjutkan membaca
 ├── Buku populer
 ├── Reading List
 ├── Rekomendasi guru
 └── Notifikasi
```

Konten dashboard harus mengikuti akses user.

---

# 8. Student — Browse Catalog

```text
Dashboard
 ↓
Catalog
 ↓
Tampilkan daftar buku
 ↓
User dapat:
 ├── Search
 ├── Filter
 ├── Sort
 └── Membuka detail buku
```

Filter dapat berdasarkan:

* Judul
* Penulis
* Kategori
* Penerbit
* Jenjang
* Tahun
* Status akses

---

# 9. Student — Search Book

```text
Catalog
 ↓
Masukkan keyword
 ↓
Submit Search
 ↓
Backend melakukan pencarian
 ↓
Tampilkan hasil
 ↓
Pilih buku
 ↓
Book Detail
```

Search tidak boleh hanya dilakukan di frontend jika data buku berasal dari database.

---

# 10. Student — Book Detail

```text
Catalog
 ↓
Pilih buku
 ↓
Book Detail
```

Informasi dapat meliputi:

* Cover
* Judul
* Penulis
* Penerbit
* Kategori
* Jenjang
* Deskripsi
* Informasi akses
* Tombol Baca
* Tombol Download jika diizinkan
* Tombol Share jika diizinkan

---

# 11. Student — Read Book

```text
Book Detail
 ↓
Klik "Baca"
 ↓
Backend Authorization
 ↓
User memiliki permission READ?
 ├── NO → Access Denied
 │
 └── YES
       ↓
   Secure Book Access
       ↓
   Buka Digital Reader
       ↓
   User membaca
       ↓
   Update Reading Progress
       ↓
   Simpan aktivitas membaca
```

---

# 12. Digital Reader Flow

Reader mendukung fitur:

* Next page
* Previous page
* Zoom
* Fullscreen
* Table of Contents
* Search text
* Bookmark
* Reading progress
* Highlight
* Notes
* Dark mode

Flow dasar:

```text
Open Reader
 ↓
Load book
 ↓
Load saved reading progress
 ↓
Jika ada progress:
      buka halaman terakhir
Jika tidak:
      buka halaman pertama
 ↓
User membaca
 ↓
User melakukan aktivitas
 ├── Next
 ├── Previous
 ├── Zoom
 ├── Search
 ├── Bookmark
 ├── Highlight
 └── Notes
 ↓
Update state
 ↓
Persist data jika diperlukan
```

---

# 13. Reading Progress Flow

```text
User membaca
 ↓
Halaman berubah
 ↓
Update current page
 ↓
Hitung progress
 ↓
Simpan progress
```

Contoh:

```text
Total halaman = 100
Halaman terakhir = 35

Progress = 35%
```

Progress harus terkait dengan:

```text
user_id
book_id
current_page
progress_percentage
last_read_at
```

---

# 14. Bookmark Flow

```text
Reader
 ↓
User klik Bookmark
 ↓
Simpan bookmark
 ↓
Tampilkan indikator bookmark
```

Jika bookmark sudah ada:

```text
Klik Bookmark
 ↓
Hapus bookmark
```

Bookmark harus dimiliki oleh user yang membuatnya.

---

# 15. Highlight Flow

```text
Reader
 ↓
User memilih teks
 ↓
Klik Highlight
 ↓
Simpan informasi highlight
 ↓
Tampilkan highlight
```

Data minimal:

```text
user_id
book_id
page
selected_text
position
created_at
```

---

# 16. Notes Flow

```text
Reader
 ↓
User memilih area/teks
 ↓
Klik Add Note
 ↓
Input catatan
 ↓
Save
 ↓
Simpan note
 ↓
Tampilkan indikator note
```

User hanya dapat mengubah atau menghapus note miliknya sendiri.

---

# 17. Reading History

```text
Dashboard
 ↓
Reading History
 ↓
Tampilkan buku yang pernah dibaca
 ↓
Pilih buku
 ↓
Buka kembali reader
 ↓
Load saved progress
```

---

# 18. Download Book Flow

Download adalah permission terpisah dari read.

```text
Book Detail
 ↓
Klik Download
 ↓
Backend Authorization
 ↓
Cek user memiliki DOWNLOAD permission?
 ├── NO → Access Denied
 │
 └── YES
       ↓
   Cek file tersedia
       ↓
   Generate secure access
       ↓
   Download file
       ↓
   Catat aktivitas
```

Sistem **tidak boleh menganggap user yang dapat membaca otomatis dapat mendownload**.

---

# 19. Share Book Flow

Share juga merupakan permission terpisah.

```text
Book Detail
 ↓
Klik Share
 ↓
Backend check SHARE permission
 ↓
Allowed?
 ├── NO → Access Denied
 │
 └── YES
       ↓
   Generate share reference/link
       ↓
   User melakukan share
       ↓
   Catat aktivitas
```

Link share tidak boleh otomatis memberikan akses kepada pengguna yang tidak memiliki permission.

---

# 20. Access Denied Flow

Jika user tidak memiliki akses:

```text
User meminta resource
 ↓
Backend authorization
 ↓
Permission tidak tersedia
 ↓
HTTP 403 Forbidden
 ↓
Frontend menampilkan:
"Anda tidak memiliki akses ke buku ini."
```

Sistem tidak boleh membocorkan file atau URL storage.

---

# 21. Teacher Flow

Role:

```text
TEACHER
```

---

## 21.1 Teacher Dashboard

```text
Login
 ↓
Teacher Dashboard
 ├── Buku
 ├── Reading List
 ├── Rekomendasi
 ├── Aktivitas siswa
 └── Notifikasi
```

---

# 22. Teacher — Create Reading List

```text
Teacher Dashboard
 ↓
Reading List
 ↓
Create Reading List
 ↓
Input:
 ├── Nama reading list
 ├── Deskripsi
 └── Buku
 ↓
Add Books
 ↓
Tentukan target
 ├── Kelas tertentu
 └── Sesuai scope teacher
 ↓
Save
```

---

# 23. Teacher — Add Book to Reading List

```text
Reading List
 ↓
Add Book
 ↓
Search Catalog
 ↓
Pilih buku
 ↓
Add
 ↓
Book masuk reading list
```

Teacher tidak dapat memasukkan buku yang tidak dapat digunakan oleh scope yang berlaku tanpa melewati aturan akses sistem.

---

# 24. Teacher — Publish Reading List

```text
Draft Reading List
 ↓
Review
 ↓
Publish
 ↓
Validasi:
 ├── Nama tersedia
 ├── Minimal satu buku
 └── Target valid
 ↓
Publish
 ↓
Reading List menjadi aktif
 ↓
Notification jika fitur notifikasi digunakan
```

---

# 25. Teacher — Recommend Book

```text
Teacher Dashboard
 ↓
Catalog
 ↓
Pilih buku
 ↓
Recommend
 ↓
Pilih target
 ↓
Tambahkan pesan/deskripsi jika diperlukan
 ↓
Publish Recommendation
 ↓
Siswa target dapat melihat rekomendasi
```

---

# 26. Teacher — View Student Activity

Teacher dapat melihat aktivitas siswa sesuai scope yang diberikan sistem.

```text
Teacher Dashboard
 ↓
Student Activity
 ↓
Pilih kelas/scope
 ↓
Tampilkan aktivitas yang diizinkan
```

Contoh informasi:

* Buku yang dibaca
* Reading progress
* Aktivitas membaca
* Statistik kelas

Teacher **tidak boleh melihat data siswa di luar scope permission-nya**.

---

# 27. Library Staff Flow

Role:

```text
LIBRARY_STAFF
```

---

## 27.1 Manage Book

```text
Library Dashboard
 ↓
Books
 ↓
Create / Edit Book
 ↓
Input Metadata
 ↓
Upload File
 ↓
Set Category
 ↓
Set Author
 ↓
Set Publisher
 ↓
Set Access Rule
 ↓
Save
```

---

# 28. Book Upload Flow

```text
Library Staff
 ↓
Create/Edit Book
 ↓
Upload Ebook
 ↓
Validate file
 ├── File valid → continue
 └── File invalid → error
 ↓
Validate metadata
 ↓
Validate content rights/status
 ↓
Store file securely
 ↓
Set permission
 ↓
Save as Draft
```

---

# 29. Book Publish Flow

Book tidak langsung harus tersedia setelah upload.

```text
Draft
 ↓
Review metadata
 ↓
Review ebook
 ↓
Review access rule
 ↓
Publish
 ↓
Book status = PUBLISHED
 ↓
Book muncul di catalog
```

Jika belum siap:

```text
Draft
 ↓
Tidak Publish
 ↓
Tetap tidak terlihat oleh user umum
```

---

# 30. Book Archive Flow

```text
Published Book
 ↓
Archive
 ↓
Konfirmasi
 ↓
Book status = ARCHIVED
 ↓
Tidak muncul pada catalog aktif
```

Data buku tidak langsung dihapus.

---

# 31. Book Access Rule Flow

Setiap buku dapat memiliki aturan akses.

```text
Book
 ↓
Access Rules
 ↓
Tentukan:
 ├── Role
 ├── Jenjang
 ├── Kelas
 └── User tertentu
 ↓
Tentukan permission:
 ├── READ
 ├── DOWNLOAD
 └── SHARE
 ↓
Save
```

Contoh:

```text
Buku A
READ       = semua siswa
DOWNLOAD   = guru + library staff
SHARE      = guru
```

---

# 32. Education Staff Flow

Role:

```text
EDUCATION_STAFF
```

Flow utama:

```text
Login
 ↓
Dashboard
 ↓
Catalog
 ↓
Search / Filter
 ↓
Book Detail
 ↓
Check Access
 ↓
Read
 ↓
Bookmark / Highlight / Notes / Progress
```

Akses mengikuti permission yang diberikan.

---

# 33. Admin Flow

Role:

```text
ADMIN
```

Admin memiliki akses administratif sesuai Role & Permission document.

---

## 33.1 Admin Dashboard

```text
Login
 ↓
Admin Dashboard
 ├── Users
 ├── Classes
 ├── Books
 ├── Access Rules
 ├── Notifications
 ├── Statistics
 ├── Reports
 └── Activity Logs
```

---

# 34. Admin — User Management

```text
Admin
 ↓
Users
 ↓
Pilih action
 ├── View
 ├── Create
 ├── Edit
 ├── Activate
 ├── Deactivate
 └── Import
```

---

# 35. Import User Flow

```text
Admin
 ↓
Import Users
 ↓
Upload file
 ↓
Validate format
 ↓
Validate required fields
 ↓
Validate duplicate data
 ↓
Preview
 ↓
Admin confirmation
 ↓
Import
 ↓
Create/update users
 ↓
Generate import result
 ↓
Catat activity
```

Sistem harus menampilkan hasil:

```text
Total data
Berhasil
Gagal
Duplikat
Error
```

---

# 36. Class Management Flow

```text
Admin
 ↓
Classes
 ↓
Create/Edit Class
 ↓
Tentukan:
 ├── Jenjang
 ├── Tingkat
 └── Nama kelas
 ↓
Save
```

Struktur tidak boleh hard-coded hanya untuk kelas tertentu.

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

Admin harus dapat menambah struktur baru tanpa mengubah source code.

---

# 37. Notification Flow

```text
Admin/Teacher
 ↓
Create Notification
 ↓
Tentukan target
 ↓
Input title + message
 ↓
Publish
 ↓
System menentukan penerima
 ↓
Notification tersimpan
 ↓
User melihat notification
```

Target dapat berupa:

* Semua pengguna
* Role tertentu
* Jenjang tertentu
* Kelas tertentu
* User tertentu

---

# 38. User Notification Flow

```text
User Login
 ↓
Dashboard
 ↓
Notification indicator
 ↓
Open Notifications
 ↓
Pilih notification
 ↓
Mark as Read
```

---

# 39. Statistics Flow

```text
Admin
 ↓
Statistics
 ↓
Pilih periode
 ↓
Pilih filter
 ↓
Backend mengambil data
 ↓
Aggregate statistics
 ↓
Tampilkan dashboard
```

Data dapat meliputi:

* Total user
* Total buku
* Buku paling banyak dibaca
* Jumlah akses
* Aktivitas membaca
* User aktif
* Statistik kelas
* Statistik jenjang
* Statistik periode

---

# 40. Export Report Flow

```text
Statistics
 ↓
Set filter
 ↓
Generate Report
 ↓
Pilih format
 ├── Excel
 └── PDF
 ↓
Backend generate file
 ↓
Download report
 ↓
Catat aktivitas
```

---

# 41. Activity Log Flow

Aktivitas penting dicatat oleh sistem.

Contoh:

```text
Login
Logout
Create User
Update User
Import User
Create Book
Upload Book
Publish Book
Archive Book
Read Book
Download Book
Share Book
Create Reading List
Publish Reading List
Create Notification
Export Report
```

Flow:

```text
User melakukan action
 ↓
Backend memproses action
 ↓
Action berhasil?
 ↓
Create Activity Log
```

Activity log minimal memiliki:

```text
user_id
action
resource_type
resource_id
timestamp
metadata
```

---

# 42. Generic Authorization Flow

Semua protected resource harus mengikuti pola:

```text
Request
 ↓
Authentication
 ↓
User ditemukan?
 ├── NO → 401 Unauthorized
 │
 └── YES
       ↓
    User aktif?
       ├── NO → 403 Forbidden
       │
       └── YES
             ↓
         Check Permission
             ↓
         Permission tersedia?
          ├── NO → 403 Forbidden
          │
          └── YES
                ↓
           Check Resource Rule
                ↓
           Allowed?
            ├── NO → 403 Forbidden
            └── YES
                  ↓
               Execute
```

---

# 43. Error Handling Flow

## Validation Error

```text
Input
 ↓
Validation
 ↓
Invalid
 ↓
HTTP 400
 ↓
Tampilkan field error
```

## Unauthorized

```text
Tidak login
 ↓
HTTP 401
 ↓
Redirect Login
```

## Forbidden

```text
Login
 ↓
Tidak memiliki permission
 ↓
HTTP 403
 ↓
Access Denied
```

## Not Found

```text
Resource tidak ditemukan
 ↓
HTTP 404
```

## Server Error

```text
Unexpected Error
 ↓
HTTP 500
 ↓
Tampilkan pesan umum
 ↓
Detail error masuk server log
```

Jangan menampilkan stack trace kepada pengguna.

---

# 44. Empty State Flow

Jika data kosong:

```text
Request berhasil
 ↓
Data = 0
 ↓
Tampilkan Empty State
```

Contoh:

```text
Belum ada buku tersedia.
```

Bukan:

```text
Error
```

---

# 45. Book Availability State

Buku minimal memiliki state:

```text
DRAFT
PUBLISHED
ARCHIVED
```

Flow:

```text
DRAFT
  ↓
PUBLISH
  ↓
PUBLISHED
  ↓
ARCHIVE
  ↓
ARCHIVED
```

Buku `DRAFT` dan `ARCHIVED` tidak muncul sebagai buku aktif pada catalog umum.

---

# 46. User Account State

User minimal memiliki:

```text
ACTIVE
INACTIVE
```

Flow:

```text
ACTIVE
  ↓
Deactivate
  ↓
INACTIVE
  ↓
Activate
  ↓
ACTIVE
```

User `INACTIVE` tidak dapat melakukan login.

---

# 47. Digital Access Principle

Sistem **tidak menggunakan batas waktu peminjaman digital secara default**.

Artinya:

```text
User memiliki READ permission
        ↓
User dapat membaca
        ↓
Tidak otomatis expired berdasarkan waktu
```

Namun akses dapat dibatasi berdasarkan:

```text
Role
Jenjang
Kelas
User
Jenis buku
Permission
```

Jika kebutuhan waktu akses ditambahkan pada masa depan, fitur tersebut harus melalui change request.

---

# 48. End-to-End Student Scenario

Contoh alur lengkap:

```text
Student
 ↓
Login
 ↓
Dashboard
 ↓
Catalog
 ↓
Search "Matematika"
 ↓
Pilih Buku
 ↓
Book Detail
 ↓
Klik Baca
 ↓
Backend Check Permission
 ↓
Allowed
 ↓
Reader
 ↓
Buka halaman terakhir
 ↓
Membaca
 ↓
Bookmark halaman
 ↓
Highlight teks
 ↓
Tambah Note
 ↓
Progress diperbarui
 ↓
Keluar Reader
 ↓
Reading History diperbarui
```

---

# 49. End-to-End Teacher Scenario

```text
Teacher
 ↓
Login
 ↓
Dashboard
 ↓
Catalog
 ↓
Pilih buku
 ↓
Create Reading List
 ↓
Add Book
 ↓
Pilih target kelas
 ↓
Publish
 ↓
Notification
 ↓
Student melihat Reading List
 ↓
Student membaca buku
 ↓
Teacher melihat aktivitas sesuai scope
```

---

# 50. End-to-End Library Staff Scenario

```text
Library Staff
 ↓
Login
 ↓
Books
 ↓
Create Book
 ↓
Input Metadata
 ↓
Upload Ebook
 ↓
Validate
 ↓
Set Access Rule
 ↓
Save Draft
 ↓
Review
 ↓
Publish
 ↓
Book muncul di Catalog
```

---

# 51. End-to-End Admin Scenario

```text
Admin
 ↓
Login
 ↓
Dashboard
 ↓
Import User
 ↓
Manage Classes
 ↓
Manage Roles/Permissions
 ↓
Monitor Books
 ↓
Manage Notifications
 ↓
View Statistics
 ↓
Export Report
 ↓
View Activity Logs
```

---

# 52. State Transition Summary

## Book

```text
DRAFT → PUBLISHED → ARCHIVED
```

## User

```text
ACTIVE ↔ INACTIVE
```

## Reading List

```text
DRAFT → PUBLISHED
```

## Notification

```text
UNREAD → READ
```

---

# 53. Security Rules dalam User Flow

1. Authentication wajib dilakukan untuk protected feature.
2. Authorization dilakukan di backend.
3. Frontend tidak boleh menjadi sumber utama keputusan permission.
4. Ebook tidak boleh memiliki public URL yang dapat diakses tanpa authorization.
5. Download harus melalui permission check.
6. Share harus melalui permission check.
7. User hanya dapat mengubah bookmark, highlight, note, dan progress miliknya sendiri.
8. Teacher hanya dapat melihat aktivitas siswa sesuai scope.
9. Admin memiliki akses administratif sesuai permission.
10. Password/credential tidak boleh disimpan dalam plaintext.
11. Error internal tidak boleh ditampilkan kepada user.
12. Semua aktivitas sensitif dicatat dalam activity log.

---

# 54. UI/UX Rule

Setiap flow harus menyediakan:

### Loading State

```text
Loading...
```

### Success State

```text
Action berhasil.
```

### Error State

```text
Action gagal.
```

### Empty State

```text
Belum ada data.
```

### Confirmation

Untuk operasi sensitif:

```text
Apakah Anda yakin?
```

Contoh:

* Archive book
* Deactivate user
* Delete note
* Delete reading list

---

# 55. Acceptance Criteria

User Flow dianggap terimplementasi jika:

* Login dapat dilakukan sesuai credential yang ditetapkan.
* Role menentukan akses fitur.
* Student dapat menemukan dan membaca buku yang diizinkan.
* Reading progress tersimpan.
* Bookmark tersimpan.
* Highlight tersimpan.
* Notes tersimpan.
* Download hanya dapat dilakukan jika permission tersedia.
* Share hanya dapat dilakukan jika permission tersedia.
* Teacher dapat membuat reading list.
* Teacher dapat memberikan rekomendasi sesuai scope.
* Library Staff dapat mengelola buku.
* Admin dapat mengelola user dan class.
* Notification dapat dikirim ke target.
* Statistics dapat ditampilkan.
* Report dapat diekspor.
* Aktivitas penting tercatat.
* Unauthorized request menghasilkan `401`.
* Forbidden request menghasilkan `403`.
* Resource yang tidak ditemukan menghasilkan `404`.

---

# 56. AI Coding Agent Rules

AI coding agent **WAJIB**:

1. Mengikuti flow dalam dokumen ini.
2. Tidak membuat business flow baru tanpa persetujuan.
3. Tidak mengubah permission secara sepihak.
4. Tidak mengubah struktur role tanpa persetujuan.
5. Tidak membuat akses ebook publik.
6. Selalu melakukan authorization di backend.
7. Memisahkan `READ`, `DOWNLOAD`, dan `SHARE`.
8. Tidak menghapus fitur existing tanpa approval.
9. Tidak mengubah database schema tanpa menjelaskan perubahan terlebih dahulu.
10. Menambahkan test untuk business logic penting.
11. Menjaga flow tetap konsisten dengan PRD dan Role & Permission.
12. Jika terdapat konflik antar dokumen, **STOP dan laporkan konflik**, jangan memilih sendiri.

---

# 57. Traceability

```text
PRD
 ↓
Role & Permission
 ↓
Use Case
 ↓
User Flow
```

Setiap fitur yang akan dikembangkan harus dapat ditelusuri ke minimal:

```text
Requirement
→ PRD
→ Permission
→ Use Case
→ User Flow
```

Jika sebuah fitur tidak memiliki sumber requirement, AI tidak boleh langsung menganggap fitur tersebut wajib dibuat.

---

# 58. Development Principle

Pengembangan dilakukan secara bertahap:

```text
User Flow
 ↓
API Design
 ↓
Database
 ↓
Backend
 ↓
Frontend
 ↓
Integration
 ↓
Testing
```

Jangan langsung membuat seluruh sistem dalam satu prompt.

Gunakan pola:

```text
1 Feature
 ↓
Implement
 ↓
Run
 ↓
Test
 ↓
Fix
 ↓
Commit
 ↓
Next Feature
```

---

# 59. Status

Dokumen ini menjadi acuan utama untuk tahap:

```text
05 — USER FLOWS
```

Tahap berikutnya:

```text
06 — DATABASE / ERD
```

Database harus dibuat berdasarkan:

* PRD
* Role & Permission
* Use Cases
* User Flows

**Jangan membuat database berdasarkan asumsi fitur yang belum disetujui.**
