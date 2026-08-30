--V:1 Practice SQL with Mentor - Part 1
CREATE TABLE employee (
  employee_id SERIAL PRIMARY KEY,
  employee_name VARCHAR(50),
  --eta must be deparment table id sathe match takte hobe
  department_id INT REFERENCES departments(department_id),
  --mane . er por 2 ta number nive
  salary DECIMAL(10, 2),
  hire_date DATE
);

INSERT INTO employee(employee_name ,department_id, salary, hire_date ) 
  values('sabbir ahmed', 1, 35000.00, '2022-01-15'),
  ('ismail hossain', 2, 45000.00, '2022-03-20'),
  ('rahim uddin', 3, 55000.00, '2021-07-10'),
  ('nusrat jahan', 4, 40000.00, '2023-01-05'),
  ('tanvir hasan', 5, 38000.00, '2022-09-12'),
  ('sadia islam', 6, 42000.00, '2023-04-18'),
  ('farhan karim', 7, 36000.00, '2021-11-25'),
  ('mim akter', 8, 60000.00, '2020-06-30'),
  ('arif hossain', 9, 48000.00, '2022-12-01'),
  ('jannat sultana', 10, 37000.00, '2023-08-15');

CREATE TABLE departments (
  department_id SERIAL PRIMARY KEY,
  department_name VARCHAR(50)
)


INSERT INTO  departments (department_name) values('human resources'),
  ('information technology'),
  ('finance'),
  ('marketing'),
  ('sales'),
  ('operations'),
  ('customer service'),
  ('research and development'),
  ('accounting'),
  ('administration');

SELECT * FROM departments; 

--task-1 INNER Join to Retrieve Employee and Department Information

select * from employee as e join departments as d on e.department_id = d.department_id; -- complete task one
select departments.department_name, employee.salary from employee join departments on employee.department_id =departments.department_id;
--get data easy way 
select * from employee join departments using(department_id)


--V:2 Practice SQL with Mentor - Part 2
--task-2 Show Department Name With employee Avarage Salary
--group use korle select por * use kora jai na
--condition korchi department_name er mardome
select department_name, round(avg(salary)) from departments
join employee on 
departments.department_id = employee.department_id group by departments.department_name;


--task-3 count employee in each department

--get 2 table data
select * from employee join departments on employee.employee_id = departments.department_id; 

--count department employee

select department_name, count(*) from employee join departments on employee.employee_id = departments.department_id group by departments.department_name;

--task-4 find the deparment name with the highest salary 

select department_name, salary from employee join departments on employee.department_id = departments.department_id
order by salary desc limit 1;




select employee_name, avg(hire_date) from  employee group by hire_date;

--V:3 Practice SQL with Mentor - Part 3

--task-5 Count Employee Hired Each Year

--just data gola alada korchi

select extract(year from hire_date) as hired_year, count(*) from employee group by hired_year;