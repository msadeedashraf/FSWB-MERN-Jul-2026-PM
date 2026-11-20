# TripLayers MERN Project

# Milestone 2 --- Building the TripLayers Backend API

> **Story:** TripLayers has a working React interface, but the frontend
> still owns the data. In this milestone the team creates the company's
> first backend service and moves property, booking, and community data
> behind an Express REST API.

------------------------------------------------------------------------

## 1. The TripLayers Story

TripLayers has completed Milestone 1.

The frontend team can now demonstrate:

-   reusable React components,
-   React Router navigation,
-   property search,
-   property details,
-   booking screens,
-   community posts,
-   controlled forms,
-   temporary favourites and filters.

The founders are pleased.

During the next product meeting, an investor asks:

> "Where does the property information come from?"

The answer is uncomfortable:

> "From JavaScript files inside the React application."

That means the browser currently owns data that should belong to
TripLayers.

The team needs a backend.

------------------------------------------------------------------------

## 2. Where We Are

Current architecture:

``` text
Browser
  ↓
React
  ↓
properties.js
bookings.js
posts.js
```

Target architecture:

``` text
Browser
  ↓
React
  ↓ Axios / HTTP
Express API :5000
  ↓
Temporary server-side JavaScript data
```

MongoDB is deliberately **not** introduced yet.

We want to understand the API layer first.

------------------------------------------------------------------------

## 3. Business Problem

A real application should not require the React frontend to contain the
company's property, booking, and post records.

TripLayers needs a service that can answer questions such as:

``` text
Give me all properties.
Give me property 3.
Give me all bookings.
Give me booking 1001.
Give me all community posts.
Give me post 2.
```

Those requests will become HTTP endpoints.

------------------------------------------------------------------------

## 4. User Story

> As a TripLayers traveller, I want the application to request current
> TripLayers data from a central service so that every frontend can work
> with the same source of information.

------------------------------------------------------------------------

## 5. Development Ticket --- TL-002

**Title:** Build the first TripLayers backend API

**Requested by:** TripLayers Product Team

### Requirements

Create a Node/Express backend that:

-   runs independently from React,
-   listens on port 5000,
-   returns JSON,
-   exposes property endpoints,
-   exposes booking endpoints,
-   exposes post endpoints,
-   uses routes and controllers,
-   handles 404 responses,
-   allows the React client through CORS,
-   stores configuration in environment variables,
-   lets React retrieve data using Axios.

### Not included yet

-   MongoDB
-   Mongoose
-   user registration
-   login
-   JWT
-   permanent CRUD

------------------------------------------------------------------------

## 6. What Students Will Learn

By the end of this milestone you should understand:

-   frontend vs backend,
-   Node.js,
-   npm and `package.json`,
-   Express,
-   HTTP requests and responses,
-   JSON,
-   REST APIs,
-   GET routes,
-   route parameters,
-   controllers,
-   status codes,
-   middleware,
-   CORS,
-   `.env`,
-   Axios,
-   `useEffect`,
-   loading states,
-   error states,
-   asynchronous requests,
-   client/server separation.

------------------------------------------------------------------------

## 7. Starting Point

Start from the **completed required reference build of Milestone 1**.

Your project should already contain:

``` text
triplayers/
├── client/
├── original-static/
├── README.md
└── .gitignore
```

Now we activate the previously reserved backend folder:

``` text
server/
```

------------------------------------------------------------------------

## 8. Check the Milestone 1 Application

Before changing anything:

``` bash
cd client
npm install
npm run dev
```

Confirm the React application works.

Stop it with:

``` text
Ctrl + C
```

Do not start Milestone 2 from a broken Milestone 1 project.

------------------------------------------------------------------------

## 9. Create the Server Folder

From the project root:

``` bash
mkdir server
cd server
```

Initialize Node:

``` bash
npm init -y
```

You should now have:

``` text
server/
└── package.json
```

------------------------------------------------------------------------

## 10. What Is Node.js?

JavaScript originally ran mainly inside browsers.

Node.js allows JavaScript to run outside the browser.

For TripLayers:

``` text
React JavaScript
→ runs in browser

Node JavaScript
→ runs on server
```

This lets us use JavaScript across the MERN stack.

------------------------------------------------------------------------

## 11. Install Express

Inside `server/`:

``` bash
npm install express
```

Install development helper:

``` bash
npm install --save-dev nodemon
```

------------------------------------------------------------------------

## 12. Install CORS and dotenv

``` bash
npm install cors dotenv
```

We will use:

``` text
cors
→ allows the React origin to call our API

dotenv
→ loads configuration from .env
```

------------------------------------------------------------------------

## 13. Configure package.json

Update the scripts section:

``` json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

Do not remove the rest of the valid JSON structure.

------------------------------------------------------------------------

## 14. Create server.js

Create:

``` text
server/server.js
```

Add:

``` javascript
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "TripLayers API is running"
    });
});

app.listen(PORT, () => {
    console.log(
        `TripLayers API running on port ${PORT}`
    );
});
```

------------------------------------------------------------------------

## 15. Start the Backend

Run:

``` bash
npm run dev
```

Expected terminal message:

``` text
TripLayers API running on port 5000
```

Open:

``` text
http://localhost:5000
```

Expected JSON:

``` json
{
  "message": "TripLayers API is running"
}
```

------------------------------------------------------------------------

## 16. Checkpoint 1

Confirm:

``` text
✓ Node starts
✓ Express starts
✓ port 5000 works
✓ browser displays JSON
✓ no major terminal error
```

------------------------------------------------------------------------

## 17. What Just Happened?

The browser sent:

``` text
GET /
```

Express received the request.

This route:

``` javascript
app.get("/", (req, res) => {
```

matched it.

Then Express sent a JSON response:

``` javascript
res.json({
    message: "TripLayers API is running"
});
```

------------------------------------------------------------------------

## 18. Request and Response

The basic web conversation is:

``` text
CLIENT
  |
  | request
  ↓
SERVER
  |
  | response
  ↓
CLIENT
```

For TripLayers:

``` text
React
  |
  | GET /api/properties
  ↓
Express
  |
  | JSON
  ↓
React
```

------------------------------------------------------------------------

## 19. What Is an API?

API means:

``` text
Application Programming Interface
```

For this project, think:

> A defined way for React to communicate with the TripLayers server.

React should not need to know how the backend internally stores data.

It only needs to know the API contract.

------------------------------------------------------------------------

## 20. What Is REST?

We will organize URLs around resources.

Examples:

``` text
/api/properties
/api/bookings
/api/posts
```

Later we can use HTTP methods:

``` text
GET     Read
POST    Create
PUT     Update
DELETE  Delete
```

Milestone 2 focuses mainly on **GET**.

------------------------------------------------------------------------

## 21. Create the Backend Structure

Create:

``` text
server/
├── controllers/
├── data/
├── routes/
├── .env
├── .gitignore
├── package.json
└── server.js
```

This separates responsibilities before the project becomes large.

------------------------------------------------------------------------

## 22. Create .env

Inside `server/.env`:

``` env
PORT=5000
CLIENT_URL=http://localhost:5173
```

Never commit secrets to Git.

Update the root `.gitignore` or server `.gitignore`:

``` text
node_modules
.env
dist
```

------------------------------------------------------------------------

## 23. Improve CORS Configuration

Replace:

``` javascript
app.use(cors());
```

with:

``` javascript
app.use(
    cors({
        origin: process.env.CLIENT_URL
    })
);
```

This explicitly allows the React development client.

------------------------------------------------------------------------

## 24. Move Property Data to the Server

Create:

``` text
server/data/properties.js
```

Use the completed Milestone 1 property dataset:

``` javascript
const properties = [
    {
        id: 1,
        name: "Luxury Apartment Downtown",
        location: "Toronto",
        price: 180,
        image: "https://via.placeholder.com/400x250",
        description:
            "Modern apartment located in downtown Toronto."
    },
    {
        id: 2,
        name: "Mountain View Cabin",
        location: "Banff",
        price: 220,
        image: "https://via.placeholder.com/400x250",
        description:
            "Relaxing cabin surrounded by mountain views."
    },
    {
        id: 3,
        name: "Waterfront Suite",
        location: "Vancouver",
        price: 250,
        image: "https://via.placeholder.com/400x250",
        description:
            "Beautiful waterfront accommodation."
    },
    {
        id: 4,
        name: "Old Montreal Loft",
        location: "Montreal",
        price: 160,
        image: "https://via.placeholder.com/400x250",
        description:
            "Stylish loft in historic Old Montreal."
    },
    {
        id: 5,
        name: "Niagara Riverside Hotel",
        location: "Niagara Falls",
        price: 190,
        image: "https://via.placeholder.com/400x250",
        description:
            "Comfortable riverside accommodation close to Niagara Falls."
    },
    {
        id: 6,
        name: "Calgary Downtown Residence",
        location: "Calgary",
        price: 145,
        image: "https://via.placeholder.com/400x250",
        description:
            "Modern stay located near downtown Calgary."
    }
];

module.exports = properties;
```

The data has moved from the frontend to the backend.

------------------------------------------------------------------------

## 25. First Property Endpoint

Temporarily import the data into `server.js`:

``` javascript
const properties = require("./data/properties");
```

Add:

``` javascript
app.get("/api/properties", (req, res) => {
    res.json(properties);
});
```

Restart if needed and open:

``` text
http://localhost:5000/api/properties
```

You should see the array as JSON.

------------------------------------------------------------------------

## 26. Checkpoint 2

Verify:

``` text
GET /api/properties
```

returns all six properties.

At this moment TripLayers has its first real application endpoint.

------------------------------------------------------------------------

## 27. Why We Will Not Leave Routes in server.js

This works:

``` javascript
app.get("/api/properties", ...)
```

But if we put every TripLayers endpoint in `server.js`, that file will
become huge.

We will separate:

``` text
route
→ decides which request arrived

controller
→ decides what to do
```

------------------------------------------------------------------------

## 28. Create propertyController.js

Create:

``` text
server/controllers/propertyController.js
```

Add:

``` javascript
const properties = require("../data/properties");

const getProperties = (req, res) => {
    res.status(200).json(properties);
};

const getPropertyById = (req, res) => {
    const id = Number(req.params.id);

    const property = properties.find(
        (property) => property.id === id
    );

    if (!property) {
        return res.status(404).json({
            message: "Property not found"
        });
    }

    res.status(200).json(property);
};

module.exports = {
    getProperties,
    getPropertyById
};
```

------------------------------------------------------------------------

## 29. Understanding req.params

If the browser requests:

``` text
/api/properties/3
```

and our route contains:

``` text
/:id
```

then:

``` javascript
req.params.id
```

contains:

``` text
"3"
```

Route parameters arrive as strings, so we convert:

``` javascript
Number(req.params.id)
```

------------------------------------------------------------------------

## 30. Create propertyRoutes.js

Create:

``` text
server/routes/propertyRoutes.js
```

Add:

``` javascript
const express = require("express");

const {
    getProperties,
    getPropertyById
} = require("../controllers/propertyController");

const router = express.Router();

router.get("/", getProperties);
router.get("/:id", getPropertyById);

module.exports = router;
```

------------------------------------------------------------------------

## 31. Connect Property Routes

In `server.js`:

``` javascript
const propertyRoutes =
    require("./routes/propertyRoutes");
```

Then:

``` javascript
app.use(
    "/api/properties",
    propertyRoutes
);
```

Remove the temporary direct property route from `server.js`.

------------------------------------------------------------------------

## 32. Test Both Property Routes

Test:

``` text
GET http://localhost:5000/api/properties
```

and:

``` text
GET http://localhost:5000/api/properties/3
```

Expected second result:

``` json
{
  "id": 3,
  "name": "Waterfront Suite",
  "location": "Vancouver",
  "price": 250
}
```

The actual object contains the remaining fields too.

------------------------------------------------------------------------

## 33. Test a Missing Property

Open:

``` text
http://localhost:5000/api/properties/999
```

Expected status:

``` text
404
```

Expected JSON:

``` json
{
  "message": "Property not found"
}
```

------------------------------------------------------------------------

## 34. HTTP Status Codes

Students should begin recognizing:

``` text
200 → OK
201 → Created
400 → Bad Request
401 → Unauthorized
403 → Forbidden
404 → Not Found
500 → Server Error
```

We will use more of these later.

------------------------------------------------------------------------

## 35. Move Booking Data to the Backend

Create:

``` text
server/data/bookings.js
```

Add:

``` javascript
const bookings = [
    {
        id: 1001,
        propertyId: 3,
        property: "Waterfront Suite",
        location: "Vancouver",
        checkIn: "2026-09-10",
        checkOut: "2026-09-14",
        guests: 2,
        roomType: "Waterfront King",
        totalPrice: 1000,
        status: "Confirmed"
    },
    {
        id: 1002,
        propertyId: 4,
        property: "Old Montreal Loft",
        location: "Montreal",
        checkIn: "2026-10-05",
        checkOut: "2026-10-07",
        guests: 2,
        roomType: "Loft Suite",
        totalPrice: 320,
        status: "Pending"
    }
];

module.exports = bookings;
```

------------------------------------------------------------------------

## 36. Create bookingController.js

``` javascript
const bookings = require("../data/bookings");

const getBookings = (req, res) => {
    res.status(200).json(bookings);
};

const getBookingById = (req, res) => {
    const id = Number(req.params.id);

    const booking = bookings.find(
        (booking) => booking.id === id
    );

    if (!booking) {
        return res.status(404).json({
            message: "Booking not found"
        });
    }

    res.status(200).json(booking);
};

module.exports = {
    getBookings,
    getBookingById
};
```

------------------------------------------------------------------------

## 37. Create bookingRoutes.js

``` javascript
const express = require("express");

const {
    getBookings,
    getBookingById
} = require("../controllers/bookingController");

const router = express.Router();

router.get("/", getBookings);
router.get("/:id", getBookingById);

module.exports = router;
```

------------------------------------------------------------------------

## 38. Connect Booking Routes

In `server.js`:

``` javascript
const bookingRoutes =
    require("./routes/bookingRoutes");
```

Then:

``` javascript
app.use(
    "/api/bookings",
    bookingRoutes
);
```

------------------------------------------------------------------------

## 39. Test Booking API

Test:

``` text
GET /api/bookings
GET /api/bookings/1001
GET /api/bookings/9999
```

Expected:

``` text
all bookings
one booking
404 JSON
```

------------------------------------------------------------------------

## 40. Move Community Post Data

Create:

``` text
server/data/posts.js
```

Add:

``` javascript
const posts = [
    {
        id: 1,
        author: "Sara Ahmed",
        title: "My Weekend in Banff",
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
    },
    {
        id: 3,
        author: "Maya Patel",
        title: "48 Hours in Vancouver",
        summary:
            "A quick Vancouver itinerary covering food, waterfront walks and city views.",
        image:
            "https://via.placeholder.com/800x400"
    }
];

module.exports = posts;
```

------------------------------------------------------------------------

## 41. Create postController.js

``` javascript
const posts = require("../data/posts");

const getPosts = (req, res) => {
    res.status(200).json(posts);
};

const getPostById = (req, res) => {
    const id = Number(req.params.id);

    const post = posts.find(
        (post) => post.id === id
    );

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    res.status(200).json(post);
};

module.exports = {
    getPosts,
    getPostById
};
```

------------------------------------------------------------------------

## 42. Create postRoutes.js

``` javascript
const express = require("express");

const {
    getPosts,
    getPostById
} = require("../controllers/postController");

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);

module.exports = router;
```

------------------------------------------------------------------------

## 43. Connect Post Routes

In `server.js`:

``` javascript
const postRoutes =
    require("./routes/postRoutes");
```

Then:

``` javascript
app.use(
    "/api/posts",
    postRoutes
);
```

------------------------------------------------------------------------

## 44. Test Post API

Test:

``` text
GET /api/posts
GET /api/posts/1
GET /api/posts/999
```

------------------------------------------------------------------------

## 45. Add an API 404 Handler

After all routes but before `app.listen`, add:

``` javascript
app.use((req, res) => {
    res.status(404).json({
        message: "API route not found"
    });
});
```

Now test:

``` text
/api/does-not-exist
```

Expected:

``` json
{
  "message": "API route not found"
}
```

------------------------------------------------------------------------

## 46. Final server.js at This Stage

``` javascript
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const propertyRoutes =
    require("./routes/propertyRoutes");

const bookingRoutes =
    require("./routes/bookingRoutes");

const postRoutes =
    require("./routes/postRoutes");

const app = express();

const PORT =
    process.env.PORT || 5000;

app.use(
    cors({
        origin: process.env.CLIENT_URL
    })
);

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "TripLayers API is running"
    });
});

app.use(
    "/api/properties",
    propertyRoutes
);

app.use(
    "/api/bookings",
    bookingRoutes
);

app.use(
    "/api/posts",
    postRoutes
);

app.use((req, res) => {
    res.status(404).json({
        message: "API route not found"
    });
});

app.listen(PORT, () => {
    console.log(
        `TripLayers API running on port ${PORT}`
    );
});
```

------------------------------------------------------------------------

## 47. Checkpoint 3 --- Backend API

Before touching React, all of these should work:

``` text
GET /
GET /api/properties
GET /api/properties/1
GET /api/bookings
GET /api/bookings/1001
GET /api/posts
GET /api/posts/1
```

Invalid IDs should return 404.

------------------------------------------------------------------------

## 48. The Frontend Still Uses Local Data

Our backend works, but React is still importing:

``` javascript
import { properties }
    from "../data/properties";
```

That defeats the purpose.

Now we connect both applications.

------------------------------------------------------------------------

## 49. Install Axios

Open a second terminal:

``` bash
cd client
npm install axios
```

We will run two processes:

``` text
Terminal 1
server → npm run dev

Terminal 2
client → npm run dev
```

------------------------------------------------------------------------

## 50. Why Axios?

React needs to send HTTP requests.

Axios gives us a clean API:

``` javascript
axios.get(...)
```

The browser's built-in `fetch()` could also work, but TripLayers will
use Axios consistently.

------------------------------------------------------------------------

## 51. Create Client Environment Variable

Create:

``` text
client/.env
```

Add:

``` env
VITE_API_URL=http://localhost:5000/api
```

With Vite, client-exposed environment variables must begin with:

``` text
VITE_
```

Restart the Vite development server after changing `.env`.

------------------------------------------------------------------------

## 52. Create an API Helper

Create:

``` text
client/src/api/api.js
```

Add:

``` javascript
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export default api;
```

Now pages do not need to repeatedly type the complete server URL.

------------------------------------------------------------------------

## 53. Replace Local Properties in SearchPage

Remove:

``` javascript
import { properties }
    from "../data/properties";
```

Add:

``` javascript
import { useEffect, useState } from "react";
import api from "../api/api";
```

We now need state for API data.

------------------------------------------------------------------------

## 54. Add Property API State

Inside `SearchPage`:

``` javascript
const [properties, setProperties] =
    useState([]);

const [search, setSearch] =
    useState("");

const [loading, setLoading] =
    useState(true);

const [error, setError] =
    useState("");
```

------------------------------------------------------------------------

## 55. Fetch Properties with useEffect

Add:

``` javascript
useEffect(() => {

    const fetchProperties = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await api.get("/properties");

            setProperties(response.data);

        } catch (error) {

            console.error(error);

            setError(
                "Unable to load properties."
            );

        } finally {

            setLoading(false);

        }

    };

    fetchProperties();

}, []);
```

------------------------------------------------------------------------

## 56. What Does useEffect Solve?

When the Search page opens, TripLayers needs to ask the server:

``` text
Give me the properties.
```

We want that request to happen when the component loads.

``` javascript
useEffect(..., []);
```

gives us that lifecycle behavior.

------------------------------------------------------------------------

## 57. Understanding async/await

HTTP requests take time.

JavaScript should not freeze while waiting.

``` javascript
await api.get("/properties");
```

means:

> Wait for this asynchronous operation inside this async function, then
> continue with its result.

------------------------------------------------------------------------

## 58. Add Loading UI

Before the normal return:

``` jsx
if (loading) {
    return (
        <main className="container my-5">
            <p>Loading properties...</p>
        </main>
    );
}
```

------------------------------------------------------------------------

## 59. Add Error UI

After the loading check:

``` jsx
if (error) {
    return (
        <main className="container my-5">
            <div className="alert alert-danger">
                {error}
            </div>
        </main>
    );
}
```

------------------------------------------------------------------------

## 60. Keep Client-Side Search

We can still filter the API result:

``` javascript
const filteredProperties =
    properties.filter((property) =>
        property.location
            .toLowerCase()
            .includes(search.toLowerCase())
    );
```

The difference is important:

Before:

``` text
React owned properties.
```

Now:

``` text
Express owns properties.
React receives properties.
```

------------------------------------------------------------------------

## 61. Completed SearchPage Core

``` jsx
import { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import api from "../api/api";

function SearchPage() {

    const [properties, setProperties] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        const fetchProperties = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get("/properties");

                setProperties(response.data);

            } catch (error) {

                console.error(error);

                setError(
                    "Unable to load properties."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchProperties();

    }, []);

    const filteredProperties =
        properties.filter((property) =>
            property.location
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    if (loading) {
        return (
            <main className="container my-5">
                <p>Loading properties...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="container my-5">
                <div className="alert alert-danger">
                    {error}
                </div>
            </main>
        );
    }

    return (
        <main className="container my-5">

            <h1 className="mb-4">
                Search Properties
            </h1>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by city"
                value={search}
                onChange={(event) =>
                    setSearch(event.target.value)
                }
            />

            <p className="text-muted">
                Showing {filteredProperties.length} properties
            </p>

            <div className="row">

                {filteredProperties.length === 0 ? (

                    <div className="col-12">
                        <div className="alert alert-info">
                            No properties found.
                        </div>
                    </div>

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

            </div>

        </main>
    );
}

export default SearchPage;
```

------------------------------------------------------------------------

## 62. Test Client → Server Communication

Run:

``` text
server: npm run dev
client: npm run dev
```

Open Search.

Expected flow:

``` text
SearchPage loads
↓
Axios GET /api/properties
↓
Express route
↓
Controller
↓
Server data
↓
JSON response
↓
setProperties()
↓
PropertyCard renders
```

------------------------------------------------------------------------

## 63. Prove the Frontend Is Using the API

Stop the backend server.

Refresh Search.

Expected:

``` text
Unable to load properties.
```

Restart the server.

Refresh again.

Properties return.

This is an important demonstration.

------------------------------------------------------------------------

## 64. Update PropertyDetailsPage

Property Details should also stop importing local property data.

Use:

``` jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

function PropertyDetailsPage() {

    const { id } = useParams();

    const [property, setProperty] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        const fetchProperty = async () => {

            try {

                const response =
                    await api.get(
                        `/properties/${id}`
                    );

                setProperty(response.data);

            } catch (error) {

                console.error(error);

                if (
                    error.response?.status === 404
                ) {
                    setError(
                        "Property not found."
                    );
                } else {
                    setError(
                        "Unable to load property."
                    );
                }

            } finally {

                setLoading(false);

            }

        };

        fetchProperty();

    }, [id]);

    if (loading) {
        return (
            <main className="container my-5">
                <p>Loading property...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="container my-5">
                <div className="alert alert-danger">
                    {error}
                </div>
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

            <h1>{property.name}</h1>

            <h4>{property.location}</h4>

            <p>{property.description}</p>

            <h3>
                ${property.price} per night
            </h3>

            <hr />

            <h2>Book Your Stay</h2>

            <p>
                Real booking creation will be
                implemented in a later milestone.
            </p>

        </main>
    );
}

export default PropertyDetailsPage;
```

------------------------------------------------------------------------

## 65. Why `[id]` Is in useEffect

PropertyDetailsPage depends on the URL ID.

``` javascript
useEffect(..., [id]);
```

means the request should run again if the ID changes.

------------------------------------------------------------------------

## 66. Update BookingsPage

Replace the local booking import with API state.

Core request:

``` javascript
const response =
    await api.get("/bookings");

setBookings(response.data);
```

Use the same three states:

``` javascript
bookings
loading
error
```

Continue rendering with:

``` jsx
bookings.map((booking) => (
    <BookingRow
        key={booking.id}
        booking={booking}
    />
))
```

------------------------------------------------------------------------

## 67. Completed BookingsPage

``` jsx
import { useEffect, useState } from "react";
import BookingRow from "../components/BookingRow";
import api from "../api/api";

function BookingsPage() {

    const [bookings, setBookings] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        const fetchBookings = async () => {

            try {

                const response =
                    await api.get("/bookings");

                setBookings(response.data);

            } catch (error) {

                console.error(error);

                setError(
                    "Unable to load bookings."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchBookings();

    }, []);

    if (loading) {
        return (
            <main className="container my-5">
                <p>Loading bookings...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="container my-5">
                <div className="alert alert-danger">
                    {error}
                </div>
            </main>
        );
    }

    return (
        <main className="container my-5">

            <h1 className="mb-4">
                My Bookings
            </h1>

            {bookings.length === 0 ? (

                <div className="alert alert-info">
                    You do not have any bookings yet.
                </div>

            ) : (

                <div className="table-responsive">

                    <table className="table table-striped table-bordered">

                        <thead className="table-dark">
                            <tr>
                                <th>Booking ID</th>
                                <th>Property</th>
                                <th>Check-in</th>
                                <th>Check-out</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {bookings.map(
                                (booking) => (
                                    <BookingRow
                                        key={booking.id}
                                        booking={booking}
                                    />
                                )
                            )}

                        </tbody>

                    </table>

                </div>

            )}

        </main>
    );
}

export default BookingsPage;
```

------------------------------------------------------------------------

## 68. Update BookingDetailsPage

Use:

``` text
GET /api/bookings/:id
```

instead of:

``` javascript
bookings.find(...)
```

Core request:

``` javascript
const response =
    await api.get(`/bookings/${id}`);
```

Use:

``` text
booking
loading
error
```

state just like PropertyDetailsPage.

------------------------------------------------------------------------

## 69. Important Limitation --- Edit Booking

The Edit Booking form can now load a booking from the backend, but
updating it permanently would require:

``` text
PUT /api/bookings/:id
```

We are deliberately saving write operations for the CRUD milestone.

For now:

-   load booking through API,
-   allow local form editing,
-   log the updated object,
-   clearly tell the user it is not persisted.

This limitation creates a future business problem.

------------------------------------------------------------------------

## 70. Update CommunityPage

Remove local posts import.

Fetch:

``` javascript
const response =
    await api.get("/posts");
```

Store:

``` javascript
setPosts(response.data);
```

Render the existing reusable `PostCard`.

------------------------------------------------------------------------

## 71. Completed CommunityPage

``` jsx
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import api from "../api/api";

function CommunityPage() {

    const [posts, setPosts] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        const fetchPosts = async () => {

            try {

                const response =
                    await api.get("/posts");

                setPosts(response.data);

            } catch (error) {

                console.error(error);

                setError(
                    "Unable to load community posts."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchPosts();

    }, []);

    if (loading) {
        return (
            <main className="container my-5">
                <p>Loading community...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="container my-5">
                <div className="alert alert-danger">
                    {error}
                </div>
            </main>
        );
    }

    return (
        <main className="container my-5">

            <h1>
                TripLayers Community
            </h1>

            <p>
                Travel stories, advice and experiences
                from other travellers.
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

------------------------------------------------------------------------

## 72. Update PostDetailsPage

Use:

``` text
GET /api/posts/:id
```

The pattern should now feel familiar:

``` text
useParams
↓
useEffect
↓
Axios
↓
Express
↓
Controller
↓
JSON
↓
React state
```

Students should attempt this page with less instructor guidance.

------------------------------------------------------------------------

## 73. HomePage Needs API Data Too

Milestone 1 used:

``` javascript
properties.slice(0, 3)
```

from local data.

Now HomePage should fetch properties and display the first three
returned by the API.

This is a good guided-to-independent transition.

------------------------------------------------------------------------

## 74. Do We Delete client/src/data?

Once all required React pages use the API, the old frontend files:

``` text
client/src/data/properties.js
client/src/data/bookings.js
client/src/data/posts.js
```

should no longer be required.

Do **not** delete them until you have confirmed all imports are removed.

Then remove the obsolete files.

The source of application data is now the server.

------------------------------------------------------------------------

## 75. Final Architecture

``` text
TRAVELLER
   ↓
Browser
   ↓
React Components
   ↓
Axios
   ↓
HTTP Request
   ↓
Express Routes
   ↓
Controllers
   ↓
Server-side Arrays
   ↓
JSON Response
   ↓
React State
   ↓
Rendered UI
```

This is our first client/server architecture.

------------------------------------------------------------------------

## 76. Final Backend Folder Structure

``` text
server/
├── controllers/
│   ├── propertyController.js
│   ├── bookingController.js
│   └── postController.js
├── data/
│   ├── properties.js
│   ├── bookings.js
│   └── posts.js
├── routes/
│   ├── propertyRoutes.js
│   ├── bookingRoutes.js
│   └── postRoutes.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

------------------------------------------------------------------------

## 77. Final Client Changes

New:

``` text
client/src/api/api.js
client/.env
```

Updated:

``` text
HomePage.jsx
SearchPage.jsx
PropertyDetailsPage.jsx
BookingsPage.jsx
BookingDetailsPage.jsx
EditBookingPage.jsx
CommunityPage.jsx
PostDetailsPage.jsx
```

Eventually removed:

``` text
client/src/data/
```

once no longer used.

------------------------------------------------------------------------

## 78. Common Error --- Cannot Find Module express

Error:

``` text
Cannot find module 'express'
```

Check that you ran:

``` bash
cd server
npm install
```

Do not install server packages inside `client`.

------------------------------------------------------------------------

## 79. Common Error --- EADDRINUSE

If you see:

``` text
EADDRINUSE
```

port 5000 is already being used.

You may already have another backend process running.

Stop it before starting another.

------------------------------------------------------------------------

## 80. Common Error --- CORS

If the browser reports a CORS error:

Check:

``` env
CLIENT_URL=http://localhost:5173
```

and:

``` javascript
app.use(
    cors({
        origin: process.env.CLIENT_URL
    })
);
```

Restart the server after `.env` changes.

------------------------------------------------------------------------

## 81. Common Error --- Axios Network Error

Check:

``` text
Is Express running?
Is it on port 5000?
Is VITE_API_URL correct?
Did you restart Vite after editing .env?
```

Expected:

``` env
VITE_API_URL=http://localhost:5000/api
```

------------------------------------------------------------------------

## 82. Common Error --- require Is Not Defined

This guide uses CommonJS on the backend:

``` javascript
const express = require("express");
```

Do not add:

``` json
"type": "module"
```

to `server/package.json` unless you intentionally convert the backend to
ES modules.

Keep one module system consistent.

------------------------------------------------------------------------

## 83. Common Error --- req.params.id Does Not Match

Remember:

``` javascript
req.params.id
```

is a string.

Our temporary IDs are numbers.

Use:

``` javascript
Number(req.params.id)
```

------------------------------------------------------------------------

## 84. Common Error --- React Keeps Showing Old Data

Possible causes:

``` text
React still imports ../data/properties
Vite was not restarted
wrong API URL
server data was not saved
browser has an old page open
```

Use Developer Tools → Network to inspect requests.

------------------------------------------------------------------------

# Student Challenges

Attempt these **before opening the Milestone 2 Challenge Solutions
document**.

------------------------------------------------------------------------

## 85. Student Challenge 1 --- API Health Endpoint

### Story

TripLayers operations wants a simple way to check whether the backend is
alive.

### Requirement

Create:

``` text
GET /api/health
```

Expected response:

``` json
{
  "status": "ok",
  "service": "TripLayers API"
}
```

### Skills

-   Express route
-   JSON response
-   status 200

------------------------------------------------------------------------

## 86. Student Challenge 2 --- Search Properties Through the API

Currently React downloads all properties and filters them in the
browser.

TripLayers wants the server to support:

``` text
GET /api/properties?location=Toronto
```

### Requirement

If `location` exists, return only matching locations.

If it does not exist, return all properties.

### Hint

Investigate:

``` javascript
req.query
```

Do not look at the solution until you attempt it.

------------------------------------------------------------------------

## 87. Student Challenge 3 --- Maximum Price Query

Extend the property API:

``` text
GET /api/properties?maxPrice=200
```

Expected:

Only properties costing 200 or less.

Then support both:

``` text
/api/properties?location=Toronto&maxPrice=200
```

------------------------------------------------------------------------

## 88. Student Challenge 4 --- Build PostDetailsPage from the API

Without copying PropertyDetailsPage line-by-line, implement:

``` text
GET /api/posts/:id
```

inside the React Post Details page.

Must include:

``` text
loading state
error state
404 handling
post rendering
```

------------------------------------------------------------------------

## 89. Student Challenge 5 --- Convert HomePage to API Data

HomePage must no longer import local `properties.js`.

Fetch properties from:

``` text
/api/properties
```

and show the first three as Featured Properties.

------------------------------------------------------------------------

## 90. Student Challenge 6 --- Server Error Middleware

Create a centralized error handler:

``` javascript
app.use((err, req, res, next) => {
    ...
});
```

Return:

``` json
{
  "message": "Internal server error"
}
```

with status:

``` text
500
```

The challenge solution will show one clean implementation.

------------------------------------------------------------------------

# Stretch Challenges

These are optional. Milestone 3 will **not** depend on them.

------------------------------------------------------------------------

## 91. Stretch Challenge 1 --- API Metadata

Change:

``` text
GET /api/properties
```

from returning only an array to optionally support a response such as:

``` json
{
  "count": 6,
  "properties": []
}
```

Think about what frontend changes this would require.

------------------------------------------------------------------------

## 92. Stretch Challenge 2 --- Reusable Loading Component

The pages repeat:

``` text
Loading properties...
Loading bookings...
Loading community...
```

Create:

``` text
Loading.jsx
```

and reuse it.

------------------------------------------------------------------------

## 93. Stretch Challenge 3 --- Reusable ErrorMessage Component

Create:

``` text
ErrorMessage.jsx
```

Example usage:

``` jsx
<ErrorMessage message={error} />
```

Reduce repeated Bootstrap alert markup.

------------------------------------------------------------------------

## 94. Stretch Challenge 4 --- Axios Timeout

Configure the Axios instance with a timeout.

If the API takes too long, display a useful error.

Research:

``` text
Axios timeout
```

------------------------------------------------------------------------

## 95. Stretch Challenge 5 --- Request Logger Middleware

Create middleware that logs:

``` text
GET /api/properties
GET /api/posts/1
```

along with a timestamp.

Do not install a logging library yet.

Build a simple middleware yourself.

------------------------------------------------------------------------

## 96. Milestone 2 Definition of Done

Required reference build:

``` text
✓ Milestone 1 frontend still works
✓ server folder exists
✓ Node project initialized
✓ Express installed
✓ nodemon installed
✓ CORS configured
✓ dotenv configured
✓ server runs independently
✓ /api/properties works
✓ /api/properties/:id works
✓ /api/bookings works
✓ /api/bookings/:id works
✓ /api/posts works
✓ /api/posts/:id works
✓ controllers are separated
✓ routes are separated
✓ server data is separated
✓ missing resources return 404
✓ unknown API routes return 404
✓ Axios installed
✓ client API helper exists
✓ VITE_API_URL configured
✓ SearchPage uses API
✓ PropertyDetailsPage uses API
✓ BookingsPage uses API
✓ BookingDetailsPage uses API
✓ CommunityPage uses API
✓ PostDetailsPage uses API
✓ HomePage uses API
✓ loading states exist
✓ error states exist
✓ old client data imports removed
✓ application works with two terminals
✓ browser console has no major errors
✓ server terminal has no major errors
```

Required student challenges should be completed before Milestone 3 or
replaced with the provided reference solutions.

Stretch challenges remain optional.

------------------------------------------------------------------------

## 97. Milestone Demonstration

### Scenario

Ali opens TripLayers and searches for accommodation.

### Student should demonstrate

1.  Start the Express server.
2.  Start the React client.
3.  Open `/api/properties` directly in the browser.
4.  Explain the JSON.
5.  Open TripLayers Search.
6.  Show the same properties rendered as React cards.
7.  Open Developer Tools → Network.
8.  Refresh.
9.  Show the HTTP request.
10. Open a property.
11. Show `/api/properties/:id`.
12. Open My Bookings.
13. Open Community.
14. Stop the Express server.
15. Refresh Search.
16. Explain the error state.
17. Restart Express.
18. Refresh again.
19. Explain why the application works again.

------------------------------------------------------------------------

## 98. Student Reflection

Answer in `README.md`.

### Question 1

What is the difference between the frontend and backend?

### Question 2

Why did we move `properties.js` out of React?

### Question 3

What is an API?

### Question 4

What is the difference between:

``` text
route
```

and:

``` text
controller
```

### Question 5

What does Axios do?

### Question 6

Why do we need `useEffect` when loading API data?

### Question 7

Why do we need loading and error states?

### Question 8

What does a 404 status mean?

### Question 9

Why do we use environment variables?

### Question 10

What major problem still exists after Milestone 2?

Expected idea:

> The server data is still stored in JavaScript arrays and is not
> permanently stored in a database.

------------------------------------------------------------------------

## 99. Git Requirement

From the project root:

``` bash
git status
git add .
git commit -m "Complete Milestone 2 Express API"
```

Create the milestone checkpoint:

``` bash
git tag milestone-2
```

Push:

``` bash
git push
git push origin milestone-2
```

Suggested intermediate commits:

``` text
Initialize TripLayers Express server
Add property API routes and controllers
Add booking API routes and controllers
Add community post API
Connect React to Express with Axios
Add client loading and error states
Complete Milestone 2 Express API
```

------------------------------------------------------------------------

## 100. The Problem That Creates Milestone 3

The founders now have a real frontend and a real backend.

React asks Express for data.

That is a major improvement.

But Daniel adds a new property to the server's array.

Then the backend restarts.

The new property disappears.

Sara creates a community post.

The server restarts.

The post disappears.

Ali changes a booking.

The server restarts.

The change disappears.

The backend exists.

But TripLayers still does not have **permanent memory**.

The founders now ask:

> "Can we store our data somewhere that survives a server restart?"

That creates our next business requirement.

------------------------------------------------------------------------

# Next: Milestone 3 --- TripLayers Gets Permanent Memory

Milestone 3 will introduce:

``` text
MongoDB
MongoDB Atlas
Mongoose
Schemas
Models
Database connection
Seed data
```

The architecture will evolve from:

``` text
React
↓
Axios
↓
Express
↓
JavaScript Arrays
```

to:

``` text
React
↓
Axios
↓
Express
↓
Mongoose
↓
MongoDB
```

We will not throw away the Milestone 2 API.

We will keep the same routes and progressively replace the temporary
arrays behind the controllers.

That is the point of the architecture we just built.

------------------------------------------------------------------------

# Milestone 2 Complete

TripLayers has crossed an important boundary:

**Milestone 1**

``` text
Frontend application
```

**Milestone 2**

``` text
Client + Server application
```

Students have now built the first two major layers of MERN:

``` text
React
Node.js + Express
```

The next milestone adds the **M**:

``` text
MongoDB
```
