# ValidSudokuBoardConfiguration
this is the simple logic written in JS to test the valid sudoku board configuration

### to run the code just issue:

```js
  node timeToSaveSudoku.js
```
### to run the auth api, move to auth_api_assignment and run> 
```bash
  yarn or npm install
```

### after running above command run
```bash
  yarn/npm start
```

#### Following endspoints are available
- /login
- /signUp
- resetPassword

> **/login** accepts parameters - { username: String, password: String }
- returns access_token
note: while storing data or reseting password **Authorization header is must** with type *Bearer* and *accecc_token*

``` bash
  curl -X POST --header 'content-type: application/json'  --data '{"username": "rishant46sharma@gmail.com", "password": "pass123"}' http://localhost:8090/login
```

> **/signUp** accepts parameters - { username : String, password: String }
- returns success message

> **/resetPassword** accepts parameter - { username: String, currentPassword: String, newPassword: String }
- returns success message upon successfully password reset
note: while storing data or reseting password **Authorization header is must** with type *Bearer* and *accecc_token*

```bash
  curl -X POST --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJpc2hhbnQ0NnNoYXJtYUBnbWFpbC5jb20iLCJrZXkiOiIkMmEkMTAkN3lHcHJWZzF4ekJUUTJ3Q3c3Smo3TzAxaHJnS09iY1E1TkRVemR4cGJnakY0N1VhUGQwaHkiLCJpYXQiOjE1NDk5MDUwMDMsImV4cCI6MTU0OTk5MTQwM30.evw46o8X25KupDvp-c2hy9lQmtVjgZc1HW8g30xzzSo'  --data '{username: rishant46sharma@gmail.com, currentPassword: password, newPassword: pass@123}' http://localhost:8090/resetPassword

```
