# 📢 SpeakStack - A Community Forum Platform

**SpeakStack** is a full-featured MERN stack forum web application where users can share thoughts, discuss ideas, comment, vote, and interact with community posts. It includes user dashboards, admin controls, membership perks, and reporting functionality.

## 🔗 Live Links

- **Client**: [SpeakStack]( https://speakstack-a1b8a.web.app)

---

## 🧠 Features

### ✅ Authentication & Authorization
- Firebase Auth (Email/Password, Google)
- JWT-based protected routes
- Role-based access (user/admin)

### 📬 Post Features
- Add Post (limit to 5 posts unless member)
- Tag-based search
- Vote (upvote/downvote)
- Sort by Newest / Popularity (vote difference)
- View full post details
- Paginated (5 per page)

### 💬 Comment System
- View all comments on post details page
- Show email, truncated comment text (20 chars), "Read More" modal
- Feedback dropdown (static 3 options)
- Report button enabled only after feedback selected
- Prevent duplicate reporting

### 🏆 Membership System
- Payment via Stripe
- Upgrades user to Gold membership
- Unlocks ability to post unlimited content
- Shows Gold badge

### 📣 Announcement System
- Admin can post announcements
- Users can view them
- Unread count shown as notification

### 🧑 User Dashboard
- View profile info + badges
- See last 3 posts
- Add Post form
- My Posts: table with delete + comment view access

### 🛠️ Admin Dashboard
- Admin Profile
- Manage Users (Make Admin, Search)
- View and delete reported comments
- Post announcements

---

## 🔧 Technologies

### Frontend:
- React + Vite
- Tailwind CSS + DaisyUI
- React Router DOM
- React Hook Form
- Axios + AxiosSecure (with JWT)
- TanStack Query v5
- Firebase Auth
- Stripe

### Backend:
- Node.js + Express
- MongoDB + MongoDB Atlas
- CORS, Dotenv, JWT
- Vercel deployment

---

## 📂 Folder Structure (Frontend)

