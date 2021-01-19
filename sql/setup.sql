DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    phone_number INTEGER NOT NULL,
    --phone_number_hash
    password VARCHAR(20) NOT NULL,
    password_hash TEXT NOT NULL,
    user_photo_url TEXT NOT NULL
);
