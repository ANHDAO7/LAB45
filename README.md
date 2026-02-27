Lab 4 + 5: User Authentication and Order Management with Supabase
Objective
Extend the existing Shopping Cart application to include user authentication and persistent order history. Students will integrate Supabase Auth for registration/login and use Supabase Database to store customer orders. 
Requirements
Framework: Use React or Next.js (continuing from Lab 3) 
Styling: Tailwind CSS and ShadCN UI 
Backend: Supabase (Auth & Database)
Persistence: Move from Local Storage to a cloud database for orders. 
Functional Requirements
1. Public Home Page
The product list remains accessible to all visitors (no login required to browse). 
Users can still add items to the cart (stored in Local Storage or state). 
2. Authentication (Supabase Auth)
Registration: Allow new users to sign up with email and password.
Login: Existing users must log in to proceed to checkout.
Protected Routes: Only authenticated users can access the Checkout and Order History pages.
Logout: Provide a logout button in the Header/Navigation.
3. Order Creation
When a logged-in user clicks "Checkout" from the Cart page:
oCreate a new record in the orders table in Supabase.
oSave order details: user_id, total_price, and a list of items (name, quantity, price).
oClear the local cart upon successful order placement. 
4. Order History Page
Display a list of previous orders for the logged-in user.
Show order date, total amount, and status.
Technical Requirements
Supabase Client: Initialize and use the Supabase JS SDK.
Auth Hooks: Use onAuthStateChange to manage user sessions.
Database Schema: Create an orders table
Reusable Components:
oAuthForm (for Login/Signup)
oOrderCard (to display individual order summaries)
Design Considerations
UX: If a guest tries to checkout, redirect them to the Login page and return them to the cart afterward. 
Feedback: Show loading states during authentication and order submission. 
Submission
Submit a .doc/.docx file that includes: 
Deployed website URL (e.g., Vercel or Netlify) 
GitHub repository link 
Screenshot of Supabase Dashboard showing the orders table and auth users.
