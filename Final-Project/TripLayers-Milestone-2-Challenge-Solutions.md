# TripLayers MERN Project

# Milestone 2 --- Challenge & Stretch Challenge Solutions

> Use this document **after attempting the challenges in Milestone 2**.
> These solutions become the official reference build that Milestone 3
> can start from.

------------------------------------------------------------------------

# Challenge 1 --- API Health Endpoint

## Problem

TripLayers operations wants a simple endpoint to confirm that the
backend service is alive.

Required endpoint:

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

## Solution

Add this route to `server.js` before the 404 middleware:

``` javascript
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        service: "TripLayers API"
    });
});
```

## Test

Open:

``` text
http://localhost:5000/api/health
```

Expected response:

``` json
{
  "status": "ok",
  "service": "TripLayers API"
}
```

## Why This Matters

A health endpoint can later be used by:

-   deployment platforms,
-   monitoring tools,
-   uptime checks,
-   support teams.

------------------------------------------------------------------------

# Challenge 2 --- Search Properties Through the API

## Problem

The React frontend currently downloads every property and filters them
in the browser.

TripLayers wants the server to support:

``` text
GET /api/properties?location=Toronto
```

## Solution

Open:

``` text
server/controllers/propertyController.js
```

Replace `getProperties` with:

``` javascript
const getProperties = (req, res) => {

    const { location } = req.query;

    let results = properties;

    if (location) {

        results = results.filter((property) =>
            property.location
                .toLowerCase()
                .includes(location.toLowerCase())
        );

    }

    res.status(200).json(results);
};
```

Keep the rest of the controller:

``` javascript
const properties = require("../data/properties");

const getProperties = (req, res) => {

    const { location } = req.query;

    let results = properties;

    if (location) {

        results = results.filter((property) =>
            property.location
                .toLowerCase()
                .includes(location.toLowerCase())
        );

    }

    res.status(200).json(results);
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

## Test

``` text
GET /api/properties
```

Returns all properties.

``` text
GET /api/properties?location=Toronto
```

Returns only Toronto properties.

``` text
GET /api/properties?location=van
```

Should still match Vancouver because the comparison is case-insensitive
and uses `includes()`.

## Key Concept

Query parameters are available through:

``` javascript
req.query
```

For:

``` text
/api/properties?location=Toronto
```

Express gives:

``` javascript
req.query.location
```

------------------------------------------------------------------------

# Challenge 3 --- Maximum Price Query

## Problem

TripLayers also wants:

``` text
GET /api/properties?maxPrice=200
```

And combined filtering:

``` text
GET /api/properties?location=Toronto&maxPrice=200
```

## Solution

Update `getProperties` again:

``` javascript
const getProperties = (req, res) => {

    const {
        location,
        maxPrice
    } = req.query;

    let results = properties;

    if (location) {

        results = results.filter((property) =>
            property.location
                .toLowerCase()
                .includes(location.toLowerCase())
        );

    }

    if (maxPrice) {

        const max =
            Number(maxPrice);

        if (Number.isNaN(max)) {

            return res.status(400).json({
                message:
                    "maxPrice must be a number"
            });

        }

        results = results.filter(
            (property) =>
                property.price <= max
        );

    }

    res.status(200).json(results);
};
```

## Test

``` text
GET /api/properties?maxPrice=200
```

Returns only properties priced at 200 or less.

``` text
GET /api/properties?location=Toronto&maxPrice=200
```

Applies both conditions.

Invalid:

``` text
GET /api/properties?maxPrice=abc
```

Expected:

``` json
{
  "message": "maxPrice must be a number"
}
```

with status:

``` text
400
```

## Why This Is Better

The server now owns filtering rules.

Later MongoDB can perform these filters directly instead of JavaScript
arrays.

------------------------------------------------------------------------

# Challenge 4 --- Build PostDetailsPage from the API

## Problem

`PostDetailsPage` must retrieve one post from:

``` text
GET /api/posts/:id
```

and support:

-   loading state,
-   success state,
-   404 state,
-   general error state.

## Solution

Create or replace:

``` text
client/src/pages/PostDetailsPage.jsx
```

with:

``` jsx
import {
    useEffect,
    useState
} from "react";

import {
    useParams
} from "react-router-dom";

import api from "../api/api";

function PostDetailsPage() {

    const { id } = useParams();

    const [post, setPost] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        const fetchPost = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get(
                        `/posts/${id}`
                    );

                setPost(response.data);

            } catch (error) {

                console.error(error);

                if (
                    error.response?.status === 404
                ) {

                    setError(
                        "Post not found."
                    );

                } else {

                    setError(
                        "Unable to load post."
                    );

                }

            } finally {

                setLoading(false);

            }

        };

        fetchPost();

    }, [id]);

    if (loading) {

        return (
            <main className="container my-5">

                <p>
                    Loading post...
                </p>

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

            <article className="card shadow-sm">

                <img
                    src={post.image}
                    className="card-img-top"
                    alt={post.title}
                />

                <div className="card-body">

                    <h1>
                        {post.title}
                    </h1>

                    <p className="text-muted">
                        By {post.author}
                    </p>

                    <p>
                        {post.summary}
                    </p>

                </div>

            </article>

        </main>
    );
}

export default PostDetailsPage;
```

## Test

``` text
/posts/1
```

should load a post.

``` text
/posts/999
```

should show:

``` text
Post not found.
```

## Key Learning

The page follows this flow:

``` text
URL parameter
↓
useParams()
↓
Axios
↓
Express route
↓
Controller
↓
JSON
↓
React state
↓
Rendered post
```

------------------------------------------------------------------------

# Challenge 5 --- Convert HomePage to API Data

## Problem

`HomePage` still imports temporary local property data.

It must use:

``` text
GET /api/properties
```

and show the first three returned properties.

## Solution

Replace:

``` text
client/src/pages/HomePage.jsx
```

with:

``` jsx
import {
    useEffect,
    useState
} from "react";

import SearchForm
    from "../components/SearchForm";

import PropertyCard
    from "../components/PropertyCard";

import api from "../api/api";

function HomePage() {

    const [properties, setProperties] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        const fetchProperties = async () => {

            try {

                const response =
                    await api.get("/properties");

                setProperties(
                    response.data
                );

            } catch (error) {

                console.error(error);

                setError(
                    "Unable to load featured properties."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchProperties();

    }, []);

    return (
        <main className="container my-5">

            <section className="text-center mb-5">

                <h1>
                    Discover Your Next Layer
                </h1>

                <p>
                    Find places, plan stays and
                    discover travel experiences
                    with TripLayers.
                </p>

            </section>

            <SearchForm />

            <section className="mt-5">

                <h2>
                    Featured Properties
                </h2>

                {loading && (
                    <p>
                        Loading featured properties...
                    </p>
                )}

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                {!loading && !error && (

                    <div className="row">

                        {properties
                            .slice(0, 3)
                            .map((property) => (

                                <PropertyCard
                                    key={property.id}
                                    property={property}
                                />

                            ))}

                    </div>

                )}

            </section>

        </main>
    );
}

export default HomePage;
```

## Result

HomePage no longer depends on:

``` text
client/src/data/properties.js
```

The data now comes from Express.

------------------------------------------------------------------------

# Challenge 6 --- Server Error Middleware

## Problem

TripLayers needs one central place to handle unexpected server errors.

## Solution

Create:

``` text
server/middleware/errorMiddleware.js
```

Add:

``` javascript
const errorHandler = (
    err,
    req,
    res,
    next
) => {

    console.error(err);

    res.status(
        err.status || 500
    ).json({
        message:
            err.message ||
            "Internal server error"
    });

};

module.exports = errorHandler;
```

Now import it in:

``` text
server/server.js
```

``` javascript
const errorHandler =
    require("./middleware/errorMiddleware");
```

Place it **after all routes and the API 404 handler**:

``` javascript
app.use(errorHandler);
```

## Final Order Matters

``` javascript
app.use("/api/properties", propertyRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/posts", postRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: "API route not found"
    });
});

app.use(errorHandler);
```

## Testing the Error Handler

Temporarily add a test route before the 404 handler:

``` javascript
app.get("/api/test-error", (req, res, next) => {

    const error =
        new Error("Test server error");

    next(error);

});
```

Open:

``` text
/api/test-error
```

Expected:

``` json
{
  "message": "Test server error"
}
```

with status:

``` text
500
```

Remove the temporary test route afterward.

------------------------------------------------------------------------

# Stretch Challenge 1 --- API Metadata

## Goal

Return:

``` json
{
  "count": 6,
  "properties": []
}
```

instead of only an array.

## Solution

In `getProperties`:

``` javascript
res.status(200).json({
    count: results.length,
    properties: results
});
```

## Important Frontend Change

Before:

``` javascript
setProperties(
    response.data
);
```

After:

``` javascript
setProperties(
    response.data.properties
);
```

You can also store the returned count:

``` javascript
const [count, setCount] =
    useState(0);
```

Then:

``` javascript
setCount(
    response.data.count
);
```

## Teaching Point

Changing an API response shape can break clients.

That is why API contracts matter.

------------------------------------------------------------------------

# Stretch Challenge 2 --- Reusable Loading Component

## Solution

Create:

``` text
client/src/components/Loading.jsx
```

``` jsx
function Loading({
    message = "Loading..."
}) {

    return (
        <div className="text-center py-4">

            <div
                className="spinner-border"
                role="status"
            >
                <span className="visually-hidden">
                    Loading
                </span>
            </div>

            <p className="mt-2">
                {message}
            </p>

        </div>
    );
}

export default Loading;
```

Use:

``` jsx
import Loading
    from "../components/Loading";
```

Then:

``` jsx
if (loading) {
    return (
        <main className="container my-5">

            <Loading
                message="Loading properties..."
            />

        </main>
    );
}
```

## Benefit

One component replaces repeated loading markup across:

``` text
HomePage
SearchPage
PropertyDetailsPage
BookingsPage
BookingDetailsPage
CommunityPage
PostDetailsPage
```

------------------------------------------------------------------------

# Stretch Challenge 3 --- Reusable ErrorMessage Component

## Solution

Create:

``` text
client/src/components/ErrorMessage.jsx
```

``` jsx
function ErrorMessage({ message }) {

    if (!message) {
        return null;
    }

    return (
        <div
            className="alert alert-danger"
            role="alert"
        >
            {message}
        </div>
    );
}

export default ErrorMessage;
```

Use:

``` jsx
import ErrorMessage
    from "../components/ErrorMessage";
```

Then:

``` jsx
<ErrorMessage
    message={error}
/>
```

## Benefit

This removes repeated Bootstrap error markup.

------------------------------------------------------------------------

# Stretch Challenge 4 --- Axios Timeout

## Solution

Open:

``` text
client/src/api/api.js
```

Update:

``` javascript
import axios from "axios";

const api = axios.create({

    baseURL:
        import.meta.env.VITE_API_URL,

    timeout: 5000

});

export default api;
```

Now improve error handling:

``` javascript
if (
    error.code === "ECONNABORTED"
) {

    setError(
        "The TripLayers server took too long to respond."
    );

}
```

## Teaching Point

A server can exist but still respond too slowly.

Applications need to handle both:

``` text
failure
```

and:

``` text
timeout
```

------------------------------------------------------------------------

# Stretch Challenge 5 --- Request Logger Middleware

## Solution

Create:

``` text
server/middleware/requestLogger.js
```

Add:

``` javascript
const requestLogger = (
    req,
    res,
    next
) => {

    const timestamp =
        new Date().toISOString();

    console.log(
        `${timestamp} ${req.method} ${req.originalUrl}`
    );

    next();
};

module.exports = requestLogger;
```

Import in:

``` text
server/server.js
```

``` javascript
const requestLogger =
    require("./middleware/requestLogger");
```

Register before the routes:

``` javascript
app.use(requestLogger);
```

Example output:

``` text
2026-08-13T02:00:00.000Z GET /api/properties
2026-08-13T02:00:04.000Z GET /api/posts/1
```

## Why `next()` Matters

Without:

``` javascript
next();
```

the middleware would stop the request and the route would never run.

------------------------------------------------------------------------

# Official Required Reference Build After Milestone 2

The **required** Milestone 2 reference build should include:

``` text
triplayers/
│
├── client/
│   ├── .env
│   └── src/
│       ├── api/
│       │   └── api.js
│       ├── components/
│       ├── pages/
│       └── ...
│
├── server/
│   ├── controllers/
│   │   ├── propertyController.js
│   │   ├── bookingController.js
│   │   └── postController.js
│   ├── data/
│   │   ├── properties.js
│   │   ├── bookings.js
│   │   └── posts.js
│   ├── middleware/
│   │   └── errorMiddleware.js
│   ├── routes/
│   │   ├── propertyRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── postRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── original-static/
├── README.md
└── .gitignore
```

Required Challenge 2 and 3 mean the property controller should support:

``` text
/api/properties
/api/properties?location=Toronto
/api/properties?maxPrice=200
/api/properties?location=Toronto&maxPrice=200
```

Required Challenge 4 means `PostDetailsPage` now uses the API.

Required Challenge 5 means `HomePage` now uses the API.

Required Challenge 6 adds centralized server error handling.

------------------------------------------------------------------------

# Optional Enhanced Build

The following stretch solutions are useful but **Milestone 3 must not
depend on them**:

``` text
API metadata wrapper
Reusable Loading component
Reusable ErrorMessage component
Axios timeout
Request logger middleware
```

Students may implement them, but the official Milestone 3 starting point
should still work without them.

------------------------------------------------------------------------

# Testing Checklist

Before moving to Milestone 3:

``` text
[ ] GET /api/health works
[ ] GET /api/properties works
[ ] GET /api/properties?location=Toronto works
[ ] GET /api/properties?maxPrice=200 works
[ ] Combined filters work
[ ] Invalid maxPrice returns 400
[ ] GET /api/properties/:id works
[ ] Missing property returns 404
[ ] GET /api/bookings works
[ ] GET /api/bookings/:id works
[ ] GET /api/posts works
[ ] GET /api/posts/:id works
[ ] HomePage gets data from API
[ ] SearchPage gets data from API
[ ] PropertyDetailsPage gets data from API
[ ] BookingsPage gets data from API
[ ] BookingDetailsPage gets data from API
[ ] CommunityPage gets data from API
[ ] PostDetailsPage gets data from API
[ ] Error middleware is registered
[ ] React displays loading states
[ ] React displays API errors
[ ] Client local data imports are removed
[ ] React and Express run in separate terminals
```

------------------------------------------------------------------------

# Git Checkpoint

After applying the required challenge solutions:

``` bash
git add .
git commit -m "Complete Milestone 2 challenge solutions"
```

Tag the known-good reference:

``` bash
git tag milestone-2
```

Push:

``` bash
git push
git push origin milestone-2
```

------------------------------------------------------------------------

# Starting Point for Milestone 3

Milestone 3 starts from this completed required reference build.

The API contract stays mostly the same.

We will replace:

``` text
server/data/properties.js
server/data/bookings.js
server/data/posts.js
```

with:

``` text
MongoDB
+
Mongoose models
```

The important architectural lesson is:

``` text
React should not care
whether Express gets its data
from a JavaScript array
or from MongoDB.
```

React will continue calling:

``` text
/api/properties
/api/bookings
/api/posts
```

Only the backend implementation changes.

That is exactly why we separated routes, controllers, and data access.
