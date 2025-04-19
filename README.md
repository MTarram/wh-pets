# Pets Dashboard 🐶🐱🐾

A modern **Angular 19** admin dashboard for managing Users, Attractions, and Pet Sales statistics. This application demonstrates:

- JWT-based authentication with login/logout  
- **Users Management**: list, search, pagination, sorting, CRUD operations  
- **Attractions Management**: list, pagination, sorting, CRUD (protected routes)  
- **Pet Sales Statistics**:  
  - **Weekly Trend**: 7-day sales chart using Chart.js  
  - **Daily Details**: breakdown by animal on a selected date (bar chart)

Built with lazy-loaded modules, standalone Angular components, Angular Material, and Chart.js, and styled using Bootstrap 5. 🎨

---

## 🚀 Getting Started

### Prerequisites 📋

- **Node.js** v16+ and **npm**  
- **Angular CLI** v19.2.0 globally installed (`npm install -g @angular/cli`)

### Installation 🛠️

1. Clone the repository:  
   ```bash
   git clone https://github.com/MTarram/wh-pets
   cd petsDashboard
   ```  
2. Install dependencies:  
   ```bash
   npm install
   ```

### Running Locally 🖥️

Start the dev server and open your browser at `http://localhost:4200`:

```bash
ng serve
```

The app will reload automatically upon code changes.

---

## 🔍 Project Structure

```
src/
 ├─ app/
 │   ├─ core/                # shared services (AuthService, UserService, PetSalesService)
 │   ├─ features/            # feature components
 │   │   ├─ auth/            # LoginComponent, AuthGuard, JWT interceptor
 │   │   ├─ users/           # UsersComponent (table + CRUD dialog)
 │   │   ├─ attractions/     # AttractionsComponent (protected)
 │   │   └─ pet-sales/       # PetSalesComponent (charts + tables)
 │   ├─ app.routes.ts        # top‑level route definitions
 │   └─ app.component.html   # root outlet only
 └─ assets/
```

---

## 🔐 Authentication

- **Login** using `/api/login` to obtain a JWT stored securely in `sessionStorage`.  
- Check [https://melivecode.com](https://melivecode.com) for login credentials.  
- **AuthGuard** protects internal routes (`/users`, `/attractions`, `/pet-sales`).  
- **Logout** clears the token and redirects to `/login`.

---

## 📊 Key Features

### Users Management 👥

- List all users with server‑side pagination & sorting  
- Search by name or email  
- Create, edit, and delete users via modals

### Attractions Management 🏰

- Protected routes requiring authentication  
- Similar table with pagination, sorting, and CRUD

### Pet Sales Statistics 🐶

- **Weekly Trend**: line chart of the last 7 days (Chart.js)  
- **Daily Details**: bar chart per animal and table listing details  
- Date pickers to select the period

---

## 📦 Scripts

- `ng serve` — run dev server  
- `ng build` — production build (`dist/` output)  
- `ng test` — run unit tests (Karma)  
- `ng e2e` — run end‑to‑end tests

---

## 📖 Further Reading

- [Angular CLI Docs](https://angular.io/cli)  
- [Angular Material](https://material.angular.io/)  
- [Chart.js Guide](https://www.chartjs.org/docs/)  
- [Bootstrap 5](https://getbootstrap.com/)

---

*Happy coding!* 🎉🎉🎉# wh-pets
