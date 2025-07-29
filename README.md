## 🚀 Project Overview

**EmberSync** is a modern, secure, and user-centric web application designed to empower users to easily create, view, and manage their personal digital profiles. It offers flexible authentication options and an intuitive interface for updating personal information, including profile pictures.

Built with the latest Next.js App Router, Firebase for backend services, and a sleek UI powered by Tailwind CSS and Shadcn UI, ProfilePilot provides a robust foundation for any application requiring personalized user profiles.

## ✨ Features

- **Flexible Authentication:**
  - **Custom Email & Password:** Traditional sign-up and login.
  - **Google Authentication:** Seamless social login via Google.
  - **GitHub Authentication:** Easy social login via GitHub.
- **Personalized Profile Management:**
  - **Create Profile:** First-time users are guided to set up their initial profile after registration.
  - **View Profile:** Authenticated users can view their comprehensive profile details.
  - **Edit Profile:** Intuitive interface to update personal information (name, bio, education, etc.).
  - **Profile Picture Upload:** Securely upload and manage profile images (integrated with Cloudinary, if applicable).
- **Secure Session Management:** Utilizes Next.js Server Actions and Firebase session cookies for secure and persistent user sessions.
- **Robust Error Handling:** Comprehensive error messages for authentication failures and other common issues.
- **Modern UI/UX:**
  - Responsive design for a seamless experience across devices.
  - Clean and functional UI components powered by Shadcn UI.
  - Toast notifications powered by Sonner for user feedback.
- **Next.js App Router Architecture:** Leverages Server Components for efficient data fetching and rendering, and Client Components for interactivity.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React Server Components)
- **Authentication & Database:** [Firebase](https://firebase.google.com/) (Authentication, Firestore)
- **Session Management:** Next.js [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
- **Notifications:** [Sonner](https://sonner.emilkowalski.dk/) (Toast notifications)
- **Fonts:** [Next.js Geist & Geist Mono](https://nextjs.org/docs/app/api-reference/components/font)
- **(Optional) Image Storage:** [Cloudinary](https://cloudinary.com/) (if used for profile pictures)

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v18.x or later recommended)
- npm or Yarn (npm v8+ recommended)
- A Firebase Project with:
  - Firebase Authentication enabled (Email/Password, Google, GitHub providers)
  - Firestore Database initialized
  - Web app configured (copy your Firebase SDK config)
  - **Firebase Admin SDK credentials** (service account key JSON file for server-side operations)
- **(Optional) Cloudinary Account:** If you plan to implement profile picture uploads.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/Sarthak0085/ember-sync.git](https://github.com/Sarthak0085/ember-sync.git)
    cd ember-sync
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

### Environment Variables

Create a `.env.local` file in the root of your project and add your Firebase and other credentials.

```env
# Firebase Client SDK Configuration (from Firebase Console -> Project settings -> Your apps)
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=YOUR_FIREBASE_MEASUREMENT_ID

# Firebase Admin SDK Configuration (for server-side operations - NOT for client)
NEXT_FIREBASE_PROJECT_ID = YOUR_FIREBASE_PROJECT_ID
NEXT_FIREBASE_PRIVATE_KEY_ID = YOUR_FIREBASE_PRIVATE_KEY_ID
NEXT_FIREBASE_PRIVATE_KEY = YOUR_FIREBASE_PRIVATE_KEY
NEXT_FIREBASE_CLIENT_ID = YOUR_FIREBASE_CLIENT_ID
NEXT_FIREBASE_CLIENT_EMAIL = YOUR_FIREBASE_CLIENT_EMAIL
NEXT_FIREBASE_AUTH_URI = YOUR_FIREBASE_AUTH_URI
NEXT_FIREBASE_TOKEN_URI = YOUR_FIREBASE_TOKEN_URI
NEXT_FIREBASE_AUTH_PROVIDER_X509_CERT_URL = YOUR_FIREBASE_AUTH_PROVIDER_X509_CERT_URL
NEXT_FIREBASE_CLIENT_X509_CERT_URL = YOUR_FIREBASE_CLIENT_X509_CERT_URL

# Cloudinary Configuration for Image Uploads
NEXT_CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
NEXT_CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
NEXT_CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET
```

### Running the Development Server

1.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
2.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💡 Usage

- **Homepage:** Explore the app's features and calls to action.
- **Register/Login:**
  - Click "Join for Free" or "Login" in the header.
  - Choose between custom email/password, Google, or GitHub for authentication.
- **Profile Setup:** If it's your first time logging in, you'll be directed to a page to set up your profile.
- **View & Edit Profile:** Once logged in, navigate to your profile page to view your details and make updates.
- **Logout:** Click the "Logout" button in the header to end your session.

## 📁 Project Structure (Key Files)

```
src/
├── app/
│ ├── layout.tsx         # Root layout, includes AuthProvider and global styles.
│ ├── page.tsx           # Homepage of the application.
│ ├── not-found.tsx      # Custom 404 Not Found page.
│ └── auth/              # Authentication routes group
│ ├── login/
│ │ └── page.tsx         # Login page (custom, social).
│ └── register/
│ └── page.tsx           # Registration page (custom, social).
│ └── profile/
│ ├── [profileId]/       # Dynamic route for specific profiles
│ │ └── edit/
│ │ └── page.tsx         # Profile editing page.
│ ├── setup
| | └── page.tsx         # Profile setup page.
| ├──action.ts           # Profile server actions (e.g., createProfile, getProfile)
│ └── page.tsx           # Profile viewing page.
├── components/
│ ├── ui/                # Shadcn UI components.
| ├── auth/              # Auth components
| ├── profile/           # Profile components
│ ├── header.tsx         # Application-wide header.
│ └── main-layout.tsx    # Conditionally renders header based on route.
├── context/
│ ├── action.ts          # Next.js Server Actions (e.g., setToken, removeToken).
│ └── auth.ts            # React Context for authentication state.
├── firebase/
│ ├── client.ts          # Firebase client-side configuration.
│ └── server.ts          # Firebase Admin SDK configuration for server.
├── lib/
│ ├── cloudinary.ts      # Cloudinary config file.
│ ├── schemas.ts         # Schemas for form data (eg: LoginForm).
│ └── utils.ts           # Utility functions (e.g., cn for tailwind-merge).
├── public/              # Static assets (images, favicons).
└── .env.local           # Environment variables (local only).
```

## 📸 Screenshots

## 📬 Contact

Created with ❤️ by **Sarthak**

- 🐙 GitHub: [Sarthak](https://github.com/Sarthak0085)
- 📧 Email: sarth.mahajan2000@gmail.com
