import dotenv from 'dotenv';

dotenv.config();

const config = {
    PORT: process.env.PORT || 3001,
    SCALINGO_TOKEN: process.env.SCALINGO_TOKEN || '',
    API_KEY: process.env.API_KEY || '',
};

export { config };
