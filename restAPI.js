const express = require('express');
const app = express();

app.get('/coba', function(request, response){
    response.send("abcdefgh")
})

app.listen('12345');