create table employe (
  id serial, 
  name varchar (100),
  age int 
);

--2.rename table name 
alter table employe rename to employee;

--3. add new colum in employee

alter table employee add column email varchar(50)  unique;

--4.delete employee email colum

alter table employee delete column email; 

--6.rename colum name ---
alter table employee rename name to username;

--7.Modifying constraint menas type varchar change ---

alter table employee alter column username type varchar(50);

--8.add contraing type like add not null in colum

alter table employee alter column email set not null ;

--9.remove not null form sutdent colum
alter table employee alter column email drop not null;

--10.insert data 

insert into employee (username, age, email) values('sabbir',18, 'kalusa2@gmail.com' );

--11.user jodi mail na de tahole amra default vabe ekta email ser korbo alter er mardome 

alter table employee
alter column email
set default 'sabbir23@gmail.com';

--12.remove set defualt email from employee
alter table employee alter column email drop default;


--14.M:14 v:2 add uniq in email most important

alter table employee
add constraint unique_employee_email unique (email,id); --() ekane bole divo kotai uniqe bosate chai + id add korlam

--15. unique email remove
alter table employee drop constraint unique_employee_email ;

--16. table er id take ke primary key te convert korbo 
alter table employee add constraint pk_employee_id primary key(id);


select * from employee;



