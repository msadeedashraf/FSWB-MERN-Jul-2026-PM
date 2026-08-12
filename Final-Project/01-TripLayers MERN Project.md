# TripLayers MERN Project  
## Milestone 1 — From Static Prototype to React Application

---

## 1. The TripLayers Story

TripLayers is a new travel platform being developed by a small startup.

The goal of TripLayers is to help travellers:

- discover properties,
- search for places to stay,
- view property details,
- manage bookings,
- maintain profiles,
- and eventually interact with other travellers through a travel community.

The design team has already created the first version of the website.

It looks good.

The prototype already includes pages such as:

- Home
- Search
- Property Details
- Login
- Signup
- Manage Bookings
- Booking Details
- Edit Booking
- Blog
- Blog Post
- Contact

For example, the current home page already includes a property-search interface with location, check-in date, check-out date, guest count and room type.

The Search page already shows property cards and links that take users toward property-detail pages.

The Property Details page already contains property information and a booking section.

The problem is that the prototype is built from separate static HTML files.

TripLayers now needs to turn the prototype into a real application.

You have joined the TripLayers team as a **Junior Front-End Developer**.

Your first assignment is to rebuild the static prototype using **React**.

---

# 2. Where We Are in the Project

At the beginning of the project, TripLayers looks like this:

```text
Static HTML Prototype

index.html
search.html
property-details.html
login.html
signup.html
manage-bookings.html
booking-details.html
edit-booking.html
blog.html
blog-post.html
contact.html
styles.css
```

Each page is its own HTML document.

This worked for the prototype.

It will not scale well as the application grows.

Our target after Milestone 1 is:

```text
TripLayers React Application

React
│
├── Pages
│
├── Reusable Components
│
├── React Router
├── Shared CSS
└── Static sample data
```

There will still be no MongoDB or Express server yet.

That comes later.

---

# 3. The Business Problem

The TripLayers developers review the existing files and notice a problem.

The navigation bar appears in many different HTML files.

For example, the current pages repeatedly contain links such as:

```text
Home
Search
Login
Manage Bookings
Contact Us
Blog
```

The same basic navigation structure appears throughout the supplied pages.

Imagine TripLayers grows to:

```text
50 pages
```

Then the company decides to rename:

```text
Blog
```

to:

```text
Community
```

With static HTML, developers might have to update dozens of pages.

That creates:

```text
duplicated code
maintenance problems
inconsistent pages
more bugs
slower development
```

React helps solve this.

Instead of copying the navbar everywhere, we create:

```text
Navbar.jsx
```

once.

Every page uses it.

---

# 4. User Story

### User Story TL-US-001

> As a traveller,  
> I want to navigate between TripLayers pages smoothly,  
> so that the website feels like one consistent application.

---

# 5. Development Ticket

## TripLayers Development Ticket — TL-001

### Title

Convert static TripLayers prototype into React.

### Requested By

TripLayers Product Team

### Problem

The current TripLayers interface consists of multiple separate HTML pages containing repeated layout code.

### Requirement

The development team must convert the supplied static prototype into a reusable React application.

### The React application must contain:

- reusable components,
- page components,
- shared navigation,
- shared footer,
- React Router,
- reusable property cards,
- reusable post cards,
- responsive Bootstrap layout,
- basic React state,
- working navigation.

### Backend Requirement

None.

### Database Requirement

None.

### Authentication Requirement

None yet.

---

# 6. What Problem Are We Solving?

Before writing code, answer:

### Why are we using React?

Not because React is popular.

Not because React is part of MERN.

We are using React because TripLayers has reached a point where maintaining many separate HTML pages is becoming inefficient.

React gives us:

```text
Components
        ↓
Reusable UI

React Router
        ↓
Application navigation

Props
        ↓
Reusable dynamic-looking content

State
        ↓
Information the interface remembers
```

---

# 7. What Students Will Learn

By completing Milestone 1, you should understand:

- React application structure
- Vite
- JSX
- components
- page components
- reusable components
- props
- `useState`
- event handling
- React Router
- `<Link>`
- `<Routes>`
- `<Route>`
- `useNavigate`
- Bootstrap with React
- importing CSS
- `.map()`
- project organization
- basic Git workflow

The MERN assessment specifically expects students to demonstrate React components, state, hooks, conditional rendering and React Router.

Milestone 1 begins building that foundation.

---

# 8. Starting Files

Your instructor has supplied the original static TripLayers prototype.

Keep these files.

Do **not** delete them.

Create:

```text
triplayers/
│
├── original-static/
│
├── client/
│
├── server/
├── README.md
└── .gitignore
```

Move the supplied HTML/CSS prototype into:

```text
original-static/
```

Example:

```text
original-static/
│
├── index.html
├── search.html
├── property-details.html
├── login.html
├── signup.html
├── manage-bookings.html
├── booking-details.html
├── edit-booking.html
├── blog.html
├── blog-post.html
├── contact.html
└── styles.css
```

These files are your **design reference**.

---

# 9. Create the Project Folder

Open a terminal.

Create the project:

```bash
mkdir triplayers
```

Move inside:

```bash
cd triplayers
```

Create:

```bash
mkdir original-static
```

Place the supplied files inside that folder.

---

# 10. Initialize Git

From:

```text
triplayers/
```

run:

```bash
git init
```

Create:

```text
.gitignore
```

Add:

```text
node_modules
.env
dist
```

Initial commit:

```bash
git add .
git commit -m "Initialize TripLayers project"
```

---

# 11. Create the React Application

From the TripLayers root:

```bash
npm create vite@latest client
```

Choose:

```text
Framework:
React

Variant:
JavaScript
```

Move into:

```bash
cd client
```

Install packages:

```bash
npm install
```

Start the application:

```bash
npm run dev
```

You should see something similar to:

```text
Local:
http://localhost:5173/
```

Open it in the browser.

---

# 12. Checkpoint 1

Before continuing, confirm:

```text
✓ Vite starts successfully
✓ React page loads
✓ Browser console has no major errors
```

Do not continue if React itself does not run.

---

# 13. Clean the Starter Project

Inside:

```text
client/src/
```

you may initially see files such as:

```text
App.jsx
App.css
index.css
main.jsx
assets/
```

Remove the demo content from:

```text
App.jsx
```

Replace it temporarily with:

```jsx
function App() {
    return (
        <div>
            <h1>TripLayers</h1>
            <p>Travel differently.</p>
        </div>
    );
}

export default App;
```

Save.

Confirm the browser updates.

---

# 14. Install React Router

Run:

```bash
npm install react-router-dom
```

React Router will replace links such as:

```html
<a href="search.html">
```

with application routes such as:

```jsx
<Link to="/search">
```

---

# 15. Install Bootstrap

The supplied TripLayers prototype already relies heavily on Bootstrap.

For example, the static pages use Bootstrap classes such as:

```text
navbar
container
row
col-md
card
btn
form-control
```

The login page uses a Bootstrap card and form controls.

Install Bootstrap:

```bash
npm install bootstrap
```

Inside:

```text
main.jsx
```

add:

```javascript
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
```

Also import:

```javascript
import "./index.css";
```

---

# 16. Create the Main Folder Structure

Create:

```text
client/src/
│
├── components/
├── pages/
├── data/
├── assets/
├── App.jsx
├── main.jsx
└── index.css
```

Eventually Milestone 1 should look roughly like:

```text
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── PropertyCard.jsx
│   ├── PostCard.jsx
│   └── SearchForm.jsx
│
├── pages/
│   ├── HomePage.jsx
│   ├── SearchPage.jsx
│   ├── PropertyDetailsPage.jsx
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── BookingsPage.jsx
│   ├── BookingDetailsPage.jsx
│   ├── EditBookingPage.jsx
│   ├── CommunityPage.jsx
│   ├── PostDetailsPage.jsx
│   ├── ContactPage.jsx
│   └── NotFoundPage.jsx
│
├── data/
│   ├── properties.js
│   └── posts.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# 17. Understand Pages vs Components

This distinction matters.

## Page Component

Represents an application page.

Example:

```text
HomePage.jsx
```

Usually connected to a route:

```text
/
```

## Reusable Component

Represents part of a page.

Example:

```text
Navbar.jsx
```

Used on many pages.

Another:

```text
PropertyCard.jsx
```

Used repeatedly to display properties.

Think:

```text
Page
│
├── Component
├── Component
├── Component
└── Component
```

---

# 18. Create Navbar.jsx

Create:

```text
src/components/Navbar.jsx
```

Start with:

```jsx
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">

                <Link className="navbar-brand" to="/">
                    TripLayers
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >
                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/search">
                                Search
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/bookings">
                                My Bookings
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/community">
                                Community
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">
                                Contact
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/login">
                                Login
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
```

---

# 19. What Changed From HTML?

Static HTML:

```html
<a href="search.html">
    Search
</a>
```

React:

```jsx
<Link to="/search">
    Search
</Link>
```

Why?

With React Router we want application navigation rather than asking the browser to load another complete HTML file.

---

# 20. JSX Difference — class vs className

HTML:

```html
<div class="container">
```

JSX:

```jsx
<div className="container">
```

In React:

```text
class
```

becomes:

```text
className
```

This is one of the most common conversion mistakes.

---

# 21. Create Footer.jsx

Create:

```text
src/components/Footer.jsx
```

Example:

```jsx
function Footer() {
    return (
        <footer className="bg-dark text-white py-4 mt-5">
            <div className="container">

                <div className="row">

                    <div className="col-md-4">
                        <h5>TripLayers</h5>
                        <p>
                            Discover stays and travel experiences
                            around the world.
                        </p>
                    </div>

                    <div className="col-md-4">
                        <h5>Explore</h5>
                        <p>Properties</p>
                        <p>Community</p>
                        <p>My Bookings</p>
                    </div>

                    <div className="col-md-4">
                        <h5>Support</h5>
                        <p>Contact</p>
                        <p>Privacy</p>
                        <p>Terms</p>
                    </div>

                </div>

                <hr />

                <p className="text-center mb-0">
                    © 2026 TripLayers
                </p>

            </div>
        </footer>
    );
}

export default Footer;
```

The static prototype already used a repeated dark footer across many pages. For example, the booking details page includes its footer immediately after the main booking content.

Now it exists once.

---

# 22. Create the Home Page

Create:

```text
src/pages/HomePage.jsx
```

Start simple:

```jsx
import SearchForm from "../components/SearchForm";
import PropertyCard from "../components/PropertyCard";
import { properties } from "../data/properties";

function HomePage() {
    return (
        <main className="container my-5">

            <section className="text-center mb-5">

                <h1>
                    Discover Your Next Layer
                </h1>

                <p>
                    Find places, plan stays and discover
                    travel experiences with TripLayers.
                </p>

            </section>

            <SearchForm />

            <section className="mt-5">

                <h2>Featured Properties</h2>

                <div className="row">

                    {properties.slice(0, 3).map((property) => (

                        <PropertyCard
                            key={property.id}
                            property={property}
                        />

                    ))}

                </div>

            </section>

        </main>
    );
}

export default HomePage;
```

---

# 23. Why Are We Not Copying index.html?

The old `index.html` contains an entire HTML document:

```text
DOCTYPE
html
head
body
navbar
main
footer
```

React already provides the main HTML document through Vite.

A React page should therefore **not** contain:

```html
<html>
<head>
<body>
```

The page component should contain only the UI belonging to the page.

---

# 24. Create Sample Property Data

We do not have MongoDB yet.

But we want to learn how dynamic React components work.

Create:

```text
src/data/properties.js
```

Add:

```javascript
export const properties = [

    {
        id: 1,
        name: "Luxury Apartment Downtown",
        location: "Toronto",
        price: 180,
        image:
            "https://via.placeholder.com/400x250",
        description:
            "Modern apartment located in downtown Toronto."
    },

    {
        id: 2,
        name: "Mountain View Cabin",
        location: "Banff",
        price: 220,
        image:
            "https://via.placeholder.com/400x250",
        description:
            "Relaxing cabin surrounded by mountain views."
    },

    {
        id: 3,
        name: "Waterfront Suite",
        location: "Vancouver",
        price: 250,
        image:
            "https://via.placeholder.com/400x250",
        description:
            "Beautiful waterfront accommodation."
    },

    {
        id: 4,
        name: "Old Montreal Loft",
        location: "Montreal",
        price: 160,
        image:
            "https://via.placeholder.com/400x250",
        description:
            "Stylish loft in historic Old Montreal."
    }

];
```

These are temporary.

Later:

```text
MongoDB
```

will replace this file.

---

# 25. The Business Reason for Sample Data

The TripLayers design team needs the React frontend to be developed before the database team is finished.

Instead of waiting for MongoDB, the developers use:

```text
temporary JavaScript data
```

This allows the frontend team to build:

```text
cards
layouts
routes
forms
```

before the backend exists.

This is normal development practice.

---

# 26. Create PropertyCard.jsx

Create:

```text
src/components/PropertyCard.jsx
```

Add:

```jsx
import { Link } from "react-router-dom";

function PropertyCard({ property }) {

    return (
        <div className="col-md-4 mb-4">

            <div className="card h-100 shadow-sm">

                <img
                    src={property.image}
                    className="card-img-top"
                    alt={property.name}
                />

                <div className="card-body">

                    <h5 className="card-title">
                        {property.name}
                    </h5>

                    <p className="text-muted">
                        {property.location}
                    </p>

                    <p>
                        ${property.price} per night
                    </p>

                    <Link
                        className="btn btn-primary"
                        to={`/properties/${property.id}`}
                    >
                        View Details
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default PropertyCard;
```

---

# 27. Why PropertyCard Exists

The original search page manually repeats property cards containing names, prices and View Details links.

If TripLayers has:

```text
500 properties
```

we should not write:

```text
500 cards manually
```

Instead:

```jsx
properties.map(...)
```

creates the cards.

---

# 28. Understanding Props

This:

```jsx
<PropertyCard property={property} />
```

sends information into the component.

The component receives:

```javascript
function PropertyCard({ property })
```

This is called:

```text
props
```

Think of props as:

> Information supplied to a component.

---

# 29. Create SearchForm.jsx

Create:

```text
src/components/SearchForm.jsx
```

Add:

```jsx
import { useState } from "react";

function SearchForm() {

    const [location, setLocation] =
        useState("");

    const [guests, setGuests] =
        useState(1);

    const handleSubmit = (event) => {

        event.preventDefault();

        console.log({
            location,
            guests
        });

    };

    return (

        <section className="bg-light p-4 rounded shadow-sm">

            <h2>
                Find Your Perfect Stay
            </h2>

            <form onSubmit={handleSubmit}>

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Destination
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={location}
                            onChange={(event) =>
                                setLocation(
                                    event.target.value
                                )
                            }
                        />

                    </div>

                    <div className="col-md-3 mb-3">

                        <label className="form-label">
                            Guests
                        </label>

                        <input
                            type="number"
                            min="1"
                            className="form-control"
                            value={guests}
                            onChange={(event) =>
                                setGuests(
                                    event.target.value
                                )
                            }
                        />

                    </div>

                    <div className="col-md-3 d-flex align-items-end mb-3">

                        <button
                            className="btn btn-primary w-100"
                        >
                            Search
                        </button>

                    </div>

                </div>

            </form>

        </section>
    );
}

export default SearchForm;
```

---

# 30. What Problem Does useState Solve?

Suppose Ali enters:

```text
Toronto
```

into the search form.

The interface needs to remember that value.

React state gives the component memory.

```javascript
const [location, setLocation] =
    useState("");
```

Think:

```text
location
=
current value
```

and:

```text
setLocation()
=
change value
```

---

# 31. Test the Search Form

Type:

```text
Toronto
```

and:

```text
2
```

guests.

Click:

```text
Search
```

Open:

```text
Developer Tools
→ Console
```

Expected:

```javascript
{
    location: "Toronto",
    guests: "2"
}
```

We are not performing real property search yet.

That comes when the API exists.

---

# 32. Create SearchPage.jsx

Create:

```text
src/pages/SearchPage.jsx
```

Add:

```jsx
import { useState } from "react";

import PropertyCard
    from "../components/PropertyCard";

import { properties }
    from "../data/properties";

function SearchPage() {

    const [search, setSearch] =
        useState("");

    const filteredProperties =
        properties.filter((property) =>

            property.location
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )

        );

    return (

        <main className="container my-5">

            <h1>
                Search Properties
            </h1>

            <input
                type="text"
                className="form-control mb-4"
                placeholder="Search by city"
                value={search}
                onChange={(event) =>
                    setSearch(
                        event.target.value
                    )
                }
            />

            <div className="row">

                {filteredProperties.map(
                    (property) => (

                        <PropertyCard
                            key={property.id}
                            property={property}
                        />

                    )
                )}

            </div>

        </main>
    );
}

export default SearchPage;
```

---

# 33. Business Scenario

Ali wants accommodation in Toronto.

He types:

```text
Toronto
```

TripLayers should stop showing Banff and Vancouver properties.

We currently solve this using:

```javascript
filter()
```

Later this search will move to:

```text
Express
+
MongoDB
```

For now, React handles the temporary data.

---

# 34. Add Conditional Rendering

What if no properties match?

Modify SearchPage:

```jsx
{filteredProperties.length === 0 ? (

    <p>
        No properties found.
    </p>

) : (

    filteredProperties.map(
        (property) => (

            <PropertyCard
                key={property.id}
                property={property}
            />

        )
    )

)}
```

Now students demonstrate:

```text
conditional rendering
```

which is another React concept specifically expected by the MERN assignment.

---

# 35. Create PropertyDetailsPage.jsx

The static property page currently shows information such as:

```text
Property image
Property name
Nightly price
Description
Amenities
Booking form
```



Create:

```text
src/pages/PropertyDetailsPage.jsx
```

Use:

```jsx
import { useParams } from "react-router-dom";

import { properties }
    from "../data/properties";

function PropertyDetailsPage() {

    const { id } = useParams();

    const property =
        properties.find(
            (property) =>
                property.id === Number(id)
        );

    if (!property) {

        return (
            <main className="container my-5">

                <h2>
                    Property not found
                </h2>

            </main>
        );

    }

    return (

        <main className="container my-5">

            <img
                src={property.image}
                alt={property.name}
                className="img-fluid rounded mb-4"
            />

            <h1>
                {property.name}
            </h1>

            <h4>
                {property.location}
            </h4>

            <p>
                {property.description}
            </p>

            <h3>
                ${property.price} per night
            </h3>

            <hr />

            <h2>
                Book Your Stay
            </h2>

            <p>
                Booking functionality will
                be added in a future milestone.
            </p>

        </main>

    );

}

export default PropertyDetailsPage;
```

---

# 36. Dynamic Routes

This route:

```text
/properties/:id
```

can represent many properties.

Examples:

```text
/properties/1
/properties/2
/properties/3
/properties/4
```

We do not need:

```text
property1.html
property2.html
property3.html
```

This is a major architectural improvement.

---

# 37. Create LoginPage.jsx

The supplied login prototype already contains:

```text
Email
Password
Remember me
Login
Forgot Password
Signup
```



Create:

```text
src/pages/LoginPage.jsx
```

For Milestone 1 the form is only visual.

Example:

```jsx
import { useState } from "react";

function LoginPage() {

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleSubmit = (event) => {

        event.preventDefault();

        console.log({
            email,
            password
        });

    };

    return (

        <main
            className="
                d-flex
                justify-content-center
                align-items-center
                py-5
            "
        >

            <div
                className="card p-4 shadow"
                style={{
                    width: "100%",
                    maxWidth: "420px"
                }}
            >

                <h2>
                    Login
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                        />

                    </div>

                    <button
                        className="btn btn-primary w-100"
                    >
                        Login
                    </button>

                </form>

            </div>

        </main>

    );

}

export default LoginPage;
```

Important:

This does **not authenticate anyone yet**.

That will happen when we build the backend.

---

# 38. Create SignupPage.jsx

The supplied static signup page already contains:

```text
Full Name
Email
Password
Confirm Password
```



Convert this into:

```text
SignupPage.jsx
```

Use React state for:

```text
name
email
password
confirmPassword
```

For now, print the data to the console.

Do not create users yet.

---

# 39. Create BookingsPage.jsx

The supplied static booking-management page already contains:

```text
Booking ID
Hotel Name
Check-in
Check-out
Status
Actions
```

with:

```text
View
Modify
Cancel
```



Create:

```text
BookingsPage.jsx
```

For Milestone 1, use temporary data:

```javascript
const bookings = [

    {
        id: 1001,
        property: "Waterfront Suite",
        checkIn: "2026-09-10",
        checkOut: "2026-09-14",
        status: "Confirmed"
    },

    {
        id: 1002,
        property: "Old Montreal Loft",
        checkIn: "2026-10-05",
        checkOut: "2026-10-07",
        status: "Pending"
    }

];
```

Render using:

```javascript
bookings.map(...)
```

Do not manually create two table rows.

---

# 40. Create BookingDetailsPage.jsx

The static page already demonstrates the type of information a booking should eventually display:

```text
Booking ID
Hotel
Guest
Email
Phone
Check-in
Check-out
Guests
Room type
Payment information
Total amount
Status
```



Create:

```text
BookingDetailsPage.jsx
```

For now, display sample data.

Later:

```text
MongoDB
```

will supply it.

---

# 41. Create EditBookingPage.jsx

The original edit page includes editable:

```text
check-in
check-out
number of guests
room type
```



Create:

```text
EditBookingPage.jsx
```

Use:

```text
useState
```

for each editable value.

When the form is submitted:

```javascript
console.log(updatedBooking);
```

Do not update MongoDB yet.

---

# 42. Transform Blog Into Community

This is an important design decision.

The original prototype has:

```text
blog.html
blog-post.html
```

The blog page contains multiple travel articles and Read More links.

The full MERN project eventually needs:

```text
posts
likes
comments
followers
```

Therefore:

```text
Blog
```

becomes:

```text
TripLayers Community
```

This allows us to preserve the existing design while aligning it with the final project requirements.

---

# 43. Create Community Sample Data

Create:

```text
src/data/posts.js
```

Add:

```javascript
export const posts = [

    {
        id: 1,
        author: "Sara Ahmed",
        title:
            "My Weekend in Banff",
        summary:
            "Three days exploring Banff, Lake Louise and the surrounding mountains.",
        image:
            "https://via.placeholder.com/800x400"
    },

    {
        id: 2,
        author: "Ali Khan",
        title:
            "Affordable Places to Stay in Toronto",
        summary:
            "Some useful ideas for staying close to downtown without overspending.",
        image:
            "https://via.placeholder.com/800x400"
    }

];
```

---

# 44. Create PostCard.jsx

Create:

```text
src/components/PostCard.jsx
```

Example:

```jsx
import { Link } from "react-router-dom";

function PostCard({ post }) {

    return (

        <article className="card mb-4">

            <img
                src={post.image}
                className="card-img-top"
                alt={post.title}
            />

            <div className="card-body">

                <h3>
                    {post.title}
                </h3>

                <p className="text-muted">
                    By {post.author}
                </p>

                <p>
                    {post.summary}
                </p>

                <Link
                    to={`/posts/${post.id}`}
                    className="btn btn-primary"
                >
                    Read More
                </Link>

            </div>

        </article>

    );

}

export default PostCard;
```

---

# 45. Create CommunityPage.jsx

```jsx
import { posts }
    from "../data/posts";

import PostCard
    from "../components/PostCard";

function CommunityPage() {

    return (

        <main className="container my-5">

            <h1>
                TripLayers Community
            </h1>

            <p>
                Travel stories, advice
                and experiences from
                other travellers.
            </p>

            {posts.map((post) => (

                <PostCard
                    key={post.id}
                    post={post}
                />

            ))}

        </main>

    );

}

export default CommunityPage;
```

---

# 46. Create PostDetailsPage.jsx

Create:

```text
PostDetailsPage.jsx
```

Use:

```javascript
useParams()
```

to identify the selected post.

This mirrors:

```text
PropertyDetailsPage
```

and reinforces dynamic routing.

---

# 47. Create ContactPage.jsx

The supplied contact page already contains company contact details and a contact form.

Convert the form into React.

Use:

```text
useState
```

for:

```text
name
email
message
```

When submitted:

```javascript
console.log(...)
```

Later this will become:

```text
POST /api/contact
```

---

# 48. Create NotFoundPage.jsx

Create:

```jsx
function NotFoundPage() {

    return (

        <main className="container my-5">

            <h1>
                404
            </h1>

            <p>
                The TripLayers page
                you requested does not exist.
            </p>

        </main>

    );

}

export default NotFoundPage;
```

---

# 49. Configure App.jsx

Now connect the application.

```jsx
import {
    Routes,
    Route
} from "react-router-dom";

import Navbar
    from "./components/Navbar";

import Footer
    from "./components/Footer";

import HomePage
    from "./pages/HomePage";

import SearchPage
    from "./pages/SearchPage";

import PropertyDetailsPage
    from "./pages/PropertyDetailsPage";

import LoginPage
    from "./pages/LoginPage";

import SignupPage
    from "./pages/SignupPage";

import BookingsPage
    from "./pages/BookingsPage";

import BookingDetailsPage
    from "./pages/BookingDetailsPage";

import EditBookingPage
    from "./pages/EditBookingPage";

import CommunityPage
    from "./pages/CommunityPage";

import PostDetailsPage
    from "./pages/PostDetailsPage";

import ContactPage
    from "./pages/ContactPage";

import NotFoundPage
    from "./pages/NotFoundPage";

function App() {

    return (

        <>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<HomePage />}
                />

                <Route
                    path="/search"
                    element={<SearchPage />}
                />

                <Route
                    path="/properties/:id"
                    element={
                        <PropertyDetailsPage />
                    }
                />

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/signup"
                    element={<SignupPage />}
                />

                <Route
                    path="/bookings"
                    element={<BookingsPage />}
                />

                <Route
                    path="/bookings/:id"
                    element={
                        <BookingDetailsPage />
                    }
                />

                <Route
                    path="/bookings/:id/edit"
                    element={
                        <EditBookingPage />
                    }
                />

                <Route
                    path="/community"
                    element={<CommunityPage />}
                />

                <Route
                    path="/posts/:id"
                    element={
                        <PostDetailsPage />
                    }
                />

                <Route
                    path="/contact"
                    element={<ContactPage />}
                />

                <Route
                    path="*"
                    element={<NotFoundPage />}
                />

            </Routes>

            <Footer />

        </>

    );

}

export default App;
```

---

# 50. Configure BrowserRouter

Open:

```text
main.jsx
```

Use:

```jsx
import React
    from "react";

import ReactDOM
    from "react-dom/client";

import {
    BrowserRouter
} from "react-router-dom";

import App
    from "./App";

import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./index.css";

ReactDOM
    .createRoot(
        document.getElementById("root")
    )
    .render(

        <React.StrictMode>

            <BrowserRouter>

                <App />

            </BrowserRouter>

        </React.StrictMode>

    );
```

---

# 51. Test Application Navigation

Test:

```text
/
```

Then:

```text
/search
```

Then:

```text
/properties/1
```

Then:

```text
/login
```

Then:

```text
/signup
```

Then:

```text
/bookings
```

Then:

```text
/community
```

Then:

```text
/contact
```

Then intentionally enter:

```text
/abcdef
```

Expected:

```text
404
```

---

# 52. React Router Architecture

The application now works like:

```text
Browser URL
      ↓
React Router
      ↓
Route
      ↓
Page Component
```

Example:

```text
/properties/3
       ↓
PropertyDetailsPage
       ↓
useParams()
       ↓
id = 3
       ↓
Find property
       ↓
Display property
```

---

# 53. Improve the Design

Students are allowed to improve the supplied design.

You may improve:

```text
Typography
Spacing
Navbar
Cards
Buttons
Hero section
Responsive layout
Images
Footer
Colours
Content
```

But do not spend the entire milestone redesigning the site.

The main objective is:

```text
static HTML
      ↓
reusable React architecture
```

not graphic design.

---

# 54. CSS Strategy

You may start by copying useful portions of the supplied:

```text
styles.css
```

into:

```text
src/index.css
```

The original stylesheet already defines a consistent colour system, form styling, navigation styles and responsive rules. 
But clean it as you go.

Do not blindly paste 400 lines if half are no longer used.

---

# 55. Suggested TripLayers Branding

You may retain the existing general travel feel.

Consider:

```text
Brand:
TripLayers

Tagline:
Travel has layers. Discover yours.
```

Possible home copy:

```text
Discover Your Next Layer

Find unique stays, plan your trips
and learn from travellers around the world.
```

---

# 56. Checkpoint 2 — Component Reuse

Your instructor should be able to verify:

```text
Navbar appears once in code
but everywhere in the application.

Footer appears once in code
but everywhere in the application.

PropertyCard appears once in code
but displays multiple properties.

PostCard appears once in code
but displays multiple posts.
```

If you copied property-card JSX four times, the task is not complete.

---

# 57. Checkpoint 3 — State

Your application must demonstrate `useState`.

At minimum:

```text
Search input
Login form
Signup form
Contact form
Edit booking form
```

Not every page needs state.

Use state where the interface needs memory.

---

# 58. Checkpoint 4 — Props

At minimum, demonstrate props using:

```text
PropertyCard

PostCard
```

Example:

```jsx
<PropertyCard property={property} />
```

---

# 59. Checkpoint 5 — Mapping Data

Students must demonstrate:

```javascript
.map()
```

Examples:

```text
Property cards
Community posts
Booking rows
```

Do not manually reproduce repeated content.

---

# 60. Common Error — Using class

Wrong:

```jsx
<div class="container">
```

Correct:

```jsx
<div className="container">
```

---

# 61. Common Error — Using href

Not preferred for internal React navigation:

```jsx
<a href="/search">
```

Use:

```jsx
<Link to="/search">
```

for internal application navigation.

---

# 62. Common Error — Component Not Capitalized

Wrong:

```jsx
function navbar() {
```

Correct:

```jsx
function Navbar() {
```

React components should start with a capital letter.

---

# 63. Common Error — Missing Import

If you see:

```text
Link is not defined
```

check:

```javascript
import { Link }
    from "react-router-dom";
```

---

# 64. Common Error — Missing Key

Wrong:

```jsx
properties.map((property) => (
    <PropertyCard
        property={property}
    />
))
```

Better:

```jsx
properties.map((property) => (
    <PropertyCard
        key={property.id}
        property={property}
    />
))
```

---

# 65. Common Error — Wrong Route

If:

```text
/properties/1
```

shows the 404 page, check:

```jsx
<Route
    path="/properties/:id"
```

and check that the route appears before the wildcard:

```text
*
```

---

# 66. Common Error — Bootstrap Menu Doesn't Open

Make sure Bootstrap JavaScript is imported:

```javascript
import "bootstrap/dist/js/bootstrap.bundle.min.js";
```

---

# 67. Common Error — Blank React Page

Open:

```text
Developer Tools
→ Console
```

Look for:

```text
import errors
syntax errors
undefined components
bad file paths
```

Never debug a blank React screen by randomly changing CSS.

Check the console first.

---

# 68. Student Practice Task 1

Add another property:

```text
Niagara Falls Riverside Hotel
```

with:

```text
Location:
Niagara Falls

Price:
$190
```

It should automatically appear wherever the property list is mapped.

---

# 69. Student Practice Task 2

Add:

```text
Calgary
```

to the property dataset.

Test whether the Search page can find it.

---

# 70. Student Practice Task 3

Add a Community post:

```text
48 Hours in Vancouver
```

The student should not edit:

```text
CommunityPage.jsx
```

to manually add the card.

Only update:

```text
posts.js
```

If the architecture is correct, the UI should update automatically.

---

# 71. Student Practice Task 4

Add:

```text
About
```

to the Navbar.

Create:

```text
AboutPage.jsx
```

Add:

```text
/about
```

to React Router.

---

# 72. Student Practice Task 5

Make the active search result display:

```text
Showing X properties
```

Example:

```text
Showing 2 properties
```

Use:

```javascript
filteredProperties.length
```

---

# 73. Stretch Challenge 1

Add price filtering.

Example:

```text
Maximum price:
$200
```

TripLayers should display only properties with:

```text
price <= 200
```

---

# 74. Stretch Challenge 2

Add sorting.

Options:

```text
Price Low → High

Price High → Low
```

---

# 75. Stretch Challenge 3

Add:

```text
Favourite
```

buttons to PropertyCard.

Use React state.

Do not build MongoDB favourite storage yet.

---

# 76. Stretch Challenge 4

Make the Navbar responsive and visually indicate the current page using:

```text
NavLink
```

instead of basic:

```text
Link
```

Research:

```text
NavLink React Router
```

---

# 77. Definition of Done

Milestone 1 is complete only when:

```text
✓ React application runs

✓ Vite is used

✓ Bootstrap works

✓ Original static files are preserved

✓ Navbar is reusable

✓ Footer is reusable

✓ React Router is configured

✓ Home route works

✓ Search route works

✓ Dynamic property route works

✓ Login page exists

✓ Signup page exists

✓ Booking pages exist

✓ Community page exists

✓ Dynamic post route exists

✓ Contact page exists

✓ 404 page exists

✓ PropertyCard is reusable

✓ PostCard is reusable

✓ Props are used

✓ useState is demonstrated

✓ map() is demonstrated

✓ Conditional rendering is demonstrated

✓ Search works using temporary data

✓ Design is responsive

✓ Browser console has no major errors

✓ Git commits exist
```

---

# 78. GitHub Requirement

When complete:

```bash
git status
```

Then:

```bash
git add .
```

Commit:

```bash
git commit -m "Complete milestone 1 React frontend"
```

Push:

```bash
git push
```

Suggested development commits before the final milestone commit:

```text
Create Vite React client

Add TripLayers shared Navbar and Footer

Add React Router pages

Create reusable PropertyCard component

Add property search state

Convert authentication pages to React

Convert booking pages to React

Transform blog into TripLayers Community

Add responsive styling

Complete milestone 1 React frontend
```

The full assignment assesses clean project structure, reusable components and GitHub commits.

---

# 79. Milestone Demonstration

Students should be able to demonstrate this scenario.

### Scenario

Ali is planning a trip.

### Step 1

Open:

```text
TripLayers Home
```

Explain:

> This page is now a React component.

### Step 2

Navigate:

```text
Home
→ Search
```

Explain:

> React Router changes which page component is displayed.

### Step 3

Search:

```text
Toronto
```

Explain:

> React state remembers the search value.

### Step 4

Open:

```text
Property Details
```

Explain:

> The property ID comes from the URL using useParams.

### Step 5

Go to:

```text
Community
```

Explain:

> Community posts are generated using reusable PostCard components.

### Step 6

Navigate to:

```text
Login
Signup
Bookings
Contact
```

### Step 7

Open:

```text
Navbar.jsx
```

Explain:

> The Navbar exists once but appears across the application.

### Step 8

Change:

```text
Community
```

temporarily to:

```text
Travel Stories
```

Show that the navigation changes everywhere.

This demonstrates the business reason for reusable components.

---

# 80. Student Reflection Questions

Answer these in your README.

### Question 1

What problem did React solve for TripLayers?

### Question 2

What is the difference between:

```text
Page Component
```

and:

```text
Reusable Component
```

### Question 3

Why is:

```jsx
<PropertyCard property={property} />
```

better than manually creating twenty property cards?

### Question 4

What problem does `useState` solve?

### Question 5

What problem does React Router solve?

### Question 6

Why are we currently using:

```text
properties.js
```

instead of MongoDB?

### Question 7

What will eventually replace the temporary property data?

Expected idea:

```text
MongoDB
      ↓
Express API
      ↓
Axios
      ↓
React
```

---

# 81. Architecture After Milestone 1

After this milestone:

```text
TRIPLAYER USER
      ↓
     React
      ↓
 React Router
      ↓
Page Components
      ↓
Reusable Components
      ↓
Temporary JavaScript Data
```

The application can display and manipulate frontend data.

But there is a major problem.

If we refresh or restart the application:

```text
No real users exist.

No real bookings exist.

No real posts exist.

No real property database exists.
```

TripLayers has an interface.

But it has no permanent memory.

---

# 82. The Next Business Problem

At the next TripLayers meeting, the founders ask:

> "The frontend looks much better now. But where do our properties come from? Where do users live? Where are bookings stored?"

That leads to the next stage of the project:

# Milestone 2 — TripLayers Needs Memory

We will introduce:

```text
Node.js
Express
MongoDB
Mongoose
REST API
```

TripLayers will move from:

```text
React prototype
```

toward:

```text
Full MERN application
```

---

# Milestone 1 Complete

You have transformed TripLayers from a collection of static HTML pages into the foundation of a modern React application.

You have not simply rewritten HTML.

You have changed the architecture of the product.

Before:

```text
Many independent pages
```

After:

```text
One React application
+
Reusable components
+
Reusable data
+
Application routing
```

This gives TripLayers a frontend architecture that can now support the backend, database, authentication, bookings and social features that will be introduced in the upcoming milestones.