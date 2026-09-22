# ROLE & PERMISSION DOCUMENT

## SISTEM PERPUSTAKAAN DIGITAL

### MADRASAH HASAN MUCHYI KAPUREJO

**Versi:** 1.0
**Tanggal:** 2 September 2026
**Status:** Final Requirement
**Parent Document:** `docs/02-prd.md`

---

# 1. TUJUAN DOKUMEN

Dokumen ini mendefinisikan role dan hak akses pengguna pada Sistem Perpustakaan Digital Madrasah Hasan Muchyi Kapurejo.

Dokumen ini menjadi acuan untuk:

* Authorization
* User Interface
* API Permission
* Database
* Use Case
* User Flow
* Testing
* Security

AI/Vibe Coder **WAJIB mengikuti permission yang didefinisikan dalam dokumen ini**.

AI tidak diperbolehkan membuat role atau permission baru tanpa persetujuan.

---

# 2. ROLE SISTEM

Sistem memiliki 6 role utama:

| Role            | Kode              |
| --------------- | ----------------- |
| Administrator   | `ADMIN`           |
| Library Staff   | `LIBRARY_STAFF`   |
| Teacher         | `TEACHER`         |
| Education Staff | `EDUCATION_STAFF` |
| Student MTs     | `STUDENT_MTS`     |
| Student MA      | `STUDENT_MA`      |

---

# 3. HIERARKI AKSES

Secara umum:

```text
ADMIN
  │
  ├── LIBRARY_STAFF
  │
  ├── TEACHER
  │
  ├── EDUCATION_STAFF
  │
  └── STUDENT
       ├── STUDENT_MTS
       └── STUDENT_MA
```

Hierarki tersebut merupakan gambaran umum tingkat tanggung jawab, bukan berarti satu role otomatis mewarisi seluruh permission role di bawahnya.

Permission harus tetap diperiksa secara eksplisit.

---

# 4. ROLE: ADMINISTRATOR

## 4.1 Deskripsi

Administrator merupakan role dengan hak akses tertinggi untuk mengelola sistem.

## 4.2 Permission

### User Management

* View users
* Create users
* Edit users
* Activate users
* Deactivate users
* Reset credential
* Assign role
* Assign class
* Assign level
* Import users
* Export users

### Class Management

* View classes
* Create class
* Edit class
* Activate/deactivate class

### Book Management

* View books
* Create books
* Edit books
* Delete/archive books
* Publish/unpublish books
* Upload ebook
* Manage metadata

### Metadata Management

* Manage categories
* Manage authors
* Manage publishers

### Access Control

* View book permissions
* Create book permissions
* Edit book permissions
* Remove book permissions

### Notifications

* Create notification
* Edit notification
* Publish notification
* Delete/archive notification

### Reports

* View dashboard
* View statistics
* Export Excel
* Export PDF

### System

* View activity logs
* Manage system settings

---

# 5. ROLE: LIBRARY STAFF

## 5.1 Deskripsi

Library Staff bertanggung jawab terhadap operasional koleksi perpustakaan.

## 5.2 Permission

### Books

* View books
* Create books
* Edit books
* Upload ebook
* Manage metadata
* Publish/unpublish books

### Categories

* View categories
* Create categories
* Edit categories
* Archive categories

### Authors

* View authors
* Create authors
* Edit authors

### Publishers

* View publishers
* Create publishers
* Edit publishers

### Access Rules

* View access rules
* Create access rules
* Edit access rules

### Reports

* View library statistics
* Export Excel
* Export PDF

### Users

Library Staff dapat melihat informasi pengguna yang diperlukan untuk operasional perpustakaan.

Library Staff **tidak dapat**:

* Mengubah role Admin.
* Menghapus Admin.
* Mengubah system settings.
* Mengelola permission sistem secara global.

---

# 6. ROLE: TEACHER

## 6.1 Deskripsi

Teacher menggunakan sistem sebagai pengguna akademik dan penyedia rekomendasi bacaan.

## 6.2 Permission

### Library

* View catalog
* Search books
* Filter books
* View book detail
* Read accessible books

### Reading

* Bookmark
* View reading progress
* Highlight
* Create notes

### Reading List

* Create reading list
* Edit own reading list
* Delete own reading list
* Add books
* Remove books
* Publish reading list

### Recommendation

* Recommend books
* Share reference with assigned class

### Student Activity

Teacher dapat melihat aktivitas membaca siswa dalam ruang lingkup yang diizinkan.

Contoh:

```text
Teacher
   ↓
Kelas yang diampu
   ↓
Siswa dalam kelas
   ↓
Reading Activity
```

Teacher **tidak dapat**:

* Mengelola user.
* Mengubah role.
* Mengupload buku.
* Menghapus buku.
* Mengubah system settings.
* Melihat seluruh aktivitas siswa di luar scope yang diberikan.

---

# 7. ROLE: EDUCATION STAFF

## 7.1 Deskripsi

Education Staff merupakan pengguna non-guru yang termasuk dalam civitas akademik madrasah.

## 7.2 Permission Default

Education Staff dapat:

* Login
* View catalog
* Search books
* Filter books
* View book detail
* Read accessible books
* Bookmark
* Reading progress
* Highlight
* Notes

Education Staff tidak memiliki permission administratif secara default.

Permission tambahan hanya diberikan apabila ditentukan oleh Admin.

---

# 8. ROLE: STUDENT MTs

## 8.1 Deskripsi

Siswa jenjang MTs.

## 8.2 Permission

Student MTs dapat:

### Library

* View catalog
* Search books
* Filter books
* View book detail
* Read accessible books

### Reading

* Bookmark
* View reading progress
* Highlight
* Create notes

### Teacher Content

* View reading list
* View teacher recommendation
* Access assigned reference

Student MTs **tidak dapat**:

* Mengelola buku.
* Mengupload buku.
* Menghapus buku.
* Mengelola user.
* Membuat reading list untuk kelas.
* Melihat aktivitas siswa lain.

---

# 9. ROLE: STUDENT MA

## 9.1 Deskripsi

Siswa jenjang MA.

Permission pada dasarnya sama dengan Student MTs.

Perbedaan utama terletak pada **scope akses buku berdasarkan jenjang, kelas, atau permission buku**.

Student MA dapat:

* View catalog
* Search books
* Filter books
* View book detail
* Read accessible books
* Bookmark
* Reading progress
* Highlight
* Notes
* View reading list
* View teacher recommendation

Student MA tidak dapat:

* Mengelola buku.
* Mengupload buku.
* Menghapus buku.
* Mengelola user.
* Mengelola permission.
* Melihat aktivitas siswa lain.

---

# 10. PERMISSION MATRIX

## 10.1 User & System

| Permission                | Admin | Library | Teacher | Staff | Student |
| ------------------------- | :---: | :-----: | :-----: | :---: | :-----: |
| View Users                |   ✅   | Limited |    ❌    |   ❌   |    ❌    |
| Create Users              |   ✅   |    ❌    |    ❌    |   ❌   |    ❌    |
| Edit Users                |   ✅   |    ❌    |    ❌    |   ❌   |    ❌    |
| Activate/Deactivate Users |   ✅   |    ❌    |    ❌    |   ❌   |    ❌    |
| Assign Role               |   ✅   |    ❌    |    ❌    |   ❌   |    ❌    |
| Import Users              |   ✅   |    ❌    |    ❌    |   ❌   |    ❌    |
| Manage Classes            |   ✅   |    ❌    |    ❌    |   ❌   |    ❌    |
| System Settings           |   ✅   |    ❌    |    ❌    |   ❌   |    ❌    |
| Activity Logs             |   ✅   | Limited |    ❌    |   ❌   |    ❌    |

---

# 11. BOOK PERMISSION MATRIX

| Permission          |  Admin | Library |   Teacher  |    Staff   |   Student  |
| ------------------- | :----: | :-----: | :--------: | :--------: | :--------: |
| View Catalog        |    ✅   |    ✅    |      ✅     |      ✅     |      ✅     |
| Search              |    ✅   |    ✅    |      ✅     |      ✅     |      ✅     |
| View Detail         |    ✅   |    ✅    |      ✅     |      ✅     |      ✅     |
| Create Book         |    ✅   |    ✅    |      ❌     |      ❌     |      ❌     |
| Edit Book           |    ✅   |    ✅    |      ❌     |      ❌     |      ❌     |
| Upload Ebook        |    ✅   |    ✅    |      ❌     |      ❌     |      ❌     |
| Delete/Archive Book |    ✅   | Limited |      ❌     |      ❌     |      ❌     |
| Publish Book        |    ✅   |    ✅    |      ❌     |      ❌     |      ❌     |
| Read Book           |    ✅   |    ✅    | Permission | Permission | Permission |
| Download            | Policy |  Policy |   Policy   |   Policy   |   Policy   |
| Share               | Policy |  Policy |   Policy   |   Policy   |   Policy   |

**Catatan:**

`Policy` berarti hak akses tidak hanya ditentukan oleh role, tetapi juga oleh aturan buku.

---

# 12. READING PERMISSION

Semua pengguna yang memiliki hak membaca dapat menggunakan:

```text
Read
Bookmark
Reading Progress
Highlight
Notes
```

Namun permission terhadap buku tetap diperiksa.

Flow:

```text
User
 ↓
Open Book
 ↓
Check Authentication
 ↓
Check User Role
 ↓
Check Book Access Rule
 ↓
ALLOW / DENY
```

---

# 13. BOOK ACCESS RULE

Setiap buku dapat memiliki access rule.

Minimal:

```text
can_read
can_download
can_share
```

Scope dapat berupa:

```text
ROLE
LEVEL
CLASS
USER
```

Contoh:

```text
Book:
"Matematika Kelas VIII"

Access:
├── STUDENT_MTS → READ
├── TEACHER → READ
└── LIBRARY_STAFF → READ
```

Contoh lain:

```text
Book:
"Referensi Guru"

Access:
├── TEACHER → READ
├── LIBRARY_STAFF → READ
└── ADMIN → READ
```

---

# 14. DOWNLOAD PERMISSION

Download merupakan permission terpisah dari read.

Contoh:

```text
can_read = true
can_download = false
```

Artinya:

> Pengguna dapat membaca buku tetapi tidak dapat mengunduh file.

Hal ini penting untuk ebook berlisensi.

---

# 15. SHARE PERMISSION

Sharing juga merupakan permission terpisah.

Contoh:

```text
can_read = true
can_download = false
can_share = false
```

User dapat membaca tetapi tidak dapat membagikan ebook.

Sharing metadata/reference tetap dapat diberikan tanpa memberikan akses langsung ke file ebook.

---

# 16. TEACHER SCOPE

Teacher tidak boleh melihat seluruh data aktivitas siswa secara default.

Scope harus ditentukan.

Contoh:

```text
Teacher A
   ↓
Class VII A
   ↓
Student 1
Student 2
Student 3
...
```

Teacher hanya dapat melihat aktivitas siswa yang berada dalam scope yang diizinkan.

Apabila seorang guru mengajar beberapa kelas:

```text
Teacher A
├── VII A
├── VII B
└── VIII A
```

Maka ketiga kelas tersebut menjadi scope aktivitasnya.

---

# 17. ADMIN SCOPE

Admin memiliki akses global terhadap sistem.

```text
ADMIN
├── Users
├── Classes
├── Books
├── Categories
├── Authors
├── Publishers
├── Access Rules
├── Notifications
├── Reports
├── Activity Logs
└── System Settings
```

---

# 18. LIBRARY STAFF SCOPE

Library Staff fokus pada operasional perpustakaan.

```text
LIBRARY STAFF
├── Books
├── Categories
├── Authors
├── Publishers
├── Book Access
└── Library Reports
```

Library Staff tidak boleh memiliki akses penuh terhadap konfigurasi sistem.

---

# 19. STUDENT DATA SCOPE

Student hanya dapat mengakses data miliknya sendiri.

```text
Student
   │
   ├── Own Profile
   ├── Own Progress
   ├── Own Bookmark
   ├── Own Highlight
   ├── Own Notes
   └── Own Reading History
```

Student tidak boleh:

```text
View Student A Progress
View Student B Notes
Edit Student A Bookmark
View Student B Reading History
```

---

# 20. DATA OWNERSHIP

Sistem harus menerapkan ownership terhadap data tertentu.

### User

Admin dapat mengelola.

### Reading Progress

Dimiliki oleh user.

### Bookmark

Dimiliki oleh user.

### Highlight

Dimiliki oleh user.

### Notes

Dimiliki oleh user.

### Reading List

Dimiliki oleh teacher yang membuatnya.

Teacher hanya dapat mengubah reading list miliknya sendiri kecuali Admin memiliki kebutuhan administratif untuk mengelolanya.

---

# 21. AUTHORIZATION RULE

Authentication dan authorization adalah dua hal berbeda.

### Authentication

Menentukan:

> "Siapa kamu?"

### Authorization

Menentukan:

> "Apa yang boleh kamu lakukan?"

Contoh:

```text
Login berhasil
      ↓
User = Teacher
      ↓
Request DELETE /books/123
      ↓
Authorization
      ↓
DENIED
```

Walaupun user berhasil login, user tetap tidak boleh melakukan operasi yang tidak memiliki permission.

---

# 22. SERVER-SIDE AUTHORIZATION

Semua permission wajib diperiksa di server/backend.

Frontend tidak boleh menjadi satu-satunya mekanisme keamanan.

Contoh yang salah:

```text
Frontend:
if (user.role === "ADMIN") {
   showDeleteButton();
}
```

Hal tersebut hanya mengatur tampilan.

Backend tetap harus melakukan:

```text
Authenticated?
        ↓
Role?
        ↓
Permission?
        ↓
Resource Access?
        ↓
ALLOW / DENY
```

---

# 23. FORBIDDEN ACCESS

Jika user tidak memiliki permission, sistem harus memberikan response yang sesuai.

Contoh:

```text
401 Unauthorized
```

untuk user yang belum terautentikasi.

Dan:

```text
403 Forbidden
```

untuk user yang sudah login tetapi tidak memiliki permission.

---

# 24. FILE SECURITY

File ebook merupakan resource yang harus dilindungi.

Tidak diperbolehkan:

```text
/public/books/matematika.pdf
```

jika URL tersebut dapat diakses siapa saja.

Flow yang direkomendasikan:

```text
User
 ↓
Request Book
 ↓
Authentication
 ↓
Authorization
 ↓
Check Book Permission
 ↓
Generate Secure Access
 ↓
Deliver File
```

---

# 25. PERMISSION NAMING CONVENTION

Permission sebaiknya menggunakan format yang konsisten.

Contoh:

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

classes.view
classes.create
classes.update
classes.delete

reading_lists.view
reading_lists.create
reading_lists.update
reading_lists.delete

reports.view
reports.export

notifications.view
notifications.create
notifications.update
notifications.delete
```

AI/Vibe Coder harus menggunakan naming convention yang konsisten.

---

# 26. PRINCIPLE OF LEAST PRIVILEGE

Setiap role hanya diberikan permission yang diperlukan untuk menjalankan tugasnya.

Contoh:

```text
Student
```

tidak membutuhkan:

```text
users.delete
books.delete
system.settings
```

Maka permission tersebut tidak diberikan.

---

# 27. PERMISSION INHERITANCE

Sistem **tidak boleh mengasumsikan inheritance hanya berdasarkan hierarki role**.

Contoh:

```text
ADMIN > LIBRARY_STAFF
```

tidak berarti sistem harus otomatis memberikan seluruh permission Admin kepada Library Staff.

Permission harus ditentukan secara eksplisit.

---

# 28. FUTURE ROLE

Role tambahan dapat ditambahkan di masa depan.

Contoh kemungkinan:

```text
SUPER_ADMIN
CONTENT_MANAGER
LIBRARY_SUPERVISOR
GUEST
```

Namun role tersebut **tidak termasuk MVP**.

AI tidak boleh membuat role tersebut tanpa requirement baru.

---

# 29. ACCEPTANCE CRITERIA

Role & Permission dianggap berhasil apabila:

### Admin

* Dapat mengelola user.
* Dapat mengelola buku.
* Dapat mengelola kelas.
* Dapat mengatur access rule.
* Dapat melihat laporan.
* Dapat melihat activity log.

### Library Staff

* Dapat mengelola koleksi.
* Dapat mengelola metadata.
* Dapat mengatur access rule buku.
* Dapat melihat statistik perpustakaan.

### Teacher

* Dapat membaca buku.
* Dapat membuat reading list.
* Dapat merekomendasikan buku.
* Dapat melihat aktivitas siswa dalam scope yang diizinkan.

### Education Staff

* Dapat mengakses katalog dan membaca buku yang diizinkan.

### Student

* Dapat membaca buku yang memiliki permission.
* Dapat membuat bookmark.
* Dapat melihat progress.
* Dapat membuat highlight.
* Dapat membuat notes.
* Dapat melihat reading list/rekomendasi guru.

### Security

* User tidak dapat mengakses endpoint yang tidak memiliki permission.
* User tidak dapat membaca buku restricted.
* Student tidak dapat melihat data student lain.
* Teacher tidak dapat melihat aktivitas di luar scope.
* File ebook tidak dapat diakses tanpa authorization.

---

# 30. RULE UNTUK AI/VIBE CODER

AI coding agent wajib mematuhi aturan berikut:

1. Jangan membuat role baru tanpa approval.
2. Jangan memberikan permission tambahan tanpa approval.
3. Jangan mengandalkan frontend untuk authorization.
4. Semua endpoint sensitif harus memiliki authorization.
5. Resource ownership harus diperiksa.
6. Book permission harus diperiksa sebelum ebook diberikan.
7. Download dan read merupakan permission yang berbeda.
8. Share dan read merupakan permission yang berbeda.
9. Student hanya boleh mengakses data miliknya.
10. Teacher hanya boleh mengakses student dalam scope yang diizinkan.
11. Admin memiliki akses global sesuai permission.
12. Jangan bypass authorization untuk mempermudah development.
13. Jangan membuat endpoint internal yang dapat diakses public.
14. Jika terdapat kebutuhan permission baru, hentikan implementasi dan laporkan kebutuhan tersebut.

---

# 31. SUMMARY

Role utama:

```text
ADMIN
LIBRARY_STAFF
TEACHER
EDUCATION_STAFF
STUDENT_MTS
STUDENT_MA
```

Prinsip akses:

```text
Authentication
      ↓
Role
      ↓
Permission
      ↓
Resource Access
      ↓
Ownership / Scope
      ↓
ALLOW / DENY
```

Untuk ebook:

```text
READ
DOWNLOAD
SHARE
```

merupakan permission yang berbeda.

Sistem menggunakan prinsip:

> **Least Privilege + Server-Side Authorization + Resource-Level Access Control**

---

# END OF ROLE & PERMISSION DOCUMENT

**Dokumen:** Role & Permission
**Produk:** Sistem Perpustakaan Digital Madrasah Hasan Muchyi Kapurejo
**Versi:** 1.0
**Status:** Ready for Use Case Design
