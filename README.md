# CoreCircle

**CoreCircle** is a social networking platform that helps people connect with others in their area based on shared values, life stage, and interests. It blends the core features of a modern social app—profiles, matching, messaging—with a focus on meaningful, values-based connections.

---

## 🛠️ Technologies Used

### Frontend

* **React** (with **Next.js**) — Server-side rendering and routing
* **TypeScript** — Type safety and maintainability
* **Tailwind CSS** — Utility-first styling framework
* **Jest + React Testing Library** — Unit testing and component testing

### Backend

* **Node.js + Express** — API server for user and messaging logic
* **MongoDB + Mongoose** — Flexible NoSQL data model to handle varied profile attributes
* **JWT (JSON Web Tokens)** — Stateless authentication
* **Docker** — Containerized development and deployment

---

## 📐 System Design Overview

### 1. Authentication

* JWT tokens are used to authenticate users across frontend and backend
* Auth state is managed in frontend context or localStorage

### 2. User Profile Schema

* Includes:

  * Name, Email, Password (hashed)
  * Profile Picture URL
  * About Me
  * Political Values (enum)
  * Religion (enum)
  * Relationship Status (enum)
  * Pets (boolean)
  * Passions (tags)
  * Interests (tags)
  * Location: City, State

### 3. Matching Engine

* Frontend: Search filters by tags (politics, religion, location, etc.)
* Backend: Aggregation and text search on profile attributes

### 4. Messaging System

* Simple real-time messaging via socket.io (or polling for MVP)
* Only allowed between accepted friend connections

### 5. Friend System

* Request / Accept model
* Backend stores two-way relationships with status

---

## ⚖️ Design Tradeoffs & Rationale

| Area           | Decision                         | Tradeoff / Rationale                                   |
| -------------- | -------------------------------- | ------------------------------------------------------ |
| **Framework**  | Next.js                          | Better SEO and routing vs plain React                  |
| **DB Choice**  | MongoDB                          | Schema flexibility for diverse profile fields          |
| **Auth**       | JWT                              | Simpler stateless auth; can add refresh tokens later   |
| **Styling**    | Tailwind CSS                     | Rapid prototyping, consistent styling                  |
| **State Mgmt** | React Context / useState         | Avoids extra libraries like Redux for early stages     |
| **Monorepo**   | Single repo for frontend/backend | Easier development at MVP stage                        |
| **Messaging**  | Socket.io (future)               | Polling as fallback; scalability to be addressed later |

---

## 🚀 Future Enhancements

* Group messaging and notifications
* Friend recommendations using ML
* Admin dashboard to manage flagged content
* Mobile app (React Native or Expo)

---

## 📂 Run the App

### Dev (local)

```bash
# Start frontend
cd frontend
npm install
npm run dev

# Start backend
cd ../backend
npm install
npm run dev
```

### Docker

```bash
docker-compose up --build
```

---

## 📄 License

MIT License
