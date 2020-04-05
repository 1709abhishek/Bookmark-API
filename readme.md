# MATDAAN -- POLLING API
an API where anyone can create questions with options and also add votes to it.

# dependencies used

1. express
2. body-parser
3. nodemon
4. Mongoose

# Routes
1. /questions/create → To create a question
2. /questions/:id/options/create → To add options to a specific question
3. /questions/:id/delete -> To delete a question
4. /options/:id/delete -> To delete an option
5. /options/:id/add_vote → To increment the count of votes
6. /questions/:id -> To view a question and it's options

# setup
1. clone https://github.com/1709abhishek/Matdaan
2. cd Matdaan
3. run nodemon index.js
4. open postman and visit above routes
5. data models are:
--questions: title
--options: text,votes,link_to_votes
