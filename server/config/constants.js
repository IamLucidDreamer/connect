module.exports = {
    // Server
    SERVER_RUNNING: 'Server is running on port',

    // MongoDB
    MONGO_CONNECTED: 'MongoDB connected',
    MONGO_ERROR: 'MongoDB connection failed',

    // Authentication
    USER_EXISTS: 'User already exists',
    INVALID_CREDENTIALS: 'Invalid email or password',
    NOT_AUTHORIZED: 'Not authorized, token failed',
    NO_TOKEN: 'Not authorized, no token',

    // HTTP Status Codes
    STATUS_SUCCESS: 200,
    STATUS_CREATED: 201,
    STATUS_BAD_REQUEST: 400,
    STATUS_UNAUTHORIZED: 401,
    STATUS_FORBIDDEN: 403,
    STATUS_NOT_FOUND: 404,
    STATUS_CONFLICT: 409,
    STATUS_SERVER_ERROR: 500,

    // Success Messages
    REGISTRATION_SUCCESS: 'User registered successfully',
    LOGIN_SUCCESS: 'User logged in successfully',

    // Error Messages
    ERRORS: {
        GENERIC_ERROR: 'Something went wrong. Please try again later.',
        USER: {
            USER_EXISTS: 'User already exists with the provided email.',
            INVALID_CREDENTIALS: 'Invalid email or password provided.',
            UNAUTHORIZED: 'You are not authorized to perform this action.',
            NO_TOKEN: 'Access denied. No token provided.',
        },
        AUTH: {
            AUTHENTICATION_FAILED: 'Authentication failed. Invalid credentials.',
            TOKEN_MISSING: 'Authentication token is missing or invalid.',
            ACCESS_DENIED: 'Access denied. You do not have permission to perform this action.',
        },
        SERVER: {
            INTERNAL_ERROR: 'Internal server error. Please try again later.',
        },
        DATABASE: {
            CONNECTION_FAILED: 'Failed to connect to the database. Please check your connection settings.',
        },
    },

    ACCESS_TOKEN_EXPIRATION: '15m', // 15 minutes
    REFRESH_TOKEN_EXPIRATION: '30d', // 30 days
};
