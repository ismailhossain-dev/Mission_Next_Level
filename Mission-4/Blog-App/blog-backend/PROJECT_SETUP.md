# 🚀 Prisma + PostgreSQL + Express + TypeScript Setup

This note contains the complete setup process and important Prisma commands for a backend project using:

- Prisma ORM
- PostgreSQL / Prisma Postgres
- Express.js
- TypeScript
- Node.js

---

# ⭐ Important Prisma Commands

## 1. `npx prisma generate`

```bash
npx prisma generate
```

### এটা কী করে?

এটা `generated/prisma` folder-এর ভিতরে **Prisma Client generate/update** করে।

Prisma schema অনুযায়ী TypeScript-এ database-এর সাথে কাজ করার জন্য প্রয়োজনীয় Prisma Client তৈরি হয়।

### মনে রাখবে:

```text
npx prisma generate
        ↓
Prisma Client generate/update
        ↓
generated/prisma
```

❌ এটা database-এ table তৈরি করে না।

❌ এটা migration তৈরি করে না।

---

## 2. `npx prisma migrate dev`

```bash
npx prisma migrate dev --name init
```

অথবা:

```bash
npx prisma migrate dev
```

### এটা কখন করবো?

Prisma schema-তে নতুন model/table বা অন্য কোনো database change করার পরে।

### এটা কী করে?

```text
Prisma Schema
      ↓
Migration তৈরি
      ↓
Database update
      ↓
Prisma Client generate/update
```

Migration folder-এর ভিতরে SQL migration file তৈরি হবে।

Example:

```text
prisma/
└── migrations/
    └── 20260907123456_init/
        └── migration.sql
```

Migration file-এর ভিতরে database পরিবর্তনের SQL query দেখা যায়।

### Best Practice

প্রথম migration:

```bash
npx prisma migrate dev --name init
```

পরবর্তীতে feature অনুযায়ী meaningful name দেওয়া ভালো:

```bash
npx prisma migrate dev --name add_post_model
```

```bash
npx prisma migrate dev --name add_comment_model
```

---

## 3. `npx prisma db push`

```bash
npx prisma db push
```

### এটা কখন ব্যবহার করবো?

যদি Prisma schema অনুযায়ী database table তৈরি/update করতে চাই কিন্তু migration file দরকার না হয়।

```text
Prisma Schema
      ↓
Database update
```

⚠️ `db push` migration history তৈরি করে না।

### যদি table create না হয়

Development-এর সময় প্রয়োজন হলে:

```bash
npx prisma db push
```

তারপর:

```bash
npx prisma generate
```

---

## 4. `npx prisma format`

```bash
npx prisma format
```

### কাজ

Prisma schema-এর code সুন্দরভাবে format করে।

Example:

```text
Messy Prisma Schema
        ↓
npx prisma format
        ↓
Clean & formatted Schema
```

---

## 5. `npx prisma migrate reset`

```bash
npx prisma migrate reset
```

### কাজ

Development database reset করে।

সাধারণভাবে:

```text
Existing Tables/Data
        ↓
Delete/Reset
        ↓
Migrations আবার apply
```

⚠️ এতে database-এর existing data delete হয়ে যেতে পারে।

Production database-এ ব্যবহার করার আগে অবশ্যই সতর্ক থাকতে হবে।

---

# 📌 Prisma Command Quick Notes

| Command                              | কাজ                              |
| ------------------------------------ | -------------------------------- |
| `npx prisma generate`                | Prisma Client generate/update    |
| `npx prisma migrate dev --name init` | Migration তৈরি + Database update |
| `npx prisma db push`                 | Migration ছাড়াই Database update  |
| `npx prisma format`                  | Prisma schema format             |
| `npx prisma migrate reset`           | Development database reset       |
| `npx prisma migrate status`          | Migration status check           |
| `npx prisma studio`                  | Database GUI দিয়ে দেখা           |
| `npx prisma validate`                | Prisma schema validate           |

---

# 🏗️ Project Setup

## Prisma + Express + TypeScript

Prisma setup-এর জন্য সাধারণ flow:

```text
Project Create
      ↓
Git Setup
      ↓
npm Setup
      ↓
TypeScript Setup
      ↓
Prisma Install
      ↓
Prisma Init
      ↓
Database Connect
      ↓
Prisma Schema / Models
      ↓
Migration
      ↓
Prisma Client
      ↓
Express Setup
```

---

# 1️⃣ Git Setup

Project শুরু করার সময়:

```bash
git init
```

তারপর `.gitignore` file তৈরি করবো।

### `.gitignore`

```gitignore
node_modules
dist
generated
.env
```

### কেন?

- `node_modules` → dependency files
- `dist` → compiled JavaScript files
- `generated` → generated Prisma files
- `.env` → database password এবং secret information

⚠️ `.env` কখনো GitHub-এ push করবে না।

---

# 2️⃣ Initialize npm

```bash
npm init -y
```

### `-y` এর মানে

সব default question-এর answer automatically `yes` দিয়ে `package.json` তৈরি করবে।

---

# 3️⃣ Install TypeScript

```bash
npm install typescript tsx @types/node --save-dev
```

তারপর:

```bash
npx tsc --init
```

এতে `tsconfig.json` তৈরি হবে।

---

# 4️⃣ Install Prisma

Prisma 7 ব্যবহার করলে:

```bash
npm install prisma@7.10.0 @types/pg --save-dev
```

---

# 5️⃣ Install Prisma Client + PostgreSQL

```bash
npm install @prisma/client@7.10.0 @prisma/adapter-pg pg dotenv
```

এখানে:

- `@prisma/client` → Prisma Client
- `@prisma/adapter-pg` → PostgreSQL adapter
- `pg` → PostgreSQL driver
- `dotenv` → `.env` থেকে environment variables নেওয়ার জন্য

---

# 6️⃣ TypeScript Configuration

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "module": "esnext",
    "moduleResolution": "bundler",
    "target": "es2023",
    "types": ["node"],
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    "noUncheckedIndexedAccess": true,
    "strict": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true
  },
  "exclude": ["node_modules", "dist"]
}
```

### Important

```json
"types": ["node"]
```

Node.js related TypeScript types ব্যবহার করার জন্য।

যেমন:

```ts
process.env;
```

---

### `rootDir`

যদি project-এর `src` folder-এর বাইরে TypeScript/TSX file থাকে এবং `rootDir` related error আসে, তখন:

```json
"rootDir": "./"
```

ব্যবহার করা যেতে পারে।

তবে সব project-এ এটা প্রয়োজন হয় না।

---

# 7️⃣ Package.json

`package.json`-এ:

```json
"type": "module"
```

দিতে হবে যদি ES Module ব্যবহার করি।

Example:

```json
{
  "type": "module"
}
```

---

# 8️⃣ Initialize Prisma

```bash
npx prisma init --output ../generated/prisma
```

এতে Prisma setup-এর প্রয়োজনীয় files তৈরি হবে।

---

# 9️⃣ Database Connection

Prisma Postgres বা অন্য PostgreSQL provider থেকে database connection string নিতে হবে।

`.env` file:

```env
DATABASE_URL="your_database_connection_string"
```

Example:

```env
DATABASE_URL="postgresql://username:password@host:5432/database"
```

⚠️ নিজের real database password কখনো README বা GitHub-এ লিখবে না।

---

# 🔐 Environment Variable

`.env`:

```env
DATABASE_URL="your_database_connection_string"

JWT_ACCESS_SECRET="your_access_secret"
JWT_REFRESH_SECRET="your_refresh_secret"

BCRYPT_SALT_ROUNDS=10
```

---

# 🗄️ Prisma Schema

Defaultভাবে Prisma schema একটি file-এ থাকতে পারে:

```text
prisma/
└── schema.prisma
```

কিন্তু বড় project হলে multiple Prisma files ব্যবহার করা যায়।

---

# 📂 Multiple Prisma Schema Files

Project বড় হলে:

```text
prisma/
└── schema/
    ├── schema.prisma
    ├── user.prisma
    ├── profile.prisma
    ├── post.prisma
    ├── comment.prisma
    └── enums.prisma
```

এতে আলাদা আলাদা model আলাদা file-এ রাখা যায়।

---

# ⚙️ Prisma Config

`prisma7.config.ts` অথবা project-এর Prisma config file-এ:

```ts
schema: "prisma/schema";
```

এর মাধ্যমে Prisma-কে বলে দেওয়া হয়:

```text
Prisma Schema files
        ↓
prisma/schema folder
```

থেকে নিতে হবে।

---

# 📦 Prisma Client Output

`prisma/schema/schema.prisma` file-এ:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../../generated/prisma"
}
```

### `../../` কেন?

ধরি:

```text
project/
│
├── generated/
│
└── prisma/
    └── schema/
        └── schema.prisma
```

`schema.prisma` থেকে:

```text
../
```

→ `prisma`

আবার:

```text
../
```

→ project root

তারপর:

```text
generated/prisma
```

তাই:

```prisma
output = "../../generated/prisma"
```

---

# 🧩 Prisma Multiple File Structure

Final structure:

```text
project/
│
├── generated/
│   └── prisma/
│
├── prisma/
│   ├── migrations/
│   │
│   └── schema/
│       ├── schema.prisma
│       ├── user.prisma
│       ├── profile.prisma
│       ├── post.prisma
│       ├── comment.prisma
│       └── enums.prisma
│
├── src/
│
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── prisma7.config.ts
```

---

# 🧱 Create Prisma Models

Prisma schema-তে model তৈরি করার পরে database-এর সাথে sync করতে হবে।

Example:

```prisma
model User {
  id       String @id @default(uuid())
  name     String
  email    String @unique
  password String
}
```

---

# 🔄 After Creating Models

Model তৈরি করার পরে সাধারণত:

```bash
npx prisma format
```

তারপর migration:

```bash
npx prisma migrate dev --name init
```

তারপর প্রয়োজন হলে:

```bash
npx prisma generate
```

---

# 🗃️ Migration Flow

```text
Prisma Model
     ↓
npx prisma format
     ↓
npx prisma migrate dev --name init
     ↓
Migration File
     ↓
Database Update
     ↓
Prisma Client
```

---

# 🖥️ Prisma Studio

Database দেখতে:

```bash
npx prisma studio
```

এতে browser-based GUI open হবে।

এখান থেকে দেখতে পারবো:

- Users
- Posts
- Comments
- Profiles
- অন্যান্য tables

---

# ⚡ Generate Prisma Client

```bash
npx prisma generate
```

এতে:

```text
generated/
└── prisma/
```

এর ভিতরে Prisma Client generate/update হবে।

তারপর TypeScript code-এ Prisma Client ব্যবহার করা যাবে।

---

# 🧪 Run TypeScript File

কোনো TypeScript script run করতে:

```bash
npx tsx src/script.ts
```

এটা ব্যবহার করে database থেকে data নিয়ে console-এ দেখতে পারি।

Example:

```text
Database
   ↓
Prisma
   ↓
src/script.ts
   ↓
console.log()
```

---

# 🚂 Express Setup

## Install Express

```bash
npm install express
```

---

# 📦 Install Backend Packages

```bash
npm install express bcryptjs cors cookie-parser http-status dotenv jsonwebtoken
```

---

# 🔷 TypeScript Packages

```bash
npm install -D @types/express @types/bcryptjs @types/cors @types/cookie-parser @types/jsonwebtoken
```

---

# 📜 Express Package Explanation

| Package         | কাজ                           |
| --------------- | ----------------------------- |
| `express`       | Backend server/API তৈরি       |
| `bcryptjs`      | Password hash/compare         |
| `cors`          | Cross-origin request handle   |
| `cookie-parser` | Cookie read করার জন্য         |
| `http-status`   | HTTP status code সহজে ব্যবহার |
| `dotenv`        | `.env` variables ব্যবহার      |
| `jsonwebtoken`  | JWT তৈরি/verify               |

---

# 📁 Express Project Structure

```text
src/
│
├── modules/
│   ├── users/
│   ├── posts/
│   └── comments/
│
├── middleware/
│
├── lib/
│   └── prisma.ts
│
├── app.ts
└── server.ts
```

---

# 📜 package.json Scripts

Example:

```json
{
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

---

# ▶️ Run Project

### Development

```bash
npm run dev
```

### TypeScript Build

```bash
npm run build
```

### Production

```bash
npm start
```

---

# 🔨 TypeScript Compile

```bash
npx tsc
```

এটা TypeScript code compile করে JavaScript তৈরি করবে।

```text
src/
   server.ts
      ↓
npx tsc
      ↓
dist/
   server.js
```

---

# 📝 Important Prisma Notes

## `generate` vs `migrate`

### `npx prisma generate`

```text
Prisma Client generate/update
```

❌ Table create করে না।

---

### `npx prisma migrate dev`

```text
Migration তৈরি
+
Database update
+
Prisma Client generate/update
```

---

### `npx prisma db push`

```text
Prisma Schema
      ↓
Database update
```

❌ Migration history তৈরি করে না।

---

# 🧠 Easy Way to Remember

```text
generate
   ↓
Prisma Client তৈরি

migrate dev
   ↓
Migration + Database Update

db push
   ↓
Direct Database Update

format
   ↓
Schema সুন্দর/format

studio
   ↓
Database visually দেখো

migrate reset
   ↓
Development Database Reset
```

---

# 🔁 Recommended Workflow

প্রতিবার Prisma model change করার পরে:

```bash
npx prisma format
```

তারপর:

```bash
npx prisma migrate dev --name your_migration_name
```

প্রয়োজনে:

```bash
npx prisma generate
```

তারপর:

```bash
npm run dev
```

---

# 🚨 Important Warning

`npx prisma migrate reset` চালানোর আগে অবশ্যই নিশ্চিত হতে হবে যে database-এর existing data delete করা যাবে।

```bash
npx prisma migrate reset
```

⚠️ Development environment ছাড়া এটি ব্যবহার করার সময় বিশেষভাবে সতর্ক থাকতে হবে।

---

# 📌 Complete Command List

```bash
# Git
git init

# NPM
npm init -y

# TypeScript
npm install typescript tsx @types/node --save-dev
npx tsc --init

# Prisma
npm install prisma@7.10.0 @types/pg --save-dev
npm install @prisma/client@7.10.0 @prisma/adapter-pg pg dotenv

# Prisma Initialize
npx prisma init --output ../generated/prisma

# Prisma Format
npx prisma format

# Prisma Generate
npx prisma generate

# Prisma Migration
npx prisma migrate dev --name init

# Prisma Database Push
npx prisma db push

# Prisma Migration Status
npx prisma migrate status

# Prisma Reset
npx prisma migrate reset

# Prisma Studio
npx prisma studio

# TypeScript Run
npx tsx src/script.ts

# TypeScript Build
npx tsc

# Express
npm install express bcryptjs cors cookie-parser http-status dotenv jsonwebtoken

# TypeScript Types
npm install -D @types/express @types/bcryptjs @types/cors @types/cookie-parser @types/jsonwebtoken

# Development
npm run dev

# Production Build
npm run build

# Production Start
npm start
```

---

# 🎯 Final Prisma Workflow

```text
1. Create Project
       ↓
2. git init
       ↓
3. npm init -y
       ↓
4. TypeScript Setup
       ↓
5. Prisma Install
       ↓
6. Prisma Init
       ↓
7. Database URL → .env
       ↓
8. Prisma Schema / Models
       ↓
9. npx prisma format
       ↓
10. npx prisma migrate dev --name init
       ↓
11. npx prisma generate
       ↓
12. npx prisma studio
       ↓
13. Connect Prisma with Express
       ↓
14. npm run dev
```

---

# 💡 Quick Memory Trick

```text
FORMAT
→ Code সুন্দর করো

GENERATE
→ Prisma Client বানাও

MIGRATE
→ Migration বানাও + Database Update করো

DB PUSH
→ Migration ছাড়া Database Update করো

STUDIO
→ Database দেখো

RESET
→ Development Database Reset করো

TSC
→ TypeScript → JavaScript

TSX
→ TypeScript File Run করো
```

---

# 👨‍💻 Author

**Mohammad Ismail Hossain**

MERN Stack Developer

---

⭐ Keep Learning  
🚀 Keep Building  
💻 Keep Practicing
