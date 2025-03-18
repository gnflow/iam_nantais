CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL,
    provider_account_id VARCHAR(255) NOT NULL UNIQUE
);

-- #### 🔹 **Mise à jour de `users`**
-- Ajoute des colonnes pour gérer les connexions externes :
ALTER TABLE users ADD COLUMN provider VARCHAR(50);
ALTER TABLE users ADD COLUMN provider_id VARCHAR(255);

----------------------------------------------------------- FINAL TABLES

-- 📌 Table des utilisateurs (NextAuth compatible)
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(32) UNIQUE NOT NULL,
    mail VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255), -- NULL si connexion via OAuth
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 📌 Table des comptes liés aux providers OAuth (NextAuth compatible)
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL, -- Ex: google, github, facebook
    provider_account_id VARCHAR(255) NOT NULL UNIQUE, -- ID renvoyé par le provider
    access_token TEXT,
    refresh_token TEXT,
    expires_at BIGINT,
    id_token TEXT,
    token_type TEXT,
    scope TEXT,
    session_state TEXT
);

-- 📌 Table des sessions (Gestion de connexion avec NextAuth)
CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    expires TIMESTAMPTZ NOT NULL
);

-- 📌 Table des tokens de vérification (Utilisé pour les Magic Links)
CREATE TABLE verification_token (
    identifier TEXT NOT NULL,
    token TEXT NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    PRIMARY KEY (identifier, token)
);
