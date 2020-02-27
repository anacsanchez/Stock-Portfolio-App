require('dotenv').config();

if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  process.env.DB_HOST = process.env.DB_LOCALHOST;
}

if(process.env.NODE_ENV === 'test') {
  process.env.DB_NAME = `${process.env.DB_NAME}_test`;
}
