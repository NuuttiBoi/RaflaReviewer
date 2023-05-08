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

/users&emsp;&emsp;&emsp;- hakee kaikki käyttäjät

/users/[id]&emsp;&emsp;&emsp;- hakee käyttäjän id:llä

/profile;&emsp;&emsp;&emsp;- hakee käyttäjän tiedot

/login&emsp;&emsp;&emsp;- hakee kirjautuneet

<br />

## POST

/api/v1/restaurants&emsp;&emsp;- lisää uuden ravintolan

/api/v1/comments&emsp;&emsp;- lisää uuden kommentin

/users&emsp;&emsp;- lisää uuden käyttäjän

/login&emsp;&emsp;- lisää uuden kirjautumisen

/logout&emsp;&emsp;- kirjaa käyttäjän ulos

<br />

## PATCH

/api/v1/restaurants/[id]&emsp;&emsp;- päivittää ravintolan

<br />

## DELETE

/api/v1/restaurants/[id]&emsp;&emsp;- poistaa ravintolan id:llä

/api/v1/comments/[id]&emsp;&emsp;- poistaa kommentin id:llä

/api/v1/comments/restaurant/[id]&emsp;&emsp;- poistaa kaikki ravintolan kommentit ravintolan id:llä

/login/[id]&emsp;&emsp;- poistaa kirjautuneen id:llä

<br />

## PUT

/users/[id] &emsp;&emsp;- päivittää käyttäjän tietoja

<br />

# Käyttöesimerkkejä


## POST

### /api/v1/restaurants

{

    "name": "Kotipizza",
    "address": "Uunitie 20, 02300 Espoo",
    "foodScore": "80",
    "qualityPriceScore": "20",
    "experienceScore": "55",
    "tags": ["Pikaruoka", "Takeaway", "Kasvisvaihtoehtoja"],
    "thumbsUp": ["123", "456", "789", "256"],
    "thumbsDown": ["987", "321"],
    "image": "https://kotipizza.fi/pizza.jpg",
    "userId": "3447473928"
}

### /api/v1/comments

{

        "restaurantId": "6367362736827",
        "username": "pizzafani",
        "userId": "2635563",
        "content": "Paras pizzapaikka!"
}

## PATCH

### /api/v1/restaurants/6456f41202a15926335b7f2a

{
    
        "thumbsUp": ["123", "456", "789"],
        "thumbsDown": ["120"]
}


