# TEST PLAN

## Digital Library — Madrasah Hasan Muchyi Kapurejo

**Versi:** 1.0
**Status:** Baseline
**Platform:** Responsive Web Application

---

# 1. Tujuan Testing

Testing bertujuan memastikan bahwa Digital Library:

1. Berfungsi sesuai requirement.
2. Memiliki authorization yang benar.
3. Menjaga data pengguna.
4. Menjaga keamanan ebook.
5. Berjalan pada smartphone, tablet, dan desktop.
6. Tidak mengalami regresi setelah penambahan fitur.
7. Memiliki error handling yang jelas.
8. Memenuhi acceptance criteria pada PRD.

Testing bukan hanya memastikan:

> "Apakah tombolnya bisa diklik?"

Tetapi juga:

> "Apakah pengguna yang tidak memiliki izin benar-benar tidak dapat melakukan action tersebut?"

---

# 2. Testing Pyramid

Strategi testing:

```text
                    ┌──────────────┐
                    │  E2E Tests   │
                    └──────┬───────┘
                           │
                  ┌────────┴────────┐
                  │ Integration Test│
                  └────────┬────────┘
                           │
                 ┌─────────┴─────────┐
                 │    Unit Tests     │
                 └───────────────────┘
```

Prioritas:

```text
Unit
  ↓
Integration
  ↓
E2E
  ↓
Manual / UAT
```

---

# 3. Test Environment

Minimal tersedia:

```text
Development
Testing / Staging
Production
```

Testing tidak dilakukan langsung pada production untuk eksperimen.

---

# 4. Test Data

Gunakan data dummy untuk development/testing.

Contoh:

### Users

```text
Admin Test
Library Staff Test
Teacher Test
Education Staff Test
Student MTs Test
Student MA Test
```

### Classes

```text
MTs VII A
MTs VII B
MA IPS 1
MA IPS 2
MA Bahasa 1
```

### Books

```text
Book Public
Book MTs
Book MA
Book Teacher
Book Restricted
Book Download Restricted
```

Data testing harus jelas dibedakan dari data production.

---

# 5. Test Categories

Sistem diuji menggunakan:

```text
Functional Testing
Authorization Testing
Authentication Testing
Security Testing
API Testing
Database Testing
UI Testing
Responsive Testing
Reader Testing
File Testing
Performance Testing
Regression Testing
User Acceptance Testing
```

---

# 6. Authentication Testing

## TC-AUTH-001 — Login Valid

**Precondition:** User aktif dan credentials valid.

**Steps:**

1. Buka halaman login.
2. Masukkan Nama Lengkap.
3. Masukkan NISN.
4. Klik Login.

**Expected:**

* Login berhasil.
* Session/authentication terbentuk.
* User diarahkan ke dashboard sesuai role.

---

## TC-AUTH-002 — Login Invalid

Masukkan credentials salah.

Expected:

```text
Login ditolak.
Pesan error ditampilkan.
```

Tidak boleh mengungkap apakah username atau password tertentu ada di sistem.

---

## TC-AUTH-003 — User Inactive

User berstatus inactive mencoba login.

Expected:

```text
Login ditolak.
```

---

## TC-AUTH-004 — Logout

User melakukan logout.

Expected:

* Session/token invalid.
* Halaman protected tidak dapat diakses.

---

## TC-AUTH-005 — Unauthenticated API

Request protected API tanpa authentication.

Expected:

```text
HTTP 401
```

---

# 7. Authorization Testing

Authorization merupakan bagian kritis.

## TC-AUTHZ-001 — Admin Access

Admin mengakses fitur admin.

Expected:

```text
Allowed
```

---

## TC-AUTHZ-002 — Student Admin Endpoint

Student mencoba endpoint admin.

Expected:

```text
HTTP 403
```

---

## TC-AUTHZ-003 — Teacher Scope

Guru mencoba melihat siswa di luar scope-nya.

Expected:

```text
HTTP 403
```

atau data tidak diberikan sesuai aturan endpoint.

---

## TC-AUTHZ-004 — User Ownership

User A mencoba mengakses bookmark User B.

Expected:

```text
Denied
```

---

## TC-AUTHZ-005 — ID Manipulation

User mencoba mengganti:

```text
/books/123
```

menjadi:

```text
/books/124
```

untuk mengakses resource yang tidak memiliki izin.

Expected:

```text
Access denied
```

---

# 8. User Management Testing

## TC-USER-001

Admin membuat user baru.

Expected:

* User tersimpan.
* Role valid.
* Level/class valid.
* User dapat login jika status aktif.

---

## TC-USER-002

Admin mengubah user.

Expected:

* Data berubah.
* Permission tetap mengikuti role.

---

## TC-USER-003

Admin menonaktifkan user.

Expected:

* User tidak dapat login.
* Session aktif ditangani sesuai auth architecture.

---

## TC-USER-004 — Import User

Upload file valid.

Expected:

* Data divalidasi.
* Preview muncul.
* Data valid berhasil diimport.

---

## TC-USER-005 — Import Invalid

Upload data dengan:

* Nama kosong.
* NISN duplikat.
* Role tidak valid.
* Kelas tidak valid.

Expected:

* Import tidak memasukkan data invalid.
* Error ditampilkan per baris.

---

# 9. Class Management Testing

## TC-CLASS-001

Admin membuat kelas baru.

Expected:

```text
Kelas berhasil dibuat.
```

## TC-CLASS-002

Admin mengubah kelas.

Expected:

```text
Data kelas berubah.
```

## TC-CLASS-003

User biasa mencoba mengelola kelas.

Expected:

```text
HTTP 403
```

---

# 10. Book Management Testing

## TC-BOOK-001 — Create Book

Library Staff membuat buku.

Expected:

* Metadata tersimpan.
* Status awal sesuai specification.

---

## TC-BOOK-002 — Edit Book

Metadata buku diubah.

Expected:

* Perubahan tersimpan.
* Catalog menampilkan data baru.

---

## TC-BOOK-003 — Publish Book

Book draft dipublish.

Expected:

* Status menjadi Published.
* Buku muncul sesuai access rule.

---

## TC-BOOK-004 — Archive Book

Book dipindahkan ke Archived.

Expected:

* Buku tidak muncul sebagai buku aktif sesuai aturan.
* Resource lama ditangani sesuai policy.

---

# 11. Ebook Upload Testing

## TC-FILE-001 — Valid File

Upload ebook valid.

Expected:

* File berhasil disimpan.
* Metadata tersimpan.
* File tidak public.

---

## TC-FILE-002 — Invalid Extension

Upload file yang tidak diperbolehkan.

Expected:

```text
Upload rejected.
```

---

## TC-FILE-003 — Invalid MIME Type

File memiliki extension valid tetapi MIME type tidak sesuai.

Expected:

```text
Upload rejected.
```

---

## TC-FILE-004 — Oversized File

Upload file melebihi batas.

Expected:

```text
Upload rejected.
```

---

## TC-FILE-005 — Direct URL

Coba mengakses lokasi penyimpanan ebook secara langsung.

Expected:

```text
Access denied.
```

Ebook tidak boleh menjadi public static file.

---

# 12. Catalog Testing

## TC-CAT-001 — View Catalog

User membuka katalog.

Expected:

* Buku yang accessible tampil.

---

## TC-CAT-002 — Search

Search berdasarkan judul.

Expected:

* Hasil relevan ditampilkan.

---

## TC-CAT-003 — Filter

Filter berdasarkan:

* Kategori
* Level
* Kelas
* Penulis
* Penerbit

Expected:

* Hasil sesuai filter.

---

## TC-CAT-004 — Unauthorized Book

User tidak memiliki akses terhadap buku tertentu.

Expected:

* Buku tidak diberikan akses baca.
* Detail/action mengikuti access policy.

---

# 13. Book Access Testing

Gunakan kombinasi:

| Read | Download | Share | Expected                       |
| ---- | -------- | ----- | ------------------------------ |
| ✓    | ✓        | ✓     | Semua action tersedia          |
| ✓    | ✗        | ✓     | Baca + share                   |
| ✓    | ✗        | ✗     | Baca saja                      |
| ✗    | ✗        | ✗     | Tidak dapat mengakses          |
| ✗    | ✓        | ✓     | Tidak boleh bypass read policy |

Poin terakhir penting.

Permission tidak boleh menyebabkan pengguna mendapatkan akses yang bertentangan dengan aturan keamanan.

---

# 14. Reader Testing

## TC-READ-001

User membuka buku yang memiliki permission read.

Expected:

```text
Reader terbuka.
```

---

## TC-READ-002

User tanpa permission read mencoba membuka reader.

Expected:

```text
HTTP 403
```

atau UX permission denied.

---

## TC-READ-003

Next / Previous Page

Expected:

* Navigasi halaman bekerja.

---

## TC-READ-004

Zoom

Expected:

* Zoom bekerja.
* Layout tetap usable.

---

## TC-READ-005

Fullscreen

Expected:

* Reader dapat fullscreen.

---

## TC-READ-006

Table of Contents

Expected:

* Chapter dapat dipilih.
* Reader berpindah ke bagian yang benar.

---

## TC-READ-007

Search Text

Expected:

* Text ditemukan.
* Hasil dapat dinavigasi.

---

# 15. Reading Progress Testing

## TC-PROGRESS-001

User membaca halaman tertentu.

Expected:

```text
Progress tersimpan.
```

---

## TC-PROGRESS-002

User keluar kemudian kembali.

Expected:

```text
Lanjutkan dari posisi terakhir.
```

---

## TC-PROGRESS-003

User A dan User B.

Expected:

```text
Progress A ≠ Progress B
```

kecuali kebetulan nilainya sama.

---

# 16. Bookmark Testing

Test:

```text
Create
Read
Delete
Ownership
```

Expected:

* User dapat membuat bookmark.
* Bookmark muncul pada akun user.
* Bookmark dapat dihapus.
* User lain tidak dapat mengakses bookmark tersebut.

---

# 17. Highlight Testing

Test:

```text
Create
View
Edit/Delete jika didukung
Ownership
```

Highlight user lain tidak boleh muncul sebagai milik user sendiri.

---

# 18. Notes Testing

Test:

```text
Create
View
Edit
Delete
Ownership
```

User hanya dapat memodifikasi note miliknya sendiri.

---

# 19. Reading History Testing

Expected:

* Aktivitas membaca tercatat.
* Buku yang dibaca muncul dalam history.
* History user tidak tercampur.

---

# 20. Teacher Feature Testing

## TC-TEACH-001

Guru membuat reading list.

Expected:

```text
Reading list berhasil dibuat.
```

---

## TC-TEACH-002

Guru menambahkan buku.

Expected:

```text
Buku berhasil ditambahkan.
```

---

## TC-TEACH-003

Guru menentukan target kelas.

Expected:

```text
Target tersimpan.
```

---

## TC-TEACH-004

Guru publish reading list.

Expected:

* Target siswa menerima/menampilkan reading list sesuai notification rule.

---

## TC-TEACH-005

Teacher Scope

Guru mencoba melihat aktivitas kelas lain.

Expected:

```text
Denied.
```

---

# 21. Recommendation Testing

Test:

* Create recommendation.
* Edit recommendation.
* Delete recommendation.
* Publish recommendation.
* Target sesuai scope.

Recommendation tidak boleh menjadi cara untuk bypass book access.

---

# 22. Notification Testing

Test:

```text
Create
Receive
Read
Unread
```

Expected:

* Notification diterima user target.
* Notification tidak muncul pada user yang bukan target.

---

# 23. Statistics Testing

Data statistik harus dibandingkan dengan data sumber.

Contoh:

```text
Database:
100 reading events

Dashboard:
100 reading events
```

Jika terdapat filter:

```text
Level = MA
```

maka hanya data MA yang dihitung.

---

# 24. Report Testing

Test:

```text
Export Excel
Export PDF
```

Expected:

* File dapat dibuka.
* Data sesuai filter.
* Tidak ada data user yang tidak seharusnya ditampilkan.

---

# 25. Activity Log Testing

Test aktivitas:

```text
Login
Create Book
Edit Book
Publish Book
Archive Book
Create User
Change Access Rule
```

Expected:

* Aktivitas tercatat.
* User dapat diidentifikasi.
* Timestamp tersedia.
* Sensitive data tidak tercatat.

---

# 26. Responsive Testing

Minimal test pada:

### Mobile

```text
360 × 800
390 × 844
```

### Tablet

```text
768 × 1024
```

### Desktop

```text
1366 × 768
1920 × 1080
```

Yang diperiksa:

* Layout
* Navigation
* Button
* Form
* Table
* Reader
* Modal
* Drawer
* Text overflow

---

# 27. Browser Testing

Minimal:

```text
Chrome
Edge
Firefox
```

Safari dapat diuji jika perangkat/environment tersedia.

Prioritas awal:

> Chrome-based browser pada desktop dan Android.

---

# 28. Security Testing

Minimal pengujian:

### Authentication

* Credential invalid
* Brute-force/rate limit
* Session handling

### Authorization

* Role bypass
* IDOR
* Ownership bypass
* Teacher scope bypass

### Input

* XSS
* SQL Injection
* Malicious input

### File

* Invalid extension
* Invalid MIME
* Oversized file
* Path traversal
* Malicious file

### Session

* Unauthorized access
* Logout behavior
* Session expiration sesuai auth architecture

---

# 29. API Testing

Setiap endpoint minimal diuji:

```text
Valid Request
Invalid Request
Unauthenticated
Unauthorized
Not Found
Validation Error
Conflict
Server Error
```

Contoh:

```text
GET /api/v1/books
```

Test:

```text
✓ authenticated user
✗ unauthenticated
✓ permitted role
✗ restricted resource
```

---

# 30. Performance Testing

Target awal disesuaikan dengan skala ±500–600 pengguna.

Pengujian:

* Login response
* Catalog loading
* Search
* Book detail
* Reader initialization
* Progress update
* Dashboard
* Statistics
* Report generation

Jangan melakukan optimasi kompleks sebelum bottleneck ditemukan.

---

# 31. Load Testing

Simulasikan peningkatan jumlah request.

Contoh tahap awal:

```text
50 concurrent users
100 concurrent users
250 concurrent users
500 concurrent users
```

Tujuan:

* menemukan bottleneck,
* melihat response time,
* melihat error rate,
* melihat penggunaan database/server.

Angka tersebut merupakan skenario pengujian, bukan klaim bahwa sistem pasti mampu melayani jumlah tersebut.

---

# 32. Regression Testing

Setiap feature baru harus menjalankan regression test terhadap feature yang berkaitan.

Contoh:

Jika mengubah:

```text
Book Access Rule
```

minimal test kembali:

```text
Catalog
Book Detail
Reader
Download
Share
Teacher Reading List
```

---

# 33. Smoke Test

Setelah deployment/build baru, jalankan:

```text id="m2xq6k"
1. Application opens
2. Login works
3. Dashboard opens
4. Catalog opens
5. Book detail opens
6. Reader opens
7. Logout works
```

Jika smoke test gagal:

> Deployment dianggap gagal sampai diperbaiki.

---

# 34. User Acceptance Testing

UAT dilakukan setelah MVP stabil.

Perwakilan:

```text
Admin
Library Staff
Teacher
Education Staff
Student MTs
Student MA
```

Skenario utama:

### Student

```text
Login
→ Search Book
→ Open Book
→ Read
→ Bookmark
→ Continue Reading
```

### Teacher

```text
Login
→ Search Book
→ Create Reading List
→ Select Class
→ Publish
→ Check Activity
```

### Library Staff

```text
Login
→ Add Book
→ Upload Ebook
→ Configure Access
→ Publish
→ Verify Access
```

### Admin

```text
Login
→ Manage User
→ Manage Class
→ View Statistics
→ Export Report
→ View Activity Log
```

---

# 35. Bug Severity

Gunakan:

| Severity | Arti                                  |
| -------- | ------------------------------------- |
| Critical | Sistem/security sangat terganggu      |
| High     | Fitur utama tidak dapat digunakan     |
| Medium   | Fitur terganggu tetapi ada workaround |
| Low      | Gangguan kecil/UI                     |

Contoh:

```text
Critical
User dapat mengakses ebook yang seharusnya restricted.

High
User tidak dapat login.

Medium
Filter kategori tidak bekerja.

Low
Spacing button sedikit tidak konsisten.
```

---

# 36. Bug Report Format

Gunakan:

```text
BUG ID:
BUG-XXX

Title:
...

Severity:
Critical / High / Medium / Low

Environment:
Development / Testing / Production

Role:
...

Steps:
1.
2.
3.

Expected:
...

Actual:
...

Screenshot/Log:
...

Related Feature:
...
```

---

# 37. Test Case Status

Gunakan:

```text
PASS
FAIL
BLOCKED
NOT TESTED
```

Jangan menyatakan feature:

> "Sudah aman"

hanya karena test belum dilakukan.

---

# 38. Definition of Tested

Feature dianggap tested jika:

```text
Functional Test       ✓
Validation Test       ✓
Authorization Test    ✓
Error Test            ✓
Responsive Test       ✓
Regression Test       ✓
```

Untuk feature yang relevan, tambahkan:

```text
Security Test         ✓
Performance Test      ✓
```

---

# 39. Traceability

Setiap requirement penting harus dapat ditelusuri:

```text
Requirement
    ↓
Use Case
    ↓
API
    ↓
UI
    ↓
Test Case
```

Contoh:

```text
Requirement:
User dapat download buku jika memiliki permission.

Use Case:
G03 Download Book

API:
GET /books/:id/download

UI:
Download Button

Test:
TC-ACCESS-DOWNLOAD-001
```

---

# 40. Minimum MVP Test Coverage

Sebelum MVP dinyatakan siap UAT, minimal seluruh area berikut sudah diuji:

```text
Authentication              ✓
Authorization              ✓
User Management            ✓
Class Management            ✓
Book Management             ✓
Book Access                 ✓
Ebook Upload                ✓
Catalog                     ✓
Search                      ✓
Reader                      ✓
Progress                    ✓
Bookmark                    ✓
Highlight                   ✓
Notes                       ✓
History                     ✓
Teacher Reading List        ✓
Recommendation              ✓
Notification                ✓
Statistics                  ✓
Report Export               ✓
Activity Log                ✓
Responsive                  ✓
Security                    ✓
Regression                  ✓
```

---

# 41. Testing Rule untuk AI Coding

AI Coding Assistant wajib:

1. Tidak menyatakan feature selesai hanya karena build berhasil.
2. Menjalankan test yang relevan.
3. Menguji positive dan negative case.
4. Menguji authorization.
5. Menguji ownership jika feature menggunakan data personal.
6. Menguji responsive untuk UI.
7. Melaporkan test yang gagal.
8. Tidak menyembunyikan error.
9. Tidak menghapus test hanya agar build/pass.
10. Menambahkan test ketika membuat business logic baru.

---

# 42. Test Report

Setiap sprint dapat menghasilkan:

```text
Sprint:
Feature:

Tests:
Total:
Passed:
Failed:
Blocked:

Critical Bugs:
...

High Bugs:
...

Status:
READY / NOT READY
```

Contoh:

```text
Sprint 1 — Authentication

Total Tests: 12
Passed: 12
Failed: 0
Blocked: 0

Status:
READY
```

---

# 43. Final MVP Exit Criteria

MVP dapat masuk UAT apabila:

```text
Build berhasil
        +
Critical bug = 0
        +
High bug = 0
        +
Core test PASS
        +
Authorization PASS
        +
Security baseline PASS
        +
Responsive PASS
        +
Smoke test PASS
        +
Regression PASS
```

Setelah itu:

```text
Internal Testing
      ↓
UAT Madrasah
      ↓
Perbaikan
      ↓
UAT Sign-off
      ↓
Deployment
```

---

# 44. Status Dokumen

```text
11 Test Plan
Status: BASELINE

Functional Testing:       Defined
Authentication Testing:   Defined
Authorization Testing:   Defined
Security Testing:        Defined
API Testing:             Defined
UI Testing:              Defined
Reader Testing:          Defined
File Testing:            Defined
Performance Testing:     Defined
Regression Testing:      Defined
UAT:                     Defined
MVP Exit Criteria:       Defined
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
11 Test Plan             ✅
12 Development Sprint    ⏭️
```

**Dokumen ini menjadi dasar pengujian selama development, sebelum UAT, dan sebelum deployment production.**
