# Assignment: Refactor the Job Listing Component Using DRY and `map()`

## Objective

Refactor the provided `Joblist` component by applying the **DRY (Don't
Repeat Yourself)** principle and using React's **`map()`** function to
render multiple job listings.

- Use this as the starting code folder
    
- file is [-](/Day-05/jobzilav1/src/components/Joblist.jsx)
  
- Code is on [code](/Day-05/jobzilav1/)

------------------------------------------------------------------------

# Starter Code

Use the provided `Joblist` component as your starting point.

------------------------------------------------------------------------

# Requirements

## Part 1 -- Create the Data

Replace the empty array with an array of **at least 5 job objects**.

Each object should contain:

-   `id`
-   `title`
-   `company`
-   `location`
-   `description`

Example:

``` javascript
const jobList = [
    {
        id: 1,
        title: "...",
        company: "...",
        location: "...",
        description: "..."
    }
];
```

------------------------------------------------------------------------

## Part 2 -- Apply the DRY Principle

Instead of repeating the same HTML multiple times:

``` jsx
<div className="jobs-listing">
    ...
</div>

<div className="jobs-listing">
    ...
</div>

<div className="jobs-listing">
    ...
</div>
```

Use **one JSX block** together with the **`map()`** method to display
every job.

------------------------------------------------------------------------

## Part 3 -- Display the Data

Each job card must display:

-   Job Title
-   Company
-   Location
-   Description

------------------------------------------------------------------------

## Part 4 -- Use a Unique Key

Every rendered job must include a unique `key` property.

Use the job's `id`.

------------------------------------------------------------------------

## Part 5 -- Fix React Syntax

Replace every occurrence of:

``` jsx
class=""
```

with:

``` jsx
className=""
```

------------------------------------------------------------------------

# Expected Output

The page should look exactly the same as before, except that:

-   No repeated HTML exists.
-   Job information comes from the array.
-   All jobs are rendered dynamically using `map()`.

------------------------------------------------------------------------

# Rules

-   Do **not** duplicate the job card HTML.
-   Do **not** hard-code each job separately.
-   Use the `jobList` array.
-   Use `map()`.
-   Use a unique `key`.
-   Use `className`.

------------------------------------------------------------------------

# Bonus Challenge (Optional)

1.  Add a **View Details** button to each job.
2.  Display the total number of jobs at the top of the page.
3.  Add a company logo URL to each job object and display it.
4.  Add a new property called `workType` with values such as **Remote**,
    **Hybrid**, or **On-site**, and display it.

------------------------------------------------------------------------

# Learning Outcomes

After completing this assignment, you should be able to:

-   Create arrays of objects in JavaScript.
-   Apply the DRY principle in React.
-   Render lists dynamically using `map()`.
-   Display object properties inside JSX.
-   Explain why React requires a unique `key` for list rendering.

------------------------------------------------------------------------

## Hint

Ask yourself:

> "If I had to display 1,000 jobs, would I want to write the same HTML
> 1,000 times?"

If the answer is **No**, then you're ready to use **`map()`**.