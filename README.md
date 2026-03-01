# API Recruitment

Hệ thống API quản lý tuyển dụng được xây dựng với **NestJS**, **MongoDB** và **TypeScript**.

## Tech Stack

- **Framework:** NestJS 9.4
- **Language:** TypeScript 4.9
- **Database:** MongoDB (Mongoose 7.1)
- **Authentication:** Passport.js + JWT
- **Email:** Nodemailer + Handlebars templates
- **Security:** Helmet, bcryptjs, CORS

## Yêu cầu

- Node.js >= 18
- MongoDB (local hoặc Atlas)

## Cài đặt

```bash
# Clone project
git clone <repository-url>
cd API-Recruitment

# Cài đặt dependencies
npm install
```

## Chạy ứng dụng

```bash
# Development (watch mode)
npm run dev

# Production
npm run build
npm run start:prod
```

Server chạy tại: `http://localhost:8000`

## Cấu trúc dự án

```
src/
├── auth/            # Xác thực (Login, Register, JWT, Passport)
├── users/           # Quản lý người dùng
├── companies/       # Quản lý công ty
├── jobs/            # Quản lý tin tuyển dụng
├── resumes/         # Quản lý hồ sơ ứng tuyển (CV)
├── roles/           # Quản lý vai trò (RBAC)
├── permissions/     # Quản lý quyền hạn (RBAC)
├── subscribers/     # Đăng ký nhận thông báo việc làm
├── files/           # Upload file
├── mail/            # Gửi email tự động (Cron job)
├── databases/       # Khởi tạo dữ liệu mẫu
├── core/            # Interceptor, Exception Filter
└── decorator/       # Custom decorators
```

## API Endpoints

Base URL: `/api/v1`

### Auth

| Method | Endpoint         | Auth   | Mô tả                               |
| ------ | ---------------- | ------ | ----------------------------------- |
| POST   | `/auth/register` | Public | Đăng ký tài khoản                   |
| POST   | `/auth/login`    | Public | Đăng nhập                           |
| GET    | `/auth/account`  | JWT    | Lấy thông tin tài khoản + quyền hạn |
| GET    | `/auth/refresh`  | Public | Làm mới access token                |
| POST   | `/auth/logout`   | JWT    | Đăng xuất                           |

### Users

| Method | Endpoint     | Auth   | Mô tả                             |
| ------ | ------------ | ------ | --------------------------------- |
| POST   | `/users`     | JWT    | Tạo người dùng                    |
| GET    | `/users`     | JWT    | Danh sách người dùng (phân trang) |
| GET    | `/users/:id` | Public | Chi tiết người dùng               |
| PATCH  | `/users`     | JWT    | Cập nhật người dùng               |
| DELETE | `/users/:id` | JWT    | Xóa người dùng (soft delete)      |

### Companies

| Method | Endpoint         | Auth   | Mô tả                          |
| ------ | ---------------- | ------ | ------------------------------ |
| POST   | `/companies`     | JWT    | Tạo công ty                    |
| GET    | `/companies`     | Public | Danh sách công ty (phân trang) |
| GET    | `/companies/:id` | Public | Chi tiết công ty               |
| PATCH  | `/companies/:id` | JWT    | Cập nhật công ty               |
| DELETE | `/companies/:id` | JWT    | Xóa công ty (soft delete)      |

### Jobs

| Method | Endpoint    | Auth   | Mô tả                                |
| ------ | ----------- | ------ | ------------------------------------ |
| POST   | `/jobs`     | JWT    | Tạo tin tuyển dụng                   |
| GET    | `/jobs`     | Public | Danh sách việc làm (phân trang, lọc) |
| GET    | `/jobs/:id` | Public | Chi tiết việc làm                    |
| PATCH  | `/jobs/:id` | JWT    | Cập nhật tin tuyển dụng              |
| DELETE | `/jobs/:id` | JWT    | Xóa tin tuyển dụng (soft delete)     |

### Resumes

| Method | Endpoint           | Auth | Mô tả                               |
| ------ | ------------------ | ---- | ----------------------------------- |
| POST   | `/resumes`         | JWT  | Nộp hồ sơ ứng tuyển                 |
| POST   | `/resumes/by-user` | JWT  | Danh sách CV của user hiện tại      |
| GET    | `/resumes`         | JWT  | Danh sách tất cả hồ sơ (phân trang) |
| GET    | `/resumes/:id`     | JWT  | Chi tiết hồ sơ                      |
| PATCH  | `/resumes/:id`     | JWT  | Cập nhật trạng thái hồ sơ           |
| DELETE | `/resumes/:id`     | JWT  | Xóa hồ sơ (soft delete)             |

### Roles

| Method | Endpoint     | Auth | Mô tả                          |
| ------ | ------------ | ---- | ------------------------------ |
| POST   | `/roles`     | JWT  | Tạo vai trò                    |
| GET    | `/roles`     | JWT  | Danh sách vai trò (phân trang) |
| GET    | `/roles/:id` | JWT  | Chi tiết vai trò               |
| PATCH  | `/roles/:id` | JWT  | Cập nhật vai trò               |
| DELETE | `/roles/:id` | JWT  | Xóa vai trò (soft delete)      |

### Permissions

| Method | Endpoint           | Auth | Mô tả                        |
| ------ | ------------------ | ---- | ---------------------------- |
| POST   | `/permissions`     | JWT  | Tạo quyền                    |
| GET    | `/permissions`     | JWT  | Danh sách quyền (phân trang) |
| GET    | `/permissions/:id` | JWT  | Chi tiết quyền               |
| PATCH  | `/permissions/:id` | JWT  | Cập nhật quyền               |
| DELETE | `/permissions/:id` | JWT  | Xóa quyền (soft delete)      |

### Subscribers

| Method | Endpoint              | Auth | Mô tả                              |
| ------ | --------------------- | ---- | ---------------------------------- |
| POST   | `/subscribers`        | JWT  | Đăng ký nhận thông báo việc làm    |
| POST   | `/subscribers/skills` | JWT  | Xem skills đã đăng ký              |
| GET    | `/subscribers`        | JWT  | Danh sách subscribers (phân trang) |
| GET    | `/subscribers/:id`    | JWT  | Chi tiết subscriber                |
| PATCH  | `/subscribers`        | JWT  | Cập nhật skills đăng ký            |
| DELETE | `/subscribers/:id`    | JWT  | Xóa subscriber (soft delete)       |

### Files

| Method | Endpoint        | Auth   | Mô tả                                         |
| ------ | --------------- | ------ | --------------------------------------------- |
| POST   | `/files/upload` | Public | Upload file (jpg, png, pdf, doc - tối đa 1MB) |

### Mail

| Method | Endpoint | Auth   | Mô tả                                    |
| ------ | -------- | ------ | ---------------------------------------- |
| GET    | `/mail`  | Public | Gửi email gợi ý việc làm cho subscribers |

> Cron job tự động gửi email mỗi Chủ nhật lúc 00:00.

## Tính năng chính

- **JWT Authentication** — Access token (15 phút) + Refresh token (1 ngày) lưu trong HttpOnly cookie
- **RBAC (Role-Based Access Control)** — Phân quyền theo Role -> Permissions, kiểm tra tự động tại mỗi endpoint
- **Soft Delete** — Xóa mềm, không mất dữ liệu
- **Audit Trail** — Ghi nhận `createdBy`, `updatedBy`, `deletedBy` cho mọi bản ghi
- **Phân trang & Lọc** — Hỗ trợ `current`, `pageSize`, filter, sort qua query params
- **File Upload** — Multer với whitelist file type + giới hạn dung lượng 1MB
- **Cron Email** — Tự động gửi email gợi ý việc làm hàng tuần dựa trên skills đăng ký
- **API Versioning** — URI-based versioning (v1, v2)
- **Response chuẩn hóa** — Format: `{ statusCode, message, data }`
- **Security** — Helmet, CORS, password hashing với bcryptjs

---

## API Bổ sung (Planned Features)

### 1. Bookmark / Save Jobs (Lưu việc làm yêu thích)

Cho phép ứng viên lưu lại các job quan tâm để xem sau.

| Method | Endpoint              | Auth | Mô tả                            |
| ------ | --------------------- | ---- | --------------------------------- |
| POST   | `/bookmarks/:jobId`   | JWT  | Lưu job yêu thích                |
| DELETE | `/bookmarks/:jobId`   | JWT  | Bỏ lưu job                       |
| GET    | `/bookmarks`          | JWT  | Danh sách jobs đã lưu (phân trang) |
| GET    | `/bookmarks/check/:jobId` | JWT | Kiểm tra job đã lưu chưa        |

**Schema: Bookmark**
```
{
  userId: ObjectId → User
  jobId: ObjectId → Job
  createdAt: Date
}
```

---

### 2. Notification System (Hệ thống thông báo)

Thông báo real-time và lưu trữ cho người dùng khi có sự kiện quan trọng.

| Method | Endpoint                    | Auth | Mô tả                                |
| ------ | --------------------------- | ---- | ------------------------------------- |
| GET    | `/notifications`            | JWT  | Danh sách thông báo (phân trang)      |
| GET    | `/notifications/unread-count` | JWT | Đếm số thông báo chưa đọc           |
| PATCH  | `/notifications/:id/read`   | JWT  | Đánh dấu đã đọc                      |
| PATCH  | `/notifications/read-all`   | JWT  | Đánh dấu tất cả đã đọc              |
| DELETE | `/notifications/:id`        | JWT  | Xóa thông báo                        |

**Schema: Notification**
```
{
  userId: ObjectId → User
  type: string (resume_status, new_job, interview_invite, company_viewed...)
  title: string
  message: string
  relatedId: ObjectId (jobId, resumeId, interviewId...)
  isRead: boolean (default: false)
  createdAt: Date
}
```

**Các loại thông báo:**
- Resume được duyệt/từ chối
- Job mới phù hợp với skills đã đăng ký
- Lời mời phỏng vấn
- Nhắc lịch phỏng vấn

---

### 3. Interview Management (Quản lý phỏng vấn)

Quản lý toàn bộ quy trình phỏng vấn giữa HR và ứng viên.

| Method | Endpoint                        | Auth | Mô tả                                  |
| ------ | ------------------------------- | ---- | --------------------------------------- |
| POST   | `/interviews`                   | JWT  | Tạo lịch phỏng vấn                     |
| GET    | `/interviews`                   | JWT  | Danh sách phỏng vấn (phân trang, lọc)  |
| GET    | `/interviews/:id`               | JWT  | Chi tiết phỏng vấn                     |
| PATCH  | `/interviews/:id`               | JWT  | Cập nhật thông tin phỏng vấn           |
| PATCH  | `/interviews/:id/status`        | JWT  | Cập nhật trạng thái phỏng vấn          |
| DELETE | `/interviews/:id`               | JWT  | Xóa lịch phỏng vấn (soft delete)       |
| GET    | `/interviews/by-user`           | JWT  | Lịch phỏng vấn của user hiện tại       |
| GET    | `/interviews/by-company/:companyId` | JWT | Lịch phỏng vấn theo công ty        |

**Schema: Interview**
```
{
  candidateId: ObjectId → User
  jobId: ObjectId → Job
  companyId: ObjectId → Company
  resumeId: ObjectId → Resume
  interviewDate: Date
  startTime: string
  endTime: string
  location: string (địa chỉ hoặc link meeting online)
  type: string (onsite, online)
  status: string (scheduled → confirmed → completed → cancelled)
  notes: string (ghi chú nội bộ HR)
  feedback: string (đánh giá sau phỏng vấn)
  rating: number (1-5, đánh giá ứng viên)
  createdBy, updatedBy, deletedBy: { _id, email }
  createdAt, updatedAt, isDeleted, deletedAt
}
```

**Tự động:**
- Gửi email mời phỏng vấn khi tạo lịch
- Gửi notification cho ứng viên
- Nhắc nhở trước 1 ngày qua email

---

### 4. Dashboard & Thống kê (Analytics)

API cung cấp dữ liệu thống kê cho Admin và HR.

| Method | Endpoint                          | Auth | Mô tả                                  |
| ------ | --------------------------------- | ---- | --------------------------------------- |
| GET    | `/dashboard/overview`             | JWT  | Tổng quan: số jobs, users, resumes, companies |
| GET    | `/dashboard/resumes-by-status`    | JWT  | Thống kê resume theo trạng thái         |
| GET    | `/dashboard/jobs-by-location`     | JWT  | Thống kê jobs theo địa điểm            |
| GET    | `/dashboard/top-skills`           | JWT  | Top skills đang được tuyển nhiều nhất   |
| GET    | `/dashboard/monthly-stats`        | JWT  | Thống kê theo tháng (jobs, resumes mới) |
| GET    | `/dashboard/company/:companyId`   | JWT  | Thống kê riêng cho 1 công ty           |

**Response mẫu `/dashboard/overview`:**
```json
{
  "totalJobs": 150,
  "totalActiveJobs": 85,
  "totalUsers": 1200,
  "totalCompanies": 45,
  "totalResumes": 3500,
  "resumesPending": 120,
  "resumesApproved": 2800,
  "resumesRejected": 580
}
```

---

### 5. Company Review & Rating (Đánh giá công ty)

Ứng viên đánh giá và review công ty, giúp người khác tham khảo.

| Method | Endpoint                          | Auth   | Mô tả                                |
| ------ | --------------------------------- | ------ | ------------------------------------- |
| POST   | `/reviews`                        | JWT    | Tạo đánh giá công ty                 |
| GET    | `/reviews/company/:companyId`     | Public | Danh sách đánh giá của công ty        |
| GET    | `/reviews/company/:companyId/summary` | Public | Điểm trung bình & tổng quan      |
| GET    | `/reviews/:id`                    | Public | Chi tiết đánh giá                    |
| PATCH  | `/reviews/:id`                    | JWT    | Cập nhật đánh giá (chỉ chủ review)   |
| DELETE | `/reviews/:id`                    | JWT    | Xóa đánh giá (soft delete)           |

**Schema: Review**
```
{
  userId: ObjectId → User
  companyId: ObjectId → Company
  rating: number (1-5)
  title: string
  content: string
  pros: string (điểm tốt)
  cons: string (điểm chưa tốt)
  isAnonymous: boolean (đánh giá ẩn danh)
  status: string (pending, approved, rejected)
  createdBy, updatedBy, deletedBy: { _id, email }
  createdAt, updatedAt, isDeleted, deletedAt
}
```

**Response mẫu `/reviews/company/:id/summary`:**
```json
{
  "companyId": "...",
  "averageRating": 4.2,
  "totalReviews": 35,
  "ratingDistribution": {
    "5": 15,
    "4": 10,
    "3": 5,
    "2": 3,
    "1": 2
  }
}
```

---

### 6. Job Recommendation (Gợi ý việc làm)

Gợi ý việc làm phù hợp dựa trên skills, lịch sử ứng tuyển và sở thích.

| Method | Endpoint                          | Auth | Mô tả                                       |
| ------ | --------------------------------- | ---- | -------------------------------------------- |
| GET    | `/recommendations`                | JWT  | Gợi ý jobs dựa trên profile & skills        |
| GET    | `/recommendations/similar/:jobId` | JWT  | Jobs tương tự với 1 job cụ thể              |
| GET    | `/recommendations/trending`       | Public | Jobs đang được ứng tuyển nhiều nhất        |

**Thuật toán gợi ý:**
- **Skill matching** — So khớp skills của user với yêu cầu job
- **Location preference** — Ưu tiên jobs cùng địa điểm
- **Level matching** — Phù hợp với level kinh nghiệm
- **History-based** — Dựa trên lịch sử ứng tuyển và bookmark
- **Matching score** — Tính điểm phù hợp (0-100%) và sắp xếp

**Response mẫu:**
```json
{
  "recommendations": [
    {
      "job": { "_id": "...", "name": "Backend Developer", "company": {...} },
      "matchScore": 92,
      "matchedSkills": ["NodeJS", "MongoDB", "TypeScript"],
      "missingSkills": ["Docker"]
    }
  ]
}
```
