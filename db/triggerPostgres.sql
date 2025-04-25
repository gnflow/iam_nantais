-- Ce code fonctionne par default sur le schema public
-- Supprimer la fonction existante si elle existe déjà
DROP FUNCTION IF EXISTS insert_user_defaults CASCADE;

-- Création de la fonction du trigger
CREATE OR REPLACE FUNCTION insert_user_defaults()
RETURNS TRIGGER AS $$
BEGIN
    -- Insérer un abonnement par défaut
    INSERT INTO subscription (user_id, subscription_type, billing_period, status, start_date, end_date)
    VALUES (NEW.id, 'perso', 'mensuel', FALSE, NOW(), NULL);

    -- Insérer des détails utilisateurs par défaut
    INSERT INTO user_details (user_id, account_status, user_role, account_type, image_url, updated_at)
    VALUES (NEW.id, TRUE, 'none', 'perso', '', NOW());

    -- Insérer un compte vide pour lier aux connexions externes
    INSERT INTO accounts (user_id, provider, provider_account_id)
    VALUES (NEW.id, 'local', NEW.id::TEXT);

    -- Insérer une session par défaut (optionnel)
    INSERT INTO sessions (user_id, expires, sessionToken)
    VALUES (NEW.id, NOW() + INTERVAL '7 days', md5(random()::TEXT));

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Création du trigger qui se déclenche après chaque insertion dans users
CREATE TRIGGER after_user_insert
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION insert_user_defaults();
