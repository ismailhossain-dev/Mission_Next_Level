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
--eki kaj bar bar korte hole amra seta function er mardome kori 
--count(*) eta length er moto kaj kore
--ei function ta employee count bole dive 
create function emp_count()
returns bigint
language sql
  --ekane bolvo function er ki kaj korbo--
as
$$
  select count(*) from employee;
$$;

--function call ---
select emp_count(); --output 8

--delete employee data between function 

create function delete_emp_id(emp_id int)
returns void
language sql
as
$$
  delete from employee
  where id = emp_id;
$$;

select delete_emp_id(3);



select * from employee;


--V:6,7 Procedure Example 1--
--Procedure holo 80% function er moto  --
--Procedure kono kichu return kora lage na but function teke return kora lage so etotoko different

--delete one employee 
create procedure delete_emp_by_id(emp_id int) 
--plpgsql use korle begin end rakte hoi
language plpgsql --eknae amr sql o use korte partam
as
$$
  begin
  delete from employee where id = emp_id;
  end;
  
$$;

call delete_emp_by_id (3);


--procedure ere kaj holo low salary gola bahir kore 20% bariye dive

--env_salary is a variable
-- create procedure
create procedure increase_low_salary(department_name varchar(50))
language plpgsql
as
$$
begin

  -- নির্দিষ্ট department-এর salary 10% increase
  update employee
  set salary = salary * 1.10
  where department = department_name;

end;
$$;


-- hr department-এর salary 10% increase
call increase_low_salary('hr');


-- updated data দেখার জন্য
select *
from employee
where department = 'hr';

select * from employee;



--V:8,9 Trigger Example (most impornat )----

--Trigger ta kind of event listener er moto database kono action or operation gotle ei action er upor batch kore automatic trigger hobe

--eta kaj kore {BEFORE | AFTER | INSERT OF} {INSERT | UPDATE | TRUNCARE}
-- Ei function take amra bole dite parbo eta delete hower age arketa kaj koro

--Task-1 amra ekane emon  ekta kaj korbo jeno employee table teke kichu delete korle  seta kobe kokon delete hoyche seta save rakbo

--ei table er viror delete history save korbo
-- 1. employee delete log রাখার table
create table employee_logs (
  id serial primary key,
  emp_name varchar(50),
  action varchar(20)
);


-- 2. trigger function
create function log_employee_deletion()
returns trigger
language plpgsql
as
$$
begin

  insert into employee_logs (emp_name, action)
  values (old.name, 'delete');

  return old;

end;
$$;

--database/public/log_employee_deletion ei name ekta folder create hobe

-- 3. trigger create
create trigger save_employee_delete_logs
after delete on employee
for each row
execute function log_employee_deletion();


-- 4. employee delete
delete from employee
where id = 3;


-- 5. delete log check
select * from employee_logs; --most important successfully done--





--V:10 Indexing Explained--
--Indexing holo kind of amra jokon ekta book open kori sekane ekta sochipotro deki ekane bole deya take kon page ki story takbe so etai holo Indexing

--indexing choto table kora valo jakene 1-2 lak data takbe sekane indexing ta kora dorkar-

--EXPLAIN ANALYSE eta diye amra dekbo indexing excute hote koto time lage

--eta eta use korar por 10% speed hoye gese 
create index idx_users_email on users (email) on users(email)

--✅✅✅ performance 10% speed
EXPLAIN ANALYSE 
select * from users where email='sabbirvai69k@gmail.com';