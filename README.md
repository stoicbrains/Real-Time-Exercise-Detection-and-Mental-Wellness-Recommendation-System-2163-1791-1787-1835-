
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