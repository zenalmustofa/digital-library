# 06 — DATABASE & ERD

**Project:** Digital Library Madrasah Hasan Muchyi Kapurejo
**Version:** 1.0
**Status:** Development Reference

---

# 1. Tujuan

Dokumen ini mendefinisikan struktur database untuk sistem Digital Library Madrasah Hasan Muchyi Kapurejo.

Database harus mendukung:

* User dan role
* Jenjang MTs dan MA
* Kelas
* Buku
* Kategori
* Penulis
* Penerbit
* File ebook
* Hak akses buku
* Aktivitas membaca
* Reading progress
* Bookmark
* Highlight
* Notes
* Reading list
* Rekomendasi
* Notifikasi
* Statistik
* Activity log

Database harus dirancang agar dapat berkembang tanpa perubahan besar ketika fitur Phase 2 ditambahkan.

---

# 2. Database Principles

Database menggunakan prinsip:

1. Relational database.
2. Primary key menggunakan ID unik.
3. Foreign key digunakan untuk menjaga integritas relasi.
4. Jangan menyimpan data yang sama berulang kali jika dapat dinormalisasi.
5. Permission harus dapat dikembangkan.
6. Struktur kelas tidak boleh hard-coded.
7. File ebook tidak disimpan sebagai binary langsung di tabel utama.
8. Metadata buku dipisahkan dari file buku.
9. Activity log bersifat append-oriented.
10. Soft delete/archive digunakan untuk data yang membutuhkan histori.
11. Timestamp menggunakan standar yang konsisten.
12. Database harus memiliki index pada kolom yang sering digunakan untuk pencarian dan relasi.

---

# 3. Entity Overview

Entity utama:

```text
users
roles
permissions
user_roles

levels
classes

books
categories
authors
publishers
book_authors
book_categories
book_files
book_access_rules

reading_progress
bookmarks
highlights
notes
reading_history

reading_lists
reading_list_items
recommendations

notifications
notification_recipients

activity_logs
```

---

# 4. High-Level ERD

```text
                         ┌──────────────┐
                         │    roles     │
                         └──────┬───────┘
                                │
                         ┌──────▼───────┐
                         │  user_roles  │
                         └──────┬───────┘
                                │
┌─────────────┐          ┌──────▼───────┐
│   classes   │◄─────────┤    users     │
└──────┬──────┘          └──────┬───────┘
       │                        │
       │                        │
       │                ┌───────┼────────────┐
       │                │       │            │
       │                ▼       ▼            ▼
       │          progress  bookmarks     notes
       │
       │
       ▼
┌─────────────┐
│    levels   │
└─────────────┘


┌─────────────┐
│    books    │
└──────┬──────┘
       │
       ├──────────► book_files
       │
       ├──────────► book_access_rules
       │
       ├──────────► book_authors ◄──── authors
       │
       └──────────► book_categories ◄── categories
                         │
                         ▼
                     publishers


users ─────────► reading_lists ───────► reading_list_items ◄──── books

users ─────────► recommendations ───────────────────────────────► books

users ─────────► notifications ◄──── notification_recipients

users ─────────► activity_logs
```

---

# 5. Users

Table:

```text
users
```

Purpose:

Menyimpan seluruh pengguna sistem.

Tidak membuat tabel terpisah seperti:

```text
students_mts
students_ma
teachers
```

Sebagai gantinya digunakan satu tabel `users`.

---

## Fields

| Field         | Type      |    Required | Description             |
| ------------- | --------- | ----------: | ----------------------- |
| id            | UUID      |         Yes | Primary Key             |
| full_name     | VARCHAR   |         Yes | Nama lengkap            |
| nisn          | VARCHAR   | Conditional | NISN / credential siswa |
| username      | VARCHAR   |         Yes | Username login          |
| email         | VARCHAR   |          No | Email jika tersedia     |
| password_hash | VARCHAR   |         Yes | Password hash           |
| class_id      | UUID      |          No | Kelas pengguna          |
| status        | ENUM      |         Yes | ACTIVE / INACTIVE       |
| avatar_url    | TEXT      |          No | Avatar                  |
| created_at    | TIMESTAMP |         Yes | Waktu dibuat            |
| updated_at    | TIMESTAMP |         Yes | Waktu diperbarui        |
| last_login_at | TIMESTAMP |          No | Login terakhir          |

### Catatan

Untuk kebutuhan awal:

```text
username = nama lengkap
credential = NISN
```

Namun database tetap menyediakan `username` secara eksplisit agar mekanisme login dapat dikembangkan tanpa migrasi besar.

NISN harus disimpan sebagai `VARCHAR`, bukan integer.

Alasannya:

```text
NISN = identifier
bukan angka untuk operasi matematika.
```

---

# 6. Roles

Table:

```text
roles
```

Fields:

| Field       | Type      |
| ----------- | --------- |
| id          | UUID      |
| code        | VARCHAR   |
| name        | VARCHAR   |
| description | TEXT      |
| created_at  | TIMESTAMP |
| updated_at  | TIMESTAMP |

Contoh:

```text
ADMIN
LIBRARY_STAFF
TEACHER
EDUCATION_STAFF
STUDENT_MTS
STUDENT_MA
```

---

# 7. User Roles

Table:

```text
user_roles
```

Relasi:

```text
users
  │
  └── user_roles ── roles
```

Fields:

| Field      | Type      |
| ---------- | --------- |
| user_id    | UUID      |
| role_id    | UUID      |
| created_at | TIMESTAMP |

Primary key:

```text
(user_id, role_id)
```

Walaupun sebagian besar user hanya memiliki satu role, struktur many-to-many membuat sistem lebih fleksibel.

---

# 8. Permissions

Table:

```text
permissions
```

Fields:

| Field       | Type    |
| ----------- | ------- |
| id          | UUID    |
| code        | VARCHAR |
| name        | VARCHAR |
| module      | VARCHAR |
| description | TEXT    |

Contoh permission:

```text
users.view
users.create
users.update
users.delete

books.view
books.create
books.update
books.delete
books.publish

books.read
books.download
books.share

statistics.view
reports.export

notifications.create
activity_logs.view
```

---

# 9. Role Permissions

Table:

```text
role_permissions
```

Fields:

| Field         | Type |
| ------------- | ---- |
| role_id       | UUID |
| permission_id | UUID |

Primary key:

```text
(role_id, permission_id)
```

Relasi:

```text
roles
 ↓
role_permissions
 ↓
permissions
```

---

# 10. Levels

Table:

```text
levels
```

Tujuan:

Menyimpan jenjang pendidikan.

Fields:

| Field       | Type      |
| ----------- | --------- |
| id          | UUID      |
| code        | VARCHAR   |
| name        | VARCHAR   |
| description | TEXT      |
| created_at  | TIMESTAMP |
| updated_at  | TIMESTAMP |

Data awal:

```text
MTs
MA
```

Jangan hard-code `MTs` dan `MA` langsung pada source code.

---

# 11. Classes

Table:

```text
classes
```

Fields:

| Field         | Type      |
| ------------- | --------- |
| id            | UUID      |
| level_id      | UUID      |
| name          | VARCHAR   |
| grade         | VARCHAR   |
| academic_year | VARCHAR   |
| is_active     | BOOLEAN   |
| created_at    | TIMESTAMP |
| updated_at    | TIMESTAMP |

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

Relasi:

```text
levels 1 ─── N classes
classes 1 ── N users
```

---

# 12. Books

Table:

```text
books
```

Fields:

| Field            | Type      | Required |
| ---------------- | --------- | -------: |
| id               | UUID      |      Yes |
| title            | VARCHAR   |      Yes |
| slug             | VARCHAR   |      Yes |
| description      | TEXT      |       No |
| isbn             | VARCHAR   |       No |
| publication_year | INTEGER   |       No |
| publisher_id     | UUID      |       No |
| cover_url        | TEXT      |       No |
| status           | ENUM      |      Yes |
| language         | VARCHAR   |       No |
| page_count       | INTEGER   |       No |
| created_by       | UUID      |      Yes |
| created_at       | TIMESTAMP |      Yes |
| updated_at       | TIMESTAMP |      Yes |
| published_at     | TIMESTAMP |       No |

Status:

```text
DRAFT
PUBLISHED
ARCHIVED
```

---

# 13. Authors

Table:

```text
authors
```

Fields:

| Field      | Type      |
| ---------- | --------- |
| id         | UUID      |
| name       | VARCHAR   |
| biography  | TEXT      |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

# 14. Book Authors

Karena satu buku dapat memiliki lebih dari satu penulis:

```text
book_authors
```

Fields:

| Field     | Type |
| --------- | ---- |
| book_id   | UUID |
| author_id | UUID |

Primary key:

```text
(book_id, author_id)
```

Relasi:

```text
books N ─── N authors
```

---

# 15. Categories

Table:

```text
categories
```

Fields:

| Field       | Type      |
| ----------- | --------- |
| id          | UUID      |
| name        | VARCHAR   |
| slug        | VARCHAR   |
| description | TEXT      |
| created_at  | TIMESTAMP |
| updated_at  | TIMESTAMP |

Contoh:

```text
Matematika
Bahasa Indonesia
Bahasa Inggris
IPA
IPS
Agama
Novel
Referensi
```

Kategori dapat ditambah oleh administrator/petugas sesuai permission.

---

# 16. Book Categories

Table:

```text
book_categories
```

Fields:

| Field       | Type |
| ----------- | ---- |
| book_id     | UUID |
| category_id | UUID |

Primary key:

```text
(book_id, category_id)
```

---

# 17. Publishers

Table:

```text
publishers
```

Fields:

| Field       | Type      |
| ----------- | --------- |
| id          | UUID      |
| name        | VARCHAR   |
| description | TEXT      |
| website     | TEXT      |
| created_at  | TIMESTAMP |
| updated_at  | TIMESTAMP |

---

# 18. Book Files

Metadata buku dan file ebook dipisahkan.

Table:

```text
book_files
```

Fields:

| Field       | Type      |
| ----------- | --------- |
| id          | UUID      |
| book_id     | UUID      |
| file_name   | VARCHAR   |
| storage_key | TEXT      |
| file_type   | VARCHAR   |
| file_size   | BIGINT    |
| checksum    | VARCHAR   |
| version     | INTEGER   |
| is_active   | BOOLEAN   |
| created_at  | TIMESTAMP |

Contoh:

```text
book
 ↓
book_files
 ├── PDF version 1
 └── PDF version 2
```

File disimpan di object storage/server storage, bukan sebagai binary utama pada database.

---

# 19. Book Access Rules

Table:

```text
book_access_rules
```

Tujuan:

Mengatur siapa yang dapat:

* READ
* DOWNLOAD
* SHARE

Fields:

| Field        | Type      |
| ------------ | --------- |
| id           | UUID      |
| book_id      | UUID      |
| role_id      | UUID      |
| level_id     | UUID      |
| class_id     | UUID      |
| user_id      | UUID      |
| can_read     | BOOLEAN   |
| can_download | BOOLEAN   |
| can_share    | BOOLEAN   |
| created_at   | TIMESTAMP |
| updated_at   | TIMESTAMP |

Semua target bersifat nullable.

Contoh rule:

```text
Book A
role = STUDENT_MTS
can_read = true
can_download = false
can_share = false
```

Atau:

```text
Book B
class = VII A
can_read = true
```

---

# 20. Access Rule Evaluation

Authorization harus dilakukan server-side.

Konsep:

```text
Request
 ↓
Authenticated User
 ↓
Global Permission Check
 ↓
Book Access Rule Check
 ↓
Allowed?
```

Rule tidak boleh hanya diperiksa berdasarkan frontend.

---

# 21. Reading Progress

Table:

```text
reading_progress
```

Fields:

| Field               | Type      |
| ------------------- | --------- |
| id                  | UUID      |
| user_id             | UUID      |
| book_id             | UUID      |
| current_page        | INTEGER   |
| progress_percentage | DECIMAL   |
| last_read_at        | TIMESTAMP |
| created_at          | TIMESTAMP |
| updated_at          | TIMESTAMP |

Unique constraint:

```text
(user_id, book_id)
```

Satu user memiliki satu progress aktif untuk satu buku.

---

# 22. Bookmarks

Table:

```text
bookmarks
```

Fields:

| Field      | Type      |
| ---------- | --------- |
| id         | UUID      |
| user_id    | UUID      |
| book_id    | UUID      |
| page       | INTEGER   |
| label      | VARCHAR   |
| created_at | TIMESTAMP |

Bookmark adalah milik user.

---

# 23. Highlights

Table:

```text
highlights
```

Fields:

| Field         | Type      |
| ------------- | --------- |
| id            | UUID      |
| user_id       | UUID      |
| book_id       | UUID      |
| page          | INTEGER   |
| selected_text | TEXT      |
| position_data | JSONB     |
| created_at    | TIMESTAMP |
| updated_at    | TIMESTAMP |

`position_data` digunakan untuk menyimpan informasi posisi highlight yang bergantung pada implementasi reader.

---

# 24. Notes

Table:

```text
notes
```

Fields:

| Field         | Type      |
| ------------- | --------- |
| id            | UUID      |
| user_id       | UUID      |
| book_id       | UUID      |
| page          | INTEGER   |
| content       | TEXT      |
| position_data | JSONB     |
| created_at    | TIMESTAMP |
| updated_at    | TIMESTAMP |

User hanya dapat:

* melihat note miliknya
* mengubah note miliknya
* menghapus note miliknya

kecuali terdapat permission administratif khusus.

---

# 25. Reading History

Table:

```text
reading_history
```

Fields:

| Field            | Type      |
| ---------------- | --------- |
| id               | UUID      |
| user_id          | UUID      |
| book_id          | UUID      |
| started_at       | TIMESTAMP |
| last_accessed_at | TIMESTAMP |
| access_count     | INTEGER   |

Digunakan untuk:

* Riwayat membaca
* Statistik
* Dashboard
* Analitik aktivitas

---

# 26. Reading Lists

Table:

```text
reading_lists
```

Fields:

| Field        | Type      |
| ------------ | --------- |
| id           | UUID      |
| created_by   | UUID      |
| name         | VARCHAR   |
| description  | TEXT      |
| status       | ENUM      |
| created_at   | TIMESTAMP |
| updated_at   | TIMESTAMP |
| published_at | TIMESTAMP |

Status:

```text
DRAFT
PUBLISHED
ARCHIVED
```

---

# 27. Reading List Items

Table:

```text
reading_list_items
```

Fields:

| Field           | Type      |
| --------------- | --------- |
| reading_list_id | UUID      |
| book_id         | UUID      |
| sort_order      | INTEGER   |
| created_at      | TIMESTAMP |

Primary key:

```text
(reading_list_id, book_id)
```

Relasi:

```text
reading_lists N ─── N books
```

---

# 28. Reading List Targets

Karena reading list dapat ditujukan kepada kelas tertentu, gunakan tabel:

```text
reading_list_targets
```

Fields:

| Field           | Type |
| --------------- | ---- |
| id              | UUID |
| reading_list_id | UUID |
| level_id        | UUID |
| class_id        | UUID |
| role_id         | UUID |
| user_id         | UUID |

Target yang tidak digunakan bernilai `NULL`.

Contoh:

```text
Reading List
      ↓
Target
      ↓
Kelas VII A
```

---

# 29. Recommendations

Table:

```text
recommendations
```

Fields:

| Field           | Type      |
| --------------- | --------- |
| id              | UUID      |
| book_id         | UUID      |
| created_by      | UUID      |
| target_class_id | UUID      |
| target_level_id | UUID      |
| title           | VARCHAR   |
| message         | TEXT      |
| status          | ENUM      |
| created_at      | TIMESTAMP |
| published_at    | TIMESTAMP |

Status:

```text
DRAFT
PUBLISHED
ARCHIVED
```

---

# 30. Notifications

Table:

```text
notifications
```

Fields:

| Field        | Type      |
| ------------ | --------- |
| id           | UUID      |
| created_by   | UUID      |
| title        | VARCHAR   |
| message      | TEXT      |
| type         | VARCHAR   |
| created_at   | TIMESTAMP |
| published_at | TIMESTAMP |

---

# 31. Notification Recipients

Table:

```text
notification_recipients
```

Fields:

| Field           | Type      |
| --------------- | --------- |
| id              | UUID      |
| notification_id | UUID      |
| user_id         | UUID      |
| is_read         | BOOLEAN   |
| read_at         | TIMESTAMP |

Relasi:

```text
notifications
      ↓
notification_recipients
      ↓
users
```

---

# 32. Activity Logs

Table:

```text
activity_logs
```

Fields:

| Field         | Type      |
| ------------- | --------- |
| id            | UUID      |
| user_id       | UUID      |
| action        | VARCHAR   |
| resource_type | VARCHAR   |
| resource_id   | UUID      |
| metadata      | JSONB     |
| ip_address    | INET      |
| user_agent    | TEXT      |
| created_at    | TIMESTAMP |

Contoh:

```text
LOGIN
LOGOUT
BOOK_READ
BOOK_DOWNLOAD
BOOK_SHARE
BOOK_CREATED
BOOK_UPDATED
BOOK_PUBLISHED
USER_CREATED
USER_IMPORTED
REPORT_EXPORTED
```

Activity log tidak boleh diedit sembarangan oleh user biasa.

---

# 33. Relationship Summary

## User

```text
users
 ├── user_roles
 ├── class
 ├── reading_progress
 ├── bookmarks
 ├── highlights
 ├── notes
 ├── reading_history
 ├── reading_lists
 ├── recommendations
 ├── notifications
 └── activity_logs
```

## Book

```text
books
 ├── publisher
 ├── book_authors
 ├── book_categories
 ├── book_files
 ├── access_rules
 ├── reading_progress
 ├── bookmarks
 ├── highlights
 ├── notes
 ├── reading_history
 ├── reading_list_items
 └── recommendations
```

---

# 34. Cardinality

```text
roles 1 ─── N user_roles
users 1 ─── N user_roles

levels 1 ─── N classes
classes 1 ─── N users

publishers 1 ─── N books

books N ─── N authors
books N ─── N categories

books 1 ─── N book_files
books 1 ─── N book_access_rules

users 1 ─── N reading_progress
books 1 ─── N reading_progress

users 1 ─── N bookmarks
books 1 ─── N bookmarks

users 1 ─── N highlights
books 1 ─── N highlights

users 1 ─── N notes
books 1 ─── N notes

users 1 ─── N reading_history
books 1 ─── N reading_history

users 1 ─── N reading_lists
reading_lists N ─── N books

users 1 ─── N recommendations
books 1 ─── N recommendations

notifications 1 ─── N notification_recipients
users 1 ─── N notification_recipients
```

---

# 35. Index Strategy

Index minimal:

```text
users.username
users.nisn
users.full_name
users.class_id
users.status

books.title
books.slug
books.status
books.publisher_id

classes.level_id
classes.name

reading_progress.user_id
reading_progress.book_id

bookmarks.user_id
bookmarks.book_id

highlights.user_id
highlights.book_id

notes.user_id
notes.book_id

reading_history.user_id
reading_history.book_id

activity_logs.user_id
activity_logs.action
activity_logs.created_at
```

Untuk pencarian buku berskala besar, implementasi full-text search dapat ditentukan pada tahap architecture.

---

# 36. Data Integrity

Database harus menggunakan:

* Foreign key
* Unique constraint
* Not null sesuai kebutuhan
* Check constraint jika relevan
* Transaction untuk operasi multi-table
* Referential integrity

Contoh:

```text
reading_progress.user_id
→ users.id
```

Tidak boleh terdapat progress untuk user yang tidak ada.

---

# 37. Delete Strategy

Tidak semua data boleh menggunakan hard delete.

## User

Gunakan:

```text
status = INACTIVE
```

## Book

Gunakan:

```text
status = ARCHIVED
```

## Activity Log

Tidak boleh dihapus oleh user biasa.

## Reading Progress

Dapat dihapus jika user melakukan reset data atau sesuai kebijakan sistem.

## Bookmark / Highlight / Notes

Dapat dihapus oleh pemiliknya.

---

# 38. Ebook Storage

Database hanya menyimpan metadata:

```text
book_files
     ↓
storage_key
```

File sebenarnya berada pada:

```text
Object Storage
```

Flow:

```text
User
 ↓
Backend
 ↓
Authorization
 ↓
Generate secure access
 ↓
Object Storage
 ↓
Reader
```

Jangan:

```text
/public/books/book.pdf
```

atau URL public sejenisnya.

---

# 39. Content Rights Metadata

Karena ebook berasal dari berbagai sumber, database sebaiknya menyediakan metadata hak konten pada `book_files` atau entity terpisah pada implementasi final.

Informasi yang perlu dapat direpresentasikan:

```text
source_type
license_status
license_reference
rights_holder
expires_at (optional)
```

Contoh:

```text
PUBLIC_DOMAIN
OPEN_LICENSE
INSTITUTION_LICENSE
PUBLISHER_LICENSE
OWNED_CONTENT
```

Tujuannya agar sistem dapat membedakan sumber dan status hak penggunaan ebook.

**Jangan menganggap buku yang tersedia di internet otomatis boleh diunggah ulang ke sistem.**

---

# 40. Transaction Requirements

Gunakan database transaction untuk operasi seperti:

### Import User

```text
Validate
 ↓
Create/Update Users
 ↓
Assign Role
 ↓
Assign Class
 ↓
Commit
```

Jika terjadi error kritis, rollback sesuai strategi import.

### Publish Book

```text
Validate Metadata
 ↓
Validate File
 ↓
Validate Access Rule
 ↓
Update Book Status
 ↓
Create Activity Log
 ↓
Commit
```

### Publish Reading List

```text
Validate List
 ↓
Validate Items
 ↓
Validate Targets
 ↓
Publish
 ↓
Create Notification
 ↓
Commit
```

---

# 41. Security Requirements

1. Password disimpan dalam bentuk hash.
2. Jangan menyimpan password plaintext.
3. NISN diperlakukan sebagai credential/identifier sensitif.
4. Backend wajib melakukan authorization.
5. File ebook tidak boleh public secara default.
6. Activity log tidak dapat dimanipulasi oleh user biasa.
7. Database credential disimpan pada environment variable/secret manager.
8. SQL injection harus dicegah menggunakan ORM/parameterized query.
9. Sensitive data tidak boleh dimasukkan ke log secara sembarangan.
10. Database backup harus direncanakan sebelum deployment production.

---

# 42. Database Migration

Semua perubahan database harus menggunakan migration.

Contoh:

```text
migration_001_create_users
migration_002_create_roles
migration_003_create_classes
migration_004_create_books
...
```

Jangan melakukan perubahan schema production secara manual tanpa migration yang terdokumentasi.

---

# 43. Seed Data

Development environment harus memiliki seed data minimal:

### Roles

```text
ADMIN
LIBRARY_STAFF
TEACHER
EDUCATION_STAFF
STUDENT_MTS
STUDENT_MA
```

### Levels

```text
MTs
MA
```

### Example Classes

```text
VII A
VII B
VIII A
IX A

IPS 1
IPS 2
Bahasa 1
```

### Permissions

Seed seluruh permission yang telah disetujui.

---

# 44. Database Environment

Minimal terdapat:

```text
Development
Testing
Production
```

Database masing-masing environment harus terpisah.

Jangan menggunakan database production untuk development/testing.

---

# 45. Backup

Production database harus memiliki strategi backup.

Minimal:

```text
Regular Backup
+
Backup Retention
+
Restore Testing
```

Backup yang belum pernah diuji restore tidak boleh dianggap sebagai strategi recovery yang tervalidasi.

---

# 46. Database Acceptance Criteria

Database dianggap siap apabila:

* Seluruh role dapat direpresentasikan.
* User MTs dan MA dapat berada dalam satu tabel.
* Kelas dapat dikelola secara dinamis.
* Buku dapat memiliki banyak author.
* Buku dapat memiliki banyak kategori.
* Buku dapat memiliki file/version.
* Book access dapat dibatasi.
* READ, DOWNLOAD, SHARE dapat dipisahkan.
* Reading progress dapat disimpan.
* Bookmark dapat disimpan.
* Highlight dapat disimpan.
* Notes dapat disimpan.
* Reading history tersedia.
* Reading list tersedia.
* Recommendation tersedia.
* Notification tersedia.
* Activity log tersedia.
* Relasi menggunakan foreign key.
* Migration dapat digunakan.
* Seed data tersedia.
* Database tidak mengandung hard-coded struktur MTs/MA.
* Ebook tidak disimpan sebagai public file URL.

---

# 47. AI Coding Rules

AI coding agent:

1. Tidak boleh mengubah schema tanpa approval.
2. Setiap perubahan schema harus menggunakan migration.
3. Jangan membuat tabel baru jika entity yang ada masih dapat digunakan.
4. Jangan menggabungkan entity berbeda hanya untuk mengurangi jumlah tabel.
5. Jangan menyimpan password plaintext.
6. Jangan menyimpan ebook sebagai public asset.
7. Jangan menghapus foreign key tanpa alasan teknis yang jelas.
8. Jangan mengubah cardinality tanpa approval.
9. Setiap perubahan database harus menjelaskan:

   * alasan
   * tabel yang berubah
   * field yang berubah
   * dampak migration
   * dampak data existing
10. Jalankan migration dan test setelah perubahan.
11. Jika requirement belum jelas, jangan membuat asumsi permanen pada schema.
12. Jika menemukan konflik antara PRD, Use Case, User Flow, dan Database, hentikan implementasi dan laporkan konflik.

---

# 48. Future Extensibility

Database harus memungkinkan penambahan:

```text
AI Library Assistant
AI Recommendation
Quiz
Gamification
Achievement
QR Code
PWA
Offline Reading
Advanced Notification
Push Notification
External Ebook Provider
Publisher Integration
```

Namun tabel untuk fitur Phase 2 **tidak wajib dibuat sekarang** jika belum diperlukan MVP.

---

# 49. Final Database Structure

Struktur MVP yang direkomendasikan:

```text
users
roles
permissions
user_roles
role_permissions

levels
classes

books
authors
book_authors
categories
book_categories
publishers
book_files
book_access_rules

reading_progress
bookmarks
highlights
notes
reading_history

reading_lists
reading_list_items
reading_list_targets

recommendations

notifications
notification_recipients

activity_logs
```

---

# 50. Next Step

Database ini menjadi dasar untuk tahap berikutnya:

```text
01 Requirements       ✅
02 PRD                ✅
03 Roles & Permission ✅
04 Use Cases          ✅
05 User Flows         ✅
06 Database / ERD     ✅
07 System Architecture ⏭️
```

Tahap selanjutnya adalah **07 — System Architecture**.

Pada tahap tersebut akan ditentukan:

```text
Frontend
   ↓
Backend/API
   ↓
Authentication
   ↓
Authorization
   ↓
Database
   ↓
Ebook Storage
   ↓
Notification
   ↓
Deployment
```

Termasuk menentukan **arsitektur monolith vs separated frontend/backend**, API structure, object storage, security boundary, environment, dan alur request dari browser sampai database.
