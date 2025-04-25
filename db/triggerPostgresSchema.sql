-- Supprimer la fonction existante dans le schéma iam_nantais si elle existe
DROP FUNCTION IF EXISTS iam_nantais.insert_user_defaults CASCADE;

-- Création de la fonction du trigger dans le schéma iam_nantais
CREATE OR REPLACE FUNCTION iam_nantais.insert_user_defaults()
RETURNS TRIGGER AS $$
BEGIN
    -- Insérer un abonnement par défaut
    INSERT INTO iam_nantais.subscription (user_id, subscription_type, billing_period, status, start_date, end_date)
    VALUES (NEW.id, 'perso', 'mensuel', FALSE, NOW(), NULL);

    -- Insérer des détails utilisateurs par défaut
    INSERT INTO iam_nantais.user_details (user_id, account_status, user_role, account_type, image_url, updated_at)
    VALUES (NEW.id, TRUE, 'none', 'perso', '', NOW());

    -- Insérer un compte vide pour lier aux connexions externes
    INSERT INTO iam_nantais.accounts (user_id, provider, provider_account_id)
    VALUES (NEW.id, 'local', NEW.id::TEXT);

    -- Insérer une session par défaut (optionnel)
    INSERT INTO iam_nantais.sessions (user_id, expires, sessionToken)
    VALUES (NEW.id, NOW() + INTERVAL '7 days', md5(random()::TEXT));

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Création du trigger dans le schéma iam_nantais
DROP TRIGGER IF EXISTS after_user_insert ON iam_nantais.users;

CREATE TRIGGER after_user_insert
AFTER INSERT ON iam_nantais.users
FOR EACH ROW
EXECUTE FUNCTION iam_nantais.insert_user_defaults();
