DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS habits CASCADE;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    phone_number VARCHAR(20),
    pin INTEGER,
    password VARCHAR(20),
    password_hash TEXT,
    user_photo_url TEXT
);

CREATE TABLE habits (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    prompt TEXT,
    label TEXT,
    reminder_type JSONB,
    --day_of_week JSONB,
    reminder_time INTEGER, 
    user_id BIGINT REFERENCES users(id)
);

CREATE TABLE habit_logs (
id: BIG INT (234),
habit_id References (habits.id) BIG INT (2444),
reminder_sent: Date,
response: Boolean,
response_sent: Date,
photo_Url: TEXT,
matched_label: BOOLEAN,
response_message: TEXT
);

