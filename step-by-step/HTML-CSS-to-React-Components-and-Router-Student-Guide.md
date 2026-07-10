# Converting an HTML/CSS Website into a React App

## Student Step-by-Step Guide: Components and React Router

### Project goal

In this lesson, we will convert a multi-page HTML/CSS job-board website into a React application.

By the end, students will understand how to:

- create a React project with Vite;
- move existing CSS into React;
- split HTML pages into reusable components;
- convert HTML syntax into JSX;
- create page components;
- configure React Router;
- navigate with `Link`;
- keep the navbar and footer visible on every page;
- troubleshoot blank pages and routing errors.

---

# 1. Understand the conversion

A traditional HTML website often contains several files:

```text
index.html
job_search.html
job_listing.html
terms.html
privacy.html
contact_us.html
styles.css
```

Each link loads a different HTML document from the server.

A React application normally loads one HTML file:

```text
index.html
```

React then changes the displayed component based on the URL.

The conversion looks like this:

```text
HTML page                 React page component
------------------------------------------------
index.html                Mainsection.jsx
job_search.html           Jobsearch.jsx
job_listing.html          Joblist.jsx
terms.html                Terms.jsx
privacy.html              Privacy.jsx
contact_us.html           Contacts.jsx
```

Shared sections become reusable components:

```text
HTML section              React component
------------------------------------------------
<header>                   Navbar.jsx
<footer>                   Footer.jsx
```

---

# 2. Create the React project

Open a terminal in the folder where you want the project.

```bash
npm create vite@latest jobzila-react
```

Choose:

```text
Framework: React
Variant: JavaScript
```

Move into the project:

```bash
cd jobzila-react
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local address shown in the terminal, usually:

```text
http://localhost:5173
```

---

# 3. Install React Router

React does not automatically provide page routing.

Install React Router:

```bash
npm install react-router-dom
```

React Router will connect URL paths to React components.

Examples:

```text
/                  → Home page
/job_search        → Job Search page
/job_listing       → Job Listing page
/privacy           → Privacy page
/term_service      → Terms page
/contact_us        → Contact page
```

---

# 4. Organize the project folders

Use this structure:

```text
jobzila-react/
│
├── public/
│
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── mainPic.jpg
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Mainsection.jsx
│   │   ├── Jobsearch.jsx
│   │   ├── Joblist.jsx
│   │   ├── Terms.jsx
│   │   ├── Privacy.jsx
│   │   └── Contacts.jsx
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── package.json
└── vite.config.js
```

The `components` folder contains reusable interface sections and page components.

---

# 5. Learn what a React component is

A component is a JavaScript function that returns JSX.

Example:

```jsx
const Mainsection = () => {
  return (
    <main>
      <h2>Welcome to JobZila</h2>
    </main>
  );
};

export default Mainsection;
```

Important parts:

```jsx
const Mainsection = () => {
```

This creates the component function.

```jsx
return (
```

This tells React what should appear on the screen.

```jsx
export default Mainsection;
```

This allows another file to import and use the component.

Use the component like an HTML element:

```jsx
<Mainsection />
```

Component names must begin with a capital letter.

Correct:

```jsx
function Navbar() {}
```

Incorrect:

```jsx
function navbar() {}
```

---

# 6. Convert HTML into JSX

JSX looks like HTML, but it follows JavaScript rules.

## Rule 1: Change `class` to `className`

HTML:

```html
<section class="hero">
```

JSX:

```jsx
<section className="hero">
```

Do this everywhere in the project.

For example:

```jsx
<section className="contact-section">
  <form className="contact-form">
  </form>
</section>
```

Using `class` may create warnings and inconsistent React behavior.

---

## Rule 2: Change `for` to `htmlFor`

HTML:

```html
<label for="email">Email</label>
```

JSX:

```jsx
<label htmlFor="email">Email</label>
```

`for` is a JavaScript keyword, so JSX uses `htmlFor`.

---

## Rule 3: Close every element

HTML sometimes allows elements without a closing slash.

HTML:

```html
<input type="text">
```

JSX:

```jsx
<input type="text" />
```

Other examples:

```jsx
<img src={logo} alt="JobZila logo" />
<br />
<hr />
```

---

## Rule 4: Return one parent structure

This is invalid:

```jsx
return (
  <Navbar />
  <Mainsection />
  <Footer />
);
```

React needs one parent.

Use a fragment:

```jsx
return (
  <>
    <Navbar />
    <Mainsection />
    <Footer />
  </>
);
```

The empty `<> </>` tags group elements without adding another HTML element.

---

## Rule 5: Use camelCase for many attributes

HTML:

```html
<button onclick="showMessage()">Click</button>
```

React:

```jsx
<button onClick={showMessage}>Click</button>
```

Examples:

```text
onclick      → onClick
onchange     → onChange
tabindex     → tabIndex
maxlength    → maxLength
```

---

# 7. Create the Navbar component

Create:

```text
src/components/Navbar.jsx
```

Use React Router's `Link` component instead of plain `<a>` elements for internal pages.

```jsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <h1>JobZila</h1>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/job_search">Job Search</Link>
          </li>

          <li>
            <Link to="/job_listing">Job Listing</Link>
          </li>

          <li>
            <Link to="/term_service">Terms of Service</Link>
          </li>

          <li>
            <Link to="/privacy">Privacy Policy</Link>
          </li>

          <li>
            <Link to="/contact_us">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
```

## Why use `Link`?

A normal anchor:

```jsx
<a href="/privacy">Privacy</a>
```

usually asks the browser to load the whole page again.

A React Router link:

```jsx
<Link to="/privacy">Privacy</Link>
```

changes the URL and displayed component without reloading the whole React application.

Use `<a>` for an external website:

```jsx
<a href="https://example.com">External Website</a>
```

Use `<Link>` for pages inside the React application.

---

# 8. Create the Home component

Create:

```text
src/components/Mainsection.jsx
```

```jsx
const Mainsection = () => {
  return (
    <main>
      <section className="hero">
        <section className="hero-section">
          <h2>Welcome to JobZila</h2>

          <p>
            Find job opportunities and connect with employers.
          </p>
        </section>
      </section>
    </main>
  );
};

export default Mainsection;
```

Notice that all `class` attributes were changed to `className`.

---

# 9. Create the Job Search component

Create:

```text
src/components/Jobsearch.jsx
```

```jsx
const Jobsearch = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Search form submitted");
  };

  return (
    <main>
      <section className="contact-section">
        <h2>Job Search</h2>

        <div className="contact">
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="keyword"
              name="keyword"
              required
              placeholder="Keyword"
            />

            <input
              type="text"
              id="location"
              name="location"
              required
              placeholder="Location"
            />

            <select name="category" id="category" defaultValue="0">
              <option value="0">All Categories</option>
              <option value="1">IT</option>
              <option value="2">Finance</option>
              <option value="3">Billing</option>
              <option value="4">Marketing</option>
            </select>

            <input type="submit" value="Search Jobs" />
          </form>
        </div>
      </section>
    </main>
  );
};

export default Jobsearch;
```

Important correction:

```jsx
type="location"
```

is not a standard HTML input type.

Use:

```jsx
type="text"
```

and identify the field with:

```jsx
name="location"
```

The function below stops the browser from refreshing when the form is submitted:

```jsx
event.preventDefault();
```

---

# 10. Create the Job Listing component

Create:

```text
src/components/Joblist.jsx
```

A direct conversion can work, but repeating the same markup is poor React design.

A better solution stores jobs in an array and uses `.map()`.

```jsx
const jobs = [
  {
    id: 1,
    title: "Software Developer",
    company: "ABC Inc.",
    location: "New York, NY",
    description:
      "We are looking for a skilled Software Developer with experience in HTML, CSS, JavaScript, and databases.",
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "XYZ Corp.",
    location: "San Francisco, CA",
    description:
      "We are seeking a Data Scientist with experience in statistics, machine learning, Python, and data visualization.",
  },
];

const Joblist = () => {
  return (
    <main>
      <section className="jobs-listing-section">
        <h2>Job Listing</h2>

        {jobs.map((job) => (
          <article className="jobs-listing" key={job.id}>
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>{job.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Joblist;
```

The braces display JavaScript values inside JSX:

```jsx
<h3>{job.title}</h3>
```

The `key` helps React identify each list item:

```jsx
key={job.id}
```

---

# 11. Create the Contact component

Create:

```text
src/components/Contacts.jsx
```

```jsx
const Contacts = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Contact form submitted");
  };

  return (
    <main>
      <section className="contact-section">
        <h2>Contact Us</h2>

        <div className="contact">
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>

            <input
              type="text"
              id="name"
              name="name"
              required
            />

            <label htmlFor="email">Email</label>

            <input
              type="email"
              id="email"
              name="email"
              required
            />

            <label htmlFor="message">Message</label>

            <textarea
              name="message"
              id="message"
              rows={4}
              required
            />

            <input type="submit" value="Send Message" />
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contacts;
```

Corrections made:

```text
class       → className
for         → htmlFor
type=text   → type=email for the email field
rows="4"    → rows={4}
```

Strings and numbers can both work for some browser attributes, but `{4}` clearly passes a JavaScript number.

---

# 12. Create Terms and Privacy components

The same conversion rules apply.

Example:

```jsx
const Privacy = () => {
  return (
    <main>
      <section className="privacy-section">
        <h2>Privacy Policy</h2>

        <div className="privacy">
          <h3>1. Information Collection</h3>
          <p>
            We may collect information when users submit forms.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Privacy;
```

For `Terms.jsx`, replace every `class` with `className` and export the component.

```jsx
export default Terms;
```

---

# 13. Create the Footer component

Create:

```text
src/components/Footer.jsx
```

```jsx
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <p>
        &copy; My Job Board. All rights reserved.{" "}
        <Link to="/contact_us">Contact Us</Link>
        {" | "}
        <Link to="/term_service">Terms</Link>
        {" | "}
        <Link to="/privacy">Privacy</Link>
      </p>
    </footer>
  );
};

export default Footer;
```

Do not keep old HTML filenames such as:

```jsx
<a href="contact_us.html">
```

Those files no longer exist as separate pages in the React application.

Use route paths:

```jsx
<Link to="/contact_us">
```

---

# 14. Wrap the application with BrowserRouter

Open:

```text
src/main.jsx
```

Use:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

`BrowserRouter` must wrap the part of the application that uses:

```jsx
Routes
Route
Link
useNavigate
```

Without a router provider, React Router components cannot access routing information.

---

# 15. Configure the routes in App.jsx

Open:

```text
src/App.jsx
```

```jsx
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Mainsection from "./components/Mainsection";
import Joblist from "./components/Joblist";
import Jobsearch from "./components/Jobsearch";
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";
import Contacts from "./components/Contacts";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Mainsection />} />
        <Route path="/job_listing" element={<Joblist />} />
        <Route path="/job_search" element={<Jobsearch />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/term_service" element={<Terms />} />
        <Route path="/contact_us" element={<Contacts />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
```

## How a route works

```jsx
<Route path="/privacy" element={<Privacy />} />
```

This means:

```text
When the browser URL is /privacy,
render the Privacy component.
```

## Why Navbar and Footer are outside Routes

```jsx
<Navbar />

<Routes>
  ...
</Routes>

<Footer />
```

This makes them appear on every route.

Only the component inside `Routes` changes.

---

# 16. Add a Not Found route

Students should handle invalid URLs.

Create:

```text
src/components/NotFound.jsx
```

```jsx
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main>
      <h2>404 - Page Not Found</h2>
      <p>The page you requested does not exist.</p>
      <Link to="/">Return Home</Link>
    </main>
  );
};

export default NotFound;
```

Import it into `App.jsx`:

```jsx
import NotFound from "./components/NotFound";
```

Add this route last:

```jsx
<Route path="*" element={<NotFound />} />
```

Complete section:

```jsx
<Routes>
  <Route path="/" element={<Mainsection />} />
  <Route path="/job_listing" element={<Joblist />} />
  <Route path="/job_search" element={<Jobsearch />} />
  <Route path="/privacy" element={<Privacy />} />
  <Route path="/term_service" element={<Terms />} />
  <Route path="/contact_us" element={<Contacts />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

The wildcard `*` matches URLs that do not match another route.

---

# 17. Move and connect the CSS

Copy the original stylesheet into:

```text
src/App.css
```

Import it once in `App.jsx`:

```jsx
import "./App.css";
```

The CSS class selectors do not need to change.

CSS:

```css
.hero {
  height: 500px;
}
```

JSX:

```jsx
<section className="hero">
```

The class name remains `hero`; only the JSX attribute changes from `class` to `className`.

---

# 18. Move images into the React project

Place the image here:

```text
src/assets/images/mainPic.jpg
```

Then this CSS path can work from `src/App.css`:

```css
.hero {
  background-image: url("./assets/images/mainPic.jpg");
}
```

Remember that the path is resolved relative to the CSS file.

If the image is in `public/images`, use:

```css
background-image: url("/images/mainPic.jpg");
```

Do not guess the path. Confirm the image's actual folder.

---

# 19. Test the application

Start the project:

```bash
npm run dev
```

Test every route manually:

```text
http://localhost:5173/
http://localhost:5173/job_search
http://localhost:5173/job_listing
http://localhost:5173/privacy
http://localhost:5173/term_service
http://localhost:5173/contact_us
```

Then test the navbar and footer links.

For each page, check:

```text
[ ] The correct component appears
[ ] The navbar stays visible
[ ] The footer stays visible
[ ] The page does not fully refresh
[ ] There are no red errors in the browser console
[ ] CSS is applied
[ ] The image loads
[ ] Forms do not unexpectedly reload the page
```

---

# 20. Common reasons for a blank page

## Problem 1: BrowserRouter is missing

Incorrect:

```jsx
<App />
```

Correct:

```jsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

---

## Problem 2: Import path or filename is wrong

Example:

```jsx
import Joblist from "./components/JobList";
```

but the file is:

```text
Joblist.jsx
```

On some systems, capitalization matters.

Use the exact filename:

```jsx
import Joblist from "./components/Joblist";
```

---

## Problem 3: Component was not exported

Incorrect:

```jsx
const Privacy = () => {
  return <h2>Privacy</h2>;
};
```

Correct:

```jsx
const Privacy = () => {
  return <h2>Privacy</h2>;
};

export default Privacy;
```

---

## Problem 4: HTML attributes were not converted

Incorrect:

```jsx
<section class="hero">
<label for="email">
```

Correct:

```jsx
<section className="hero">
<label htmlFor="email">
```

---

## Problem 5: A tag is not closed

Incorrect:

```jsx
<input type="text">
```

Correct:

```jsx
<input type="text" />
```

---

## Problem 6: The route path and link path do not match

Route:

```jsx
<Route path="/job_listing" element={<Joblist />} />
```

Incorrect link:

```jsx
<Link to="/jobs">Jobs</Link>
```

Correct link:

```jsx
<Link to="/job_listing">Jobs</Link>
```

The strings must match.

---

## Problem 7: Old HTML links are still being used

Incorrect:

```jsx
<a href="privacy.html">Privacy</a>
```

Correct:

```jsx
<Link to="/privacy">Privacy</Link>
```

---

## Problem 8: React Router is not installed

Run:

```bash
npm install react-router-dom
```

Then restart the development server if necessary:

```bash
npm run dev
```

---

## Problem 9: The image path is wrong

Check:

```text
src/assets/images/mainPic.jpg
```

and:

```css
background-image: url("./assets/images/mainPic.jpg");
```

The filename, capitalization, and extension must match exactly.

---

## Problem 10: A form submits and reloads the page

Use:

```jsx
const handleSubmit = (event) => {
  event.preventDefault();
};
```

Then connect it:

```jsx
<form onSubmit={handleSubmit}>
```

---

# 21. Understand the complete data flow

When a user clicks:

```jsx
<Link to="/privacy">Privacy</Link>
```

the following happens:

```text
1. Link changes the browser URL to /privacy
2. BrowserRouter detects the URL change
3. Routes checks all Route paths
4. /privacy matches the Privacy route
5. React renders <Privacy />
6. Navbar and Footer remain on the screen
7. The browser does not request privacy.html
```

This is client-side routing.

---

# 22. Student practice tasks

## Task 1: JSX correction

Find and correct:

```jsx
<section class="about">
  <label for="studentName">Student Name</label>
  <input type="text">
</section>
```

Expected result:

```jsx
<section className="about">
  <label htmlFor="studentName">Student Name</label>
  <input type="text" />
</section>
```

---

## Task 2: Create an About page

Create:

```text
src/components/About.jsx
```

Add a heading and paragraph.

Add the route:

```jsx
<Route path="/about" element={<About />} />
```

Add the navbar link:

```jsx
<Link to="/about">About</Link>
```

---

## Task 3: Add a Not Found page

Create a `NotFound` component and connect it using:

```jsx
<Route path="*" element={<NotFound />} />
```

---

## Task 4: Convert repeated jobs into data

Create a job array and display it using `.map()`.

Each job must contain:

```text
id
title
company
location
description
```

---

## Task 5: Improve the contact form

Add these fields:

```text
Subject
Phone
Reason for Contact
```

Use correctly connected labels.

---

# 23. Final project checklist

```text
[ ] React project created with Vite
[ ] react-router-dom installed
[ ] components folder created
[ ] one component created for each page
[ ] Navbar component created
[ ] Footer component created
[ ] class changed to className
[ ] for changed to htmlFor
[ ] all JSX tags closed
[ ] BrowserRouter added in main.jsx
[ ] Routes and Route added in App.jsx
[ ] Link used for internal navigation
[ ] old .html links removed
[ ] CSS imported
[ ] image path tested
[ ] all routes tested
[ ] 404 route added
[ ] browser console checked
```

---

# 24. Core ideas to remember

```text
Component = reusable part of the interface

JSX = HTML-like syntax written inside JavaScript

BrowserRouter = gives the app routing ability

Routes = contains route definitions

Route = connects a URL path to a component

Link = moves between internal React routes

App.jsx = assembles the application

main.jsx = starts React and wraps the app with BrowserRouter
```

The most important mental model is:

```text
One HTML file
+ many React components
+ routes that decide which component appears
= a React single-page application
```
