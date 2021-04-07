//declaration
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require("cors");
mongoose.Promise = global.Promise
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const adminRoutes = require('./routes/admin.route');
const cartRoutes = require('./routes/cart.route');

const roomRoutes = require('./routes/room.route');
const chatRoutes = require('./routes/chat.route');

const postImageRoutes = require('./routes/images_routes/post.image.route')
const userImageRoutes = require('./routes/images_routes/user.image.route')
const productImageRoutes = require('./routes/images_routes/product.image.route')
const storeImageRoutes = require('./routes/images_routes/store.image.route')
const storyImageRoutes = require('./routes/images_routes/story.image.route')

const storeRoutes = require('./routes/store.route')

const postRoutes = require('./routes/post.route');
const productRoutes = require('./routes/product.route');
const follow_unfollowRoutes = require('./routes/follow_unfollow.route');
const postReactionsRoutes = require('./routes/post.reactions.route')
const postCommentsRoutes = require('./routes/post.comments.route')
const storyRoutes = require('./routes/story.route')

const {
  requireAuth,
  checkUser
} = require('./middlewares/auth.middleware');
const consola = require('consola')

const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
  if (req.method === 'OPTIONS') {
    return res.send(200);
  } else {
    return next();
  }
});
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, () => {
  consola.success('connected to DB')
})
require('dotenv').config()

//app.use()
app.use(logger('dev'));
app.use(express.urlencoded({
  extended: false
}))
app.use(express.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/room', roomRoutes);
app.use('/api/chat', chatRoutes);


//routes
 app.get('/api/*', requireAuth, checkUser);
app.post('/api/*', requireAuth, checkUser);
app.put('/api/*', requireAuth, checkUser);
app.delete('/api/*', requireAuth, checkUser); 

app.get('/', (req, res) => {
  res.send('welcome to the damn app');
});
app.use('/auth/', authRoutes);
app.use('/api/user/', userRoutes);
app.use('/api/admin/', adminRoutes);

app.use('/api/image/', postImageRoutes);
app.use('/api/image/', userImageRoutes);
app.use('/api/image/', productImageRoutes);
app.use('/api/image/', storeImageRoutes);
app.use('/api/image/', storyImageRoutes);


app.use('/api/store/', storeRoutes)

app.use('/api/post/', postRoutes);
app.use('/api/product/', productRoutes);
app.use('/api/following/', follow_unfollowRoutes)


app.use('/api/post/reaction',postReactionsRoutes)

app.use('/api/comment/',postCommentsRoutes)

app.use('/api/cart/',cartRoutes)
app.use('/api/story/',storyRoutes)




module.exports = app;