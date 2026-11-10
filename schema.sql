CREATE TABLE IF NOT EXISTS players (
  telegram_id BIGINT PRIMARY KEY,
  username TEXT,
  first_name TEXT NOT NULL DEFAULT 'Игрок',
  balance BIGINT NOT NULL DEFAULT 0 CHECK (balance >= 0),
  taps BIGINT NOT NULL DEFAULT 0 CHECK (taps >= 0),
  tap_reward INTEGER NOT NULL DEFAULT 50,
  last_income_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS player_upgrades (
  telegram_id BIGINT NOT NULL REFERENCES players(telegram_id) ON DELETE CASCADE,
  upgrade_id TEXT NOT NULL,
  purchased_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (telegram_id, upgrade_id)
);
CREATE TABLE IF NOT EXISTS player_assets (
  telegram_id BIGINT NOT NULL REFERENCES players(telegram_id) ON DELETE CASCADE,
  asset_id TEXT NOT NULL,
  level SMALLINT NOT NULL DEFAULT 0 CHECK (level BETWEEN 0 AND 5),
  purchased_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (telegram_id, asset_id)
);
CREATE INDEX IF NOT EXISTS players_leaderboard_idx ON players(balance DESC);

CREATE TABLE IF NOT EXISTS player_transfers (
  id BIGSERIAL PRIMARY KEY,
  sender_id BIGINT NOT NULL REFERENCES players(telegram_id),
  recipient_id BIGINT NOT NULL REFERENCES players(telegram_id),
  amount BIGINT NOT NULL CHECK (amount > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (sender_id <> recipient_id)
);
CREATE INDEX IF NOT EXISTS player_transfers_sender_idx ON player_transfers(sender_id, created_at DESC);
CREATE INDEX IF NOT EXISTS player_transfers_recipient_idx ON player_transfers(recipient_id, created_at DESC);

CREATE TABLE IF NOT EXISTS player_crossword_claims (
  telegram_id BIGINT PRIMARY KEY REFERENCES players(telegram_id) ON DELETE CASCADE,
  last_claim_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
