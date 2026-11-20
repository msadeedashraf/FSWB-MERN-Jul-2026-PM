# TripLayers MERN Project

# Milestone 3 --- TripLayers Gets Permanent Memory

> **Story:** TripLayers now has a React frontend and an Express backend,
> but the backend still stores property, booking, and community data in
> temporary JavaScript arrays. In this milestone, the team gives
> TripLayers permanent memory using MongoDB Atlas and Mongoose.

------------------------------------------------------------------------

## 1. The TripLayers Story

TripLayers has completed Milestone 2.

The application now has two major layers:

``` text
React Frontend
      ↓
Axios
      ↓
Express Backend
```

The frontend no longer owns the core application data.

React asks the TripLayers API for:

``` text
properties
bookings
posts
```

This is a major improvement.

Then Daniel adds a new property to the backend array.

The server restarts.

The property disappears.

Sara adds a community post.

The server restarts.

The post disappears.

Ali updates a booking.

The server restarts.

The change disappears.

The team finally understands the next problem:

> TripLayers has a backend, but it still has no permanent memory.

------------------------------------------------------------------------

## 2. Where We Are

Current architecture:

``` text
React
  ↓
Axios
  ↓
Express
  ↓
JavaScript Arrays
```

Target architecture:

``` text
React
  ↓
Axios
  ↓
Express
  ↓
Mongoose
  ↓
MongoDB Atlas
```

The frontend should continue calling the same API routes.

That is important.

React should not care whether Express gets its data from:

``` text
a JavaScript array
```

or:

``` text
MongoDB
```

------------------------------------------------------------------------

## 3. Business Problem

TripLayers needs data that survives:

-   server restarts,
-   redeployments,
-   multiple users,
-   future scaling.

The company now needs a database.

------------------------------------------------------------------------

## 4. User Story

> As a TripLayers traveller, I want property, booking, and community
> data to remain available after the server restarts so that the
> platform behaves like a real application.

------------------------------------------------------------------------

## 5. Development Ticket --- TL-003

**Title:** Add permanent data storage with MongoDB

**Requested by:** TripLayers Product Team

### Requirements

The backend must:

-   connect to MongoDB Atlas,
-   use Mongoose,
-   define schemas,
-   define models,
-   replace temporary JavaScript arrays,
-   keep existing API routes working,
-   seed initial TripLayers data,
-   return database records to React,
-   handle invalid database IDs,
-   handle missing records,
-   use environment variables for database credentials.

### Not included yet

-   registration,
-   login,
-   passwords,
-   JWT,
-   authorization,
-   image uploads,
-   full write CRUD from React.

------------------------------------------------------------------------

## 6. What Students Will Learn

By the end of this milestone you should understand:

-   what a database solves,
-   MongoDB,
-   MongoDB Atlas,
-   collections,
-   documents,
-   ObjectId,
-   Mongoose,
-   schemas,
-   models,
-   database connection strings,
-   environment variables,
-   `mongoose.connect()`,
-   `Model.find()`,
-   `Model.findById()`,
-   async database controllers,
-   seeding data,
-   deleting temporary server arrays,
-   database error handling,
-   preserving API contracts.

------------------------------------------------------------------------

## 7. Starting Point

Start from the completed required reference build of Milestone 2.

You should already have:

``` text
triplayers/
├── client/
├── server/
│   ├── controllers/
│   ├── data/
│   ├── middleware/
│   ├── routes/
│   ├── .env
│   └── server.js
├── original-static/
└── README.md
```

------------------------------------------------------------------------

## 8. Verify Milestone 2 First

Run the backend:

``` bash
cd server
npm install
npm run dev
```

Run the frontend in a second terminal:

``` bash
cd client
npm install
npm run dev
```

Verify:

``` text
/api/properties
/api/bookings
/api/posts
```

and the React pages still work.

Do not start database migration from a broken Milestone 2 project.

------------------------------------------------------------------------

## 9. What Is MongoDB?

MongoDB is a document database.

Instead of thinking in terms of rows and tables, think:

``` text
Database
  ↓
Collections
  ↓
Documents
```

TripLayers might have:

``` text
triplayers
├── properties
├── bookings
└── posts
```

Each record is a document.

------------------------------------------------------------------------

## 10. Example MongoDB Property Document

A property document might look like:

``` json
{
  "_id": "66b123...",
  "name": "Waterfront Suite",
  "location": "Vancouver",
  "price": 250,
  "description": "Beautiful waterfront accommodation."
}
```

MongoDB creates:

``` text
_id
```

for each document.

------------------------------------------------------------------------

## 11. Why MongoDB Fits This Project

TripLayers uses nested and flexible data such as:

``` text
property amenities
room types
user followers
post comments
post likes
booking details
```

MongoDB handles document-shaped data naturally.

------------------------------------------------------------------------

## 12. What Is MongoDB Atlas?

MongoDB Atlas is MongoDB hosted in the cloud.

Instead of running MongoDB only on your laptop, TripLayers can connect
to a hosted database.

This matters later when we deploy the application.

------------------------------------------------------------------------

## 13. Create a MongoDB Atlas Account

Go to MongoDB Atlas.

Create an account if you do not already have one.

Create a project:

``` text
TripLayers
```

Create a cluster using the free/shared option if available.

------------------------------------------------------------------------

## 14. Create Database User

Inside Atlas:

Create a database user.

Example:

``` text
username:
triplayersStudent
```

Use a strong password.

Do not place the password directly in source code.

------------------------------------------------------------------------

## 15. Configure Network Access

For development, allow your current IP address.

If your classroom environment changes IPs frequently, follow your
instructor's approved setup.

Do not expose production systems carelessly.

------------------------------------------------------------------------

## 16. Get the Connection String

Atlas provides a string similar to:

``` text
mongodb+srv://USERNAME:PASSWORD@cluster....mongodb.net/
```

We want to connect to a database named:

``` text
triplayers
```

Your final URI will conceptually look like:

``` text
mongodb+srv://USERNAME:PASSWORD@cluster.../triplayers
```

------------------------------------------------------------------------

## 17. Update server/.env

Add:

``` env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
```

Never upload the real connection string publicly.

------------------------------------------------------------------------

## 18. Confirm .env Is Ignored

Your `.gitignore` should include:

``` text
.env
node_modules
dist
```

Run:

``` bash
git status
```

Your `.env` file should not appear as a file ready to commit.

------------------------------------------------------------------------

## 19. Install Mongoose

Inside:

``` text
server/
```

run:

``` bash
npm install mongoose
```

------------------------------------------------------------------------

## 20. What Is Mongoose?

MongoDB stores documents.

Mongoose helps Node.js applications work with MongoDB in a structured
way.

It gives us:

``` text
Schema
Model
Validation
Queries
Relationships
```

Think:

``` text
MongoDB
= database

Mongoose
= Node.js data layer for MongoDB
```

------------------------------------------------------------------------

## 21. Create config Folder

Create:

``` text
server/config/
```

Then:

``` text
server/config/db.js
```

------------------------------------------------------------------------

## 22. Create Database Connection

Add:

``` javascript
const mongoose = require("mongoose");

const connectDB = async () => {

    try {

        await mongoose.connect(
            process.env.MONGO_URI
        );

        console.log(
            "MongoDB connected"
        );

    } catch (error) {

        console.error(
            "MongoDB connection failed:",
            error.message
        );

        process.exit(1);

    }

};

module.exports = connectDB;
```

------------------------------------------------------------------------

## 23. Connect Database in server.js

Import:

``` javascript
const connectDB =
    require("./config/db");
```

Then call it after loading environment variables:

``` javascript
require("dotenv").config();

connectDB();
```

------------------------------------------------------------------------

## 24. Start the Backend

Run:

``` bash
npm run dev
```

Expected:

``` text
MongoDB connected
TripLayers API running on port 5000
```

If MongoDB does not connect, stop here and fix it.

------------------------------------------------------------------------

## 25. Checkpoint 1 --- Database Connection

Confirm:

``` text
✓ Atlas cluster exists
✓ database user exists
✓ network access configured
✓ MONGO_URI exists
✓ Mongoose installed
✓ connectDB runs
✓ terminal shows MongoDB connected
```

------------------------------------------------------------------------

## 26. Create models Folder

Create:

``` text
server/models/
```

We will create:

``` text
Property.js
Booking.js
Post.js
```

------------------------------------------------------------------------

## 27. Create Property Schema

Create:

``` text
server/models/Property.js
```

Add:

``` javascript
const mongoose = require("mongoose");

const propertySchema =
    new mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
                trim: true
            },

            location: {
                type: String,
                required: true,
                trim: true
            },

            price: {
                type: Number,
                required: true,
                min: 0
            },

            image: {
                type: String,
                default: ""
            },

            description: {
                type: String,
                default: ""
            }
        },
        {
            timestamps: true
        }
    );

const Property =
    mongoose.model(
        "Property",
        propertySchema
    );

module.exports = Property;
```

------------------------------------------------------------------------

## 28. Understanding Schema

The schema defines the expected structure of a property.

Example:

``` javascript
price: {
    type: Number,
    required: true,
    min: 0
}
```

TripLayers is saying:

> A property price must exist, must be numeric, and cannot be negative.

------------------------------------------------------------------------

## 29. timestamps: true

This:

``` javascript
{
    timestamps: true
}
```

automatically adds:

``` text
createdAt
updatedAt
```

These become useful later.

------------------------------------------------------------------------

## 30. Create Booking Schema

Create:

``` text
server/models/Booking.js
```

Add:

``` javascript
const mongoose = require("mongoose");

const bookingSchema =
    new mongoose.Schema(
        {
            propertyId: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "Property",
                required: true
            },

            property: {
                type: String,
                required: true
            },

            location: {
                type: String,
                required: true
            },

            checkIn: {
                type: Date,
                required: true
            },

            checkOut: {
                type: Date,
                required: true
            },

            guests: {
                type: Number,
                required: true,
                min: 1
            },

            roomType: {
                type: String,
                required: true
            },

            totalPrice: {
                type: Number,
                required: true,
                min: 0
            },

            status: {
                type: String,
                enum: [
                    "Pending",
                    "Confirmed",
                    "Cancelled"
                ],
                default: "Pending"
            }
        },
        {
            timestamps: true
        }
    );

const Booking =
    mongoose.model(
        "Booking",
        bookingSchema
    );

module.exports = Booking;
```

------------------------------------------------------------------------

## 31. Why Booking Uses ObjectId

The old booking used:

``` javascript
propertyId: 3
```

MongoDB uses:

``` text
ObjectId
```

The booking can reference a Property document.

Later we will use this relationship more deeply.

------------------------------------------------------------------------

## 32. Create Post Schema

Create:

``` text
server/models/Post.js
```

Add:

``` javascript
const mongoose = require("mongoose");

const postSchema =
    new mongoose.Schema(
        {
            author: {
                type: String,
                required: true,
                trim: true
            },

            title: {
                type: String,
                required: true,
                trim: true
            },

            summary: {
                type: String,
                required: true
            },

            image: {
                type: String,
                default: ""
            }
        },
        {
            timestamps: true
        }
    );

const Post =
    mongoose.model(
        "Post",
        postSchema
    );

module.exports = Post;
```

------------------------------------------------------------------------

## 33. Checkpoint 2 --- Models

You should now have:

``` text
server/models/
├── Property.js
├── Booking.js
└── Post.js
```

No controller has changed yet.

The old API still uses arrays.

Next we migrate the data.

------------------------------------------------------------------------

## 34. Why We Need Seed Data

MongoDB is currently empty.

Our React application expects properties, bookings, and posts.

We need starter data.

A seed script inserts known test data into the database.

------------------------------------------------------------------------

## 35. Create seeds Folder

Create:

``` text
server/seeds/
```

Then:

``` text
seed.js
```

------------------------------------------------------------------------

## 36. Create Property Seed Data

Inside `seed.js`, start with:

``` javascript
require("dotenv").config();

const mongoose =
    require("mongoose");

const connectDB =
    require("../config/db");

const Property =
    require("../models/Property");

const Booking =
    require("../models/Booking");

const Post =
    require("../models/Post");
```

------------------------------------------------------------------------

## 37. Add Property Data

Add:

``` javascript
const propertyData = [
    {
        name:
            "Luxury Apartment Downtown",
        location:
            "Toronto",
        price:
            180,
        image:
            "https://via.placeholder.com/400x250",
        description:
            "Modern apartment located in downtown Toronto."
    },
    {
        name:
            "Mountain View Cabin",
        location:
            "Banff",
        price:
            220,
        image:
            "https://via.placeholder.com/400x250",
        description:
            "Relaxing cabin surrounded by mountain views."
    },
    {
        name:
            "Waterfront Suite",
        location:
            "Vancouver",
        price:
            250,
        image:
            "https://via.placeholder.com/400x250",
        description:
            "Beautiful waterfront accommodation."
    },
    {
        name:
            "Old Montreal Loft",
        location:
            "Montreal",
        price:
            160,
        image:
            "https://via.placeholder.com/400x250",
        description:
            "Stylish loft in historic Old Montreal."
    },
    {
        name:
            "Niagara Riverside Hotel",
        location:
            "Niagara Falls",
        price:
            190,
        image:
            "https://via.placeholder.com/400x250",
        description:
            "Comfortable riverside accommodation close to Niagara Falls."
    },
    {
        name:
            "Calgary Downtown Residence",
        location:
            "Calgary",
        price:
            145,
        image:
            "https://via.placeholder.com/400x250",
        description:
            "Modern stay located near downtown Calgary."
    }
];
```

------------------------------------------------------------------------

## 38. Add Post Seed Data

``` javascript
const postData = [
    {
        author:
            "Sara Ahmed",
        title:
            "My Weekend in Banff",
        summary:
            "Three days exploring Banff, Lake Louise and the surrounding mountains.",
        image:
            "https://via.placeholder.com/800x400"
    },
    {
        author:
            "Ali Khan",
        title:
            "Affordable Places to Stay in Toronto",
        summary:
            "Some useful ideas for staying close to downtown without overspending.",
        image:
            "https://via.placeholder.com/800x400"
    },
    {
        author:
            "Maya Patel",
        title:
            "48 Hours in Vancouver",
        summary:
            "A quick Vancouver itinerary covering food, waterfront walks and city views.",
        image:
            "https://via.placeholder.com/800x400"
    }
];
```

------------------------------------------------------------------------

## 39. Booking Seed Challenge

Bookings depend on actual property ObjectIds.

We cannot hard-code:

``` text
propertyId: 3
```

anymore.

We must insert properties first, then use the returned documents.

------------------------------------------------------------------------

## 40. Create Seed Function

Add:

``` javascript
const seedData = async () => {

    try {

        await connectDB();

        await Booking.deleteMany();
        await Post.deleteMany();
        await Property.deleteMany();

        const properties =
            await Property.insertMany(
                propertyData
            );

        await Post.insertMany(
            postData
        );

        await Booking.insertMany([
            {
                propertyId:
                    properties[2]._id,
                property:
                    properties[2].name,
                location:
                    properties[2].location,
                checkIn:
                    new Date(
                        "2026-09-10"
                    ),
                checkOut:
                    new Date(
                        "2026-09-14"
                    ),
                guests:
                    2,
                roomType:
                    "Waterfront King",
                totalPrice:
                    1000,
                status:
                    "Confirmed"
            },
            {
                propertyId:
                    properties[3]._id,
                property:
                    properties[3].name,
                location:
                    properties[3].location,
                checkIn:
                    new Date(
                        "2026-10-05"
                    ),
                checkOut:
                    new Date(
                        "2026-10-07"
                    ),
                guests:
                    2,
                roomType:
                    "Loft Suite",
                totalPrice:
                    320,
                status:
                    "Pending"
            }
        ]);

        console.log(
            "TripLayers data seeded"
        );

        process.exit();

    } catch (error) {

        console.error(
            "Seed failed:",
            error
        );

        process.exit(1);

    }

};

seedData();
```

------------------------------------------------------------------------

## 41. Add Seed Script

In `server/package.json`:

``` json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "seed": "node seeds/seed.js"
}
```

------------------------------------------------------------------------

## 42. Run Seed

Stop the server first if desired.

Run:

``` bash
npm run seed
```

Expected:

``` text
MongoDB connected
TripLayers data seeded
```

------------------------------------------------------------------------

## 43. Check Atlas

Open MongoDB Atlas.

You should now see collections similar to:

``` text
properties
bookings
posts
```

The exact pluralization is handled by Mongoose.

------------------------------------------------------------------------

## 44. Checkpoint 3 --- Seed Data

Confirm:

``` text
✓ properties exist
✓ bookings exist
✓ posts exist
✓ MongoDB created _id values
✓ timestamps exist
```

------------------------------------------------------------------------

## 45. Replace Property Array Controller

Open:

``` text
server/controllers/propertyController.js
```

Remove:

``` javascript
const properties =
    require("../data/properties");
```

Replace with:

``` javascript
const Property =
    require("../models/Property");
```

------------------------------------------------------------------------

## 46. Database getProperties

Use:

``` javascript
const getProperties = async (
    req,
    res,
    next
) => {

    try {

        const {
            location,
            maxPrice
        } = req.query;

        const filter = {};

        if (location) {

            filter.location = {
                $regex: location,
                $options: "i"
            };

        }

        if (maxPrice) {

            const max =
                Number(maxPrice);

            if (
                Number.isNaN(max)
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                            "maxPrice must be a number"
                    });

            }

            filter.price = {
                $lte: max
            };

        }

        const properties =
            await Property.find(filter);

        res
            .status(200)
            .json(properties);

    } catch (error) {

        next(error);

    }

};
```

------------------------------------------------------------------------

## 47. Why MongoDB Filtering Is Better

Before:

``` text
load all properties
↓
JavaScript .filter()
```

Now:

``` text
MongoDB query
↓
return matching documents
```

Example:

``` javascript
filter.price = {
    $lte: max
};
```

means:

``` text
price less than or equal to max
```

------------------------------------------------------------------------

## 48. Database getPropertyById

Add:

``` javascript
const getPropertyById = async (
    req,
    res,
    next
) => {

    try {

        const property =
            await Property.findById(
                req.params.id
            );

        if (!property) {

            return res
                .status(404)
                .json({
                    message:
                        "Property not found"
                });

        }

        res
            .status(200)
            .json(property);

    } catch (error) {

        next(error);

    }

};
```

------------------------------------------------------------------------

## 49. Important Change --- IDs

In Milestone 2:

``` text
/properties/3
```

worked.

Now MongoDB uses IDs like:

``` text
/properties/66b1f7...
```

React must now work with:

``` javascript
property._id
```

instead of:

``` javascript
property.id
```

------------------------------------------------------------------------

## 50. Update PropertyCard

Change:

``` jsx
key={property.id}
```

to:

``` jsx
key={property._id}
```

Change:

``` jsx
to={`/properties/${property.id}`}
```

to:

``` jsx
to={`/properties/${property._id}`}
```

------------------------------------------------------------------------

## 51. Update HomePage Keys

Change:

``` jsx
key={property.id}
```

to:

``` jsx
key={property._id}
```

Any old numeric property ID assumptions must be removed.

------------------------------------------------------------------------

## 52. Update SearchPage Keys

Change:

``` jsx
key={property.id}
```

to:

``` jsx
key={property._id}
```

------------------------------------------------------------------------

## 53. Test Property API Again

Start backend:

``` bash
npm run dev
```

Test:

``` text
GET /api/properties
```

Then copy one `_id`.

Test:

``` text
GET /api/properties/<mongodb-id>
```

------------------------------------------------------------------------

## 54. Invalid ObjectId Problem

Try:

``` text
/api/properties/abc
```

Mongoose may throw a CastError.

That should not become an ugly server crash.

We will handle it.

------------------------------------------------------------------------

## 55. Improve Error Middleware

Open:

``` text
server/middleware/errorMiddleware.js
```

Use:

``` javascript
const errorHandler = (
    err,
    req,
    res,
    next
) => {

    console.error(err);

    if (
        err.name === "CastError"
    ) {

        return res
            .status(400)
            .json({
                message:
                    "Invalid resource ID"
            });

    }

    if (
        err.name === "ValidationError"
    ) {

        return res
            .status(400)
            .json({
                message:
                    err.message
            });

    }

    res
        .status(
            err.status || 500
        )
        .json({
            message:
                err.message ||
                "Internal server error"
        });

};

module.exports = errorHandler;
```

------------------------------------------------------------------------

## 56. Test Invalid ID

Request:

``` text
/api/properties/abc
```

Expected:

``` json
{
  "message": "Invalid resource ID"
}
```

status:

``` text
400
```

------------------------------------------------------------------------

## 57. Replace Post Controller

Open:

``` text
server/controllers/postController.js
```

Replace array import with:

``` javascript
const Post =
    require("../models/Post");
```

------------------------------------------------------------------------

## 58. Database getPosts

``` javascript
const getPosts = async (
    req,
    res,
    next
) => {

    try {

        const posts =
            await Post.find()
                .sort({
                    createdAt: -1
                });

        res
            .status(200)
            .json(posts);

    } catch (error) {

        next(error);

    }

};
```

------------------------------------------------------------------------

## 59. Database getPostById

``` javascript
const getPostById = async (
    req,
    res,
    next
) => {

    try {

        const post =
            await Post.findById(
                req.params.id
            );

        if (!post) {

            return res
                .status(404)
                .json({
                    message:
                        "Post not found"
                });

        }

        res
            .status(200)
            .json(post);

    } catch (error) {

        next(error);

    }

};
```

------------------------------------------------------------------------

## 60. Export Post Controller

``` javascript
module.exports = {
    getPosts,
    getPostById
};
```

------------------------------------------------------------------------

## 61. Update PostCard IDs

Change:

``` jsx
key={post.id}
```

to:

``` jsx
key={post._id}
```

and:

``` jsx
to={`/posts/${post._id}`}
```

------------------------------------------------------------------------

## 62. Update CommunityPage Keys

Change:

``` jsx
key={post.id}
```

to:

``` jsx
key={post._id}
```

------------------------------------------------------------------------

## 63. Test Posts

Test:

``` text
GET /api/posts
```

Copy an `_id`.

Then:

``` text
GET /api/posts/<id>
```

React Community and Post Details should still work.

------------------------------------------------------------------------

## 64. Replace Booking Controller

Open:

``` text
server/controllers/bookingController.js
```

Replace array import with:

``` javascript
const Booking =
    require("../models/Booking");
```

------------------------------------------------------------------------

## 65. Database getBookings

``` javascript
const getBookings = async (
    req,
    res,
    next
) => {

    try {

        const bookings =
            await Booking.find()
                .sort({
                    createdAt: -1
                });

        res
            .status(200)
            .json(bookings);

    } catch (error) {

        next(error);

    }

};
```

------------------------------------------------------------------------

## 66. Database getBookingById

``` javascript
const getBookingById = async (
    req,
    res,
    next
) => {

    try {

        const booking =
            await Booking.findById(
                req.params.id
            );

        if (!booking) {

            return res
                .status(404)
                .json({
                    message:
                        "Booking not found"
                });

        }

        res
            .status(200)
            .json(booking);

    } catch (error) {

        next(error);

    }

};
```

------------------------------------------------------------------------

## 67. Update BookingRow

Change:

``` jsx
key={booking.id}
```

to:

``` jsx
key={booking._id}
```

Change routes:

``` jsx
to={`/bookings/${booking._id}`}
```

and:

``` jsx
to={`/bookings/${booking._id}/edit`}
```

Display:

``` jsx
{booking._id}
```

or a shortened version if desired.

------------------------------------------------------------------------

## 68. Update BookingsPage Keys

Change:

``` jsx
key={booking.id}
```

to:

``` jsx
key={booking._id}
```

------------------------------------------------------------------------

## 69. Update BookingDetailsPage

The route parameter is now a MongoDB ObjectId.

No `Number(id)` conversion should remain.

Request:

``` javascript
await api.get(
    `/bookings/${id}`
);
```

------------------------------------------------------------------------

## 70. Update EditBookingPage

The page should also load:

``` text
GET /api/bookings/:id
```

using the MongoDB ID.

The local form edit still does not persist yet.

That will be addressed in the write-CRUD milestone.

------------------------------------------------------------------------

## 71. Date Formatting Problem

MongoDB returns dates like:

``` text
2026-09-10T00:00:00.000Z
```

That is correct data, but not ideal UI.

We need simple display formatting.

------------------------------------------------------------------------

## 72. Create Date Utility

Create:

``` text
client/src/utils/date.js
```

Add:

``` javascript
export const formatDate = (
    value
) => {

    if (!value) {
        return "";
    }

    return new Date(
        value
    ).toLocaleDateString();

};
```

------------------------------------------------------------------------

## 73. Use formatDate in BookingRow

Import:

``` javascript
import {
    formatDate
} from "../utils/date";
```

Then:

``` jsx
<td>
    {formatDate(
        booking.checkIn
    )}
</td>

<td>
    {formatDate(
        booking.checkOut
    )}
</td>
```

------------------------------------------------------------------------

## 74. Date Inputs Need YYYY-MM-DD

HTML date inputs expect:

``` text
YYYY-MM-DD
```

For EditBookingPage:

``` javascript
const toDateInputValue = (
    value
) => {

    if (!value) {
        return "";
    }

    return new Date(value)
        .toISOString()
        .split("T")[0];

};
```

Use that when initializing state.

------------------------------------------------------------------------

## 75. Test End-to-End

At this point:

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

should work for:

``` text
properties
bookings
posts
```

------------------------------------------------------------------------

## 76. Delete Old Backend Array Imports

Search the backend for:

``` text
../data/properties
../data/bookings
../data/posts
```

There should be no controller imports left.

------------------------------------------------------------------------

## 77. Can We Delete server/data?

Once the seed script no longer depends on those old files, and all
controller imports are removed, the old:

``` text
server/data/
```

folder can be deleted.

The source of truth is MongoDB.

------------------------------------------------------------------------

## 78. Why We Keep the Seed Script

The old data files can disappear, but the seed script should remain.

It is useful for:

``` text
classroom reset
testing
development
demonstration
fresh deployment setup
```

------------------------------------------------------------------------

## 79. Reseeding Behavior

Our seed script uses:

``` javascript
deleteMany()
```

before inserting.

That means:

``` bash
npm run seed
```

resets the test database.

Students must understand:

> Do not run destructive seed scripts against important production data.

------------------------------------------------------------------------

## 80. Checkpoint 4 --- Persistence Test

This is the most important demo.

1.  Run the application.
2.  Confirm properties load.
3.  Stop Express.
4.  Start Express again.
5.  Refresh.
6.  Confirm the same data still exists.

The database survives the server restart.

That is the entire business value of this milestone.

------------------------------------------------------------------------

## 81. MongoDB Atlas Verification

Open Atlas and inspect a property document.

Students should identify:

``` text
_id
name
location
price
createdAt
updatedAt
```

Then compare that to what React receives.

------------------------------------------------------------------------

## 82. Understand Model.find()

``` javascript
await Property.find()
```

means:

> Return property documents matching the filter.

No filter:

``` javascript
Property.find()
```

means all.

Filter:

``` javascript
Property.find({
    location: {
        $regex: "Toronto",
        $options: "i"
    }
});
```

means matching location.

------------------------------------------------------------------------

## 83. Understand findById()

Instead of:

``` javascript
array.find(...)
```

we now use:

``` javascript
Property.findById(id)
```

This is a database query.

------------------------------------------------------------------------

## 84. Common Error --- Authentication Failed

If Atlas says authentication failed:

Check:

``` text
username
password
connection string
special password characters
```

If needed, properly URL-encode special characters in credentials.

------------------------------------------------------------------------

## 85. Common Error --- IP Not Allowed

If connection times out or Atlas rejects access:

Check:

``` text
Network Access
```

Make sure your current development environment is allowed.

------------------------------------------------------------------------

## 86. Common Error --- MONGO_URI undefined

Check:

``` text
server/.env
```

and:

``` javascript
require("dotenv").config();
```

Restart Node after `.env` changes.

------------------------------------------------------------------------

## 87. Common Error --- Model Not Found

Check imports:

``` javascript
require("../models/Property");
```

and filename capitalization.

------------------------------------------------------------------------

## 88. Common Error --- CastError

A route like:

``` text
/properties/abc
```

is not a valid MongoDB ObjectId.

Your error middleware should convert that into a clean 400 response.

------------------------------------------------------------------------

## 89. Common Error --- React Links Break

If property links still use:

``` javascript
property.id
```

they may become:

``` text
undefined
```

MongoDB documents use:

``` javascript
property._id
```

------------------------------------------------------------------------

## 90. Common Error --- Date Input Shows Blank

MongoDB date strings include time information.

Convert:

``` text
2026-09-10T00:00:00.000Z
```

to:

``` text
2026-09-10
```

before giving it to:

``` html
<input type="date">
```

------------------------------------------------------------------------

# Student Challenges

Attempt these before opening the Milestone 3 Challenge Solutions file.

------------------------------------------------------------------------

## 91. Student Challenge 1 --- Add Amenities to Property

### Story

TripLayers wants property listings to show features such as:

``` text
Wi-Fi
Parking
Pool
Gym
Pet Friendly
```

### Requirement

Update the Property schema to support:

``` javascript
amenities: []
```

Seed amenity values.

Display them on PropertyDetailsPage.

------------------------------------------------------------------------

## 92. Student Challenge 2 --- Add Property Rating

Add:

``` text
rating
```

to Property.

Requirements:

``` text
Number
minimum 0
maximum 5
default 0
```

Seed ratings and display them.

------------------------------------------------------------------------

## 93. Student Challenge 3 --- Add Post Content

Current posts only have:

``` text
summary
```

Add:

``` text
content
```

to the Post schema.

Seed full content.

PostDetailsPage should show content, while PostCard keeps showing
summary.

------------------------------------------------------------------------

## 94. Student Challenge 4 --- Populate Booking Property

Booking currently stores both:

``` text
propertyId
property name
location
```

Use Mongoose:

``` javascript
.populate()
```

to retrieve selected property information through the reference.

Try to reduce duplicated property data in the booking response.

------------------------------------------------------------------------

## 95. Student Challenge 5 --- Database Statistics Endpoint

Create:

``` text
GET /api/stats
```

Response:

``` json
{
  "properties": 6,
  "bookings": 2,
  "posts": 3
}
```

Use:

``` javascript
countDocuments()
```

------------------------------------------------------------------------

## 96. Student Challenge 6 --- Seed Command Safety

Add a simple environment guard.

The seed script should refuse destructive reseeding when:

``` text
NODE_ENV=production
```

Return a clear message and exit.

------------------------------------------------------------------------

# Stretch Challenges

These are optional. Milestone 4 should not depend on them.

------------------------------------------------------------------------

## 97. Stretch Challenge 1 --- Property Type

Add:

``` text
propertyType
```

Examples:

``` text
Apartment
Hotel
Cabin
Villa
Loft
```

Allow API filtering:

``` text
/api/properties?propertyType=Hotel
```

------------------------------------------------------------------------

## 98. Stretch Challenge 2 --- Pagination

Support:

``` text
/api/properties?page=1&limit=3
```

Use:

``` text
skip()
limit()
```

Return useful metadata.

------------------------------------------------------------------------

## 99. Stretch Challenge 3 --- Sort Properties in MongoDB

Support:

``` text
/api/properties?sort=price_asc
/api/properties?sort=price_desc
```

Use MongoDB/Mongoose sorting rather than sorting in React.

------------------------------------------------------------------------

## 100. Stretch Challenge 4 --- Database Connection Event Logging

Listen for Mongoose connection events and log useful status messages.

Examples:

``` text
connected
error
disconnected
```

------------------------------------------------------------------------

## 101. Stretch Challenge 5 --- Create a Development Reset Script

Create a separate script:

``` text
npm run reset
```

that:

``` text
deletes development data
reseeds known data
prints completion status
```

Keep destructive behavior clearly limited to development use.

------------------------------------------------------------------------

## 102. Milestone 3 Definition of Done

Required reference build:

``` text
✓ MongoDB Atlas configured
✓ MONGO_URI stored in .env
✓ Mongoose installed
✓ db.js connection helper exists
✓ server connects to MongoDB
✓ Property model exists
✓ Booking model exists
✓ Post model exists
✓ schemas use validation
✓ timestamps enabled
✓ seed script exists
✓ seed script inserts properties
✓ seed script inserts bookings
✓ seed script inserts posts
✓ property controller uses MongoDB
✓ booking controller uses MongoDB
✓ post controller uses MongoDB
✓ property filtering still works
✓ maxPrice filtering still works
✓ findById works
✓ invalid ObjectId returns clean 400
✓ missing document returns 404
✓ React uses MongoDB _id values
✓ PropertyCard uses _id
✓ PostCard uses _id
✓ BookingRow uses _id
✓ HomePage still works
✓ SearchPage still works
✓ PropertyDetailsPage still works
✓ BookingsPage still works
✓ BookingDetailsPage still works
✓ EditBookingPage loads database data
✓ CommunityPage still works
✓ PostDetailsPage still works
✓ booking dates display correctly
✓ server arrays are no longer the source of truth
✓ persistence survives server restart
✓ browser has no major errors
✓ server has no major errors
```

Required challenges should be completed before Milestone 4 or replaced
by the provided reference solutions.

Stretch challenges remain optional.

------------------------------------------------------------------------

## 103. Milestone Demonstration

### Scenario

Daniel adds properties to TripLayers.

The instructor asks:

> "How do I know this data is really stored?"

The student should demonstrate:

1.  Open MongoDB Atlas.
2.  Show `properties`.
3.  Show one property document.
4.  Show `_id`.
5.  Open `/api/properties`.
6.  Explain that Express retrieves MongoDB documents.
7.  Open the React Search page.
8.  Show the same documents as cards.
9.  Open one property.
10. Show the MongoDB `_id` in the URL.
11. Stop the server.
12. Restart the server.
13. Show that data still exists.
14. Run `npm run seed`.
15. Explain what the seed script does.
16. Show `bookings`.
17. Show `posts`.
18. Explain Mongoose schema validation.
19. Explain the role of routes, controllers, models, and MongoDB.

------------------------------------------------------------------------

## 104. Student Reflection

Answer in `README.md`.

### Question 1

What problem did MongoDB solve for TripLayers?

### Question 2

What is the difference between:

``` text
MongoDB
```

and:

``` text
Mongoose
```

### Question 3

What is a schema?

### Question 4

What is a model?

### Question 5

What is `_id`?

### Question 6

Why did our React links need to change?

### Question 7

Why is the seed script useful?

### Question 8

Why should `.env` not be committed?

### Question 9

Why does React not need to know how Express stores data?

### Question 10

What major feature is still missing?

Expected idea:

> TripLayers still does not have real users, registration, or login.

------------------------------------------------------------------------

## 105. Git Requirement

From project root:

``` bash
git status
git add .
git commit -m "Complete Milestone 3 MongoDB persistence"
```

Tag:

``` bash
git tag milestone-3
```

Push:

``` bash
git push
git push origin milestone-3
```

Suggested intermediate commits:

``` text
Configure MongoDB Atlas connection
Add TripLayers Mongoose models
Create database seed script
Migrate property API to MongoDB
Migrate booking API to MongoDB
Migrate community posts to MongoDB
Update React for MongoDB ObjectIds
Complete Milestone 3 MongoDB persistence
```

------------------------------------------------------------------------

## 106. The Problem That Creates Milestone 4

TripLayers now has:

``` text
React
Express
MongoDB
```

The core MERN architecture exists.

But every traveller still looks the same to the system.

Ali can open the site.

Sara can open the site.

Maya can open the site.

But TripLayers cannot answer:

``` text
Who is Ali?
Who is Sara?
Which bookings belong to Ali?
Which posts belong to Sara?
Who is logged in?
```

The platform has permanent memory.

But it has no identity system.

The founders now ask:

> "Can travellers create accounts and sign in?"

That creates the next business requirement.

------------------------------------------------------------------------

# Next: Milestone 4 --- Travellers Need Accounts

Milestone 4 will introduce:

``` text
User model
Registration
Password validation
bcrypt
Login
Account data
Profile foundation
```

We will deliberately separate:

``` text
identity creation
```

from:

``` text
JWT route protection
```

so students understand authentication in layers.

------------------------------------------------------------------------

# Milestone 3 Complete

TripLayers has evolved from:

``` text
Milestone 1
React Frontend
```

to:

``` text
Milestone 2
React + Express
```

to:

``` text
Milestone 3
React + Express + MongoDB
```

The application now has permanent memory.

The next step is teaching TripLayers to remember **people**.
