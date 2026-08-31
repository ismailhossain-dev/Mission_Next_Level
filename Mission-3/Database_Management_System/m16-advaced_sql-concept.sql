--V:4 Subquery Basics

--ekta query  morde arekta query leke ke bole subquery
create table employee (
  id serial primary key,
  name varchar(50),
  department varchar(50),
  salary int
)

insert into employee(name, department, salary) values 
('sabbir ahmed', 'it', 55000),
  ('ismail hossain', 'hr', 45000),
  ('rahim uddin', 'finance', 60000),
  ('nusrat jahan', 'marketing', 50000),
  ('sadia islam', 'it', 65000),
  ('tanvir hasan', 'sales', 40000),
  ('mim akter', 'hr', 48000),
  ('arif hossain', 'finance', 70000);

--Task-1 : Find Highest salary--
select max(salary) from employee; 


--Task-2 : Find which employee gets the highest salary use Subquery
--ekane ekta query vitor arekta query use korchi and eta ke bole subquery
select * from employee where salary = (select max(salary) from employee); --output 


--Task-3 : Find employee who earn more than the average salary--
--ekane boloe avarage salary te kon employee besi income kore-

select * from employee where salary > (select avg(salary) from employee);


--Task-4 Name of the employee who gets the highest salary in HR department
select * from employee where salary = (
  select max(salary) from employee where department = 'hr'
); --48000


--V:5 Functions Explained

--Postgres e amra bibinno donore extension use korte pari install kore kore (most important)
--count(*) eta length er moto kaj kore
select count(*) from employee;
create function emp_count ()

return type; --funtion er type ta return kore dite hoi function create korar sathe sathe
language sql 
as
$$
  select count(*) from employee;
$$


