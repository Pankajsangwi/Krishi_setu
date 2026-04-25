# Kisan Equipment Rental System

A comprehensive web platform for agricultural equipment rental, connecting farmers with equipment owners.

## Features

- **User Authentication**: Role-based access (Admin, Equipment Owner, Farmer/User)
- **Equipment Management**: Add, edit, delete equipment with image uploads
- **Booking System**: Reserve equipment with automatic price calculation
- **Search & Filter**: Find equipment by category, location, and name
- **Admin Dashboard**: Manage users, equipment, and bookings
- **Responsive Design**: Mobile-friendly interface
- **Secure**: JWT authentication and input validation

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite (easily changeable to SQL Server)
- **Frontend**: HTML5, CSS3, Bootstrap, JavaScript
- **Authentication**: JWT tokens with bcrypt password hashing

## Project Structure

```
kisan-equipment-rental/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── equipmentController.js # Equipment management
│   ├── bookingController.js # Booking system
│   └── adminController.js   # Admin functions
├── middleware/
│   └── auth.js             # Authentication middleware
├── models/
│   ├── User.js             # User model
│   ├── Equipment.js        # Equipment model
│   └── Booking.js          # Booking model
├── public/
│   ├── css/
│   │   └── style.css       # Custom styles
│   ├── js/
│   │   └── main.js         # Client-side JavaScript
│   └── images/
│       └── equipment/       # Equipment images
├── routes/
│   ├── index.js            # Home routes
│   ├── auth.js             # Authentication routes
│   ├── equipment.js        # Equipment routes
│   ├── booking.js          # Booking routes
│   └── admin.js            # Admin routes
├── views/
│   ├── index.ejs           # Home page
│   ├── auth/
│   │   ├── login.ejs       # Login page
│   │   └── register.ejs    # Registration page
│   ├── equipment/
│   │   ├── list.ejs        # Equipment listing
│   │   ├── details.ejs     # Equipment details
│   │   ├── add.ejs         # Add equipment
│   │   └── edit.ejs        # Edit equipment
│   ├── booking/
│   │   ├── book.ejs        # Booking form
│   │   └── my-bookings.ejs # User's bookings
│   ├── admin/
│   │   ├── dashboard.ejs   # Admin dashboard
│   │   ├── users.ejs       # User management
│   │   ├── equipment.ejs   # Equipment management
│   │   └── bookings.ejs    # Booking management
│   ├── about.ejs           # About page
│   ├── contact.ejs         # Contact page
│   ├── profile.ejs         # User profile
│   └── 404.ejs             # Error page
├── app.js                  # Main application file
├── package.json            # Dependencies
└── README.md               # This file
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. **Clone or download the project**
   ```bash
   cd d:\p1
   # The project is already in kisan-equipment-rental folder
   ```

2. **Install dependencies**
   ```bash
   cd kisan-equipment-rental
   npm install
   ```

3. **Create images directory**
   ```bash
   mkdir -p public/images/equipment
   ```

4. **Add placeholder images**
   - Add some equipment images to `public/images/equipment/`
   - Add a hero image as `public/images/tractor-hero.jpg`
   - Add a placeholder image as `public/images/placeholder.jpg`

5. **Start the application**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

6. **Access the application**
   - Open your browser and go to `http://localhost:3000`
   - Default admin account will be created automatically

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    role TEXT DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Categories Table
```sql
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT
);
```

### Equipment Table
```sql
CREATE TABLE equipment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category_id INTEGER,
    description TEXT,
    price_per_day REAL NOT NULL,
    price_per_hour REAL,
    location TEXT NOT NULL,
    availability TEXT DEFAULT 'available',
    image TEXT,
    owner_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories (id),
    FOREIGN KEY (owner_id) REFERENCES users (id)
);
```

### Bookings Table
```sql
CREATE TABLE bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    equipment_id INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_price REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (equipment_id) REFERENCES equipment (id)
);
```

## Default Accounts

After running the application, you can create accounts:

- **Admin**: Register with any email and set role to admin, or manually update in database
- **Equipment Owner**: Register and select "Equipment Owner" role
- **User**: Register with "Farmer/User" role (default)

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/logout` - User logout

### Equipment
- `GET /equipment` - List all equipment (with search/filter)
- `GET /equipment/:id` - Get equipment details
- `GET /equipment/add` - Add equipment form (owners only)
- `POST /equipment/add` - Create equipment (owners only)
- `GET /equipment/edit/:id` - Edit equipment form (owners only)
- `POST /equipment/edit/:id` - Update equipment (owners only)
- `POST /equipment/delete/:id` - Delete equipment (owners only)

### Booking
- `GET /booking/book/:id` - Booking form
- `POST /booking/book` - Create booking
- `GET /booking/my-bookings` - User's bookings
- `GET /booking/owner-bookings` - Owner's equipment bookings
- `POST /booking/update-status/:id` - Update booking status
- `POST /booking/cancel/:id` - Cancel booking

### Admin
- `GET /admin` - Admin dashboard
- `GET /admin/users` - Manage users
- `POST /admin/users/update-role/:id` - Update user role
- `POST /admin/users/delete/:id` - Delete user
- `GET /admin/equipment` - Manage equipment
- `POST /admin/equipment/update-status/:id` - Update equipment status
- `POST /admin/equipment/delete/:id` - Delete equipment
- `GET /admin/bookings` - Manage bookings
- `POST /admin/bookings/update-status/:id` - Update booking status

## Sample Data

To populate the database with sample data, you can run SQL inserts or create a seed script.

Example equipment data:
```sql
INSERT INTO equipment (name, category_id, description, price_per_day, location, owner_id) VALUES
('John Deere Tractor', 1, 'Powerful tractor for farming operations', 2500, 'Punjab', 2),
('Combine Harvester', 2, 'Efficient crop harvesting machine', 5000, 'Haryana', 2),
('Rotavator', 3, 'Soil preparation equipment', 800, 'UP', 3);
```

## Future Enhancements

1. **Payment Integration**: Add payment gateway (Razorpay, Stripe)
2. **Reviews & Ratings**: Allow users to rate equipment and owners
3. **Notifications**: Email/SMS notifications for bookings
4. **Geolocation**: Map integration for equipment locations
5. **Advanced Search**: Filters by price range, availability dates
6. **Mobile App**: React Native mobile application
7. **Analytics**: Detailed reports and analytics dashboard
8. **Multi-language**: Support for regional languages
9. **Insurance**: Equipment insurance options
10. **Maintenance Tracking**: Equipment maintenance schedules

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF protection
- Role-based access control

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact:
- Email: support@kisanequipment.com
- Phone: +91 12345 67890