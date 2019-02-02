INSERT INTO titles (title, description) VALUES ("Maths","Maths Quiz"),("English","English Quiz"),("Chemistry","Chemistry Quiz");

INSERT INTO questions (title_id, question) VALUES (1,"What is 1+1"),(1,"What is 2+2"),(1,"What is 3+3"),(1,"What is 4+4");

INSERT INTO questions (title_id, question) VALUES (2,"What is a verb"),(2,"What is a noun"),(2,"What is an adjective"),(2,"What is a pronoun");

INSERT INTO questions (title_id, question) VALUES (3,"What is chemistry"),(3,"What is an element"),(3,"What is evaporation"),(3,"What is a condensation");

INSERT INTO answers (questions_id, answer1,answer2,answer3,answer4) VALUES (1,"2","4","5","3");

INSERT INTO answers (questions_id, answer1,answer2,answer3,answer4) VALUES (2,"2","8","10","4");

INSERT INTO answers (questions_id, answer1,answer2,answer3,answer4) VALUES (3,"5","6","20","3");

INSERT INTO answers (questions_id, answer1,answer2,answer3,answer4) VALUES (4,"8","19","21","4");

INSERT INTO answers (questions_id, answer1,answer2,answer3,answer4) VALUES (5,"Decriptive Word","Action Word","Pronoun","Adverb");

INSERT INTO answers (questions_id, answer1,answer2,answer3,answer4) VALUES (6,"Object","Action Word","Pronoun","Adverb");

INSERT INTO answers (questions_id, answer1,answer2,answer3,answer4) VALUES (7,"Descriptive Word","Action Word","Pronoun","Adverb");

INSERT INTO answers (questions_id, answer1,answer2,answer3,answer4) VALUES (8,"Object","Action Word","Represents a noun","Adverb");

INSERT INTO answers (questions_id, answer1,answer2,answer3,answer4) VALUES (9,"Study of Substances","Study of Behaviour","Study of People","Religion");

INSERT INTO answers (questions_id, answer1,answer2,answer3,answer4) VALUES (10,"Substance","Atom","Vapour","Titration");

INSERT INTO answers (questions_id, answer1,answer2,answer3,answer4) VALUES (11,"Titration","Substance to gas","Atom","Hydrogen Process");

INSERT INTO answers (questions_id, answer1,answer2,answer3,answer4) VALUES (12,"Gas to Liquid","Substance to gas","Liquidation","Fractional Distila");