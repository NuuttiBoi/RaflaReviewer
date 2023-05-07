# API-kuvaus

### Endpoints:

- /api/v1/restaurants
- /api/v1/restaurants/[id]
- /api/v1/comments
- /api/v1/comments/[id]
- /api/v1/comments/restaurant/[id]
- /users
- /users/[id]
- /login
- /login/[id]
- /profile
- /logout

<br />

## GET

/api/v1/restaurants&emsp;&emsp;- hakee kaikki ravintolat

/api/v1/restaurants/[id]&emsp;&emsp;- hakee ravintolan id:llä

/api/v1/comments&emsp;&emsp;- hakee kaikki kommentit

/api/v1/comments/[id]&emsp;&emsp;- hakee kommentin id:llä

/api/v1/comments/restaurant/[id]&emsp;&emsp;- kaikki ravintolan kommentit ravintolan id:llä

/users&emsp;&emsp;&emsp;

/users/[id]&emsp;&emsp;&emsp;

/profile

/login

<br />

## POST

/api/v1/restaurants&emsp;&emsp;- lisää uuden ravintolan

/api/v1/comments&emsp;&emsp;- lisää uuden kommentin

/users

/login

/logout

<br />

## PATCH

/api/v1/restaurants/[id]&emsp;&emsp;- päivittää ravintolan

<br />

## DELETE

/api/v1/restaurants/[id]&emsp;&emsp;- poistaa ravintolan id:llä

/api/v1/comments/[id]&emsp;&emsp;- poistaa kommentin id:llä

/api/v1/comments/restaurant/[id]&emsp;&emsp;- poistaa kaikki ravintolan kommentit ravintolan id:llä

/login/[id]

<br />

## PUT

/users/[id]