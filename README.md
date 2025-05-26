
# Manzoma System Backend

مشروع Backend لمنظومة تسجيل الحضور والانصراف باستخدام:

- **Express.js** كإطار عمل السيرفر
- **PostgreSQL** كقاعدة بيانات
- **JWT** لتأمين الـ APIs
- **bcrypt** لتشفير كلمات المرور
- بيتم تنظيم الكود في Controllers, Routes, Models
- دعم كامل لـ CRUD لكل الجداول: Super Admins, Clients, Subscriptions, Branches, Users, Attendance

---

## المتطلبات

- Node.js >= 16
- PostgreSQL >= 12
- npm أو yarn

---

## الإعداد والتشغيل

1. استنسخ المشروع:
   ```bash
   git clone <repo-url>
   cd <project-folder>
   ```

2. ثبت الحزم:
   ```bash
   npm install
   ```

3. أنشئ ملف `.env` في جذر المشروع وأضف فيه المتغيرات التالية:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=manzomaa
   DB_USER=postgres
   DB_PASSWORD=2003
   PORT=5000
   JWT_SECRET=سر_عشوائي_قوي
   ```

4. تأكد من وجود قواعد البيانات والجداول (PostgreSQL)

5. شغّل السيرفر:
   ```bash
   node app.js
   ```

---

## هيكل المشروع

```
attendance-backend/
│
├── app.js               # نقطة الدخول
├── db.js                # إعداد الاتصال بقاعدة البيانات
├── routes/              # ملفات Routes لكل موديل
│   ├── superAdmin.routes.js
│   ├── client.routes.js
│   ├── subscription.routes.js
│   ├── branch.routes.js
│   ├── user.routes.js
│   └── attendance.routes.js
├── controllers/         # منطق التعامل مع البيانات
│   ├── superAdmin.controller.js
│   ├── client.controller.js
│   ├── subscription.controller.js
│   ├── branch.controller.js
│   ├── user.controller.js
│   └── attendance.controller.js
├── middleware/          # Middlewares مثل التحقق من JWT
│   └── authenticateToken.js
├── models/              # لو حبيت تضيف ORM أو نماذج بيانات
└── .env                 # ملف الإعدادات (محلياً فقط)
```

---

## توثيق الـ APIs

---

### Super Admins

| Method | Endpoint                | الوصف                  | Body Parameters                        | Authentication |
|--------|-------------------------|------------------------|--------------------------------------|----------------|
| POST   | /api/super-admins/register | تسجيل مشرف جديد         | `{ name, email, password }`           | لا             |
| POST   | /api/super-admins/login    | تسجيل الدخول           | `{ email, password }`                 | لا             |
| GET    | /api/super-admins          | جلب جميع المشرفين      | -                                    | نعم            |

---

### Clients

| Method | Endpoint           | الوصف              | Body Parameters                    | Authentication |
|--------|--------------------|--------------------|----------------------------------|----------------|
| POST   | /api/clients       | إنشاء عميل جديد    | `{ name, email?, phone? }`        | نعم            |
| GET    | /api/clients       | جلب جميع العملاء   | -                                | نعم            |
| GET    | /api/clients/:id   | جلب عميل معين      | -                                | نعم            |
| PUT    | /api/clients/:id   | تعديل بيانات عميل  | `{ name?, email?, phone? }`       | نعم            |
| DELETE | /api/clients/:id   | حذف عميل           | -                                | نعم            |

---

### Subscriptions

| Method | Endpoint               | الوصف                  | Body Parameters                             | Authentication |
|--------|------------------------|------------------------|---------------------------------------------|----------------|
| POST   | /api/subscriptions     | إنشاء اشتراك جديد      | `{ client_id, plan_type, starts_at, ends_at }` | نعم            |
| GET    | /api/subscriptions     | جلب كل الاشتراكات      | -                                           | نعم            |
| GET    | /api/subscriptions/:id | جلب اشتراك معين        | -                                           | نعم            |
| PUT    | /api/subscriptions/:id | تعديل اشتراك           | `{ client_id?, plan_type?, starts_at?, ends_at? }` | نعم            |
| DELETE | /api/subscriptions/:id | حذف اشتراك             | -                                           | نعم            |

---

### Branches

| Method | Endpoint           | الوصف              | Body Parameters                        | Authentication |
|--------|--------------------|--------------------|--------------------------------------|----------------|
| POST   | /api/branches      | إنشاء فرع جديد     | `{ name, location?, qr_code?, client_id }` | نعم            |
| GET    | /api/branches      | جلب كل الفروع      | -                                    | نعم            |
| GET    | /api/branches/:id  | جلب فرع معين       | -                                    | نعم            |
| PUT    | /api/branches/:id  | تعديل فرع          | `{ name?, location?, qr_code?, client_id? }` | نعم            |
| DELETE | /api/branches/:id  | حذف فرع            | -                                    | نعم            |

---

### Users

| Method | Endpoint           | الوصف               | Body Parameters                      | Authentication |
|--------|--------------------|---------------------|------------------------------------|----------------|
| POST   | /api/users/register | تسجيل مستخدم جديد   | `{ name, email, password, role, branch_id? }` | لا             |
| POST   | /api/users/login    | تسجيل دخول مستخدم   | `{ email, password }`               | لا             |
| GET    | /api/users         | جلب جميع المستخدمين | -                                  | نعم            |
| GET    | /api/users/:id     | جلب مستخدم معين     | -                                  | نعم            |
| PUT    | /api/users/:id     | تعديل مستخدم        | `{ name?, email?, password?, role?, branch_id? }` | نعم            |
| DELETE | /api/users/:id     | حذف مستخدم          | -                                  | نعم            |

---

### Attendance

| Method | Endpoint                | الوصف                 | Body Parameters                          | Authentication |
|--------|-------------------------|-----------------------|------------------------------------------|----------------|
| POST   | /api/attendance/checkin | تسجيل حضور (Check-in)  | `{ user_id, branch_id, location? }`      | نعم            |
| POST   | /api/attendance/checkout| تسجيل انصراف (Check-out) | `{ user_id, branch_id, location? }`    | نعم            |
| GET    | /api/attendance/reports | تقارير الحضور         | (يمكن إضافة فلاتر مثل user_id, date)   | نعم            |

---

## ملاحظات

- يجب إرسال الـ JWT Token في هيدر Authorization كالتالي:
  ```
  Authorization: Bearer <token>
  ```
- كل العمليات المحمية تحتاج التوكن عشان تقدر تعملها.

---

## مراجع

- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [jsonwebtoken npm package](https://www.npmjs.com/package/jsonwebtoken)
- [bcrypt npm package](https://www.npmjs.com/package/bcrypt)

---

## ترخيص

هذا المشروع مفتوح المصدر تحت رخصة MIT.

---
# Happy Coding! 🚀
