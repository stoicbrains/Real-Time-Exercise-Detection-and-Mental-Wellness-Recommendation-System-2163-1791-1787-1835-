
# 🧠 Project Harmony - Mental Health Support Platform

## 📌 Overview
Project Harmony is a web-based mental health platform that connects users with mental health professionals (psychologists, psychiatrists) and enables communication through video and voice calls.

The platform also includes a community forum where users can share experiences and seek advice. It integrates modern technologies to deliver a secure, real-time, and interactive experience.

---

## 👥 Team Members
- Keshav Soni – 2210991787
- Khushal Goyal – 2210991791
- Kushal Goel – 2210991835
- Rishi Raj – 2210992163

---

## 📚 Table of Contents
- Technologies Used
- Features
- Architecture Overview
- Setup and Installation
- Frontend Structure
- Backend Structure
- API and Services
- Sendbird Integration
- Database
- Security Considerations
- Future Enhancements
- Contributing
- License

---

## 🛠️ Technologies Used

### Frontend
- Next.js
- Tailwind CSS
- Framer Motion

### Backend
- Node.js
- Express.js


### Database

- **Firestore** → real-time chat & presence
- **MongoDB** → user profiles, forum posts

### Third-Party Integrations
- Sendbird SDK for calls
- Firebase Authentication for login

---

## ⚙️ Setup and Installation

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn
- MongoDB (local or Atlas)
- Firebase project with Firestore enabled
- Sendbird account

---

### 1. Clone the Repository

```bash
git clone https://github.com/stoicbrains/Real-Time-Exercise-Detection-and-Mental-Wellness-Recommendation-System-2163-1791-1787-1835-.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables
```bash
GOOGLE_SECRET=your_google_secret_key
NEXTAUTH_URL=https://harmony-stoicbrains-github-io.vercel.app/
NEXT_PUBLIC_SECRET=your_public_secret_key
NEXT_PUBLIC_APP_ID=your_sendbird_app_id
MONGODB_URI=your_mongodb_connection_string
GOOGLE_ID=your_google_client_id
```

### 4. Run the Application

```bash
npm run dev
```


## 🎨 Frontend Structure

- **Pages** → Route-based components (`index.js`, `forum.js`, `profile.js`)
- **Components** → Reusable UI elements (buttons, forms, modals)
- **Animations** → Powered by Framer Motion
- **Styles** → Tailwind CSS configuration and global styles

---

## 🔧 Backend Structure

- **server.js** → Main backend entry point
- **Routes** → Authentication, chat, and forum APIs
- **Controllers** → Business logic
- **Models** → MongoDB schemas

---

## 🔌 API and Services

### Authentication (Firebase)
- `POST /auth/signup` – Register a new user
- `POST /auth/login` – Login user

### Chat (Firestore)
- `GET /chat/:userId` – Fetch user messages
- `POST /chat` – Send a message

### Forum (MongoDB)
- `GET /forum` – Fetch all posts
- `POST /forum` – Create a new post

---

## 📡 Sendbird Integration

- Connects using Sendbird API key
- Generates unique user IDs for sessions

### Features
- Voice calls
- Video calls
- Call history

---

## 🗄️ Database

### Firebase Firestore

**Collection: `messages`**
- userId
- message
- timestamp

---

### MongoDB

**Users Collection**
- name
- email
- role (client / psychiatrist)

**Forum Posts Collection**
- authorId
- content
- timestamp

---

## 🔐 Security Considerations

- Firebase Authentication for secure login
- End-to-end encrypted calls via Sendbird
- Firestore and MongoDB access rules
- Secure handling of sensitive user data  