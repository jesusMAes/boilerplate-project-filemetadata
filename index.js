var express = require('express');
var cors = require('cors');
require('dotenv').config();
const multer= require('multer');
const upload = multer({dest:'uploads/'})

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


//use multer as middleware
app.post('/api/fileanalyse', upload.single('upfile'), (req,res) => {
  console.log(req.file)
  let name = req.file.originalname;
  let type = req.file.mimetype;
  let size = req.file.size;
  res.json({name:name, type:type, size:size});
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

//TODO THINGS
//This project look easy, the input with type field in the html lets you upload the file and no database are involved, then the only requisite is to manage the post petition, read the metadata and redirect to a JSON response ive seeing that multer can help with that