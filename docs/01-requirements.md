# REQUIREMENTS DOCUMENT

## Digital Library — Madrasah Hasan Muchyi Kapurejo

**Versi:** 1.0
**Status:** Baseline Requirements
**Jenis Sistem:** Digital Library berbasis Web
**Institusi:** Madrasah Hasan Muchyi Kapurejo
**Jenjang:** MTs dan MA

---

# 1. Latar Belakang

Madrasah Hasan Muchyi Kapurejo membutuhkan sistem perpustakaan digital untuk memudahkan civitas akademik dalam mengakses dan membaca buku secara digital.

Sistem ditujukan untuk mendukung:

* Akses bahan bacaan secara digital.
* Kegiatan pembelajaran.
* Peningkatan minat baca.
* Pengelolaan koleksi ebook.
* Pemantauan aktivitas membaca.
* Pengelolaan akses buku berdasarkan pengguna dan aturan yang ditentukan.

Sistem akan berbentuk **responsive web application** sehingga dapat digunakan melalui smartphone, tablet, maupun komputer.

---

# 2. Tujuan Sistem

Tujuan utama:

1. Digitalisasi layanan perpustakaan.
2. Mempermudah akses buku bagi civitas akademik.
3. Mendukung kegiatan belajar mengajar.
4. Mempermudah pengelolaan koleksi buku digital.
5. Menyediakan data aktivitas membaca.
6. Memberikan kontrol akses terhadap buku digital.
7. Menyediakan statistik dan laporan bagi pengelola.

---

# 3. Target Pengguna

Sistem digunakan oleh:

1. Siswa MTs.
2. Siswa MA.
3. Guru.
4. Tenaga kependidikan.
5. Pengelola perpustakaan.
6. Admin sistem.

Perkiraan jumlah pengguna:

> ±500–600 pengguna.

Jumlah tersebut merupakan estimasi awal untuk pertimbangan desain dan kapasitas sistem.

---

# 4. Platform

Sistem menggunakan:

> **Responsive Web Application**

Target perangkat:

* Smartphone
* Tablet
* Laptop
* Desktop

Smartphone menjadi perangkat utama yang harus didukung dengan baik.

Native Android/iOS belum menjadi bagian MVP.

---

# 5. Kondisi Saat Ini

Berdasarkan informasi yang diperoleh:

* Belum tersedia koleksi ebook digital yang terintegrasi.
* Data siswa/guru secara digital sudah tersedia.
* Tidak ada kebutuhan migrasi data perpustakaan digital lama.
* Internet di lingkungan pengguna relatif stabil.
* Domain dan hosting belum ditentukan.
* Server dapat disiapkan melalui pihak pengembang/penyedia.

---

# 6. Authentication

Sistem membutuhkan login.

Identitas login yang direncanakan:

```text
Username:
Nama Lengkap

Credential:
NISN
```

Setelah login, sistem menentukan role pengguna dan memberikan akses sesuai permission.

Authentication harus dilakukan secara aman dan tidak menyimpan credential dalam bentuk plaintext.

---

# 7. Role Pengguna

Role utama:

```text
ADMIN
LIBRARY_STAFF
TEACHER
EDUCATION_STAFF
STUDENT_MTS
STUDENT_MA
```

Setiap role memiliki hak akses berbeda.

Role tidak boleh menjadi satu-satunya dasar authorization; permission dan scope juga harus diperiksa.

---

# 8. Struktur Akademik

Sistem harus mendukung struktur:

### MTs

```text
VII A
VII B
VIII A
VIII B
IX A
IX B
...
```

### MA

```text
IPS 1
IPS 2
Bahasa 1
Bahasa 2
...
```

Struktur kelas harus disimpan di database dan dapat dikelola oleh admin.

Nama kelas tidak boleh di-hard-code ke dalam source code.

---

# 9. User Management

Admin dapat mengelola pengguna.

Fungsi:

* Melihat pengguna.
* Menambahkan pengguna.
* Mengubah pengguna.
* Mengaktifkan pengguna.
* Menonaktifkan pengguna.
* Mengatur role.
* Mengatur level.
* Mengatur kelas.
* Import data pengguna.

Import data dapat menggunakan file spreadsheet.

Sistem harus melakukan validasi data sebelum import.

---

# 10. Book Management

Pengelola perpustakaan/admin dapat mengelola buku digital.

Informasi buku minimal:

* Judul.
* Deskripsi.
* Cover.
* Penulis.
* Penerbit.
* ISBN jika tersedia.
* Tahun terbit.
* Kategori.
* Level/target akademik.
* File ebook.
* Status buku.

Status buku:

```text
Draft
Published
Archived
```

---

# 11. Sumber dan Hak Akses Konten

Ebook dapat berasal dari:

* Buku publik.
* Buku yang memang memiliki izin distribusi digital.
* Sumber resmi pemerintah.
* Sumber penerbit.
* Lisensi yang dibeli madrasah.
* Sumber lain yang secara hukum mengizinkan penggunaan.

Sistem tidak boleh digunakan untuk mengunggah atau menyebarkan ebook berhak cipta tanpa izin.

Jika diperlukan, lisensi buku dapat dibeli setelah platform tersedia.

---

# 12. Katalog Buku

Pengguna dapat melihat katalog buku yang dapat diakses.

Katalog minimal mendukung:

* Daftar buku.
* Pencarian.
* Filter.
* Detail buku.
* Kategori.
* Penulis.
* Penerbit.
* Level.
* Kelas jika relevan.

---

# 13. Search

Pengguna dapat mencari buku berdasarkan informasi seperti:

* Judul.
* Penulis.
* Kata kunci.

Search harus dapat digunakan melalui smartphone.

---

# 14. Digital Reader

Sistem menyediakan reader untuk membaca ebook secara digital.

Fitur reader:

* Membuka buku.
* Next page.
* Previous page.
* Zoom.
* Fullscreen.
* Table of contents.
* Search text.
* Bookmark.
* Reading progress.
* Highlight.
* Notes.
* Dark mode.

---

# 15. Reading Progress

Sistem menyimpan posisi terakhir pengguna membaca.

Contoh:

```text
Buku:
Matematika VII

Progress:
65%

Halaman terakhir:
120
```

Ketika pengguna membuka buku kembali, sistem dapat menawarkan:

> Lanjutkan membaca dari halaman terakhir.

---

# 16. Bookmark

Pengguna dapat menandai halaman tertentu.

Bookmark bersifat personal.

User A tidak boleh melihat atau memodifikasi bookmark User B.

---

# 17. Highlight

Pengguna dapat memberikan highlight pada bagian tertentu dari buku.

Highlight disimpan berdasarkan user.

---

# 18. Notes

Pengguna dapat membuat catatan pada bagian tertentu dari buku.

User dapat:

* Membuat note.
* Melihat note.
* Mengedit note.
* Menghapus note.

User hanya dapat mengubah note miliknya sendiri.

---

# 19. Reading History

Sistem mencatat aktivitas membaca pengguna.

Informasi dapat digunakan untuk:

* Riwayat membaca pengguna.
* Statistik aktivitas.
* Statistik kelas.
* Statistik level.
* Laporan.

---

# 20. Digital Access

Akses digital menggunakan konsep:

> **Digital Access + Book Permission**

Tidak menggunakan sistem peminjaman tradisional secara default.

Artinya:

> Pengguna tidak otomatis kehilangan akses setelah 7 hari atau periode tertentu.

Akses dapat diberikan berdasarkan:

* Role.
* Level.
* Kelas.
* User tertentu.
* Aturan buku.

---

# 21. Book Permission

Permission buku dipisahkan menjadi:

```text
READ
DOWNLOAD
SHARE
```

Contoh:

```text
READ      = true
DOWNLOAD  = false
SHARE     = true
```

Maka pengguna dapat membaca dan membagikan referensi sesuai aturan, tetapi tidak dapat mengunduh file.

---

# 22. Access Control

Sistem menggunakan dua lapisan:

```text
USER
 ↓
ROLE PERMISSION
 ↓
BOOK ACCESS RULE
 ↓
ACTION
```

Backend wajib melakukan pemeriksaan permission.

Frontend tidak boleh menjadi satu-satunya security layer.

---

# 23. Download

Download hanya dapat dilakukan jika:

1. User memiliki permission download.
2. Buku mengizinkan download.
3. File tersedia.
4. Access rule terpenuhi.

File ebook tidak boleh disimpan sebagai public direct URL.

---

# 24. Share

Share hanya tersedia jika buku mengizinkan share.

Mekanisme share harus tetap menghormati permission penerima.

Share tidak boleh menjadi cara untuk melewati access control.

---

# 25. Teacher Features

Guru membutuhkan fitur:

* Reading list.
* Rekomendasi buku.
* Koleksi buku untuk kelas.
* Berbagi referensi.
* Melihat aktivitas membaca siswa sesuai scope.

Guru tidak boleh melihat aktivitas seluruh siswa jika siswa tersebut berada di luar scope kelas yang menjadi tanggung jawabnya.

---

# 26. Reading List

Guru dapat:

1. Membuat reading list.
2. Menambahkan buku.
3. Menghapus buku.
4. Menentukan target kelas.
5. Mengubah reading list.
6. Publish reading list.

Contoh:

```text
Reading List:
Materi Persiapan Ujian

Target:
MA IPS 1
MA IPS 2
```

---

# 27. Recommendation

Guru dapat memberikan rekomendasi buku kepada siswa/kelas sesuai scope.

Rekomendasi tidak boleh memberikan akses otomatis terhadap buku yang sebenarnya restricted.

---

# 28. Notification

Sistem membutuhkan notification untuk informasi seperti:

* Pengumuman perpustakaan.
* Reading list baru.
* Rekomendasi.
* Buku baru.
* Informasi lain yang relevan.

### MVP

Menggunakan:

> In-app notification.

### Phase 2

Push notification dapat dipertimbangkan.

---

# 29. Dashboard

Dashboard berbeda berdasarkan role.

### Student

* Lanjutkan membaca.
* Buku terakhir.
* Buku populer.
* Rekomendasi.
* Aktivitas membaca.
* Notifikasi.

### Teacher

* Reading list.
* Rekomendasi.
* Aktivitas siswa dalam scope.
* Buku yang digunakan.

### Library Staff

* Total buku.
* Aktivitas membaca.
* Buku populer.
* Quick action pengelolaan buku.

### Admin

* Total pengguna.
* Total buku.
* Statistik pengguna.
* Statistik kelas.
* Statistik level.
* Aktivitas sistem.

### Education Staff

* Katalog.
* Riwayat.
* Bookmark.
* Notifikasi.

---

# 30. Statistics

Sistem menyediakan statistik:

* Jumlah pengguna.
* Jumlah buku.
* Buku paling banyak dibaca.
* Jumlah akses.
* Aktivitas membaca.
* Pengguna aktif.
* Statistik kelas.
* Statistik level.
* Statistik periode.

---

# 31. Report

Data tertentu dapat diekspor dalam:

```text
Excel
PDF
```

Contoh:

* Reading activity.
* Statistik kelas.
* Statistik level.
* Popular books.
* User activity.

---

# 32. Activity Log

Sistem menyimpan aktivitas penting.

Contoh:

* Login.
* Tambah buku.
* Edit buku.
* Publish buku.
* Archive buku.
* Tambah user.
* Perubahan access rule.

Log tidak boleh menyimpan:

* Password.
* Token.
* Secret.
* API key.

---

# 33. Book Storage

Database menyimpan metadata buku.

File ebook disimpan pada:

> Private Object Storage.

Tidak disimpan sebagai file public pada web server.

Arsitektur:

```text
Database
   │
   └── Metadata Buku

Private Object Storage
   │
   └── Ebook File
```

---

# 34. Security Requirements

Sistem minimal membutuhkan:

* HTTPS pada production.
* Authentication.
* Authorization.
* Server-side validation.
* Input validation.
* Rate limiting.
* Secure file upload.
* Private ebook storage.
* Audit/activity log.
* Secure session/token handling.
* Protection terhadap broken access control.
* Protection terhadap IDOR.
* Protection terhadap XSS.
* Protection terhadap SQL Injection.
* Protection terhadap path traversal.

---

# 35. Responsive Requirements

Sistem harus dapat digunakan pada:

```text
Smartphone
Tablet
Laptop
Desktop
```

Prioritas:

```text
Mobile First
```

Fitur utama tidak boleh hanya nyaman digunakan pada desktop.

---

# 36. Non-Functional Requirements

## Performance

Sistem harus tetap responsif pada skala sekitar 500–600 pengguna.

## Scalability

Arsitektur harus memungkinkan penambahan jumlah pengguna dan koleksi buku.

## Security

Data pengguna dan ebook harus terlindungi.

## Maintainability

Kode harus modular dan mudah dikembangkan.

## Availability

Sistem harus dapat diakses selama server dan jaringan tersedia.

## Usability

Pengguna non-teknis harus dapat menggunakan sistem tanpa pelatihan teknis yang kompleks.

---

# 37. Data yang Belum Tersedia

Beberapa hal belum ditentukan dan **tidak boleh diasumsikan oleh developer/AI**:

* Domain final.
* Hosting final.
* Provider object storage.
* Provider email/notification.
* Teknologi final.
* Lisensi ebook tertentu.
* Koleksi ebook final.
* Detail kebijakan sharing setiap buku.
* Detail kebijakan download setiap buku.

Keputusan tersebut ditentukan pada tahap berikutnya.

---

# 38. MVP Scope

MVP mencakup:

```text
Authentication
User Management
Class Management
Book Management
Book Catalog
Search
Book Detail
Digital Reader
Reading Progress
Bookmark
Highlight
Notes
Reading History
Book Access Control
Download Control
Share Control
Teacher Reading List
Teacher Recommendation
Notification In-App
Dashboard
Statistics
Report Export
Activity Log
Responsive Web
```

---

# 39. Phase 2

Fitur berikut belum menjadi prioritas MVP:

```text
PWA
Offline Reading
Push Notification
QR Code
AI Recommendation
AI Assistant
Native Mobile Application
Fitur AI lainnya
```

Fitur dapat dimasukkan setelah MVP berdasarkan kebutuhan dan evaluasi.

---

# 40. Out of Scope

Untuk MVP, sistem tidak mencakup:

* Sistem pembayaran.
* Subscription.
* Marketplace ebook.
* Native Android application.
* Native iOS application.
* AI chatbot.
* AI-generated content.
* Offline ebook tanpa keputusan lisensi/teknis lebih lanjut.

---

# 41. Business Rules Utama

### BR-01

Setiap user memiliki satu akun.

### BR-02

User memiliki role.

### BR-03

Role menentukan permission dasar.

### BR-04

Book memiliki access rule.

### BR-05

Read, Download, dan Share adalah permission terpisah.

### BR-06

Digital access tidak memiliki expiration secara default.

### BR-07

User hanya dapat mengelola data personal miliknya sendiri.

### BR-08

Guru hanya dapat melihat data siswa sesuai scope.

### BR-09

Admin memiliki akses pengelolaan sistem sesuai permission.

### BR-10

Library Staff memiliki akses pengelolaan koleksi sesuai permission.

### BR-11

Ebook tidak boleh diakses melalui public direct URL.

### BR-12

Authorization harus dilakukan server-side.

### BR-13

Struktur kelas tidak boleh hard-coded.

### BR-14

Buku restricted tidak boleh diakses hanya dengan mengetahui ID/URL buku.

---

# 42. Risiko Utama

## Risiko 1 — Hak cipta ebook

Tidak semua ebook dapat digunakan secara bebas.

**Mitigasi:**

* Gunakan sumber legal.
* Gunakan buku publik.
* Gunakan lisensi resmi.
* Simpan informasi sumber/hak penggunaan.

---

## Risiko 2 — Broken Access Control

User dapat mengakses buku/data yang seharusnya restricted.

**Mitigasi:**

* Authorization server-side.
* Test IDOR.
* Test role.
* Test ownership.
* Test teacher scope.

---

## Risiko 3 — File Security

Ebook dapat diakses secara langsung.

**Mitigasi:**

* Private storage.
* Authorization sebelum akses.
* Tidak menggunakan public direct URL.

---

## Risiko 4 — Scope Membesar

Terlalu banyak fitur dapat memperlambat MVP.

**Mitigasi:**

* Gunakan MVP scope.
* Gunakan Phase 2.
* Semua perubahan melalui change request.

---

# 43. Success Criteria

MVP dianggap memenuhi kebutuhan awal apabila:

1. Pengguna dapat login.
2. Pengguna dapat menemukan buku.
3. Pengguna dapat membaca buku sesuai permission.
4. Progress membaca tersimpan.
5. Bookmark/highlight/note berjalan.
6. Pengelola dapat mengelola buku.
7. Access rule dapat diterapkan.
8. Guru dapat membuat reading list.
9. Admin dapat mengelola pengguna dan kelas.
10. Statistik dan laporan dapat digunakan.
11. Ebook tidak dapat diakses tanpa authorization.
12. Sistem nyaman digunakan pada smartphone.

---

# 44. Requirement Status

| Area              | Status    |
| ----------------- | --------- |
| Tujuan sistem     | ✅ Defined |
| Target pengguna   | ✅ Defined |
| Role              | ✅ Defined |
| Login             | ✅ Defined |
| Struktur kelas    | ✅ Defined |
| User management   | ✅ Defined |
| Book management   | ✅ Defined |
| Catalog           | ✅ Defined |
| Digital reader    | ✅ Defined |
| Reading progress  | ✅ Defined |
| Bookmark          | ✅ Defined |
| Highlight         | ✅ Defined |
| Notes             | ✅ Defined |
| Access control    | ✅ Defined |
| Download          | ✅ Defined |
| Share             | ✅ Defined |
| Teacher feature   | ✅ Defined |
| Notification      | ✅ Defined |
| Dashboard         | ✅ Defined |
| Statistics        | ✅ Defined |
| Report            | ✅ Defined |
| Security          | ✅ Defined |
| Responsive        | ✅ Defined |
| Domain/hosting    | ⏳ TBD     |
| Final tech stack  | ⏳ TBD     |
| Ebook collection  | ⏳ TBD     |
| Ebook licensing   | ⏳ TBD     |
| PWA               | ⏳ Phase 2 |
| Offline           | ⏳ Phase 2 |
| Push notification | ⏳ Phase 2 |
| AI features       | ⏳ Phase 2 |

---

# 45. Requirement Baseline

Dokumen ini menjadi dasar untuk:

```text
01 Requirements
      ↓
02 PRD
      ↓
03 Roles & Permissions
      ↓
04 Use Cases
      ↓
05 User Flows
      ↓
06 Database
      ↓
07 Architecture
      ↓
08 API Specification
      ↓
09 UI/UX
      ↓
10 AI Coding Rules
      ↓
11 Test Plan
      ↓
12 Development Sprint
```

**Status: BASELINE**

Perubahan terhadap requirement setelah dokumen ini ditetapkan harus melalui proses **Change Request** dan dianalisis dampaknya terhadap PRD, database, API, UI/UX, security, dan testing.
