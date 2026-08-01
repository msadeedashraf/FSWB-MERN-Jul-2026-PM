## Install JSON-server package from npmjs

- [json-server](https://www.npmjs.com/package/json-server)

``
npm install json-server@0.17.4
```

- create a data folder in the root project folder 
- create a list.json file 

```json
{
    "items":
    [
    {
        "id": 1,
        "checked": false,
        "item": "Book"
    },
    {
        "id": 2,
        "checked": false,
        "item": "apples"
    },
    {
        "id": 3,
        "checked": false,
        "item": "eggs"
    },
    {
        "id": 4,
        "checked": false,
        "item": "oranges"
    },
    {
        "id": 5,
        "checked": false,
        "item": "milk"
    }
] 
}


```
cd data
```

- to start the json server with the list.json file

```
npx json-server list.json
```

- or with a custom 
```
npx json-server -p 3200 list.json
```
- Test the url in the browser [http://localhost:3000/items]

[URL](http://localhost:3000/items) 
