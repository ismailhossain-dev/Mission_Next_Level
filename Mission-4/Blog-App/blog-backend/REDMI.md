<!-- What is Traction & Rollback  -->

## Transaction

A Transaction is a group of database queries that are treated as a single unit.

- যদি Transaction-এর মধ্যে থাকা সবগুলো query সফল হয়, তাহলে সব changes একসাথে database-এ apply হবে।
- আর কোনো একটি query ব্যর্থ হলে কোনো changes-ই database-এ apply হবে না।

## Rollback

কোনো একটি query ব্যর্থ হলে Transaction-এর মধ্যে এর আগে সফলভাবে execute হওয়া সব query-এর changes বাতিল করে database-কে আগের অবস্থায় ফিরিয়ে নেওয়াকে Rollback বলে।

### সহজভাবে মনে রাখার উপায়

- **Transaction** → সব query সফল হলে সব changes হবে, নাহলে কিছুই হবে না।
- **Rollback** → কোনো সমস্যা হলে আগের অবস্থায় ফিরে যাওয়া।
