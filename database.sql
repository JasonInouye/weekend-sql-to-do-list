CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(80),
	"priority" INT,
	"due_date" DATE,
	"completed_date" DATE,
	"completed" BOOLEAN,
	"description" VARCHAR(500)
);
INSERT INTO "tasks"("task", "priority", "due_date", "completed_date", "completed", "description") 
VALUES
('Grocery Shopping', '2', '3/20/2022', '1/1/2029', false, 'Create shopping list for shopping at Target'),
('Create Project Task List', '1', '3/20/2022', '1/1/2029', false, 'Create tasks for weekend code project'), 
('Mow Lawn', '3', '3/24/2022', '1/1/2029', false, ''), 
('Final Four Bracket', '5', '3/16/2022', '1/1/2029', false, 'Research teams and finish Bracket'), 
('Zero out Inbox', '6', '3/20/2022', '1/1/2029', false, 'Read and reply to all Emails'), 
('Take Parker to Vet', '7', '3/19/2022', '1/1/2029', false, ''), 
('Take Loralei to Gymnastics', '8', '3/19/2022', '1/1/2029', false, 'Create shopping list for shopping at Target'), 
('1 hour of Code Academy', '9', '3/20/2022', '1/1/2029', false, 'Do 1 hour of code academy a day');