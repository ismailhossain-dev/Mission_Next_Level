--task-1
create table customers (
  customer_id serial primary key,
  first_name varchar(50) not null,
  last_name varchar(50) not null,
  email varchar(100) unique,
  city varchar(50),
  country varchar(50),
  registration_date date
);

--task-2

create table books (
  book_id serial primary key,
  title varchar(200),
  author varchar(100),
  genre varchar(50),
  price numeric(10, 2), --mane holo ekane price 10 ta nive . soho
  publication_year int,
  stock_quantity int
  );

--task-3

create table orders (
  order_id serial primary key,
--customer id sathe relation kora hoyche
  customer_id int references customers(customer_id),
  book_id int references books(book_id),
  order_date date,
  quantity int,
  total_amount numeric(10,2)
)

---task-4 insert customer data
insert into customers (
  first_name,
  last_name,
  email,
  city,
  country,
  registration_date
)
values
  ('John', 'Smith', 'john.smith@email.com', 'York', 'USA', '2023-01-15'),
  ('Emma', 'Johnson', 'emma.j@email.com', 'London', 'UK', '2023-02-20'),
  ('Michael', 'Brown', 'mbrown@email.com', 'Toronto', 'Canada', '2023-01-10'),
  ('Sophia', 'Davis', 'sophia.d@email.com', 'Sydney', 'Australia', '2023-03-05'),
  ('Oliver', 'Taylor', 'oliver.t@email.com', 'London', 'UK', '2023-04-12'),
  ('James', 'Wilson', 'jwilson@email.com', 'New York', 'USA', '2023-02-28'),
  ('Ava', 'Anderson', 'ava.anderson@email.com', 'Los Angeles', 'USA', '2023-03-18'),
  ('William', 'Martinez', 'w.martinez@email.com', 'Madrid', 'Spain', '2023-01-25'),
  ('Isabella', 'Garcia', 'isabella.g@email.com', 'Mexico City', 'Mexico', '2023-02-14'),
  ('Lucas', 'Rodriguez', 'lucas.r@email.com', 'Buenos Aires', 'Argentina', '2023-03-30');
  
  select * from customers; 

--task 5
insert into books(
  title, 
  author,
  genre, 
  price,
  publication_year,
  stock_quantity
) values
  ('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', '12.99', '1925', '45'),
  ('To KIll a Mockingbrid', 'Harper Lee', 'Fiction', '13.99', '1925', '45')

select * from books;


--task-5 insert orders data 

insert into orders (
  customer_id,
  book_id,
  order_date,
  quantity,
  total_amount
)
values (1,1,'2023-05-10',2,25.98);


select * from orders; 