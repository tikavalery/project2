CREATE DATABASE quiz_db;

USE quiz_db;

CREATE TABLE titles(
	title_id INT (10) AUTO_INCREMENT NOT NULL,
    title VARCHAR (100) NOT NULL,
    description VARCHAR (100) NOT NULL,
    PRIMARY KEY (title_id)
);

CREATE TABLE questions (
	questions_id INT (10) AUTO_INCREMENT NOT NULL,
    title_id INT(10),
    question VARCHAR (100) NOT NULL,
    PRIMARY KEY (questions_id)
);

CREATE TABLE answers (
	questions_id INT (10),
	answer1 VARCHAR (100) NOT NULL,
    answer2 VARCHAR (100) NOT NULL,
    answer3 VARCHAR (100) NOT NULL,
    answer4 VARCHAR (100) NOT NULL,
    title_id varchar(100),
    correct VARCHAR(100) NOT NULL
);

CREATE TABLE userresponse (
    timeid INT (100),
	response VARCHAR (100) NOT NULL,
	question_id VARCHAR(100) NOT NULL
    
	
);
