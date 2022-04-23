# Overview
This collection of open-source APIs was inspired by 
 [FAKER API](https://fakerapi.it/en)

Enjoy!
        

Base url:
`fakefakerapi.herokuapp.com`

# Docs
https://fakefakerapi.herokuapp.com/docs

# Endpoints

`/addresses`

Get all addresses

```
Success-Response
HTTP/1.1 200 OK

[
  {
      "id": 1,
      "street_number": "1000",
      "street_name": "Washington ave",
      "city": "Chicago",
      "state": "IL",
      "zipcode": "60640",
      "country": "US"
  },
  {
      "id": 2,
      "street_number": "1000",
      "street_name": "Washington ave",
      "city": "Chicago",
      "state": "IL",
      "zipcode": "60640",
      "country": "US"
  }
]
```

`/users`

Get all users

```
HTTP/1.1 200 OK
Success-Response
[ 
  {
    "id": 1,
    "first_name": "Bob",
    "last_name": "Lee",
    "username": "bob123",
    "password": "y29ehae34&",
    "email": "bob32@email.com"
   },
   {
    "id": 2,
    "first_name": "Bob",
    "last_name": "Lee",
    "username": "bob123",
    "password": "y29ehae34&",
    "email": "bob32@email.com"
   } 
 ]
```
`/books`

Get all books

```
HTTP/1.1 200 OK
Success-Response
[
  {
      "id": 1,
      "title": "How to sell a house",
      "author": "Jackie Chan",
      "genre": "Real Estate, Business",
      "description": "Learn how to sell a house",
      "isbn": "12345678910",
      "date_published": "2021-07-02T05:00:00.000Z",
      "publisher": "Book pub Inc"
  },
  {
      "id": 2,
      "title": "How to sell a house",
      "author": "Jackie Chan",
      "genre": "Real Estate, Business",
      "description": "Learn how to sell a house",
      "isbn": "12345678910",
      "date_published": "2021-07-02T05:00:00.000Z",
      "publisher": "Book pub Inc"
  }
]

```
`/companies`

Get all companies

```
HTTP/1.1 200 OK
Success-Response
[
  {
      "id": 1,
      "name": "ABC corp",
      "phone": "+17819004517",
      "country": "US",
      "state": "IL",
      "city": "Chicago",
      "address": "904 W Monroe street, St 1004",
      "zipcode": "60604",
      "website": "www.company-site.io"
  },
  {
      "id": 2,
      "name": "ABC corp",
      "phone": "+17819004517",
      "country": "US",
      "state": "IL",
      "city": "Chicago",
      "address": "904 W Monroe street, St 1004",
      "zipcode": "60604",
      "website": "www.company-site.io"
  }
]
```

`/movies`

Get all movies

```
HTTP/1.1 200 OK
Success-Response
  [
    {
      "id": 1,
      "title": "Da Matrix",
      "genre": "Science Fiction, Action",
      "director": "Donna Summers",
      "description": "Intriguing adventure into the unknown",
      "movie_length_minutes": 183,
      "date_released": "1991-01-01T06:00:00.000Z",
      "top_cast": "Bruce Springsteen"
    }
  ]
 ```
 
 `/products`
 
 Get all products
 
 ```
 HTTP/1.1 200 OK
Success-Response
[
  {
    "id": 1,
    "title": "Table",
    "description": "A very nice glass table with four legs",
    "price": "10.99",
    "category": "household",
    "sku": "TA-TBLE-IOPO",
    "stock_quantity": 100
  },
  {
    "id": 2,
    "title": "Table",
    "description": "A very nice glass table with four legs",
    "price": "10.99",
    "category": "household",
    "sku": "TA-TBLE-IOPO",
    "stock_quantity": 100
  }
]
  ```
Todo:
- add /api to base url for endpoints
**parameters to add**
- each endpoint shoudld have **min, max**
- addresses: filter by state
- books, movies: filter by genre
- companies filter by state
- increase max number of objects to 1000 (for each category)
- add ability to test service on docs page
- then need to create a new docs page
- update Readme, follow Readme for Sweater 
