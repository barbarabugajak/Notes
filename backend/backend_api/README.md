# API reference

## Get current user

GET
```
api/user
```

## Create a note
POST: 
```
    'api/notes'
```

## Get all notes that user collaborates in
GET 
```
api/notes/user/<str:id>
```

## Get data of an instance of a note
GET
```
    api/notes/<int:pk>
```

## Login 
POST 
```
api/login
```

## Logout 
POST 
```
api/logout
```


