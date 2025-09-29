-- types table
CREATE TABLE IF NOT EXISTS types (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL
);

-- Create categories table

CREATE TABLE IF NOT EXISTS categories (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL
);

-- entries table
CREATE TABLE IF NOT EXISTS entries (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  type_id INTEGER REFERENCES types(id),
  category_id INTEGER REFERENCES categories(id)
);

-- insert into types
INSERT INTO types (name) VALUES
('job'),
('note'),
('reply');

-- insert into categories
INSERT INTO categories (name) VALUES
('urgent'),
('personal'),
('interview'),
('client'),
('reminder'),
('follow-up');

-- Insert into entries
INSERT INTO entries (title, content, likes, type_id, category_id) VALUES
('Apply to Google', 'Submit resume via portal', 1, 
(SELECT id FROM types WHERE name = 'job'), 
(SELECT id FROM categories WHERE name = 'interview')),
('Doctor Appointment', 'Schedule urgent check-up for next week', 5,
(SELECT id FROM types WHERE name = 'note'),
 (SELECT id FROM categories WHERE name = 'urgent')),
('Client Email', 'Thank you for your interest!', 3, 
(SELECT id FROM types WHERE name = 'reply'), 
(SELECT id FROM categories WHERE name = 'personal'));


SELECT title, content, likes, type_id, category_id FROM entries;

INSERT INTO entries (title, content, likes, type_id, category_id) VALUES 
('Follow Up with Hiring Manager', 'Send thank-you email after interview', 3, 1, 6);

INSERT INTO entries (title, content, likes, type_id, category_id) VALUES
('Prepare Interview Presentation', 'Create slides for Monday’s client interview', 4, 1, 3),  
('Update Resume', 'Add latest project details and skills', 2, 1, 5), 
('Schedule Networking Call', 'Connect with former colleague for advice', 1, 3, 5);

INSERT INTO entries (title, content, likes, type_id, category_id) VALUES
('Call Summary - Client Alpha', 'Client wants weekly updates and prefers email communication.', 3, 3, 4),
('Workshop Notes', 'Key takeaways from React optimization session.', 2, 2, 2),
('Weekend Goals', 'Finish resume update and apply to 2 roles.', 1, 2, 5),
('Project Learnings', 'Learned how to optimize backend queries.', 4, 2, 2);

SELECT
  entries.title,
  entries.content,
  entries.likes,
  types.name AS type,
  categories.name AS category
FROM entries
LEFT JOIN types ON entries.type_id = types.Id
LEFT JOIN categories ON entries.category_id = categories.Id;

SELECT name FROM types;
SELECT name FROM categories;

DELETE FROM entries WHERE id = $1;
UPDATE entries SET title = $1, content= $2, likes = $3, type_id = $4, category_id = $5 WHERE id = $6
INSERT INTO entries (title, content, likes, type_id, category_id) VALUES ($1, $2, $3, $4, $5);