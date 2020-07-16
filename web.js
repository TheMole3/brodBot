const config = require("./config.json");
const fs = require('fs');
const express = require('express');
const app = express();


const port = 3004;


app.get('/', (req, res) => {
  sendFile(__dirname + '/web/index/index.html', res, req);
});

app.get('/brd', (req, res) => {
  db.brod.find({}, function(err,result){
    res.send(result)
  })
})

app.get('/:page', (req, res) => {
  sendFile(__dirname + '/web/' + req.params.page + '/' + req.params.page + '.html', res, req);
});
app.get('/:folder/:page', (req, res) => {
  sendFile(__dirname + '/web/' + req.params.folder + '/' + req.params.page, res, req);
});
app.listen(port, () => console.log(`Web server listening on port ${port}!`));

function sendFile(path, res, req) { // Send file function
  if (fs.existsSync(path)) { // If file exists send it
    res.sendFile(path);
  } else { // Else send 404 error
    res.send('err 404');
  }
}
