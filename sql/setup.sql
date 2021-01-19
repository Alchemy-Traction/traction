DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS habits CASCADE;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    phone_number INTEGER NOT NULL,
    pin INTEGER NOT NULL,
    password VARCHAR(20),
    password_hash TEXT,
    user_photo_url TEXT NOT NULL
);

CREATE TABLE habits (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    prompt TEXT NOT NULL,
    label TEXT NOT NULL,
    reminder_type JSONB,
    --day_of_week JSONB,
    reminder_time INTEGER NOT NULL, 
    user_id BIGINT REFERENCES users(id) NOT NULL
);

