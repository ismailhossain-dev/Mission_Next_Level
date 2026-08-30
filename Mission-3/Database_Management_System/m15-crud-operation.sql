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

create table users (
  id serial primary key, 
  username varchar(25) not null
)

  insert into users (username) values('sabbir'), ('abir'), ('mitu'), ('mirja');

create table posts (
  id serial primary key , 
  title text not null, 
  --foreign key most impornat
  --id type always int hoi
  user_id int references users(id)
);

--user_id must be user id sathe match takte hobe and jodi id matech na kore tahole insert hobe na eta relational er jonno most imporant
insert into posts (title, user_id)
values
  ('learning postgresql', 1),
  ('my first backend project', 4),
  ('introduction to javascript', 2),
  ('building a full stack application', 3);



--V:9 Understanding Inner Join most important!!!---
--ekane amra 2ta table teke join method use kore data niye aslam...
--after on akta condition set korchi
--join user kore 2ta table ke 
select posts.user_id, username, title from posts join users on posts.user_id = users.id;

--posts and table 2ta table er information eksathe dekbo
select * from posts join users on posts.user_id = users.id;

--as use for short name 

select * from posts as p join users as u on p.user_id = u.id; 


--V:10 Left Join Made Easy eta v:9 er join er moto kaj kore seem just data gola ekto ulat palot hoi

--jodi amra users id null dei posts table tahole amra join diye data get korle sei data dive na easy vabe bolle null value dei na
 select * from posts as p inner join users as u on p.user_id= u.id; 


--V: 11 Right & Full Join-------

--posts holo left join and users holo right join
select * from posts as p inner join users as u on p.user_id = u.id;

--users holo left table join and posts holo right join table--
select * from users as u left join posts as p on u.id = p.user_id;  

--right join er kaj holo user_id sathe data na match na korle o data nive and null value bosai dive posts table insert hobe
select * from users as u right join posts as p on u.id = p.user_id;  

--full join kaj kore  condition jegola mile ei data gola nive and condination na mille o data gola niye asbe and ekane null diye dive

select * from posts full join users on posts.user_id = users.id;