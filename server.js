const express = require('express')
const app = express()
const connectDB = require('./config/db')
const users = require('./routes/api/users')
const posts = require('./routes/api/posts')
const auth = require('./routes/api/auth')
const profile = require('./routes/api/profile')
const path = require('path')

// DB connected
connectDB()

// Body Parser
app.use(express.json({extended : false}))


// Defaults Routers
app.use('/api/users', users)
app.use('/api/posts', posts)
app.use('/api/auth', auth)
app.use('/api/profile', profile)

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }



const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server Run At ${PORT}`))
