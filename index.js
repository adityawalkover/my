const app = require('express')();
const path = require('path');

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.set('views',path.join(__dirname, 'views'));
app.set("view engine", "ejs");


app.get('/',async (req,res)=> {

    res.render("app");  
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  })
  io.on('connection', (socket) => {
    socket.on('editor-content', (msg) => {
      console.log('message: ' + msg);
    });
  });
  io.on('connection', (socket) => {
    socket.on('editor-content', (msg) => {
      io.emit('editor-content', msg);
    });
  });

http.listen(3000, () => {
    console.log('listening on *:3000');
  });