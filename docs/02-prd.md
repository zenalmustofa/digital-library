# PRODUCT REQUIREMENTS DOCUMENT (PRD)

## SISTEM PERPUSTAKAAN DIGITAL

### MADRASAH HASAN MUCHYI KAPUREJO

**Versi:** 1.0
**Status:** Draft Final Requirement
**Tanggal:** 2 September 2026
**Target Pengguna:** Seluruh Civitas Akademik Madrasah
**Jenjang:** MTs – MA

---

# 1. INFORMASI PRODUK

| Item              | Detail                                                     |
| ----------------- | ---------------------------------------------------------- |
| Nama Produk       | Sistem Perpustakaan Digital Madrasah Hasan Muchyi Kapurejo |
| Jenis Sistem      | Web-Based Digital Library                                  |
| Institusi         | Madrasah Hasan Muchyi Kapurejo                             |
| Jenjang           | MTs dan MA                                                 |
| Target Pengguna   | Siswa, Guru, Staff, Petugas Perpustakaan, Admin            |
| Estimasi Pengguna | ±500–600 pengguna                                          |
| Platform          | Web Responsive                                             |
| Perangkat         | Desktop, Laptop, Tablet, Smartphone                        |
| Status            | Development                                                |

---

# 2. LATAR BELAKANG

Madrasah Hasan Muchyi Kapurejo membutuhkan sistem perpustakaan digital yang dapat memudahkan civitas akademik dalam mengakses koleksi buku secara digital.

Perpustakaan digital diharapkan tidak hanya berfungsi sebagai tempat penyimpanan file ebook, tetapi menjadi sebuah platform yang menyediakan katalog buku, pencarian, pembacaan digital, pengelolaan koleksi, pengaturan hak akses, monitoring aktivitas membaca, serta statistik perpustakaan.

Sistem juga perlu mendukung pengembangan koleksi digital secara bertahap. Pada tahap awal, koleksi dapat berasal dari sumber yang legal seperti buku yang dapat digunakan secara publik, koleksi Kemendikbud yang memiliki hak penggunaan sesuai ketentuan, serta sumber atau penerbit yang memberikan lisensi penggunaan.

---

# 3. PERMASALAHAN

Sistem harus membantu menyelesaikan beberapa permasalahan berikut:

1. Belum tersedianya platform perpustakaan digital terpusat.
2. Akses terhadap buku digital belum terorganisir.
3. Belum terdapat katalog buku digital yang mudah dicari.
4. Belum terdapat sistem pengelolaan hak akses terhadap ebook.
5. Belum tersedia pencatatan aktivitas membaca pengguna.
6. Belum tersedia statistik penggunaan perpustakaan digital.
7. Guru belum memiliki fasilitas khusus untuk membuat daftar bacaan atau referensi bagi siswa.
8. Koleksi digital akan berkembang dari berbagai sumber sehingga membutuhkan sistem pengelolaan konten yang fleksibel.

---

# 4. TUJUAN PRODUK

## 4.1 Tujuan Utama

Membangun sistem perpustakaan digital yang mudah digunakan, aman, terstruktur, dan dapat diakses oleh seluruh civitas akademik Madrasah Hasan Muchyi Kapurejo.

## 4.2 Tujuan Khusus

Sistem diharapkan mampu:

1. Menyediakan katalog buku digital.
2. Memudahkan pengguna menemukan buku.
3. Memungkinkan pengguna membaca ebook melalui sistem.
4. Menyimpan progres membaca pengguna.
5. Menyediakan bookmark, highlight, dan catatan.
6. Mengatur hak akses berdasarkan pengguna dan jenis buku.
7. Membantu guru menyediakan referensi bacaan.
8. Menyediakan dashboard dan statistik perpustakaan.
9. Mendukung pengelolaan pengguna dan koleksi.
10. Menjadi fondasi pengembangan fitur digital library lanjutan.

---

# 5. TARGET PENGGUNA

Target pengguna sistem adalah seluruh civitas akademik dengan estimasi ±500–600 pengguna.

Pengguna terdiri dari:

1. Siswa MTs
2. Siswa MA
3. Guru
4. Tenaga kependidikan/staff
5. Petugas perpustakaan
6. Administrator sistem

---

# 6. USER ROLES

## 6.1 Student MTs

Siswa jenjang MTs.

Hak utama:

* Login
* Melihat katalog
* Mencari buku
* Membaca buku yang diizinkan
* Bookmark
* Melihat progres membaca
* Highlight
* Membuat catatan

## 6.2 Student MA

Siswa jenjang MA.

Hak utama sama dengan Student MTs, dengan akses buku yang dapat disesuaikan berdasarkan jenjang/permission.

## 6.3 Teacher

Guru madrasah.

Hak utama:

* Seluruh kemampuan membaca
* Membuat reading list
* Membuat rekomendasi bacaan
* Membagikan referensi kepada kelas
* Melihat aktivitas membaca siswa sesuai batas akses yang ditentukan

## 6.4 Education Staff

Tenaga kependidikan/staff.

Hak akses mengikuti kebutuhan operasional yang ditentukan administrator.

## 6.5 Library Staff

Petugas perpustakaan.

Hak utama:

* Mengelola koleksi
* Mengelola metadata buku
* Mengelola kategori
* Mengelola author/publisher
* Mengatur akses buku
* Melihat statistik
* Mengelola aktivitas perpustakaan

## 6.6 Administrator

Administrator memiliki hak akses tertinggi terhadap sistem.

Hak utama:

* User management
* Role management
* Book management
* Category management
* Class management
* Access management
* Dashboard
* Statistics
* Notification management
* System configuration

Detail permission setiap role akan didefinisikan pada dokumen:

`docs/03-roles-permissions.md`

---

# 7. STRUKTUR AKADEMIK

Sistem harus mendukung struktur kelas yang fleksibel.

## 7.1 Jenjang MTs

Contoh:

```text
MTs
├── VII A
├── VII B
├── VII C
├── VIII A
├── VIII B
├── VIII C
├── IX A
├── IX B
└── IX C
```

Jumlah kelas tidak boleh di-hard-code.

Administrator harus dapat menambahkan, mengubah, atau menonaktifkan kelas.

## 7.2 Jenjang MA

Contoh:

```text
MA
├── IPS 1
├── IPS 2
├── Bahasa 1
├── Bahasa 2
└── dst.
```

Struktur juga harus dapat dikembangkan apabila madrasah menambah jurusan atau kelas.

---

# 8. AUTHENTICATION

## FR-001 — Login

**Aktor:** Semua pengguna

Sistem menyediakan mekanisme login menggunakan:

* Nama Lengkap
* NISN

### Input

```text
Nama Lengkap
NISN
```

### Proses

1. Pengguna membuka halaman login.
2. Pengguna memasukkan nama lengkap.
3. Pengguna memasukkan NISN.
4. Sistem melakukan validasi.
5. Jika valid, pengguna masuk ke sistem.
6. Sistem menentukan role pengguna.
7. Pengguna diarahkan ke dashboard sesuai role.

### Business Rules

* NISN harus unik untuk siswa.
* Akun yang tidak aktif tidak dapat login.
* Password/credential tidak boleh disimpan dalam bentuk plaintext.
* Detail mekanisme credential internal ditentukan pada tahap desain teknis.

### Acceptance Criteria

* Pengguna valid dapat login.
* Pengguna invalid ditolak.
* Akun nonaktif tidak dapat login.
* Role pengguna dikenali sistem.
* Pengguna diarahkan ke halaman sesuai hak akses.

---

# 9. USER MANAGEMENT

## FR-002 — Manajemen Pengguna

**Aktor:** Admin

Admin dapat:

* Melihat pengguna.
* Menambahkan pengguna.
* Mengubah data pengguna.
* Mengaktifkan/nonaktifkan pengguna.
* Mengatur role.
* Mengatur jenjang.
* Mengatur kelas.
* Melakukan pencarian/filter.
* Import data pengguna.

### Data minimal pengguna

```text
Nama Lengkap
NISN / Identifier
Role
Jenjang
Kelas
Status Akun
```

Sistem sebaiknya mendukung import data melalui Excel/CSV karena data siswa dan guru telah tersedia secara digital.

---

# 10. BOOK MANAGEMENT

## FR-003 — Manajemen Buku

**Aktor:** Admin, Library Staff

Petugas dapat mengelola koleksi ebook.

Metadata buku minimal:

```text
Judul
Cover
Deskripsi
Author
Publisher
Tahun Terbit
ISBN
Kategori
Jenjang
Bahasa
Jenis Buku
File Ebook
Status
```

Jenis buku dapat mencakup:

* Buku pelajaran
* Buku referensi
* Buku umum
* Buku internal
* Buku berlisensi
* Buku lainnya

---

# 11. BOOK SOURCE & CONTENT RIGHTS

## FR-004 — Informasi Sumber Buku

Setiap ebook harus memiliki informasi mengenai sumber dan status penggunaannya.

Contoh sumber:

```text
Kemendikbud
Publisher
Public Domain
Internal Madrasah
Licensed Content
Other Legal Source
```

Sistem harus menyediakan metadata:

```text
Source
License Type
License Status
License Expiry (jika ada)
Usage Restriction
```

### Business Rule

Developer dapat membantu mencari dan menyediakan opsi sumber ebook yang legal.

Namun:

> Pengadaan atau pembelian lisensi konten dari penerbit merupakan hal yang berbeda dari pengembangan sistem.

Apabila ebook membutuhkan lisensi berbayar, pembelian lisensi harus mendapat persetujuan dari pihak madrasah.

Sistem tidak boleh digunakan untuk mendistribusikan ebook yang tidak memiliki hak penggunaan yang sesuai.

---

# 12. BOOK CATALOG

## FR-005 — Katalog Buku

**Aktor:** Semua pengguna

Sistem menyediakan halaman katalog yang menampilkan koleksi buku.

Informasi yang ditampilkan:

* Cover
* Judul
* Author
* Kategori
* Jenjang
* Tahun
* Status akses

Pengguna dapat:

* Membuka detail buku.
* Membaca buku jika memiliki akses.
* Melihat informasi buku.

---

# 13. SEARCH & FILTER

## FR-006 — Pencarian Buku

Pengguna dapat mencari buku berdasarkan keyword.

Pencarian dapat mencakup:

* Judul
* Author
* Publisher
* ISBN
* Kategori

Filter dapat mencakup:

* Jenjang
* Kategori
* Tahun
* Author
* Publisher
* Jenis buku

---

# 14. DIGITAL READER

## FR-007 — Digital Book Reader

**Aktor:** Pengguna dengan hak akses

Sistem menyediakan reader untuk membaca ebook secara digital.

Reader minimal mendukung:

* Next page
* Previous page
* Zoom
* Fullscreen
* Table of Contents
* Text search
* Bookmark
* Last page
* Reading progress
* Highlight
* Notes
* Dark mode

---

# 15. DIGITAL ACCESS

## FR-008 — Akses Buku

Sistem menggunakan konsep **Digital Access**, bukan peminjaman dengan batas waktu.

Pengguna yang memiliki hak akses terhadap sebuah buku dapat membacanya tanpa batas waktu.

Contoh:

```text
Login
 ↓
Pilih Buku
 ↓
Cek Permission
 ↓
Akses Diberikan
 ↓
Baca
```

Tidak diperlukan sistem:

```text
Pinjam → 7 hari → Expired
```

kecuali kebutuhan tersebut ditambahkan di masa depan.

---

# 16. BOOK ACCESS CONTROL

## FR-009 — Hak Akses Buku

Setiap buku dapat memiliki aturan akses.

Permission minimal:

```text
can_read
can_download
can_share
```

Contoh:

| Jenis Buku     |          Read |              Download |                 Share |
| -------------- | ------------: | --------------------: | --------------------: |
| Public/Allowed |             ✅ |   Berdasarkan lisensi |   Berdasarkan lisensi |
| Licensed       |             ✅ |   Berdasarkan lisensi |   Berdasarkan lisensi |
| Internal       |             ✅ | Berdasarkan kebijakan | Berdasarkan kebijakan |
| Restricted     | Role tertentu |            ❌/terbatas |                     ❌ |

Hak akses dapat berdasarkan:

* Role
* Jenjang
* Kelas
* User tertentu

### Critical Security Rule

File ebook tidak boleh diekspos langsung melalui URL publik.

Akses file harus melewati proses authorization di server.

---

# 17. READING PROGRESS

## FR-010 — Reading Progress

Sistem menyimpan progres membaca setiap pengguna.

Data minimal:

```text
User
Book
Last Page
Progress Percentage
Last Read At
```

Contoh:

```text
Matematika VIII
Progress: 65%
Halaman terakhir: 132
```

Saat pengguna membuka kembali buku, sistem dapat mengarahkan pengguna ke halaman terakhir.

---

# 18. BOOKMARK

## FR-011 — Bookmark

Pengguna dapat menyimpan halaman tertentu sebagai bookmark.

Fungsi:

* Add bookmark
* Remove bookmark
* Melihat daftar bookmark
* Membuka kembali halaman bookmark

---

# 19. HIGHLIGHT & NOTES

## FR-012 — Highlight

Pengguna dapat menandai bagian tertentu dari buku.

## FR-013 — Notes

Pengguna dapat membuat catatan pribadi pada bagian tertentu dari buku.

Catatan bersifat personal kecuali fitur sharing secara eksplisit ditambahkan.

---

# 20. DOWNLOAD

## FR-014 — Download Ebook

Download tidak otomatis tersedia untuk semua buku.

Hak download ditentukan berdasarkan:

1. Jenis buku.
2. Lisensi.
3. Kebijakan madrasah.
4. Access permission.

Contoh:

```text
can_download = true
```

atau

```text
can_download = false
```

---

# 21. SHARE

## FR-015 — Share Buku

Fitur sharing mengikuti kebijakan hak cipta dan permission buku.

Sistem tidak boleh memberikan fasilitas yang memungkinkan pengguna menyebarkan ebook berlisensi secara tidak sah.

Sharing dapat berupa:

* Share link buku di dalam sistem.
* Share informasi/metadata buku.
* Share reference kepada kelas.

Detail mekanisme akan ditentukan pada UI/UX dan Security Design.

---

# 22. TEACHER READING LIST

## FR-016 — Reading List

**Aktor:** Teacher

Guru dapat membuat daftar bacaan.

Contoh:

```text
Reading List:
"Materi Bahasa Indonesia Kelas X"

├── Buku A
├── Buku B
└── Buku C
```

Guru dapat:

* Membuat reading list.
* Menambahkan buku.
* Menghapus buku.
* Memberikan judul/deskripsi.
* Menentukan kelas tujuan.
* Membagikan reading list.

---

# 23. TEACHER RECOMMENDATION

## FR-017 — Rekomendasi Bacaan

Guru dapat merekomendasikan buku kepada siswa/kelas.

Contoh:

```text
Guru
 ↓
Pilih Buku
 ↓
Pilih Kelas
 ↓
Tambahkan pesan
 ↓
Publish
```

Siswa dapat melihat rekomendasi tersebut pada dashboard.

---

# 24. STUDENT READING ACTIVITY

## FR-018 — Monitoring Aktivitas Membaca

Guru dapat melihat aktivitas membaca siswa sesuai hak akses.

Informasi dapat mencakup:

* Buku yang dibaca.
* Progress.
* Waktu aktivitas.
* Aktivitas terakhir.

### Privacy Rule

Guru hanya dapat melihat data siswa yang memang berada dalam ruang lingkup aksesnya.

Admin memiliki akses lebih luas sesuai permission.

---

# 25. NOTIFICATION

## FR-019 — Notification

Sistem menyediakan notifikasi internal.

Jenis notifikasi:

* Pengumuman perpustakaan.
* Buku baru.
* Reading list dari guru.
* Rekomendasi bacaan.
* Informasi sistem.

### MVP

In-app notification menjadi prioritas.

Push notification/PWA dapat dikembangkan pada Phase 2.

---

# 26. DASHBOARD

## FR-020 — User Dashboard

Dashboard disesuaikan berdasarkan role.

### Student

Informasi dapat mencakup:

* Buku terakhir dibaca.
* Continue Reading.
* Reading Progress.
* Bookmark.
* Rekomendasi guru.
* Reading List.

### Teacher

Dapat mencakup:

* Reading List.
* Rekomendasi.
* Aktivitas membaca siswa.
* Statistik kelas.

### Library Staff/Admin

Dapat mencakup:

* Jumlah pengguna.
* Jumlah buku.
* Buku paling banyak dibaca.
* Aktivitas membaca.
* Pengguna aktif.
* Statistik kelas.

---

# 27. STATISTICS

## FR-021 — Statistik Perpustakaan

Sistem menyediakan statistik:

### User

* Total pengguna.
* Pengguna aktif.
* Pengguna berdasarkan role.
* Pengguna berdasarkan jenjang.
* Pengguna berdasarkan kelas.

### Book

* Total buku.
* Buku berdasarkan kategori.
* Buku berdasarkan jenjang.
* Buku paling banyak dibaca.

### Activity

* Jumlah akses buku.
* Aktivitas membaca.
* Buku paling populer.
* Pengguna paling aktif.

### Period

Statistik dapat difilter berdasarkan periode:

```text
Hari
Minggu
Bulan
Tahun
Custom Range
```

---

# 28. EXPORT REPORT

## FR-022 — Export Data

Admin/Library Staff dapat melakukan export laporan.

Format minimal:

```text
Excel
PDF
```

Data yang dapat diekspor:

* Data pengguna.
* Data buku.
* Statistik.
* Aktivitas membaca.
* Statistik kelas.
* Statistik jenjang.

---

# 29. RESPONSIVE DESIGN

## FR-023 — Responsive Web

Sistem harus dapat digunakan pada:

* Smartphone
* Tablet
* Laptop
* Desktop

Prioritas pengalaman pengguna:

```text
Smartphone
        ↓
Tablet
        ↓
Desktop
```

Karena siswa kemungkinan besar akan mengakses sistem melalui smartphone.

---

# 30. NON-FUNCTIONAL REQUIREMENTS

## NFR-001 — Performance

Sistem harus mampu melayani sekitar:

> ±500–600 pengguna terdaftar.

Target performa perlu memperhatikan bahwa beban terbesar bukan hanya jumlah user, tetapi juga:

* ukuran ebook;
* jumlah pembacaan bersamaan;
* bandwidth;
* storage;
* traffic file ebook.

## NFR-002 — Security

Sistem wajib:

* Menggunakan HTTPS pada production.
* Password/credential tidak disimpan plaintext.
* Menggunakan authorization server-side.
* Menerapkan role-based access control.
* Melindungi file ebook.
* Melakukan validasi input.
* Mencegah akses file tanpa permission.
* Mencatat aktivitas penting.
* Menyediakan backup.

## NFR-003 — Scalability

Arsitektur harus memungkinkan penambahan:

* Jumlah pengguna.
* Jumlah ebook.
* Fitur baru.
* Storage.
* Traffic.

## NFR-004 — Maintainability

Kode harus:

* Terstruktur.
* Modular.
* Mudah dipahami.
* Memiliki dokumentasi.
* Memiliki validasi.
* Memiliki testing untuk fungsi penting.

## NFR-005 — Availability

Sistem production harus memiliki mekanisme backup dan recovery yang memadai.

Detail SLA belum ditentukan.

---

# 31. DATA IMPORT

## FR-024 — Import Data

Karena data siswa/guru telah tersedia secara digital, sistem harus mendukung import data.

Format minimal:

```text
Excel (.xlsx)
CSV
```

Data harus divalidasi sebelum dimasukkan ke database.

Contoh:

```text
Nama
NISN
Role
Jenjang
Kelas
Status
```

---

# 32. ADMINISTRATION

## FR-025 — System Administration

Admin dapat mengelola:

```text
Users
Roles
Classes
Books
Categories
Authors
Publishers
Access Rules
Notifications
Reports
System Settings
```

---

# 33. AUDIT LOG

## FR-026 — Activity Log

Sistem mencatat aktivitas penting.

Contoh:

```text
User login
Book created
Book updated
Book deleted
Permission changed
User created
User disabled
Notification created
```

Data log digunakan untuk monitoring dan keamanan.

---

# 34. BOOK STORAGE

Ebook harus disimpan menggunakan mekanisme storage yang sesuai.

Arsitektur yang direkomendasikan:

```text
Application Server
        │
        ├── Database
        │
        └── Object/File Storage
                  │
                  ├── Ebook
                  └── Cover
```

File ebook tidak disarankan disimpan sebagai file publik yang dapat diakses langsung tanpa authorization.

---

# 35. MVP SCOPE

## MVP — WAJIB

Fitur yang termasuk MVP:

```text
Authentication
User Management
Role & Permission
Class Management
Book Management
Category Management
Author/Publisher
Book Catalog
Search
Filter
Book Detail
Digital Reader
Bookmark
Reading Progress
Highlight
Notes
Digital Access
Book Permission
Teacher Reading List
Teacher Recommendation
Notifications
Dashboard
Statistics
Excel Export
PDF Export
Responsive Web
Security
Audit Log
```

---

# 36. PHASE 2

Fitur berikut tidak menjadi prioritas MVP:

```text
AI Library Assistant
AI Book Summary
AI Quiz Generator
AI Recommendation
Gamification
QR Code
PWA
Offline Reading
Advanced Push Notification
```

Fitur Phase 2 hanya dikembangkan setelah MVP stabil dan mendapat persetujuan.

---

# 37. FUTURE AI FEATURES

Sistem dapat dikembangkan dengan fitur AI seperti:

## AI Library Assistant

Pengguna dapat bertanya mengenai koleksi buku.

Contoh:

> "Buku apa yang cocok untuk belajar sejarah Indonesia?"

AI memberikan rekomendasi berdasarkan koleksi yang tersedia.

## AI Summary

AI membantu membuat ringkasan buku/bagian tertentu dengan tetap memperhatikan hak penggunaan konten.

## AI Quiz

AI dapat menghasilkan soal berdasarkan materi yang tersedia dan memiliki hak penggunaan yang sesuai.

## AI Recommendation

Sistem merekomendasikan buku berdasarkan:

* Jenjang.
* Kelas.
* Kategori.
* Riwayat bacaan.

Fitur-fitur tersebut bukan bagian dari MVP.

---

# 38. BUSINESS RULES UTAMA

## BR-001

Setiap pengguna harus memiliki role.

## BR-002

Setiap pengguna siswa harus memiliki jenjang dan kelas.

## BR-003

NISN harus unik untuk siswa.

## BR-004

Buku harus memiliki metadata minimum sebelum dipublikasikan.

## BR-005

Buku dapat memiliki aturan akses berbeda.

## BR-006

Digital Access tidak memiliki batas waktu secara default.

## BR-007

Download ditentukan berdasarkan permission dan lisensi.

## BR-008

Sharing ebook mengikuti hak penggunaan konten.

## BR-009

File ebook tidak boleh dapat diakses langsung tanpa authorization.

## BR-010

Admin memiliki kontrol tertinggi.

## BR-011

Petugas perpustakaan dapat mengelola koleksi sesuai permission.

## BR-012

Guru hanya dapat melihat aktivitas siswa dalam ruang lingkup yang diizinkan.

## BR-013

Siswa hanya dapat mengakses fitur sesuai role.

## BR-014

Konten ebook harus berasal dari sumber yang legal atau memiliki izin penggunaan yang sesuai.

## BR-015

Fitur baru di luar PRD tidak boleh ditambahkan ke MVP tanpa persetujuan.

---

# 39. ACCEPTANCE CRITERIA MVP

MVP dianggap memenuhi kebutuhan apabila:

### Authentication

* Semua akun valid dapat login.
* Akun invalid ditolak.
* Role diterapkan dengan benar.

### User

* Admin dapat mengelola user.
* Admin dapat mengelola kelas.
* Data dapat di-import.

### Book

* Staff dapat menambahkan buku.
* Metadata dapat dikelola.
* Buku dapat dikategorikan.
* Access rule dapat ditentukan.

### Reader

* Pengguna dapat membaca buku.
* Reader mendukung zoom/fullscreen.
* Search tersedia.
* Bookmark bekerja.
* Progress tersimpan.
* Highlight dan notes bekerja.

### Access Control

* User tanpa permission tidak dapat membaca buku restricted.
* Download mengikuti permission.
* File tidak dapat diakses langsung tanpa authorization.

### Teacher

* Guru dapat membuat reading list.
* Guru dapat membagikan reading list kepada kelas.

### Dashboard

* Statistik ditampilkan.
* Data dapat difilter.
* Laporan dapat diekspor.

### Responsive

* Sistem dapat digunakan pada smartphone.
* Sistem dapat digunakan pada desktop.

### Security

* Authorization diterapkan server-side.
* Credential aman.
* Aktivitas penting tercatat.

---

# 40. OUT OF SCOPE MVP

Hal-hal berikut tidak termasuk MVP kecuali ada persetujuan perubahan scope:

1. Marketplace ebook.
2. Sistem pembayaran ebook.
3. Pengadaan lisensi otomatis.
4. DRM tingkat enterprise.
5. Offline ebook.
6. AI assistant.
7. AI quiz.
8. AI summary.
9. Gamification.
10. PWA.
11. Integrasi sistem akademik eksternal.
12. Mobile application native Android/iOS.

---

# 41. ASUMSI PROYEK

1. Madrasah menyediakan data pengguna yang diperlukan.
2. Madrasah memberikan akses/data yang diperlukan untuk proses import.
3. Developer membantu mencari sumber ebook legal.
4. Lisensi ebook berbayar menjadi biaya terpisah dari development sistem.
5. Madrasah menyetujui penggunaan ebook sesuai ketentuan lisensi.
6. Infrastruktur server/hosting dapat disediakan atau didelegasikan kepada developer.
7. Internet pengguna relatif stabil.
8. Sistem utama berbasis web responsive.

---

# 42. RISIKO

## Risiko 1 — Konten Ebook

Koleksi awal belum tersedia.

**Mitigasi:**

Pengadaan konten dilakukan bertahap dan menggunakan sumber legal.

## Risiko 2 — Lisensi

Sebagian buku mungkin membutuhkan lisensi.

**Mitigasi:**

Setiap buku memiliki informasi license/source dan permission.

## Risiko 3 — Storage

Ukuran ebook dapat menjadi besar.

**Mitigasi:**

Menggunakan storage yang dapat ditingkatkan secara bertahap.

## Risiko 4 — Traffic

Banyak pengguna dapat membaca ebook secara bersamaan.

**Mitigasi:**

Optimasi storage, caching, bandwidth, dan arsitektur delivery file.

## Risiko 5 — Security

Ebook dapat disalahgunakan apabila file URL terbuka.

**Mitigasi:**

Authorization server-side dan protected file delivery.

---

# 43. SUCCESS METRICS

Keberhasilan sistem dapat diukur melalui:

1. Seluruh civitas yang terdaftar dapat mengakses sistem.
2. Pengguna dapat menemukan buku dengan mudah.
3. Pengguna dapat membaca ebook melalui reader.
4. Progress membaca tersimpan.
5. Admin dapat mengelola koleksi.
6. Guru dapat memberikan referensi bacaan.
7. Admin dapat melihat statistik penggunaan.
8. Sistem berjalan baik pada smartphone.
9. Tidak terdapat akses ebook tanpa permission.
10. Sistem dapat digunakan secara stabil oleh ±500–600 pengguna.

---

# 44. PRODUCT PRINCIPLES

Pengembangan sistem harus mengikuti prinsip:

### 1. Simple

Sistem mudah dipahami siswa dan guru.

### 2. Secure

Konten dan data pengguna harus dilindungi.

### 3. Flexible

Kelas, buku, kategori, dan permission dapat berkembang.

### 4. Maintainable

Kode dan struktur sistem mudah dipelihara.

### 5. Scalable

Sistem dapat dikembangkan tanpa membangun ulang dari awal.

### 6. Legal Content

Konten digital harus memiliki hak penggunaan yang sesuai.

### 7. Mobile First

Pengalaman smartphone harus menjadi perhatian utama.

---

# 45. DEVELOPMENT CONSTRAINT

Dokumen ini merupakan **sumber kebenaran utama kebutuhan produk**.

AI/Vibe Coder yang digunakan dalam development harus:

1. Mengikuti PRD.
2. Tidak membuat fitur baru tanpa persetujuan.
3. Tidak mengubah business rule tanpa persetujuan.
4. Tidak mengubah struktur database secara sembarangan.
5. Tidak menghapus fitur yang sudah berjalan tanpa persetujuan.
6. Tidak membuat endpoint yang melewati authorization.
7. Tidak mengekspos file ebook secara publik.
8. Tidak menyimpan credential secara tidak aman.
9. Menulis testing untuk business logic penting.
10. Menjelaskan perubahan arsitektur sebelum implementasi.

---

# 46. DOCUMENT DEPENDENCIES

PRD ini menjadi dasar untuk dokumen berikutnya:

```text
01-requirements.md
        ↓
02-prd.md
        ↓
03-roles-permissions.md
        ↓
04-use-cases.md
        ↓
05-user-flows.md
        ↓
06-database.md
        ↓
07-architecture.md
        ↓
08-api-specification.md
        ↓
09-ui-ux.md
        ↓
10-security.md
        ↓
11-test-plan.md
```

Dokumen-dokumen tersebut harus konsisten dengan PRD.

---

# 47. CHANGE REQUEST

Setiap perubahan kebutuhan setelah PRD disetujui harus dicatat sebagai Change Request.

Format:

```text
CR-ID:
Tanggal:
Pengusul:
Perubahan:
Alasan:
Dampak terhadap fitur:
Dampak terhadap database:
Dampak terhadap timeline:
Dampak terhadap biaya:
Status:
```

Tidak semua request baru otomatis masuk ke MVP.

---

# 48. STATUS REQUIREMENT

| Area             | Status                    |
| ---------------- | ------------------------- |
| Tujuan sistem    | FINAL                     |
| Target pengguna  | FINAL                     |
| User roles       | FINAL                     |
| Login            | FINAL                     |
| Struktur MTs     | FINAL                     |
| Struktur MA      | FINAL                     |
| Digital Access   | FINAL — rekomendasi       |
| Ebook source     | FINAL — sumber legal      |
| Ebook licensing  | Terpisah dari development |
| Digital Reader   | FINAL                     |
| Teacher features | FINAL                     |
| Dashboard        | FINAL                     |
| Statistics       | FINAL                     |
| Notification     | FINAL                     |
| PWA              | Phase 2                   |
| Offline          | Phase 2                   |
| AI               | Phase 2                   |
| QR Code          | Phase 2                   |
| Tech Stack       | TBD                       |
| Server/Hosting   | TBD                       |
| Domain           | TBD                       |
| Detail Database  | Dokumen berikutnya        |
| Detail UI/UX     | Dokumen berikutnya        |

---

# 49. FINAL PRODUCT DEFINITION

Sistem Perpustakaan Digital Madrasah Hasan Muchyi Kapurejo adalah platform perpustakaan digital berbasis web yang memungkinkan civitas akademik mengakses koleksi ebook secara terpusat.

Sistem menggunakan konsep **Digital Access**, di mana pengguna dapat membaca buku tanpa batas waktu selama memiliki permission terhadap buku tersebut.

Hak membaca, download, dan sharing dapat diatur berdasarkan jenis buku, role pengguna, jenjang, kelas, atau aturan lain yang diperlukan.

Sistem menyediakan:

```text
Authentication
        ↓
User Management
        ↓
Book Catalog
        ↓
Search & Filter
        ↓
Digital Reader
        ↓
Bookmark / Highlight / Notes
        ↓
Reading Progress
        ↓
Access Control
        ↓
Teacher Reading List
        ↓
Notification
        ↓
Dashboard & Statistics
        ↓
Reporting
```

Platform dirancang agar dapat dikembangkan lebih lanjut menuju fitur AI, PWA, offline reading, gamification, dan integrasi layanan lainnya.

---

# END OF PRD

**Dokumen:** Product Requirements Document
**Produk:** Sistem Perpustakaan Digital Madrasah Hasan Muchyi Kapurejo
**Versi:** 1.0
**Status:** Ready for System Design
