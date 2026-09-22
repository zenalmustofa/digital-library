# 07 — SYSTEM ARCHITECTURE

**Project:** Digital Library Madrasah Hasan Muchyi Kapurejo
**Version:** 1.0
**Status:** Development Reference

---

# 1. Tujuan

Dokumen ini mendefinisikan arsitektur teknis sistem Digital Library Madrasah Hasan Muchyi Kapurejo.

Arsitektur harus:

* mudah dikembangkan
* mudah dipelihara
* aman
* mampu menangani ±500–600 pengguna
* mendukung smartphone dan desktop
* mendukung digital reader
* mendukung secure ebook storage
* mendukung role & permission
* mendukung statistik
* dapat dikembangkan untuk Phase 2

---

# 2. Architectural Principle

Sistem menggunakan pemisahan tanggung jawab:

```text
Presentation
     ↓
Application
     ↓
Business Logic
     ↓
Data Access
     ↓
Database / Storage
```

Setiap layer memiliki tanggung jawab berbeda.

---

# 3. High-Level Architecture

Arsitektur utama:

```text
                         INTERNET
                            │
                            ▼
                    ┌───────────────┐
                    │    Browser    │
                    │ Smartphone /  │
                    │    Desktop    │
                    └───────┬───────┘
                            │ HTTPS
                            ▼
                    ┌───────────────┐
                    │    Frontend   │
                    │ Web Interface │
                    └───────┬───────┘
                            │ HTTPS / API
                            ▼
                    ┌───────────────┐
                    │ Backend / API │
                    │               │
                    │ Auth          │
                    │ Authorization │
                    │ Business Logic│
                    └───────┬───────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
       ┌────────────┐ ┌────────────┐ ┌──────────────┐
       │ PostgreSQL │ │Object      │ │ Notification │
       │ Database   │ │Storage     │ │ Service      │
       └────────────┘ └────────────┘ └──────────────┘
```

---

# 4. Client Layer

Client menggunakan web application.

Target:

```text
Desktop
Laptop
Tablet
Smartphone
```

Browser yang digunakan user menjadi client sistem.

Contoh:

```text
Chrome
Edge
Firefox
Safari
```

Tidak diperlukan aplikasi Android/iOS native untuk MVP.

---

# 5. Frontend Layer

Frontend bertanggung jawab terhadap:

* UI
* Navigation
* Form
* Catalog
* Search
* Book detail
* Digital reader interface
* Dashboard
* Statistics visualization
* Notification interface
* Client-side validation
* Loading state
* Error state

Frontend **tidak boleh menjadi sumber utama authorization**.

Contoh:

```text
Frontend:
"Apakah tombol Download ditampilkan?"

Backend:
"Apakah user benar-benar boleh download?"
```

Backend tetap menjadi sumber keputusan.

---

# 6. Backend Layer

Backend adalah pusat business logic.

Tanggung jawab:

* Authentication
* Authorization
* User management
* Role management
* Book management
* Access control
* Reading progress
* Bookmark
* Highlight
* Notes
* Reading list
* Recommendation
* Notification
* Statistics
* Report generation
* Activity logging
* Secure ebook access

---

# 7. API Layer

Frontend berkomunikasi dengan backend melalui API.

Contoh:

```text
Frontend
   │
   │ GET /api/books
   ▼
Backend
   │
   ▼
Database
   │
   ▼
Backend
   │
   ▼
Frontend
```

API harus memiliki struktur yang konsisten.

Contoh endpoint konseptual:

```text
/api/auth
/api/users
/api/roles
/api/classes
/api/books
/api/categories
/api/authors
/api/publishers
/api/reading
/api/bookmarks
/api/highlights
/api/notes
/api/reading-lists
/api/recommendations
/api/notifications
/api/statistics
/api/reports
/api/activity-logs
```

Detail endpoint belum dikunci pada dokumen ini.

Endpoint final akan ditentukan pada:

```text
08 — API Specification
```

---

# 8. Authentication Architecture

Flow:

```text
User
 ↓
Frontend Login
 ↓
POST /auth/login
 ↓
Backend
 ↓
Validate Credential
 ↓
Find User
 ↓
Check Status
 ↓
Generate Authentication Session/Token
 ↓
Return Authentication State
 ↓
Frontend
 ↓
Dashboard
```

Authentication harus menggunakan mekanisme yang aman.

Implementasi final dapat menggunakan:

* secure session
* atau token-based authentication

Pilihan final ditentukan setelah stack dipilih.

---

# 9. Authorization Architecture

Authorization dilakukan pada backend.

Flow:

```text
Request
 ↓
Authentication Middleware
 ↓
Identify User
 ↓
Permission Middleware/Policy
 ↓
Business Rule
 ↓
Resource Access Rule
 ↓
Controller
 ↓
Service
 ↓
Database
```

Contoh:

```text
GET /books/123/download
        ↓
User authenticated?
        ↓
User memiliki books.download?
        ↓
Book memiliki rule?
        ↓
User memenuhi rule?
        ↓
YES
        ↓
Generate secure file access
```

---

# 10. Authentication vs Authorization

Keduanya berbeda.

### Authentication

Menjawab:

> "Siapa kamu?"

Contoh:

```text
User = Zaenal
```

### Authorization

Menjawab:

> "Kamu boleh melakukan apa?"

Contoh:

```text
Zaenal
Role = STUDENT_MA

READ = YES
DOWNLOAD = NO
SHARE = NO
```

---

# 11. Database Layer

Database menggunakan relational database.

Database bertanggung jawab menyimpan:

```text
User
Role
Class
Book
Author
Category
Publisher
Permission
Access Rule
Reading Progress
Bookmark
Highlight
Note
Reading History
Reading List
Recommendation
Notification
Activity Log
```

Database tidak digunakan sebagai tempat utama penyimpanan file ebook.

---

# 12. Ebook Storage Architecture

Ebook disimpan pada storage terpisah.

```text
                ┌──────────────┐
                │  PostgreSQL  │
                │              │
                │ book metadata│
                └──────▲───────┘
                       │
                       │
User → Backend → Authorization
                       │
                       ▼
                ┌──────────────┐
                │Object Storage│
                │              │
                │ ebook files  │
                └──────────────┘
```

Database menyimpan:

```text
book_id
file_name
storage_key
file_type
file_size
checksum
version
```

Bukan isi binary ebook.

---

# 13. Secure Ebook Access

Ebook **tidak boleh memiliki public URL secara default**.

Flow:

```text
User
 ↓
Klik Baca
 ↓
Backend
 ↓
Authentication
 ↓
Authorization
 ↓
Book Access Rule
 ↓
Allowed?
 ├── NO → 403
 │
 └── YES
       ↓
Secure File Access
       ↓
Storage
       ↓
Reader
```

Untuk download:

```text
User
 ↓
Download
 ↓
Backend
 ↓
Check DOWNLOAD
 ↓
Allowed
 ↓
Secure Download
```

---

# 14. Reader Architecture

Digital reader merupakan bagian frontend yang berkomunikasi dengan backend.

```text
Book Detail
      ↓
Open Reader
      ↓
Backend Authorization
      ↓
Secure Ebook Access
      ↓
Reader
      ↓
User Reading
```

Reader bertanggung jawab terhadap:

* page navigation
* zoom
* fullscreen
* table of contents
* text search
* bookmark UI
* highlight UI
* note UI
* progress UI

Backend menyimpan data persisten.

---

# 15. Reading Progress Architecture

```text
Reader
 ↓
Page Changed
 ↓
Frontend state
 ↓
Debounce/controlled update
 ↓
API
 ↓
Backend
 ↓
reading_progress
```

Tidak perlu melakukan request ke server pada setiap perubahan pixel atau event UI.

Update harus dilakukan secara efisien.

---

# 16. Bookmark Architecture

```text
Reader
 ↓
User clicks Bookmark
 ↓
API
 ↓
Backend authorization
 ↓
Save bookmark
 ↓
Database
 ↓
Response
 ↓
Reader update
```

Bookmark selalu terkait dengan:

```text
user_id
book_id
page
```

---

# 17. Highlight & Notes Architecture

```text
Reader
 ↓
User selects text
 ↓
Highlight / Note
 ↓
Frontend collects position
 ↓
API
 ↓
Backend validation
 ↓
Database
```

Data posisi reader dapat disimpan dalam format JSON apabila diperlukan oleh library reader yang digunakan.

---

# 18. Reading History Architecture

Saat user membuka buku:

```text
Open Book
 ↓
Authorization
 ↓
Create/Update Reading History
 ↓
Open Reader
```

Saat user membaca:

```text
Reading Activity
 ↓
Update last_accessed_at
 ↓
Update progress
```

Data ini digunakan untuk:

* History
* Dashboard
* Statistics

---

# 19. Role-Based Architecture

Role menentukan kumpulan permission.

```text
User
 ↓
Role
 ↓
Permissions
 ↓
Feature Access
```

Contoh:

```text
STUDENT_MTS
 ├── books.view
 ├── books.read
 ├── bookmarks.create
 ├── highlights.create
 └── notes.create
```

Contoh:

```text
LIBRARY_STAFF
 ├── books.view
 ├── books.create
 ├── books.update
 ├── books.publish
 └── books.download
```

Permission final mengikuti:

```text
03 — Roles & Permissions
```

---

# 20. Book Access Architecture

Role permission dan book access rule adalah dua lapisan berbeda.

```text
              USER
                │
                ▼
        Role Permission
                │
                ▼
       Book Access Rule
                │
                ▼
             ACTION
```

Contoh:

```text
User memiliki books.read
        +
Buku mengizinkan user tersebut
        =
User dapat membaca
```

Memiliki permission global saja tidak otomatis berarti semua buku dapat dibaca.

---

# 21. Teacher Scope Architecture

Teacher memiliki batas scope.

```text
Teacher
 ↓
Assigned Scope
 ↓
Class
 ↓
Student Activity
```

Teacher tidak boleh mengambil seluruh data siswa hanya karena memiliki role `TEACHER`.

Backend harus menerapkan scope filtering.

---

# 22. Notification Architecture

```text
Admin / Teacher
       ↓
Create Notification
       ↓
Backend
       ↓
Determine Target
       ↓
notification_recipients
       ↓
User
```

MVP dapat menggunakan in-app notification.

Push notification dapat dikembangkan pada Phase 2 jika dibutuhkan.

---

# 23. Statistics Architecture

Statistik dihitung dari data operasional.

```text
Database
 ↓
Query
 ↓
Aggregation
 ↓
Statistics Service
 ↓
Dashboard
```

Contoh:

```text
reading_history
      ↓
COUNT()
      ↓
Total Reading Activity
```

Untuk MVP tidak perlu data warehouse terpisah.

---

# 24. Report Generation

Flow:

```text
Admin
 ↓
Statistics
 ↓
Filter
 ↓
Generate Report
 ↓
Backend
 ↓
Report Service
 ↓
Excel / PDF
 ↓
Download
```

Report generation dilakukan di backend.

---

# 25. Activity Logging

Aktivitas penting dicatat pada backend.

```text
Request
 ↓
Business Action
 ↓
Success
 ↓
Activity Log
```

Contoh:

```text
LOGIN
BOOK_READ
BOOK_DOWNLOAD
BOOK_SHARE
BOOK_CREATED
BOOK_PUBLISHED
USER_CREATED
USER_IMPORTED
REPORT_EXPORTED
```

User tidak dapat memanipulasi `activity_logs` melalui API umum.

---

# 26. Error Architecture

Backend harus menggunakan HTTP status code secara konsisten.

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity
500 Internal Server Error
```

Frontend menerjemahkan error menjadi pesan yang mudah dipahami user.

---

# 27. Validation Architecture

Validasi dilakukan pada dua sisi.

### Frontend

Untuk UX:

```text
Nama wajib diisi.
NISN wajib diisi.
```

### Backend

Untuk keamanan dan integritas:

```text
Request
 ↓
Backend Validation
 ↓
Business Rule
 ↓
Database
```

Frontend validation **tidak menggantikan backend validation**.

---

# 28. Caching

Caching dapat digunakan untuk data yang relatif jarang berubah.

Contoh:

```text
Categories
Publishers
Authors
Public Catalog Metadata
```

Untuk MVP, caching bukan komponen wajib pada semua endpoint.

Caching ditambahkan berdasarkan hasil testing/performance profiling.

---

# 29. Search Architecture

MVP:

```text
Frontend
 ↓
Search API
 ↓
Database Query
 ↓
Result
```

Pencarian buku minimal mendukung:

* title
* author
* category
* publisher

Jika jumlah data dan kebutuhan pencarian berkembang, full-text search dapat ditambahkan.

Tidak perlu menggunakan Elasticsearch/OpenSearch untuk MVP tanpa kebutuhan yang jelas.

---

# 30. File Upload Architecture

Flow:

```text
Library Staff
 ↓
Select Ebook
 ↓
Frontend Upload
 ↓
Backend
 ↓
Validate:
 ├── MIME type
 ├── Extension
 ├── File size
 └── Content/right metadata
 ↓
Storage
 ↓
Create book_files record
 ↓
Return result
```

File upload harus dibatasi berdasarkan konfigurasi server.

---

# 31. File Upload Security

Backend harus:

* membatasi ukuran file
* memvalidasi MIME type
* memvalidasi extension
* menggunakan generated storage key
* tidak menggunakan nama file user sebagai storage path utama
* mencegah path traversal
* tidak menyimpan file upload ke public directory secara langsung

---

# 32. Deployment Architecture

Arsitektur production konseptual:

```text
                    INTERNET
                       │
                       ▼
                 HTTPS / Domain
                       │
                       ▼
                Reverse Proxy
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
         Frontend              Backend
                                 │
                    ┌────────────┼────────────┐
                    ▼            ▼            ▼
               PostgreSQL   Object Storage  Services
```

Reverse proxy dapat menangani:

* HTTPS termination
* routing
* security headers
* request forwarding

Implementasi final bergantung pada hosting yang dipilih.

---

# 33. Environment Architecture

Minimal:

```text
Development
Testing
Production
```

Masing-masing memiliki konfigurasi terpisah.

Contoh environment variable:

```text
DATABASE_URL
APP_URL
AUTH_SECRET
STORAGE_ENDPOINT
STORAGE_BUCKET
STORAGE_ACCESS_KEY
STORAGE_SECRET_KEY
```

Credential tidak boleh disimpan di source code.

---

# 34. Logging Architecture

Pisahkan:

```text
Application Log
Security Log
Activity Log
```

### Application Log

Untuk error teknis.

### Security Log

Untuk aktivitas keamanan.

### Activity Log

Untuk aktivitas pengguna.

Contoh:

```text
Application Log:
Database connection failed

Activity Log:
User 123 read Book 456
```

---

# 35. Backup Architecture

Production minimal membutuhkan:

```text
Database Backup
+
Ebook Storage Backup
+
Configuration Backup
```

Backup database saja tidak cukup jika ebook disimpan pada storage terpisah.

---

# 36. Scalability

Target awal:

```text
±500–600 users
```

Arsitektur tidak perlu langsung menggunakan microservices.

MVP dapat menggunakan:

```text
Frontend
+
Backend
+
PostgreSQL
+
Object Storage
```

Jika kebutuhan berkembang, komponen dapat dipisahkan kemudian.

---

# 37. Recommended Architectural Style

Untuk MVP gunakan pendekatan:

```text
Modular Monolith
```

Konsep:

```text
                    Backend
                       │
      ┌────────────────┼────────────────┐
      │                │                │
      ▼                ▼                ▼
 Authentication     Library          Users
      │                │                │
      │                │                │
      ▼                ▼                ▼
 Notification      Reading          Reports
```

Semua masih berada dalam satu backend application tetapi dipisahkan berdasarkan module/domain.

---

# 38. Backend Module Structure

Struktur konseptual:

```text
backend/
├── auth/
├── users/
├── roles/
├── permissions/
├── classes/
├── books/
├── categories/
├── authors/
├── publishers/
├── book-access/
├── reading/
├── bookmarks/
├── highlights/
├── notes/
├── reading-lists/
├── recommendations/
├── notifications/
├── statistics/
├── reports/
├── activity-logs/
└── storage/
```

Framework final dapat mengadaptasi struktur tersebut.

---

# 39. Frontend Module Structure

Konseptual:

```text
frontend/
├── auth/
├── dashboard/
├── catalog/
├── books/
├── reader/
├── reading/
├── bookmarks/
├── notifications/
├── reading-lists/
├── recommendations/
├── statistics/
├── reports/
└── admin/
```

---

# 40. Request Lifecycle

Contoh request membaca buku:

```text
1. Browser
      ↓
2. Frontend
      ↓
3. HTTPS Request
      ↓
4. Backend Router
      ↓
5. Authentication
      ↓
6. Authorization
      ↓
7. Book Access Rule
      ↓
8. Reading Service
      ↓
9. Database / Storage
      ↓
10. Response
      ↓
11. Frontend Reader
```

---

# 41. Example — Login Lifecycle

```text
Browser
 ↓
Login Form
 ↓
POST /auth/login
 ↓
Auth Controller
 ↓
Auth Service
 ↓
User Repository
 ↓
PostgreSQL
 ↓
Credential Validation
 ↓
Session/Token
 ↓
Response
 ↓
Dashboard
```

---

# 42. Example — Read Book Lifecycle

```text
Browser
 ↓
Book Detail
 ↓
GET /books/:id
 ↓
Backend
 ↓
Book Service
 ↓
Database
 ↓
Book Detail
 ↓
User clicks Read
 ↓
GET /books/:id/read
 ↓
Authentication
 ↓
Authorization
 ↓
Book Access Rule
 ↓
Secure Storage Access
 ↓
Reader
```

---

# 43. Example — Download Lifecycle

```text
Browser
 ↓
Download
 ↓
Backend
 ↓
Authentication
 ↓
Permission Check
 ↓
Book Access Rule
 ↓
Storage Authorization
 ↓
Secure Download
 ↓
Activity Log
```

---

# 44. Security Boundary

Komponen yang dipercaya:

```text
Backend
Database
Private Storage
```

Komponen yang tidak boleh dipercaya sebagai security authority:

```text
Browser
Frontend
Client-side JavaScript
Request payload
URL parameter
```

Semua data dari client harus dianggap tidak terpercaya sampai divalidasi server.

---

# 45. Architecture Decision Summary

Keputusan arsitektur saat ini:

| Area                 | Decision                                       |
| -------------------- | ---------------------------------------------- |
| Client               | Responsive Web                                 |
| Backend style        | Modular Monolith                               |
| Database             | Relational Database                            |
| Primary DB candidate | PostgreSQL                                     |
| Ebook storage        | Private Object Storage                         |
| API                  | REST-style API                                 |
| Auth                 | Secure session/token, final implementation TBD |
| Authorization        | Server-side                                    |
| Ebook URL            | Private                                        |
| Search               | Database search untuk MVP                      |
| Notification         | In-app untuk MVP                               |
| Statistics           | Database aggregation                           |
| Report               | Backend generated                              |
| Deployment           | HTTPS                                          |
| Scaling              | Vertical-first, horizontal-ready               |
| Microservices        | Tidak digunakan untuk MVP                      |
| Native mobile app    | Tidak untuk MVP                                |
| PWA                  | Phase 2                                        |
| Offline              | Phase 2                                        |
| AI                   | Phase 2                                        |

---

# 46. Architecture Decision Records

## ADR-001 — Modular Monolith

**Decision:** Menggunakan modular monolith untuk MVP.

**Reason:**

* Sistem masih satu domain utama.
* Jumlah pengguna ±500–600.
* Deployment lebih sederhana.
* Maintenance lebih mudah.
* Cocok untuk tim kecil/developer tunggal.
* Lebih mudah dikembangkan menggunakan AI coding agent.

---

## ADR-002 — PostgreSQL

**Decision:** PostgreSQL menjadi kandidat utama database.

**Reason:**

* Relational structure cocok dengan sistem.
* Mendukung foreign key.
* Mendukung JSONB.
* Mendukung transaction.
* Cocok untuk relational business rules.

Final selection dikunci pada tahap Tech Stack.

---

## ADR-003 — Private Ebook Storage

**Decision:** Ebook disimpan pada private storage.

**Reason:**

* Melindungi konten.
* Mendukung access control.
* Download dapat dikontrol.
* URL file tidak menjadi public resource.

---

## ADR-004 — No Microservices for MVP

**Decision:** Tidak menggunakan microservices untuk MVP.

**Reason:**

Microservices akan menambah:

* deployment complexity
* monitoring
* networking
* authentication antar-service
* maintenance overhead

Tanpa kebutuhan yang jelas pada skala awal.

---

# 47. Architecture Constraints

AI coding agent tidak boleh:

* mengubah modular monolith menjadi microservices
* membuat database tambahan tanpa kebutuhan
* membuat storage ebook public
* memindahkan authorization ke frontend
* membuat service baru hanya untuk fitur kecil
* menambahkan Redis/Elasticsearch/Kafka tanpa kebutuhan terukur
* menambahkan cloud service berbayar tanpa approval
* membuat native mobile app untuk MVP

---

# 48. Technology Selection

Technology stack **belum dikunci** pada dokumen ini.

Kandidat yang akan dibandingkan:

### Option A

```text
Next.js
+
Laravel
+
PostgreSQL
```

### Option B

```text
Next.js
+
NestJS
+
PostgreSQL
```

### Option C

```text
Next.js
+
Supabase
```

Pemilihan dilakukan setelah arsitektur ini selesai berdasarkan:

* kemampuan developer
* kemudahan AI coding
* dokumentasi
* authentication
* authorization
* database
* storage
* deployment
* maintenance
* biaya
* scalability
* kebutuhan client

---

# 49. Acceptance Criteria

Architecture dianggap selesai apabila:

* Frontend dan backend memiliki tanggung jawab jelas.
* Backend menjadi pusat business logic.
* Authorization dilakukan server-side.
* Database terpisah dari ebook storage.
* Ebook menggunakan private storage.
* Role dan permission terintegrasi dengan backend.
* Book access rule terintegrasi dengan authorization.
* Reading features memiliki persistence layer.
* Notification memiliki architecture.
* Statistics memiliki architecture.
* Report generation memiliki architecture.
* Activity logging memiliki architecture.
* Development, Testing, Production terpisah.
* Architecture dapat menangani target awal ±500–600 user.
* Tidak terdapat microservices yang tidak diperlukan.

---

# 50. Next Step

Setelah dokumen ini:

```text
01 Requirements       ✅
02 PRD                ✅
03 Roles & Permission ✅
04 Use Cases          ✅
05 User Flows         ✅
06 Database / ERD     ✅
07 Architecture      ✅
08 API Specification  ⏭️
```

Tahap berikutnya adalah:

**08 — API Specification**

Di sana setiap flow akan diterjemahkan menjadi endpoint konkret:

```text
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/books
GET    /api/books/:id
POST   /api/books
PUT    /api/books/:id
...
```

beserta **request, response, authentication, permission, validation, HTTP status code, dan error response**.

Setelah API selesai, baru kita masuk ke **09 UI/UX**, kemudian **10 AI Coding Rules**, dan setelah itu baru kita siap membuat prompt pembangunan sistem secara bertahap.
