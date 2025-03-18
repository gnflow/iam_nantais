-- Créer la table user_details avec une référence UUID vers users(id)
CREATE TABLE
    user_details (
        user_id UUID REFERENCES users (id) ON DELETE CASCADE,
        account_status BOOLEAN DEFAULT TRUE,
        user_role VARCHAR(50) CHECK (
            user_role IN ('Admin', 'ContentManager', 'UserManager', 'none')
        ),
        account_type VARCHAR(20) CHECK (account_type IN ('perso', 'pro')) NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        birth_date DATE,
        origin_place VARCHAR(100),
        address VARCHAR(255),
        phone VARCHAR(15),
        business_name VARCHAR(100),
        business_type VARCHAR(20) CHECK (business_type IN ('Siret', 'Siren', 'ESSN')),
        business_id_type VARCHAR(50),
        business_address VARCHAR(255),
        business_email VARCHAR(100),
        updated_at TIMESTAMP DEFAULT NOW ()
    );