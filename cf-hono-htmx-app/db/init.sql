-- Todoアプリケーションのデータベース
DROP TABLE IF EXISTS Todos;
CREATE TABLE IF NOT EXISTS Todos (
  id INTEGER PRIMARY KEY, 
  title TEXT
);

-- 適当に3件データを入れておく
INSERT INTO Todos (title) VALUES ("タスク1");
INSERT INTO Todos (title) VALUES ("タスク2");
INSERT INTO Todos (title) VALUES ("タスク3");
