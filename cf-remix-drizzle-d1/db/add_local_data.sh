npx wrangler d1 execute mydb --local --command="
INSERT INTO users (id, email, name, nickname, customerId, created_at, updated_at)
VALUES
  ('user1', 'user1@example.com', 'User One', 'User1', 'customer1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('user2', 'user2@example.com', 'User Two', 'User2', 'customer2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('user3', 'user3@example.com', 'User Three', 'User3', 'customer3', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
"
