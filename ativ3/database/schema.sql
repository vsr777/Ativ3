-- Criação do banco de dados
CREATE DATABASE game_users;

-- Conexão ao banco de dados
\c game_users;

-- Extensão para UUID caso necessário
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar tabela de usuários de jogos
CREATE TABLE IF NOT EXISTS game_user (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  level INTEGER DEFAULT 0,
  experience INTEGER DEFAULT 0,
  coins INTEGER DEFAULT 1000,
  is_active BOOLEAN DEFAULT TRUE,
  avatar_url VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  game_stats JSONB DEFAULT '{}',
  achievements JSONB DEFAULT '[]',
  inventory JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Criação de índices para otimização de consultas
CREATE INDEX idx_game_user_username ON game_user(username);
CREATE INDEX idx_game_user_email ON game_user(email);
CREATE INDEX idx_game_user_level ON game_user(level);

-- Função para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Trigger para atualizar o campo updated_at
CREATE TRIGGER update_game_user_updated_at
BEFORE UPDATE ON game_user
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Inserir alguns dados iniciais para teste
INSERT INTO game_user (username, email, password, level, experience, coins, role, game_stats, achievements, inventory)
VALUES 
('player1', 'player1@example.com', '$2b$10$7KR8Rnf/FaQFQjRZ/g1jO.l4lp4Tyo4U85S2ZcgK.yqwku0WgHfIa', 5, 1200, 3000, 'user', 
  '{"victories": 10, "defeats": 5, "timePlayed": 1200}', 
  '[{"id": 1, "name": "First Victory", "description": "Win your first game", "unlocked": true}]',
  '[{"id": 1, "name": "Basic Sword", "type": "weapon", "power": 10}]'),
  
('admin_user', 'admin@example.com', '$2b$10$Rek8N/R2PBHzE8LJQlTQH.L/fw1bUfF3MH8OtufSCFNiOIwZzYbLW', 99, 50000, 9999, 'admin', 
  '{"victories": 999, "defeats": 1, "timePlayed": 50000}', 
  '[{"id": 50, "name": "Master of Games", "description": "Reach level 99", "unlocked": true}]',
  '[{"id": 100, "name": "Admin Staff", "type": "special", "power": 999}]'),
  
('newbie', 'newbie@example.com', '$2b$10$YTR1/7Dc.0UiV4RFEIQFUeZn99G4/LBXCJZtJqxLfbJkCpGQxXeZO', 1, 50, 1200, 'user', 
  '{"victories": 0, "defeats": 1, "timePlayed": 60}', 
  '[]',
  '[{"id": 1, "name": "Starter Pack", "type": "bundle", "items": ["Health Potion", "Basic Shield"]}]');

-- Nota: As senhas acima são hashes do bcrypt para:
-- player1: 'password123'
-- admin_user: 'admin123'
-- newbie: 'newbie123'