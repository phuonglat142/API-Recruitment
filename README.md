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
