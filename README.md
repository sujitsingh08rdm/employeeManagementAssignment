Overview : I have developed a Client-Side Employee Management System. To simulate backend functionality, I utilized JSON Server as a mock API to handle employee data and authentication. The system features a hardcoded admin user within the JSON Server to facilitate login functionality.
The system operates as follows:
Login: Upon accessing the application, users are prompted to enter their credentials(Shared Below) on the login page. A successful login will redirect the user to the Dashboard page.
Dashboard: The Dashboard offers an overview of the employee data with two key visualizations:
a.A pie chart depicting the gender distribution (male/female employees).
b.A pie chart showing the status of employees (active/inactive).
Sidebar Navigation: A sidebar provides easy navigation to key sections of the system, including:
Employee List: A comprehensive list of all employees.
Add/Edit Employee: A unified form for both adding new employees and editing existing employee details.

The user interface and experience are designed with simplicity and ease of navigation in mind, ensuring an efficient flow for managing employee data.

Tech stack used : Redux Toolkit, Json server, TailwindCSS, lucide-react, react-router-dom, recharts, axios.

Credentials : admin@ems.com for email and 12345 for password during login page.
Please Use npm run dev for starting the client and npm run mock to start json-server.

Currently, the employee management system i have created primarily for desktop web environments. Due to the limited screen size on mobile devices, the system may not display as effectively when accessed on smaller screens. As system displays employee information across multiple columns (7-8), which can lead to a cluttered or difficult-to-read layout on mobile devices. The sidebar and navigation menu are designed with desktop views in mind, and may not function optimally on mobile screens. This can result in a less user-friendly experience, particularly with limited space.
