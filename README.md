# HIGHWAY DELITE ASSIGNMENT

**Project Name:** BookIt: Experiences & Slots  
**Live Link:** [https://highwaydelite-lyart.vercel.app/](https://highwaydelite-lyart.vercel.app/)

---

Built a complete end-to-end web application where users can **explore travel experiences**, **view details**, **select available slots**, and **complete bookings**.

---

## ⚙️ Tech Stack

### 🖥️ Frontend
- **Framework:** Next.js
- **Styling:** Tailwind CSS  
- **State Management:** React Hooks  
- **API Handling:** Axios  
- **Routing:** Next.js App Router  
- **Design Fidelity:** Matched to Figma design across all breakpoints  

### 🧩 Backend
- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB (via Mongoose)  
- **Validation:** Zod

---

## 🧪 Features Implemented

- ✅ **Pixel-perfect UI** — matches the provided Figma design  
- ✅ **Fully responsive** — works seamlessly on mobile, tablet, and desktop  
- ✅ **Dynamic data** — experiences and slots fetched from backend APIs  
- ✅ **Slot selection & booking flow** — complete user journey from browsing to checkout  
- ✅ **Zod validation** — backend input validation using Zod schemas  
- ✅ **Promo code validation** — supports discount codes like `SAVE10` and `FLAT100`  
- ✅ **Booking confirmation result screen** — displays success or failure details clearly

---

## 🔄 Integration Flow
1. **Frontend** fetches data from backend via REST APIs.  
2. **User Journey:** `Home → Details → Checkout → Result`.  
3. **Dynamic Content:** Experiences, slots, and booking details are loaded from the backend.  
4. **Promo Validation:** Frontend sends promo code to backend, which returns discount details.  

---

## ☁️ Deployment

- **Frontend (Next.js)** → Hosted on **Vercel**  
- **Backend (Express)** → Hosted on **Render **  
- **Database** → MongoDB Atlas
  
---

## ⚙️ Local Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/utkarshrastogi121/hd_assignment.git
cd hd_assignment
```
### Setup Backend
```bash
cd backend
npm install
npm run dev
```
.env example
```bash
PORT=5500
MONGO_URI=your_mongo_connection_string
```
### Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```
.env example:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

