<div align="center">
  <img width="105" src="https://user-images.githubusercontent.com/41551585/165626019-8bec6946-ee51-45cb-9b1e-352527bac297.svg"/>
  <img width="155" src="https://user-images.githubusercontent.com/41551585/165625869-a7673ce2-eb50-437e-bf6a-44297088f7f7.jpeg"/>
  <img width="85" src="https://user-images.githubusercontent.com/41551585/165635092-39fbbd0f-2aa3-423f-b160-901328c30aef.svg"/>
  <img width="85" src="https://user-images.githubusercontent.com/41551585/165635956-f410ca4c-a60b-403f-9883-9c4287b8f6a1.svg"/>
  <img width="155" src="https://user-images.githubusercontent.com/41551585/165626539-3da0e12f-9965-4b92-9156-4d58d2456a87.svg"/>
</div>


# Overview
This collection of open-source APIs helps developers produce mock/fake data for their applications.

        

Base url:
`fakefakerapi.herokuapp.com/api/v1/`

# Documentation
https://fakefaker-docs.herokuapp.com/

# Endpoints

GET `/addresses`

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

GET `/users`

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
GET `/books`

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
GET `/companies`

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

GET `/movies`

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
 
GET `/products`
 
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
