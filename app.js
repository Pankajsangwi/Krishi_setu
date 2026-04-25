const express = require('express');
const { exec } = require('child_process');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const { attachUser } = require('./middleware/auth');

// Import routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const equipmentRoutes = require('./routes/equipment');
const bookingRoutes = require('./routes/booking');
const adminRoutes = require('./routes/admin');

const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'kisan-secret-key',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(attachUser);

// Global variables for flash messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.currentYear = new Date().getFullYear();
  res.locals.formatCurrency = (value) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(Number(value || 0));
  res.locals.formatDate = (value) => value
    ? new Date(value).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : '';
  next();
});

// Routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/equipment', equipmentRoutes);
app.use('/booking', bookingRoutes);
app.use('/admin', adminRoutes);

// Error handling
app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

function openBrowser(url) {
  const command = process.platform === 'win32'
    ? `start "" "${url}"`
    : process.platform === 'darwin'
      ? `open "${url}"`
      : `xdg-open "${url}"`;

  exec(command, (error) => {
    if (error) {
      console.error(`Could not open browser automatically: ${error.message}`);
    }
  });
}

function startServer() {
  const port = process.env.PORT || 3005;
  const url = `http://localhost:${port}`;

  return app.listen(port, () => {
    console.log(`Server running on ${url}`);

    if (process.env.OPEN_BROWSER !== 'false') {
      openBrowser(url);
    }
  });
}

if (require.main === module) {
  startServer();
}

module.exports = app;
module.exports.startServer = startServer;
