--M-15 PostgreSQL Essentials--
--v:1 Handling NULL With COALESCE---
--create table---
create table students (
    student_id serial primary key,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    age int,
    gender char(2),
    course varchar(50),
    email varchar(100) unique,
    dob date,
    blood_group varchar(5),
    country varchar(50)
);

--null er value kono true hoi na
select true  = true; 

select null <> null; 

--❌ekne amra find korchi jegola value null na but postgreSQL konono null value true hoi na
select * from students where email <> null;

--✅ use is operator jei studene er email takbe na sei student ke find korchi
select * from students where email is null; 
-----ekane find korchi jei student er email ache tader ke -------
select * from students where email is not null; 

--coalesce function eta sob argument chek kore and first argument return kore like 5 and null ariye jabe
select coalesce(null, null , 5, 3, 4);
--coalesce er mardome default value se kore dite pari and null ekane Not provided set hoye jabe (important)
select coalesce(email, 'Not provided') from students ; 




--V:2 LIMIT, OFFSET Pagination (important)------

select * from students limit 2; 

--etar mane holo first 2 ta data bad diye 3ta data daw
select * from students limit 3 offset 2; 

--most important pagination mane holo ekta page e 2ta kore data 4ta page 8 ta data dekte chai tahole use korbo 
--1 teke start hobe
select * from students limit 2  offset 2 * 0;
select * from students limit 2  offset 2 * 1;
select * from students limit 2  offset 2 * 2;
select * from students limit 2  offset 2 * 3;





--V:3 Updating Data (most important)

select * from students ;

--jar email nai sekane hello@gmailc.om ta set korbo 
update students set email ='hello@gmail.com' where email is null;

--sabbir name take change kore sabbir vai korchi---
update students
set first_name = 'sabbir vai'
where student_id = 1;

--blood_group A+ e convert kore dilam----
update students set blood_group ='A+' where first_name = 'sumaiya';

--mutiple value update ---
update students set last_name = 'khan', course='Full Stack Developer', age = 25 where first_name = 'arif';

select * from students; 

--2ta student er blood_group update korbo ---
update students set blood_group = 'O+' where first_name in ('sadia', 'tanvir');




--v:4 Deleting Data-----


--delete er kaj hobe as like update er moto ---------
--mehedi name er data ta delete korchi
delete from students where first_name = 'mehedi';

delete from students where blood_group= 'AB+';

select first_name, blood_group, age from students; 
---all data delete 
-- delete from students; 


--muliple student data delete use and operator---

delete from students where age = 20 and blood_group = 'AB-';
select * from students; --success


select age from students where age=20 and blood_group= 'AB-';




--V:5 GROUP BY Explained eta bascially data get er jonno use hoi---
--group by just ekta data retunr kore ----
--get country name  
--ekane amra dekchi country avarage age like 35/2 = 17.5;
select country,  avg(age) from students group by country;

--check kon country kotojon student ache---

--(*) eta mane hole row gola dive--
select country, count(*) from students group by country; 



--V:6 GROUP BY With HAVING----

--- group by er sathe filtering sikvo---

--amra ekane get korchi jei student gola 1tar besi course korche tader ke 
select course, count(*)
from students
group by course
having count(*) > 1;

--countries where avarage student age is grater than 21

select country, avg(age) from students group by country having avg(age) > 20; 
