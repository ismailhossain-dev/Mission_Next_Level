```sql
-- 1. Query:
select match_id, fixture, cast(base_ticket_price as int) from Matches where tournament_category = 'Champions League' and match_status = 'Available';
```

```sql
-- 2. Query:
select user_id, full_name, email from Users where full_name ilike 'Tanvir%' or full_name ilike '%Haque%';
```

```sql
-- 3. Query:
select booking_id, user_id, match_id, coalesce(payment_status,'Action Required') as 
systematic_status from Bookings where payment_status is null;
```

```sql  
-- 4. Query:
select booking_id, full_name, fixture, cast(total_cost as int) from Users as u inner join Bookings as b on u.user_id = b.user_id 
inner join Matches as m on b.match_id = m.match_id;
```

```sql
-- 5. Query:
select u.user_id, full_name, booking_id from Users as u left join Bookings as b on u.user_id = b.user_id;
```

```sql
-- 6. Query:
select booking_id, match_id, cast(total_cost as int) from bookings where total_cost > (select avg(total_cost) from bookings);
```

```sql
-- 7. Query:
select match_id, fixture, cast(base_ticket_price as int) from matches order by base_ticket_price desc limit 2 offset 1;
```