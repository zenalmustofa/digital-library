# UI/UX SPECIFICATION

## Digital Library — Madrasah Hasan Muchyi Kapurejo

**Versi:** 1.0
**Status:** Draft Baseline
**Platform:** Responsive Web Application
**Target:** MTs, MA, Guru, Tenaga Kependidikan, Pengelola Perpustakaan, Admin

---

# 1. Tujuan UI/UX

UI/UX sistem harus:

1. Mudah digunakan oleh siswa maupun tenaga madrasah.
2. Mengutamakan akses buku dan aktivitas membaca.
3. Responsive pada smartphone, tablet, dan desktop.
4. Memiliki navigasi yang konsisten.
5. Menampilkan fitur berdasarkan role pengguna.
6. Tidak menampilkan fitur yang tidak memiliki izin.
7. Memberikan feedback yang jelas ketika proses berhasil, gagal, atau ditolak.
8. Mendukung penggunaan dengan koneksi internet yang relatif stabil.
9. Tetap sederhana sehingga pengguna tidak perlu memahami sistem teknis.

---

# 2. Prinsip Desain

## 2.1 Simple

Antarmuka tidak boleh terlalu kompleks.

Prioritas utama pengguna siswa:

```text
Cari Buku
    ↓
Lihat Detail
    ↓
Baca
    ↓
Lanjutkan Membaca
```

---

## 2.2 Mobile First

Karena smartphone wajib tersedia bagi pengguna, desain dimulai dari ukuran layar kecil kemudian dikembangkan ke tablet dan desktop.

Prioritas:

```text
Mobile
   ↓
Tablet
   ↓
Desktop
```

---

## 2.3 Role-Based Interface

Setiap pengguna hanya melihat menu yang relevan dengan role-nya.

Contoh:

```text
STUDENT
├── Dashboard
├── Katalog
├── Riwayat
├── Bookmark
├── Notifikasi
└── Profil

LIBRARY_STAFF
├── Dashboard
├── Buku
├── Kategori
├── Penulis
├── Penerbit
├── Aturan Akses
├── Statistik
└── Profil
```

Menu bukan satu-satunya mekanisme keamanan. Backend tetap wajib melakukan authorization.

---

# 3. Information Architecture

Struktur utama aplikasi:

```text
Digital Library
│
├── Authentication
│   ├── Login
│   └── Logout
│
├── Dashboard
│
├── Catalog
│   ├── All Books
│   ├── Search
│   ├── Filter
│   └── Book Detail
│
├── Reader
│   ├── Read
│   ├── Bookmark
│   ├── Highlight
│   ├── Notes
│   └── Progress
│
├── Personal
│   ├── Reading History
│   ├── Bookmarks
│   └── Profile
│
├── Teacher
│   ├── Reading Lists
│   ├── Recommendations
│   └── Student Activity
│
├── Library Management
│   ├── Books
│   ├── Categories
│   ├── Authors
│   ├── Publishers
│   └── Access Rules
│
├── User Management
│   ├── Users
│   ├── Classes
│   └── Levels
│
├── Notification
│
├── Statistics
│
└── Activity Logs
```

---

# 4. Navigasi Utama

## 4.1 Mobile

Gunakan kombinasi:

```text
Top Bar
    ↓
Content
    ↓
Bottom Navigation
```

Bottom navigation maksimal sekitar 4–5 menu utama.

Contoh siswa:

```text
[Home] [Katalog] [Riwayat] [Notifikasi] [Profil]
```

Menu tambahan dapat berada pada menu drawer.

---

## 4.2 Desktop

Gunakan:

```text
┌──────────────────────────────────────────────┐
│ Logo          Search             Notification│
├──────────────┬───────────────────────────────┤
│ Dashboard    │                               │
│ Katalog      │           CONTENT             │
│ Riwayat      │                               │
│ Bookmark     │                               │
│ ...          │                               │
└──────────────┴───────────────────────────────┘
```

Sidebar dapat digunakan untuk role pengelola/admin karena memiliki lebih banyak menu.

---

# 5. Halaman Authentication

## 5.1 Login

Komponen:

* Logo madrasah
* Nama aplikasi
* Input Nama Lengkap
* Input NISN/password
* Tombol Login
* Pesan error

Flow:

```text
Input Nama Lengkap
        ↓
Input NISN
        ↓
Login
        ↓
Validasi
        ↓
Dashboard sesuai role
```

Error harus jelas, tetapi tidak membocorkan informasi sensitif.

Contoh:

> Nama pengguna atau kredensial tidak valid.

---

# 6. Dashboard Student

Dashboard siswa berfokus pada aktivitas membaca.

Komponen:

```text
Selamat datang, [Nama]

[Lanjutkan Membaca]

[Buku Terakhir Dibaca]

[Buku Populer]

[Rekomendasi]

[Aktivitas Membaca]
```

Informasi yang dapat ditampilkan:

* Buku terakhir dibaca
* Progress membaca
* Buku populer
* Rekomendasi
* Riwayat singkat
* Notifikasi terbaru

Contoh kartu buku:

```text
┌─────────────────────┐
│     Cover Buku      │
│                     │
│ Judul Buku          │
│ Penulis             │
│ Progress: 65%       │
│ [Lanjutkan]         │
└─────────────────────┘
```

---

# 7. Dashboard Teacher

Dashboard guru menampilkan:

* Buku yang sedang dibaca
* Reading list
* Rekomendasi
* Aktivitas siswa dalam scope kelas
* Buku yang dibagikan
* Notifikasi

Contoh:

```text
Reading List Saya
[Matematika Kelas VII]

Aktivitas Siswa
- 25 siswa membaca
- 18 siswa menyelesaikan buku

Rekomendasi
[Buku A] [Buku B]
```

Data aktivitas siswa hanya boleh menampilkan siswa yang berada dalam scope guru tersebut.

---

# 8. Dashboard Library Staff

Dashboard pengelola perpustakaan berisi:

```text
Total Buku
Total Pengguna
Aktivitas Membaca
Buku Populer
Buku Terbaru
```

Quick actions:

```text
[Tambah Buku]
[Kelola Buku]
[Aturan Akses]
[Lihat Statistik]
```

---

# 9. Dashboard Admin

Dashboard admin berisi ringkasan sistem:

* Total pengguna
* Total siswa
* Total guru
* Total buku
* Total kelas
* Aktivitas membaca
* Statistik level
* Statistik kelas
* Buku populer
* Aktivitas sistem

Admin juga dapat mengakses:

* User management
* Class management
* Book management
* Notification
* Statistics
* Activity logs

---

# 10. Dashboard Education Staff

Dashboard tenaga kependidikan menggunakan interface yang lebih sederhana.

Menu utama:

```text
Dashboard
Katalog
Riwayat
Bookmark
Notifikasi
Profil
```

Hak akses buku mengikuti aturan akses yang berlaku.

---

# 11. Catalog Page

Halaman katalog merupakan halaman utama pencarian buku.

Komponen:

```text
Search Bar

Filter:
- Kategori
- Level
- Kelas
- Penulis
- Penerbit

Sort:
- Terbaru
- Judul
- Populer
```

Tampilan buku menggunakan card/grid pada desktop dan mobile.

Contoh:

```text
┌──────────┐
│  COVER   │
├──────────┤
│ Judul    │
│ Penulis  │
│ Kategori │
│ [Detail] │
└──────────┘
```

---

# 12. Search

Search harus tersedia dengan mudah.

Contoh:

```text
[ 🔍 Cari judul, penulis, atau kata kunci... ]
```

Hasil pencarian menampilkan:

* Cover
* Judul
* Penulis
* Kategori
* Level
* Status akses

Jika tidak ada hasil:

> Buku yang Anda cari belum ditemukan.

---

# 13. Book Detail

Halaman detail buku:

```text
┌──────────────┬────────────────────────────┐
│              │ Judul Buku                 │
│    COVER     │ Penulis                    │
│              │ Penerbit                   │
│              │ Kategori                   │
│              │ Deskripsi                  │
│              │                            │
│              │ [Baca] [Download]          │
└──────────────┴────────────────────────────┘
```

Tombol harus mengikuti permission.

Contoh:

```text
read = true
download = false
share = true
```

Maka:

```text
[Baca] [Bagikan]
```

Tombol Download tidak ditampilkan atau dinonaktifkan sesuai keputusan UX final.

---

# 14. Digital Reader

Reader adalah salah satu bagian utama aplikasi.

Fitur:

* Next page
* Previous page
* Zoom
* Fullscreen
* Table of contents
* Search text
* Bookmark
* Progress
* Highlight
* Notes
* Dark mode

Layout:

```text
┌─────────────────────────────────────────┐
│ ← Back   Judul Buku       ⚙ Fullscreen │
├─────────┬───────────────────────────────┤
│ TOC     │                               │
│         │          BOOK PAGE            │
│ Chapter │                               │
│ 1       │                               │
│ 2       │                               │
├─────────┴───────────────────────────────┤
│       ← Previous     45%     Next →     │
└─────────────────────────────────────────┘
```

Pada smartphone, TOC dan tools dapat menggunakan drawer/bottom sheet.

---

# 15. Reading Progress

Progress membaca ditampilkan dalam bentuk persentase atau progress bar.

Contoh:

```text
Progress Membaca
████████████░░░░ 65%
```

Sistem menyimpan halaman/posisi terakhir sehingga pengguna dapat memilih:

> Lanjutkan dari halaman terakhir.

---

# 16. Bookmark

Pengguna dapat menyimpan halaman tertentu.

Contoh:

```text
Bookmark Saya

Halaman 12
Bab: Pendahuluan
[Open]

Halaman 45
Bab: Materi
[Open]
```

Bookmark merupakan data milik masing-masing user.

---

# 17. Highlight

Pengguna dapat memilih teks dan memberikan highlight.

UI dapat menyediakan:

```text
[Highlight]
[Add Note]
```

Highlight hanya berlaku untuk pengguna yang membuatnya kecuali terdapat fitur berbagi yang memang ditentukan kemudian.

---

# 18. Notes

Pengguna dapat menambahkan catatan pada bagian buku tertentu.

Contoh:

```text
Catatan Saya

Halaman 25
"Materi ini perlu dipelajari kembali."

[Edit] [Delete]
```

User hanya dapat mengubah atau menghapus catatan miliknya sendiri.

---

# 19. Reading History

Halaman:

```text
Riwayat Membaca

Buku                 Progress       Terakhir Dibaca
Matematika VII       75%            Hari ini
Bahasa Indonesia     40%            Kemarin
IPA                   90%            3 hari lalu
```

Filter berdasarkan periode dapat ditambahkan jika diperlukan.

---

# 20. Reading List Teacher

Guru dapat membuat reading list.

Flow:

```text
Create Reading List
        ↓
Nama Reading List
        ↓
Tambah Buku
        ↓
Pilih Target Kelas
        ↓
Simpan
        ↓
Publish
```

Contoh:

```text
Reading List:
"Materi Persiapan Ujian"

Target:
MA IPS 1
MA IPS 2

Books:
- Buku A
- Buku B
- Buku C

[Publish]
```

---

# 21. Recommendations

Guru dapat membuat rekomendasi buku.

Informasi:

* Judul
* Buku
* Deskripsi/reason
* Target kelas
* Status publikasi

Rekomendasi tidak boleh memberikan akses terhadap buku yang sebenarnya tidak diizinkan untuk pengguna target.

---

# 22. Notifications

Halaman notifikasi:

```text
Notifikasi

● Reading list baru dari Guru
  10 menit lalu

● Pengumuman perpustakaan
  Kemarin

○ Buku baru tersedia
  2 hari lalu
```

Status:

```text
Unread
Read
```

MVP menggunakan in-app notification.

Push notification ditempatkan sebagai fitur Phase 2.

---

# 23. Profile

Profile menampilkan:

* Nama lengkap
* Role
* NISN/identitas sesuai kebutuhan
* Level
* Kelas
* Informasi akun

Pengguna dapat mengubah data yang memang diperbolehkan.

Data akademik yang dikelola admin tidak boleh diubah sembarangan oleh user.

---

# 24. User Management

Untuk Admin:

```text
Users

[Search]

Filter:
- Role
- Level
- Kelas
- Status

Table:
Nama | Role | Kelas | Status | Action
```

Action:

```text
View
Edit
Activate
Deactivate
```

Import pengguna:

```text
[Import Excel]
        ↓
Upload
        ↓
Preview
        ↓
Validate
        ↓
Import
        ↓
Result
```

Hasil import harus menunjukkan:

```text
Berhasil: 480
Gagal: 5
```

Kesalahan harus dijelaskan per baris.

---

# 25. Class Management

Admin dapat:

* Menambah kelas
* Mengubah kelas
* Menonaktifkan kelas
* Melihat level
* Mengatur struktur akademik

Jangan hard-code:

```text
VII A
VII B
IPS 1
IPS 2
```

Struktur tersebut harus berasal dari database.

---

# 26. Book Management

Library Staff/Admin dapat melihat:

```text
Books

[+ Tambah Buku]

Search
Filter
Status
```

Kolom:

```text
Cover
Judul
Penulis
Kategori
Status
Published
Action
```

Status buku:

```text
Draft
Published
Archived
```

---

# 27. Add/Edit Book

Form:

```text
Judul
Deskripsi
ISBN
Penulis
Penerbit
Kategori
Tahun Terbit
Level
File Ebook
```

Setelah upload:

```text
Upload
   ↓
Validasi
   ↓
Metadata
   ↓
Access Rules
   ↓
Review
   ↓
Publish
```

---

# 28. Access Rules UI

Access control harus dapat mengatur secara terpisah:

```text
Read
Download
Share
```

Contoh:

```text
Buku: Matematika VII

Target:
○ Semua pengguna
○ Role
○ Level
○ Kelas
○ User tertentu

Permission:
☑ Read
☐ Download
☑ Share
```

Aturan dapat memiliki prioritas/konflik resolution yang ditentukan pada spesifikasi backend.

Default sistem:

> Akses digital tidak memiliki batas waktu kecuali aturan buku menentukan sebaliknya.

---

# 29. Statistics Dashboard

Statistik dapat menampilkan:

* Total pengguna
* Total buku
* Buku paling banyak dibaca
* Jumlah akses
* Aktivitas membaca
* Pengguna aktif
* Statistik kelas
* Statistik level
* Statistik periode

Contoh:

```text
Reading Activity

Hari ini       125
Minggu ini     840
Bulan ini     3.420
```

Filter:

```text
Periode
Level
Kelas
Role
```

---

# 30. Report Export

Admin/role yang memiliki permission dapat:

```text
[Export Excel]
[Export PDF]
```

Report dapat mencakup:

* Reading activity
* Statistik kelas
* Statistik level
* Popular books
* User activity

Export harus dilakukan oleh backend.

---

# 31. Activity Logs

Admin dapat melihat:

```text
Waktu
User
Action
Resource
Status
IP/Metadata sesuai kebijakan
```

Contoh:

```text
17-09-2026 08:30
Admin
Publish Book
Matematika VII
Success
```

Log tidak boleh menampilkan password, token, atau secret.

---

# 32. Common Components

Komponen UI yang sebaiknya reusable:

```text
Button
Input
Select
SearchBar
Modal
Dialog
Drawer
Dropdown
Card
BookCard
Table
Pagination
Badge
Toast
Alert
Tabs
ProgressBar
Skeleton
EmptyState
ErrorState
LoadingState
ConfirmDialog
FileUploader
```

Komponen harus digunakan kembali daripada membuat komponen berbeda untuk fungsi yang sama.

---

# 33. UI State

Setiap halaman yang mengambil data dari API minimal memiliki:

## Loading

```text
Skeleton / Loading indicator
```

## Empty

```text
Belum ada data.
```

## Error

```text
Data gagal dimuat.
[Coba Lagi]
```

## Success

Berikan feedback setelah operasi berhasil.

Contoh:

> Buku berhasil ditambahkan.

## Permission Denied

```text
Anda tidak memiliki izin untuk mengakses halaman ini.
```

HTTP 403 dari backend harus diterjemahkan menjadi UX yang jelas.

---

# 34. Responsive Behavior

## Mobile

* Single column
* Bottom navigation
* Sidebar menjadi drawer
* Table dapat menjadi card/list
* Filter menggunakan drawer/bottom sheet
* Reader menggunakan fullscreen
* Tombol utama mudah dijangkau

## Tablet

* Grid 2–3 kolom
* Sidebar dapat menjadi collapsible

## Desktop

* Sidebar
* Multi-column layout
* Data table
* Dashboard cards
* Reader dengan area konten lebih luas

---

# 35. Accessibility

UI harus memperhatikan:

* Kontras teks yang cukup
* Ukuran font terbaca
* Label pada input
* Keyboard navigation
* Focus state
* Alt text pada gambar penting
* Jangan hanya menggunakan warna untuk menunjukkan status
* Tombol memiliki label yang jelas
* Error message mudah dipahami

Target implementasi dapat mengacu pada prinsip WCAG.

---

# 36. Design System

Identitas visual dapat menggunakan karakter madrasah:

```text
Primary:
Hijau

Secondary:
Putih

Neutral:
Abu-abu / hitam untuk teks
```

Arah visual:

* Bersih
* Modern
* Edukatif
* Islami secara elegan
* Tidak terlalu ramai
* Fokus pada konten buku

Warna final, typography, spacing, dan component tokens ditentukan pada tahap implementasi UI design system.

---

# 37. UX Security

UI tidak boleh menjadi sumber keputusan authorization.

Contoh:

```text
Frontend:
Download button tidak ditampilkan
```

tetapi backend tetap harus memeriksa:

```text
User
  ↓
Role Permission
  ↓
Book Access Rule
  ↓
Download Permission
```

Jika user mencoba memanggil API secara langsung:

```text
GET /books/:id/download
```

backend tetap wajib menolak apabila tidak memiliki izin.

---

# 38. API Mapping

UI utama dipetakan ke API:

| UI               | API                                           |
| ---------------- | --------------------------------------------- |
| Login            | `POST /auth/login`                            |
| Dashboard        | `/statistics/*`, `/books`, `/reading-history` |
| Catalog          | `GET /books`                                  |
| Book Detail      | `GET /books/:id`                              |
| Reader           | `GET /books/:id/read`                         |
| Progress         | `GET/PUT /books/:id/progress`                 |
| Bookmark         | `/books/:id/bookmarks`                        |
| Highlight        | `/books/:id/highlights`                       |
| Notes            | `/books/:id/notes`                            |
| History          | `GET /reading-history`                        |
| Reading List     | `/reading-lists`                              |
| Recommendation   | `/recommendations`                            |
| Notification     | `/notifications`                              |
| Users            | `/users`                                      |
| Classes          | `/classes`                                    |
| Books Management | `/books`                                      |
| Access Rules     | `/books/:id/access-rules`                     |
| Statistics       | `/statistics/*`                               |
| Reports          | `/reports/*`                                  |
| Activity Logs    | `/activity-logs`                              |

API contract harus mengikuti `08-api-specification.md`.

---

# 39. Global UX Rules

1. Jangan menampilkan fitur yang tidak relevan dengan role.
2. Jangan menganggap UI sebagai security layer.
3. Semua authorization dilakukan backend.
4. Jangan hard-code kelas.
5. Jangan hard-code daftar buku.
6. Jangan membuat fitur baru tanpa requirement.
7. Jangan mengubah API contract tanpa persetujuan.
8. Semua operasi penting harus memberikan feedback.
9. Destructive action harus menggunakan confirmation dialog.
10. Error API harus ditampilkan dengan bahasa yang mudah dipahami.
11. Loading state wajib tersedia untuk operasi asynchronous.
12. Mobile experience harus menjadi prioritas.
13. Ebook tidak boleh memiliki public direct URL.
14. Download hanya tersedia apabila permission download diberikan.
15. Share hanya tersedia apabila permission share diberikan.
16. Digital access tidak memiliki batas waktu secara default.

---

# 40. Acceptance Criteria

UI/UX dianggap memenuhi spesifikasi apabila:

### AC-01

Semua role mendapatkan navigasi yang sesuai dengan permission.

### AC-02

Pengguna dapat menemukan buku melalui katalog dan pencarian.

### AC-03

Detail buku menampilkan informasi dan action sesuai permission.

### AC-04

Reader menyediakan fitur utama yang telah ditentukan.

### AC-05

Progress membaca tersimpan.

### AC-06

Bookmark, highlight, dan notes tersimpan berdasarkan user.

### AC-07

Guru dapat membuat reading list dan menentukan target kelas sesuai scope.

### AC-08

Admin/Library Staff dapat mengelola buku sesuai permission.

### AC-09

Access rule dapat membedakan read, download, dan share.

### AC-10

Dashboard menampilkan data yang sesuai role.

### AC-11

UI berjalan dengan baik pada smartphone.

### AC-12

Loading, empty, error, success, dan permission-denied state tersedia.

### AC-13

UI tidak menjadi satu-satunya mekanisme keamanan.

### AC-14

Tidak ada ebook yang dapat diakses melalui public direct URL.

---

# 41. Batasan UI/UX MVP

Fitur berikut belum menjadi bagian MVP utama:

```text
PWA
Offline Reading
Push Notification
QR Code
AI Recommendation
AI Assistant
Native Android/iOS
```

Fitur tersebut dapat dirancang kemudian sebagai Phase 2.

---

# 42. Aturan untuk AI/Vibe Coder

AI yang mengimplementasikan UI wajib:

1. Membaca `02-prd.md`.
2. Membaca `03-roles-permissions.md`.
3. Membaca `04-use-cases.md`.
4. Membaca `05-user-flows.md`.
5. Membaca `06-database.md`.
6. Membaca `07-architecture.md`.
7. Membaca `08-api-specification.md`.
8. Membaca dokumen UI/UX ini.
9. Tidak membuat fitur di luar requirement.
10. Tidak mengubah struktur API tanpa approval.
11. Tidak mengubah business rule tanpa approval.
12. Tidak hard-code role, level, atau kelas.
13. Tidak menaruh authorization hanya di frontend.
14. Membuat reusable components.
15. Mengutamakan responsive design.
16. Menyediakan loading/error/empty state.
17. Menggunakan dummy/mock data hanya untuk tahap UI dan harus mudah diganti dengan API.
18. Tidak menganggap mock data sebagai database final.
19. Setiap halaman harus memiliki route yang jelas.
20. Setiap perubahan besar harus dilakukan secara bertahap dan dapat diuji.

---

# 43. Status Dokumen

```text
09 UI/UX Specification
Status: BASELINE

Requirements:        Defined
Navigation:          Defined
Page Structure:      Defined
Responsive Rules:    Defined
Reader UX:           Defined
Role-based UI:       Defined
Access UI:           Defined
Security UX:         Defined
API Mapping:         Defined
Design Tokens:       Partially Defined
Final Visual Design: Pending
```

---

# 44. Posisi dalam Development Workflow

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
10 AI Coding Rules       ⏭️
11 Test Plan             ⏭️
12 Development Sprint    ⏭️
```

**Dokumen ini menjadi baseline UI/UX sebelum implementasi frontend dimulai.**
