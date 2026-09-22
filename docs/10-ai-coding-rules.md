# AI CODING RULES

## Digital Library — Madrasah Hasan Muchyi Kapurejo

**Versi:** 1.0
**Status:** Baseline
**Tujuan:** Menjadi aturan utama AI/Vibe Coder selama proses pengembangan aplikasi.

---

# 1. Tujuan Dokumen

Dokumen ini mengatur bagaimana AI Coding Assistant harus bekerja ketika mengembangkan Digital Library.

AI berperan sebagai:

> **Implementer / Programmer**

Sedangkan keputusan mengenai:

* fitur,
* requirement,
* business rule,
* database,
* API,
* UI/UX,
* security,
* architecture,

tetap berada pada:

> **Developer / Project Owner**

AI tidak boleh mengambil keputusan arsitektur secara sepihak.

---

# 2. Prinsip Utama

Gunakan prinsip:

```text
Requirement
     ↓
Specification
     ↓
Implementation
     ↓
Testing
     ↓
Review
     ↓
Commit
```

Bukan:

```text
"AI, buatkan aplikasi perpustakaan lengkap."
```

---

# 3. Source of Truth

AI wajib menganggap dokumen berikut sebagai sumber utama:

```text
docs/
├── 01-requirements.md
├── 02-prd.md
├── 03-roles-permissions.md
├── 04-use-cases.md
├── 05-user-flows.md
├── 06-database.md
├── 07-architecture.md
├── 08-api-specification.md
├── 09-ui-ux.md
└── 10-ai-coding-rules.md
```

Prioritas:

```text
Requirements
    ↓
PRD
    ↓
Roles & Permission
    ↓
Use Cases
    ↓
User Flows
    ↓
Database
    ↓
Architecture
    ↓
API
    ↓
UI/UX
    ↓
Implementation
```

Jika terdapat konflik antar dokumen, AI **tidak boleh menebak**.

AI harus:

1. Mengidentifikasi konflik.
2. Menjelaskan konflik.
3. Meminta keputusan developer.
4. Menunggu keputusan sebelum mengubah bagian yang konflik.

---

# 4. AI Tidak Boleh Mengarang Requirement

AI dilarang menambahkan fitur hanya karena fitur tersebut umum ditemukan pada aplikasi perpustakaan.

Contoh fitur yang tidak boleh tiba-tiba dibuat:

```text
AI Chatbot
AI Recommendation
Gamification
PWA
Offline Mode
QR Code
Push Notification
Payment
Subscription
Native Mobile App
```

kecuali fitur tersebut sudah disetujui dan masuk scope.

---

# 5. Aturan Perubahan Requirement

Jika developer meminta fitur baru:

```text
User Request
     ↓
Analisis Dampak
     ↓
Requirement Update
     ↓
Database Impact
     ↓
API Impact
     ↓
UI/UX Impact
     ↓
Implementation
```

AI tidak boleh langsung coding apabila perubahan tersebut berdampak besar terhadap arsitektur.

Format perubahan:

```text
CHANGE REQUEST

ID:
CR-XXX

Feature:
...

Reason:
...

Affected Documents:
- PRD
- Database
- API
- UI/UX

Impact:
Low / Medium / High

Decision:
Approved / Rejected
```

---

# 6. Development Harus Bertahap

AI tidak boleh mengimplementasikan seluruh sistem sekaligus.

Gunakan:

```text
Feature
   ↓
Implement
   ↓
Run
   ↓
Test
   ↓
Fix
   ↓
Review
   ↓
Commit
```

Contoh:

```text
Sprint 1
Authentication

Sprint 2
User & Class

Sprint 3
Book Management

Sprint 4
Catalog

Sprint 5
Reader

...
```

---

# 7. Sebelum Coding

Sebelum mengubah kode, AI wajib memahami:

1. Requirement terkait.
2. Use case terkait.
3. User flow terkait.
4. Database terkait.
5. API terkait.
6. UI/UX terkait.
7. Permission terkait.

AI harus menentukan file yang akan berubah.

Contoh:

```text
Feature:
Tambah Buku

Affected:
frontend/books/*
backend/books/*
database/books/*
```

AI tidak boleh mengubah file yang tidak berkaitan tanpa alasan.

---

# 8. Jangan Merusak Existing Feature

Setiap perubahan harus menjaga backward compatibility terhadap fitur yang sudah bekerja.

Sebelum perubahan:

```text
Feature A ✅
Feature B ✅
Feature C ✅
```

Setelah perubahan:

```text
Feature A ✅
Feature B ✅
Feature C ✅
New Feature D ✅
```

Jika perubahan menyebabkan regresi, AI wajib memperbaikinya sebelum melanjutkan.

---

# 9. Database Rules

AI wajib mengikuti `06-database.md`.

Aturan:

* Jangan membuat tabel tanpa alasan.
* Jangan menghapus kolom existing tanpa approval.
* Jangan mengganti nama tabel sembarangan.
* Jangan hard-code kelas.
* Jangan membuat tabel terpisah untuk MTs dan MA tanpa alasan yang disetujui.
* Gunakan satu tabel `users`.
* Gunakan struktur `levels` dan `classes`.
* Gunakan foreign key.
* Gunakan index untuk query penting.
* Gunakan unique constraint jika diperlukan.
* Gunakan soft delete/archive jika ditentukan.
* Migration harus versioned.

Struktur akademik:

```text
Level
 ├── MTs
 │    ├── VII A
 │    ├── VII B
 │    └── ...
 │
 └── MA
      ├── IPS 1
      ├── IPS 2
      ├── Bahasa 1
      └── ...
```

Tidak boleh:

```text
if class == "VII A"
```

untuk logic bisnis permanen.

---

# 10. User & Role Rules

Role:

```text
ADMIN
LIBRARY_STAFF
TEACHER
EDUCATION_STAFF
STUDENT_MTS
STUDENT_MA
```

AI tidak boleh membuat role baru tanpa approval.

Authorization harus dilakukan di backend.

Tidak cukup:

```text
if user.role === "ADMIN"
```

di frontend.

Backend harus tetap melakukan:

```text
Authentication
      ↓
Role Permission
      ↓
Resource Permission
      ↓
Ownership / Scope
      ↓
Action
```

---

# 11. Book Access Rules

Akses buku terdiri dari dua lapisan:

```text
USER
 ↓
ROLE PERMISSION
 ↓
BOOK ACCESS RULE
 ↓
ACTION
```

Action:

```text
READ
DOWNLOAD
SHARE
```

Ketiga permission tersebut harus diperlakukan secara terpisah.

Contoh:

```text
Read      = true
Download  = false
Share     = true
```

berarti pengguna:

```text
✓ dapat membaca
✗ tidak dapat download
✓ dapat share
```

---

# 12. Digital Access Rule

Default sistem:

> Digital access tidak memiliki batas waktu.

AI tidak boleh otomatis membuat:

```text
borrow_duration = 7 days
```

atau mekanisme peminjaman tradisional jika tidak ada requirement.

---

# 13. Teacher Scope

Guru tidak boleh melihat aktivitas seluruh siswa secara otomatis.

AI harus menerapkan teacher scope.

Contoh:

```text
Teacher
   ↓
Assigned Class
   ↓
Students in Class
   ↓
Reading Activity
```

Guru hanya dapat mengakses data siswa sesuai scope yang diberikan.

Authorization harus dilakukan server-side.

---

# 14. Ownership Rule

Data personal seperti:

```text
Progress
Bookmark
Highlight
Note
Reading History
```

harus memiliki ownership.

Contoh:

```text
User A → Bookmark A
User B → Bookmark B
```

User A tidak boleh mengakses bookmark User B hanya dengan mengubah ID pada URL/API.

---

# 15. Ebook Security

Ebook adalah data private.

AI dilarang membuat:

```text
/public/books/
```

sebagai tempat penyimpanan ebook yang dapat diakses langsung.

Gunakan:

```text
Private Object Storage
        ↓
Backend Authorization
        ↓
Secure Access
        ↓
Reader / Download
```

Jangan expose direct permanent public URL.

---

# 16. File Upload

Upload ebook harus memiliki:

1. Validasi extension.
2. Validasi MIME type.
3. Validasi ukuran file.
4. Generated storage key.
5. Penyimpanan private.
6. Metadata disimpan di database.
7. Error handling.

Nama file user tidak boleh dijadikan storage path langsung.

Contoh yang dihindari:

```text
/storage/books/Matematika VII.pdf
```

Gunakan identifier internal.

---

# 17. API Rules

AI wajib mengikuti `08-api-specification.md`.

Base:

```text
/api/v1
```

Format response success:

```json
{
  "success": true,
  "data": {},
  "message": "Success"
}
```

Format error:

```json
{
  "success": false,
  "message": "Error message",
  "errors": {}
}
```

AI tidak boleh mengubah endpoint hanya karena menurut AI ada struktur yang lebih bagus.

Jika ingin mengubah API:

> Ajukan perubahan terlebih dahulu.

---

# 18. HTTP Status Rules

Gunakan status code sesuai kondisi:

```text
200  Success
201  Created
204  No Content
400  Bad Request
401  Unauthenticated
403  Forbidden
404  Not Found
409  Conflict
422  Validation Error
429  Too Many Requests
500  Server Error
```

Bedakan:

```text
401
= belum terautentikasi

403
= sudah login tetapi tidak memiliki izin
```

---

# 19. Validation

Validation harus dilakukan di backend.

Frontend validation hanya berfungsi untuk UX.

Contoh:

```text
Frontend:
"Judul wajib diisi"

Backend:
Tetap memvalidasi judul
```

Backend tidak boleh mempercayai data dari browser.

---

# 20. Frontend Rules

Frontend harus:

* Responsive.
* Reusable.
* Tidak menyimpan secret.
* Tidak menentukan authorization.
* Menangani loading.
* Menangani error.
* Menangani empty state.
* Menangani permission denied.
* Tidak mengandung business logic sensitif.

Contoh yang salah:

```text
Frontend:
if role == ADMIN
then API dianggap aman
```

Frontend hanya mengontrol tampilan.

Backend mengontrol akses sebenarnya.

---

# 21. Component Rules

Gunakan reusable components.

Contoh:

```text
Button
Modal
Input
Select
Table
Pagination
BookCard
SearchBar
Toast
Dialog
LoadingState
EmptyState
ErrorState
```

Jika komponen yang sama muncul berkali-kali, pertimbangkan membuat reusable component.

Hindari:

```text
BookCardA
BookCardB
BookCardC
```

jika sebenarnya memiliki fungsi yang sama.

---

# 22. UI/UX Rules

AI wajib mengikuti `09-ui-ux.md`.

Prioritas:

```text
Mobile
   ↓
Tablet
   ↓
Desktop
```

UI harus konsisten dalam:

* spacing
* typography
* button
* form
* card
* modal
* notification
* error message
* loading state

Jangan membuat desain baru setiap halaman.

---

# 23. Reader Rules

Digital Reader harus mempertahankan fitur:

```text
Navigation
Zoom
Fullscreen
TOC
Search
Bookmark
Progress
Highlight
Notes
Dark Mode
```

Reader harus terintegrasi dengan:

```text
Progress
Bookmark
Highlight
Notes
History
```

Reader tidak boleh menjadi komponen terpisah yang tidak terhubung dengan backend.

---

# 24. Error Handling

Error harus:

1. Ditangani.
2. Dicatat jika diperlukan.
3. Ditampilkan dengan bahasa yang dipahami pengguna.
4. Tidak membocorkan informasi sensitif.

Jangan tampilkan:

```text
SQLSTATE[42S02]...
Stack trace...
Database password...
Internal token...
```

kepada user.

---

# 25. Logging

Log boleh menyimpan:

```text
request_id
user_id
endpoint
method
status
duration
timestamp
```

Jangan menyimpan:

```text
password
access token
refresh token
secret
API key
```

dalam log biasa.

---

# 26. Security Rules

Minimal:

```text
HTTPS
Authentication
Authorization
Input Validation
CSRF protection sesuai auth architecture
Rate Limiting
Secure Headers
File Validation
Private Storage
Audit Logging
```

AI harus menghindari:

* SQL Injection
* XSS
* CSRF
* IDOR
* Broken Access Control
* Path Traversal
* Unsafe File Upload
* Credential Exposure

---

# 27. Dependency Rules

AI tidak boleh sembarangan menambahkan package.

Sebelum menambahkan dependency:

```text
Need?
 ↓
Apakah bisa menggunakan existing dependency?
 ↓
Apakah package mature?
 ↓
Apakah kompatibel?
 ↓
Apakah benar-benar diperlukan?
```

Jika tidak diperlukan:

> Jangan install.

---

# 28. Code Quality

Kode harus:

* mudah dibaca,
* modular,
* konsisten,
* memiliki naming yang jelas,
* tidak memiliki duplicate logic berlebihan,
* tidak memiliki dead code,
* tidak memiliki secret hard-coded.

Hindari:

```text
const x = ...
const y = ...
const z = ...
```

gunakan nama yang menjelaskan maksud.

---

# 29. Environment Variables

Secret harus berada di environment variable.

Contoh:

```text
DATABASE_URL
STORAGE_KEY
STORAGE_SECRET
AUTH_SECRET
```

Jangan:

```text
const password = "123456";
```

di source code.

`.env` tidak boleh di-commit jika berisi secret.

---

# 30. Migration Rules

Perubahan database harus melalui migration.

Jangan mengubah database production secara manual tanpa prosedur.

Flow:

```text
Modify Schema
      ↓
Create Migration
      ↓
Run Local
      ↓
Test
      ↓
Review
      ↓
Production
```

---

# 31. Testing Rules

Minimal setiap feature memiliki:

```text
Happy Path
Validation Error
Unauthorized
Forbidden
Not Found
Edge Case
```

Contoh Download:

```text
✓ User punya permission
✓ File tersedia

✗ Belum login
✗ Tidak punya permission
✗ Book tidak ditemukan
✗ File tidak tersedia
```

---

# 32. Git Rules

Setiap feature yang selesai harus memiliki checkpoint.

Contoh:

```text
feat: implement authentication
feat: implement user management
feat: implement book management
feat: implement catalog
feat: implement digital reader
```

Jangan membuat satu commit besar:

```text
feat: complete entire digital library
```

---

# 33. Git Checkpoint

Setelah feature selesai:

```text
Run
 ↓
Test
 ↓
Review
 ↓
Git Status
 ↓
Commit
```

Jika feature rusak, jangan lanjut ke feature berikutnya.

---

# 34. AI Response Format

Ketika menerima tugas coding, AI sebaiknya menjawab:

```text
1. Pemahaman tugas
2. Dokumen yang terkait
3. File yang akan diubah
4. Implementasi
5. Testing
6. Hasil
7. Next step
```

Contoh:

```text
Task:
Implement login.

Related:
02-prd.md
03-roles-permissions.md
08-api-specification.md

Files:
backend/auth/*
frontend/pages/login/*

Implementation:
...

Test:
...

Result:
...

Next:
User management
```

---

# 35. Jangan Melakukan Perubahan Diam-Diam

Jika AI menemukan:

```text
Database kurang field X
API kurang endpoint Y
UI membutuhkan permission Z
```

AI tidak boleh diam-diam membuat perubahan besar.

AI harus memberi tahu:

> "Implementasi membutuhkan perubahan pada database/API. Berikut dampaknya..."

Kemudian meminta approval jika perubahan tersebut berada di luar scope.

---

# 36. Definition of Done

Sebuah feature dianggap selesai jika:

```text
Requirement sesuai
      ↓
Code selesai
      ↓
Build berhasil
      ↓
Tidak ada error kritis
      ↓
Happy path berhasil
      ↓
Negative case diuji
      ↓
Authorization diuji
      ↓
Responsive diuji
      ↓
Review
      ↓
Commit
```

---

# 37. Jangan Mengejar Kecepatan dengan Mengorbankan Struktur

Prioritas:

```text
Correctness
    >
Security
    >
Maintainability
    >
Testability
    >
Performance
    >
Development Speed
```

Untuk MVP, jangan menambahkan optimasi kompleks yang belum diperlukan.

---

# 38. Hindari Overengineering

MVP tidak membutuhkan:

```text
Microservices
Kafka
Elasticsearch
Redis
Kubernetes
Event-driven architecture kompleks
```

kecuali kebutuhan nyata sudah muncul dan keputusan arsitektur telah disetujui.

Gunakan solusi sederhana yang memenuhi requirement.

---

# 39. AI Tidak Boleh Mengubah Stack Secara Sepihak

Stack final belum dikunci.

Candidate:

```text
Next.js + Laravel + PostgreSQL

Next.js + NestJS + PostgreSQL

Next.js + Supabase
```

AI tidak boleh memilih dan langsung mengimplementasikan salah satunya tanpa keputusan final.

Setelah stack dipilih, seluruh implementasi wajib mengikuti stack tersebut.

---

# 40. Prompt Development Standard

Prompt kepada AI Coding Assistant sebaiknya memiliki struktur:

```text
CONTEXT

TASK

REFERENCE DOCUMENTS

CONSTRAINTS

FILES TO MODIFY

EXPECTED BEHAVIOR

ACCEPTANCE CRITERIA

DO NOT

TEST REQUIREMENTS
```

Contoh:

```text
CONTEXT:
Digital Library Madrasah Hasan Muchyi Kapurejo.

TASK:
Implement login.

REFERENCE:
- docs/02-prd.md
- docs/03-roles-permissions.md
- docs/08-api-specification.md

CONSTRAINTS:
- Do not change API contract.
- Do not create new role.
- Authentication must be server-side.

EXPECTED:
User enters Nama Lengkap + NISN.
Successful login redirects to role dashboard.

DO NOT:
- hard-code admin credentials
- store password in plaintext
- bypass authorization

ACCEPTANCE:
- valid credentials work
- invalid credentials rejected
- unauthenticated API rejected
```

---

# 41. Stop Conditions

AI harus berhenti dan meminta keputusan apabila:

1. Requirement bertentangan.
2. Database specification tidak cukup.
3. API specification tidak cukup.
4. Security decision belum ditentukan.
5. Tech stack belum dipilih.
6. Implementasi membutuhkan perubahan arsitektur besar.
7. Ada risiko kehilangan data.
8. Ada risiko security.
9. AI harus menebak business rule.

Lebih baik bertanya daripada mengarang.

---

# 42. Development Loop

Workflow resmi:

```text
┌─────────────────────┐
│  Select One Feature │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ Read Documentation  │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ Write AI Prompt     │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ AI Implements       │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ Run Application     │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ Test                │
└──────────┬──────────┘
           ↓
       Bug?
      /    \
    Yes     No
     ↓       ↓
   Fix      Review
     ↓       ↓
     └──→ Commit
             ↓
        Next Feature
```

---

# 43. Golden Rules

AI Coding Assistant wajib mengingat aturan berikut:

```text
1. Jangan mengarang requirement.
2. Jangan mengubah architecture tanpa approval.
3. Jangan mengubah API contract tanpa approval.
4. Jangan hard-code business data.
5. Jangan percaya frontend untuk security.
6. Semua authorization harus server-side.
7. User hanya boleh mengakses data miliknya.
8. Teacher hanya boleh melihat data sesuai scope.
9. Ebook harus private.
10. Read, Download, Share adalah permission terpisah.
11. Digital access tidak memiliki expiration secara default.
12. Gunakan reusable components.
13. Gunakan migration untuk database.
14. Jangan menambahkan dependency tanpa alasan.
15. Test sebelum commit.
16. Satu feature → satu checkpoint.
17. Jika ragu → berhenti dan tanyakan.
```

---

# 44. Status Dokumen

```text
10 AI Coding Rules
Status: BASELINE

Coding Workflow:       Defined
Architecture Rules:    Defined
Database Rules:        Defined
API Rules:             Defined
Security Rules:        Defined
Frontend Rules:        Defined
Testing Rules:         Defined
Git Rules:             Defined
Prompt Standard:       Defined
Stop Conditions:       Defined
```

---

# 45. Posisi Workflow

```text
01 Requirements          ✅
02 PRD                   ✅
03 Roles & Permission    ✅
04 Use Cases             ✅
05 User Flows            ✅
06 Database / ERD        ✅
07 Architecture         ✅
08 API Specification     ✅
09 UI/UX                 ✅
10 AI Coding Rules       ✅
11 Test Plan             ⏭️
12 Development Sprint    ⏭️
```

**Dokumen ini wajib dibaca oleh AI Coding Assistant sebelum mengimplementasikan feature apa pun.**
