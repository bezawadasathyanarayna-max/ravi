# CampusFind

CampusFind is a responsive college lost-and-found frontend built with React, Vite, Tailwind CSS, React Router, and Lucide icons. It uses browser `localStorage` as a lightweight mock database; there is no backend.

## Run in VS Code

### Create from scratch

```bash
npm create vite@latest campusfind -- --template react
cd campusfind
```

Copy the project files into the generated folder, then install and run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`) in a browser. To use the project already in this folder, open it in VS Code and run the same `npm install` and `npm run dev` commands in the integrated terminal.

Build a production bundle with `npm run build`; preview it with `npm run preview`.

## Deploy to Vercel

This is a Vite single-page application. The included `vercel.json` sends app routes back to `index.html`, so React Router routes such as `/found-items` and `/items/item-1` also work when opened directly or refreshed.

1. Push this project to a GitHub, GitLab, or Bitbucket repository.
2. Sign in at [vercel.com](https://vercel.com), choose **Add New → Project**, and import the repository.
3. Keep the detected Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
4. Select **Deploy**. No environment variables are needed for this frontend-only demo.

You can also deploy from the project folder with the Vercel CLI:

```bash
npm install --global vercel
vercel
```

Follow the prompts, then use `vercel --prod` for a production deployment. Local-storage data belongs to each visitor's browser; it is not shared between users or devices and may be cleared by the browser. Add a backend and persistent database before using CampusFind for real campus reports or accounts.

### Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Student | `student@campus.edu` | `campus123` |
| Admin | `admin@campus.edu` | `admin123` |

New student accounts can also be created from the registration page. This is demonstration authentication only and must not be used to protect real data.

## Project structure

```text
src/
├── components/
│   ├── Button.jsx
│   ├── DashboardCard.jsx
│   ├── EmptyState.jsx
│   ├── FormFields.jsx
│   ├── ItemCard.jsx
│   ├── LoadingSpinner.jsx
│   ├── Modal.jsx
│   ├── Navbar.jsx
│   ├── SearchFilters.jsx
│   ├── Sidebar.jsx
│   ├── StatusBadge.jsx
│   └── ToastViewport.jsx
├── context/
│   └── AppContext.jsx
├── data/
│   └── mockData.js
├── utils/
│   └── auth.js
├── pages/
│   ├── AdminDashboard.jsx
│   ├── ClaimItem.jsx
│   ├── Claims.jsx
│   ├── Dashboard.jsx
│   ├── Help.jsx
│   ├── ItemDetails.jsx
│   ├── ItemListings.jsx
│   ├── Login.jsx
│   ├── MyReports.jsx
│   ├── Profile.jsx
│   ├── Register.jsx
│   └── ReportItem.jsx
├── App.jsx
├── index.css
└── main.jsx
```

## Pages and routes

| Route | Purpose |
| --- | --- |
| `/login`, `/register` | Demo sign-in and college account registration |
| `/` | Dashboard metrics, recent activity, and shortcuts |
| `/lost-items`, `/found-items` | Searchable item listings with category, location, and date filters |
| `/report-lost`, `/report-found` | Validated item report forms with optional image upload |
| `/items/:id` | Item details and reporter contact action |
| `/items/:id/claim` | Claim form for a found item |
| `/my-reports` | The signed-in user’s reports and their statuses |
| `/claims` | Submitted claims and other claimable found items |
| `/profile` | Edit account details and profile image |
| `/admin` | Admin-only overview and report, claim, and user management |
| `/help` | Basic safe-handover guidance |

The sidebar collapses into a mobile navigation drawer on smaller screens. Admin features are shown only for the admin demo account.

## Data flow

`AppContext` loads the initial mock items and demo users from `src/data/mockData.js`. On first visit it seeds the corresponding `campusfind_*` local-storage entries; later app changes are saved back to those entries. Reports get a generated local ID, the current user as reporter, and a `Pending` status. Listing pages filter the shared item collection immediately as search and filter inputs change. Claim submission creates a claim record and moves the found item to `Matching`. Admin claim decisions update the claim, and approving a claim moves its item to `Claimed`; admins can separately mark an item `Returned`. Profile edits update both the signed-in user and the locally stored user list. New account password verifiers use browser PBKDF2, and plaintext passwords are omitted from local-storage records; this is still a client-only demonstration, not production authentication.

Image uploads are read into the browser as data URLs and limited to 2 MB per image. Clearing browser storage resets the demonstration data to the included sample data.

## Backend integration ideas

For a production version, replace local storage with an API and database (for example, Spring Boot with PostgreSQL or a Node API). Add server-side college identity verification, hashed passwords and session/token authentication, role-based authorization, file storage with access controls, server-validated claim transitions, audit history, pagination, and notifications. Do not store plaintext passwords or sensitive student data in browser storage.
