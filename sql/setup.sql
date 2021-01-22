DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS habits CASCADE;
DROP TABLE IF EXISTS habit_logs;
-- DROP TABLE IF EXISTS notifications;

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
    reminder_time TIME, 
    user_id BIGINT REFERENCES users(id)
);

CREATE TABLE habit_logs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    habit_complete DATE,
    response BOOLEAN,
    response_sent DATE,
    habit_image_url TEXT,
    matched_label BOOLEAN,
    response_message TEXT,
    user_id BIGINT REFERENCES users(id),
    habit_id BIGINT REFERENCES habits(id) 
);

-- CREATE TABLE notifications (
--     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     reminder_sent Date,
--     notification_id BIGINT REFERENCES habits(id)
-- );
