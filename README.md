# 📘 NoteVerse - Markdown Notes App with Auth (Express + SQLite )

NoteVerse is a simple yet aesthetically styled **notes application** built with **Express.js**, ****, **SQLite3**, and **vanilla CSS**. It allows users to **register, log in, and manage personal markdown notes**, and includes JWT-based authentication and visual feedback via toast messages.

---

## ✨ Key Features

- 🔐 User authentication (register/login) using JWT and sessions
- 📄 Add, view (rendered), and delete markdown or plain text notes
- 💬 Personalized greeting after login (`Welcome back, <username>`)
- 🎨 Aesthetic **metallic-themed** UI with smooth CSS transitions
- 📦 SQLite-based local database for simple data storage
- 🚪 Logout button for better UX
- 🛑 Toast-style popups for invalid credentials, logout, and actions

---

## 🏗️ Folder Structure

```
NoteVerse/
├── public/
│   └── styles.css            # All aesthetic and transition styles
├── db/
│   └── notes.db              # SQLite database file
├── auth.js                   # Auth routes (login/register/logout)
├── server.js                 # Main server file with routes & DB logic
├── package.json              # NPM metadata and dependencies
```

---

## 🧰 Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS Templates, Vanilla CSS
- **Database**: SQLite3 (using `sqlite3` Node module)
- **Auth**: JWT (JSON Web Tokens), bcrypt
- **Markdown Rendering**: `marked` npm package
- **UX Enhancements**: CSS Transitions, Toast Notifications

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/noteverse.git
cd noteverse
```

### 2. Install Dependencies

```bash
npm install
```

### 3. (Optional) Create a `.env` file for JWT secret

```
JWT_SECRET=yourCustomSecretKey
```

### 4. Run the App

```bash
node server.js
```

Now go to: `http://localhost:3000`

---

## 👤 User Flow

1. Visit `/register` to create a new account.
2. Login at `/login` — error message shown for wrong credentials.
3. On login, redirected to `/dashboard` with greeting.
4. Add markdown or text notes from the dashboard.
5. Notes are displayed with formatting using `marked`.
6. Option to delete notes.
7. Logout anytime with the top logout button.

---

## 💾 SQLite Database

You can view or modify the `notes.db` file using the **SQLite extension in VS Code**.

Steps:
- Install "SQLite" extension by Alex Covizzi
- Open the `.db` file from `db/notes.db`
- View/edit `users` and `notes` tables
- Avoid edits while server is running

---

## 📌 Example Note with Markdown

```
# My Note Title

- List item
- **Bold** text
- _Italic_ text
```

Will be rendered beautifully on the dashboard.

---

## 📸 Screenshots

| Login Page      

![Screenshot 2025-06-14 163050](https://github.com/user-attachments/assets/12f89abf-7441-421b-9e2a-2263b232c92a)





| Dashboard          


![Screenshot 2025-06-16 225434](https://github.com/user-attachments/assets/a6590fc0-9c89-445a-b710-77ef02725313)

![Screenshot 2025-06-16 235823](https://github.com/user-attachments/assets/49b49e2b-e02c-4832-b9ee-bb16d3f02b2f)


| Notes Interface

![Screenshot 2025-06-16 114533](https://github.com/user-attachments/assets/01e1e768-d3e5-4f1c-a6dd-9e1a83b0a1f4)


## 📈 Future Suggestions (Optional)

- Add file/image upload for notes
- Move to PostgreSQL or MongoDB for production
- Online deployment via Render or Railway

---

## 🧑‍💻 Author

**Vishal Rai**
👤 **Vishal Rai** – Full Stack Developer  

- GitHub: [@rai0vishal](https://github.com/rai0vishal)  
- Email: raivishal2121@gmail.com

---

## 📄 License

MIT License – Free to use and modify.
