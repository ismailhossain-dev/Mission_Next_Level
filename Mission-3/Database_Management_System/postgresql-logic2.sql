--Advaced postgreSQL-----------
--create table ------
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    age INT,
    gender CHAR(1),
    course VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    dob DATE,
    blood_group VARCHAR(5),
    country VARCHAR(50)
);

--insert data
INSERT INTO students (  first_name,last_name, age, gender, course, email, dob, blood_group, country)
VALUES
('sabbir','ahmed',20, 'M', 'computer science', 'sabbir.ahmed@gmail.com', '2006-03-15', 'A+','bangladesh'),
('ismail','hossain', 21, 'M','software engineering','ismail.hossain@gmail.com','2005-07-22','B+','bangladesh'),
('nusrat','jahan',19,'F','business administration','nusrat.jahan@gmail.com','2007-01-10', 'O+','bangladesh'),
('rahim','uddin',22, 'M','electrical engineering','rahim.uddin@gmail.com','2004-11-05','AB+','india'),
('sadia', 'islam', 20, 'F', 'data science', 'sadia.islam@gmail.com', '2006-05-18', 'A-','bangladesh'),
('tanvir', 'hasan',23,'M','cyber security','tanvir.hasan@gmail.com','2003-08-27','B-','malaysia');

--get all data 
-- SELECT first_name, last_name FROM students;
SELECT * FROM students;

--get only first name and use Aliases 
SELECT first_name as "First Name" from students;


--drop table students;

--sorting using order by desc=> bro teke choto hobe age---------
select first_name, country,age,blood_group from students order by age desc;
--sorting choto teke hobe------------
select first_name, country,age,blood_group from students order by age asc;

--v:4 Distinct eta use korle ekta country 2 bar dive eta linke new set er moto kaj kore---

--easy vabe bolle duplicate value remove kore ----
select distinct country from students;
select distinct course from students;

--Filtering---
--amra just india country student ke bahir korboi ----
select first_name , age, course, country from students where country ='india';

--student er A+ blood gola amra bahir korbo 

select first_name, age, course, country, blood_group from students where blood_group = 'A+';


--V-5 Filtering with AND & OR
--OR operator--

-- bangladesh or idia country gola daw----
select * from students where country = 'bangladesh' or country ='india';

--AND  operators ekane mail kaj hitese gener M otoba F hole and computer science and data science hote hobe must be tokon result a pabo
select first_name, course, country, gender
from students
where (gender = 'M' OR gender = 'F')
and (course = 'computer science' OR course = 'data science');

--V-6 Comparison, BETWEEN & IN like > , < , = , !, !=

--select studer older than 20 

select * from students where age>=20;
select * from students where age<20;

--india data chara sob data daw---- 

--!= and <> eta o sem kaj kore not = er moto

select first_name, country from students where country != 'india';
select first_name, country from students where country <> 'bangladesh';

--between operator mane amra buji 2tar majamaji jei obostak takee take bole between 

--select students whose age is between 20 and 22.

select age from students where age between 20 and 23;

--uniqe age gola dekbo kono duplicate age dive na

select distinct age from students; 


--in operator jodi kew amake bole bangladesh otoba inda otaba malaysia etar jonno in use korbo
--❌
-- select * from students where country = 'bangladesh' or country ='india' or country = 'malaysia';

--✅ use in operator work as like or

select * from students where country in('bangladesh', 'india', 'malaysia');

--V:7 LIKE vs ILIKE------

--LIKE operator use hoi basically search er jonno like product search
----ekane first_name er ekane jegola s ache agola show korbe (most important)-----
select * from students where first_name like 's%';

--etar kaj holo nusrat name take ane dive mane n er por 4 ta word name takle eta pabo---
select first_name from students where first_name like 'n_____';

--etar kaj holo sese i takle ei name ta dekabe like sabbir , tanvir

select first_name from students where first_name like '%r';
select first_name from students; 

--V:8 NOT & Scalar Functions-------

--not mane holo bangaldesh chara sob country amake daw
select first_name , country from students where not country = 'bangladesh';

select blood_group from students where not blood_group='A+'

