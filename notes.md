## RDBMS

- PostgreSQL
- Oracle
- MySQL
- SQL Server
- SQLite3

## Non-Relational Data Bases

- Cassandra
- MongoDB
- Redis
- Neo4J

## Using Knex

- npm i knex
- npm i sqlite3

## SQL Queries

-- list of the suppliers for the USA, Japan and UK
SELECT \* FROM [Suppliers]
WHERE Country = 'USA' or Country = 'Japan' or Country = 'UK';

SELECT \* FROM [Suppliers]
WHERE Country in ('USA', 'Japan','UK')
ORDER BY Country desc;

-- the first 10 customers organized by the ID
select \* from customers order by customerId limit 10;

-- Add a new shipper
INSERT INTO Shippers ('ShipperName', 'Phone')VALUES ('LS Shipping', '(212) 222-1212');

-- Add a new shipper
INSERT INTO Shippers ('ShipperName', 'Phone')VALUES ('LS Shipping', '(212) 222-1212');

--Update shippers first run a query to check id is there
select \* from Shippers where shipperId = 4
-- then
UPDATE Shippers SET ShipperName = 'Lambda Shippers', Phone = '(800) 333-3333' WHERE ShipperId = 4;
