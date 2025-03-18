-- 📌 Table des utilisateurs (NextAuth compatible)
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(32) UNIQUE NOT NULL,
    mail VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255), -- NULL si connexion via OAuth
    created_at TIMESTAMPTZ DEFAULT NOW()
);