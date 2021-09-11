/*
 * Converted by ned@appacademy.io from
 * http://exaples.oreilly.co/9780596007270/LearningSQLExaple.sql
 *
 * This doesn't follow all the conventions we'll learn, because we
 * didn't write it; this is a port of code provided by the Learning SQL
 * author.
 */
/* begin table creation */
CREATE TABLE department (
  dept_id serial,
  name varchar(20) NOT NULL,
  CONSTRAINT pk_department PRIMARY KEY (dept_id)
);

CREATE TABLE branch (
  branch_id serial,
  name varchar(20) NOT NULL,
  address varchar(30),
  city varchar(20),
  state varchar(2),
  zip varchar(12),
  CONSTRAINT pk_branch PRIMARY KEY (branch_id)
);

CREATE TABLE employee (
  emp_id serial,
  fname varchar(20) NOT NULL,
  lname varchar(20) NOT NULL,
  start_date date NOT NULL,
  end_date date,
  superior_emp_id integer,
  dept_id integer,
  title varchar(20),
  assigned_branch_id integer,
  CONSTRAINT fk_e_emp_id FOREIGN KEY (superior_emp_id) REFERENCES employee (emp_id),
  CONSTRAINT fk_dept_id FOREIGN KEY (dept_id) REFERENCES department (dept_id),
  CONSTRAINT fk_e_branch_id FOREIGN KEY (assigned_branch_id) REFERENCES branch (branch_id),
  CONSTRAINT pk_employee PRIMARY KEY (emp_id)
);

CREATE TABLE product_type (
  product_type_cd varchar(10) NOT NULL,
  name varchar(50) NOT NULL,
  CONSTRAINT pk_product_type PRIMARY KEY (product_type_cd)
);

CREATE TABLE product (
  product_cd varchar(10) NOT NULL,
  name varchar(50) NOT NULL,
  product_type_cd varchar(10) NOT NULL,
  date_offered date,
  date_retired date,
  CONSTRAINT fk_product_type_cd FOREIGN KEY (product_type_cd) REFERENCES product_type (product_type_cd),
  CONSTRAINT pk_product PRIMARY KEY (product_cd)
);

CREATE TYPE customer_type AS ENUM ( 'I',
  'B'
);

CREATE TABLE customer (
  cust_id serial,
  fed_id varchar(12) NOT NULL,
  cust_type_cd customer_type NOT NULL,
  address varchar(30),
  city varchar(20),
  state varchar(20),
  postal_code varchar(10),
  CONSTRAINT pk_customer PRIMARY KEY (cust_id)
);

CREATE TABLE individual (
  cust_id integer NOT NULL,
  fname varchar(30) NOT NULL,
  lname varchar(30) NOT NULL,
  birth_date date,
  CONSTRAINT fk_i_cust_id FOREIGN KEY (cust_id) REFERENCES customer (cust_id),
  CONSTRAINT pk_individual PRIMARY KEY (cust_id)
);

CREATE TABLE business (
  cust_id integer NOT NULL,
  name varchar(40) NOT NULL,
  state_id varchar(10) NOT NULL,
  incorp_date date,
  CONSTRAINT fk_b_cust_id FOREIGN KEY (cust_id) REFERENCES customer (cust_id),
  CONSTRAINT pk_business PRIMARY KEY (cust_id)
);

CREATE TABLE officer (
  officer_id serial,
  cust_id integer NOT NULL,
  fname varchar(30) NOT NULL,
  lname varchar(30) NOT NULL,
  title varchar(20),
  start_date date NOT NULL,
  end_date date,
  CONSTRAINT fk_o_cust_id FOREIGN KEY (cust_id) REFERENCES business (cust_id),
  CONSTRAINT pk_officer PRIMARY KEY (officer_id)
);

CREATE TYPE account_status AS ENUM ( 'ACTIVE',
  'CLOSED',
  'FROZEN'
);

CREATE TABLE account (
  account_id serial,
  product_cd varchar(10) NOT NULL,
  cust_id integer NOT NULL,
  open_date date NOT NULL,
  close_date date,
  last_activity_date date,
  status account_status,
  open_branch_id integer,
  open_emp_id integer,
  avail_balance float,
  pending_balance float,
  CONSTRAINT fk_product_cd FOREIGN KEY (product_cd) REFERENCES product (product_cd),
  CONSTRAINT fk_a_cust_id FOREIGN KEY (cust_id) REFERENCES customer (cust_id),
  CONSTRAINT fk_a_branch_id FOREIGN KEY (open_branch_id) REFERENCES branch (branch_id),
  CONSTRAINT fk_a_emp_id FOREIGN KEY (open_emp_id) REFERENCES employee (emp_id),
  CONSTRAINT pk_account PRIMARY KEY (account_id)
);

CREATE TYPE transaction_type AS ENUM ( 'DBT',
  'CDT'
);

CREATE TABLE TRANSACTION (
  txn_id serial,
  txn_date timestamp NOT NULL,
  account_id integer NOT NULL,
  txn_type_cd transaction_type,
  amount float NOT NULL,
  teller_emp_id integer,
  execution_branch_id integer,
  funds_avail_date timestamp,
  CONSTRAINT fk_t_account_id FOREIGN KEY (account_id) REFERENCES account (account_id),
  CONSTRAINT fk_teller_emp_id FOREIGN KEY (teller_emp_id) REFERENCES employee (emp_id),
  CONSTRAINT fk_exec_branch_id FOREIGN KEY (execution_branch_id) REFERENCES branch (branch_id),
  CONSTRAINT pk_transaction PRIMARY KEY (txn_id)
);

/* end table creation */
/* begin data population */
/* department data */
INSERT INTO department (name)
    VALUES ('Operations');
INSERT INTO department (name)
    VALUES ('Loans');
INSERT INTO department (name)
    VALUES ('Administration');
/* branch data */
INSERT INTO branch (name, address, city, state, zip)
    VALUES ('Headquarters', '3882 Main St.', 'Waltham', 'MA', '02451');
INSERT INTO branch (name, address, city, state, zip)
    VALUES ('Woburn Branch', '422 Maple St.', 'Woburn', 'MA', '01801');
INSERT INTO branch (name, address, city, state, zip)
    VALUES ('Quincy Branch', '125 Presidential Way', 'Quincy', 'MA', '02169');
INSERT INTO branch (name, address, city, state, zip)
    VALUES ('So. NH Branch', '378 Maynard Ln.', 'Salem', 'NH', '03079');
/* employee data */
INSERT INTO employee (fname, lname, start_date, dept_id, title, assigned_branch_id)
    VALUES ('Michael', 'Smith', to_date('2005-06-22', 'YYYY-MM-DD'), (
        SELECT
          dept_id
        FROM
          department
        WHERE
          name = 'Administration'), 'President', (
          SELECT
            branch_id
          FROM
            branch
          WHERE
            name = 'Headquarters'));
INSERT INTO employee (fname, lname, start_date, dept_id, title, assigned_branch_id)
    VALUES ('Susan', 'Barker', to_date('2006-09-12', 'YYYY-MM-DD'), (
        SELECT
          dept_id
        FROM
          department
        WHERE
          name = 'Administration'), 'Vice President', (
          SELECT
            branch_id
          FROM
            branch
          WHERE
            name = 'Headquarters'));
INSERT INTO employee (fname, lname, start_date, dept_id, title, assigned_branch_id)
    VALUES ('Robert', 'Tyler', to_date('2005-02-09', 'YYYY-MM-DD'), (
        SELECT
          dept_id
        FROM
          department
        WHERE
          name = 'Administration'), 'Treasurer', (
          SELECT
            branch_id
          FROM
            branch
          WHERE
            name = 'Headquarters'));
INSERT INTO employee (fname, lname, start_date, dept_id, title, assigned_branch_id)
    VALUES ('Susan', 'Hawthorne', to_date('2006-04-24', 'YYYY-MM-DD'), (
        SELECT
          dept_id
        FROM
          department
        WHERE
          name = 'Operations'), 'Operations Manager', (
          SELECT
            branch_id
          FROM
            branch
          WHERE
            name = 'Headquarters'));
INSERT INTO employee (fname, lname, start_date, dept_id, title, assigned_branch_id)
    VALUES ('John', 'Gooding', to_date('2007-11-14', 'YYYY-MM-DD'), (
        SELECT
          dept_id
        FROM
          department
        WHERE
          name = 'Loans'), 'Loan Manager', (
          SELECT
            branch_id
          FROM
            branch
          WHERE
            name = 'Headquarters'));
INSERT INTO employee (fname, lname, start_date, dept_id, title, assigned_branch_id)
    VALUES ('Helen', 'Fleming', to_date('2008-03-17', 'YYYY-MM-DD'), (
        SELECT
          dept_id
        FROM
          department
        WHERE
          name = 'Operations'), 'Head Teller', (
          SELECT
            branch_id
          FROM
            branch
          WHERE
            name = 'Headquarters'));
INSERT INTO employee (fname, lname, start_date, dept_id, title, assigned_branch_id)
    VALUES ('Chris', 'Tucker', to_date('2008-09-15', 'YYYY-MM-DD'), (
        SELECT
          dept_id
        FROM
          department
        WHERE
          name = 'Operations'), 'Teller', (
          SELECT
            branch_id
          FROM
            branch
          WHERE
            name = 'Headquarters'));
INSERT INTO employee (fname, lname, start_date, dept_id, title, assigned_branch_id)
    VALUES ('Sarah', 'Parker', to_date('2006-12-02', 'YYYY-MM-DD'), (
        SELECT
          dept_id
        FROM
          department
        WHERE
          name = 'Operations'), 'Teller', (
          SELECT
            branch_id
          FROM
            branch
          WHERE
            name = 'Headquarters'));
INSERT INTO employee (fname, lname, start_date, dept_id, title, assigned_branch_id)
    VALUES ('Jane', 'Grossman', to_date('2006-05-03', 'YYYY-MM-DD'), (
        SELECT
          dept_id
        FROM
          department
        WHERE
          name = 'Operations'), 'Teller', (
          SELECT
            branch_id
          FROM
            branch
          WHERE
            name = 'Headquarters'));
INSERT INTO employee (fname, lname, start_date, dept_id, title, assigned_branch_id)
    VALUES ('Paula', 'Roberts', to_date('2006-07-27', 'YYYY-MM-DD'), (
        SELECT
          dept_id
        FROM
          department
        WHERE
          name = 'Operations'), 'Head Teller', (
          SELECT
            branch_id
          FROM
            branch
          WHERE
            name = 'Woburn Branch'));
INSERT INTO employee (fname, lname, start_date, dept_id, title, assigned_branch_id)
    VALUES ('Thomas', 'Ziegler', to_date('2004-10-23', 'YYYY-MM-DD'), (
        SELECT
          dept_id
        FROM
          department
        WHERE
          name = 'Operations'), 'Teller', (
          SELECT
            branch_id
          FROM
            branch
          WHERE
            name = 'Woburn Branch'));
INSERT INTO employee (fname, lname, start_date, dept_id, title, assigned_branch_id)
    VALUES ('Samantha', 'Jameson', to_date('2007-01-08', 'YYYY-MM-DD'), (
        SELECT
          dept_id
        FROM
          department
        WHERE
          name = 'Operations'), 'Teller', (
          SELECT
            branch_id
          FROM
            branch
          WHERE
            name = 'Woburn Branch'));
INSERT INTO employee (fname, lname, start_date, dept_id, title, assigned_branch_id)
    VALUES ('John', 'Blake', to_date('2004-05-11', 'YYYY-MM-DD'), (
        SELECT
          dept_id
        FROM
          department
        WHERE
          name = 'Operations'), 'Head Teller', (
          SELECT
            branch_id
          FROM
            branch
          WHERE
            name = 'Quincy Branch'));
INSERT INTO employee (fname, lname, start_date, dept_id, title, assigned_branch_id)
    VALUES ('Cindy', 'Mason', to_date('2006-08-09', 'YYYY-MM-DD'), (
        SELECT
          dept_id
        FROM
          department
        WHERE
          name = 'Operations'), 'Teller', (
          SELECT
            branch_id
          FROM
            branch
          WHERE
            name = 'Quincy Branch'));
INSERT INTO employee (fname, lname, start_date, dept_id, title, assigned_branch_id)
    VALUES ('Frank', 'Portman', to_date('2007-04-01', 'YYYY-MM-DD'), (
        SELECT
          dept_id
        FROM
          department
        WHERE
          name = 'Operations'), 'Teller', (
          SELECT
            branch_id
          FROM
            branch
          WHERE
            name = 'Quincy Branch'));
INSERT INTO employee (fname, lname, start_date, dept_id, title, assigned_branch_id)
    VALUES ('Theresa', 'Markham', to_date('2005-03-15', 'YYYY-MM-DD'), (
        SELECT
          dept_id
        FROM
          department
        WHERE
          name = 'Operations'), 'Head Teller', (
          SELECT
            branch_id
          FROM
            branch
          WHERE
            name = 'So. NH Branch'));
INSERT INTO employee (fname, lname, start_date, dept_id, title, assigned_branch_id)
    VALUES ('Beth', 'Fowler', to_date('2006-06-29', 'YYYY-MM-DD'), (
        SELECT
          dept_id
        FROM
          department
        WHERE
          name = 'Operations'), 'Teller', (
          SELECT
            branch_id
          FROM
            branch
          WHERE
            name = 'So. NH Branch'));
INSERT INTO employee (fname, lname, start_date, dept_id, title, assigned_branch_id)
    VALUES ('Rick', 'Tulman', to_date('2006-12-12', 'YYYY-MM-DD'), (
        SELECT
          dept_id
        FROM
          department
        WHERE
          name = 'Operations'), 'Teller', (
          SELECT
            branch_id
          FROM
            branch
          WHERE
            name = 'So. NH Branch'));
/* create data for self-referencing foreign key 'superior_emp_id' */
CREATE TEMPORARY TABLE emp_tmp AS
SELECT
  emp_id,
  fname,
  lname
FROM
  employee;

UPDATE
  employee
SET
  superior_emp_id = (
    SELECT
      emp_id
    FROM
      emp_tmp
    WHERE
      lname = 'Smith'
      AND fname = 'Michael')
  WHERE ((lname = 'Barker'
      AND fname = 'Susan')
    OR (lname = 'Tyler'
      AND fname = 'Robert'));

UPDATE
  employee
SET
  superior_emp_id = (
    SELECT
      emp_id
    FROM
      emp_tmp
    WHERE
      lname = 'Tyler'
      AND fname = 'Robert')
  WHERE
    lname = 'Hawthorne'
    AND fname = 'Susan';

UPDATE
  employee
SET
  superior_emp_id = (
    SELECT
      emp_id
    FROM
      emp_tmp
    WHERE
      lname = 'Hawthorne'
      AND fname = 'Susan')
  WHERE ((lname = 'Gooding'
      AND fname = 'John')
    OR (lname = 'Fleming'
      AND fname = 'Helen')
    OR (lname = 'Roberts'
      AND fname = 'Paula')
    OR (lname = 'Blake'
      AND fname = 'John')
    OR (lname = 'Markham'
      AND fname = 'Theresa'));

UPDATE
  employee
SET
  superior_emp_id = (
    SELECT
      emp_id
    FROM
      emp_tmp
    WHERE
      lname = 'Fleming'
      AND fname = 'Helen')
  WHERE ((lname = 'Tucker'
      AND fname = 'Chris')
    OR (lname = 'Parker'
      AND fname = 'Sarah')
    OR (lname = 'Grossman'
      AND fname = 'Jane'));

UPDATE
  employee
SET
  superior_emp_id = (
    SELECT
      emp_id
    FROM
      emp_tmp
    WHERE
      lname = 'Roberts'
      AND fname = 'Paula')
  WHERE ((lname = 'Ziegler'
      AND fname = 'Thomas')
    OR (lname = 'Jameson'
      AND fname = 'Samantha'));

UPDATE
  employee
SET
  superior_emp_id = (
    SELECT
      emp_id
    FROM
      emp_tmp
    WHERE
      lname = 'Blake'
      AND fname = 'John')
  WHERE ((lname = 'Mason'
      AND fname = 'Cindy')
    OR (lname = 'Portman'
      AND fname = 'Frank'));

UPDATE
  employee
SET
  superior_emp_id = (
    SELECT
      emp_id
    FROM
      emp_tmp
    WHERE
      lname = 'Markham'
      AND fname = 'Theresa')
  WHERE ((lname = 'Fowler'
      AND fname = 'Beth')
    OR (lname = 'Tulman'
      AND fname = 'Rick'));

DROP TABLE emp_tmp;

/* product type data */
INSERT INTO product_type (product_type_cd, name)
    VALUES ('ACCOUNT', 'Customer Accounts');
INSERT INTO product_type (product_type_cd, name)
    VALUES ('LOAN', 'Individual and Business Loans');
INSERT INTO product_type (product_type_cd, name)
    VALUES ('INSURANCE', 'Insurance Offerings');
/* product data */
INSERT INTO product (product_cd, name, product_type_cd, date_offered)
    VALUES ('CHK', 'checking account', 'ACCOUNT', to_date('2004-01-01', 'YYYY-MM-DD'));
INSERT INTO product (product_cd, name, product_type_cd, date_offered)
    VALUES ('SAV', 'savings account', 'ACCOUNT', to_date('2004-01-01', 'YYYY-MM-DD'));
INSERT INTO product (product_cd, name, product_type_cd, date_offered)
    VALUES ('MM', 'money market account', 'ACCOUNT', to_date('2004-01-01', 'YYYY-MM-DD'));
INSERT INTO product (product_cd, name, product_type_cd, date_offered)
    VALUES ('CD', 'certificate of deposit', 'ACCOUNT', to_date('2004-01-01', 'YYYY-MM-DD'));
INSERT INTO product (product_cd, name, product_type_cd, date_offered)
    VALUES ('MRT', 'home mortgage', 'LOAN', to_date('2004-01-01', 'YYYY-MM-DD'));
INSERT INTO product (product_cd, name, product_type_cd, date_offered)
    VALUES ('AUT', 'auto loan', 'LOAN', to_date('2004-01-01', 'YYYY-MM-DD'));
INSERT INTO product (product_cd, name, product_type_cd, date_offered)
    VALUES ('BUS', 'business line of credit', 'LOAN', to_date('2004-01-01', 'YYYY-MM-DD'));
INSERT INTO product (product_cd, name, product_type_cd, date_offered)
    VALUES ('SBL', 'small business loan', 'LOAN', to_date('2004-01-01', 'YYYY-MM-DD'));
/* residential customer data */
INSERT INTO customer (fed_id, cust_type_cd, address, city, state, postal_code)
    VALUES ('111-11-1111', 'I', '47 Mockingbird Ln', 'Lynnfield', 'MA', '01940');
INSERT INTO individual (cust_id, fname, lname, birth_date)
SELECT
  cust_id,
  'James',
  'Hadley',
  '1972-04-22'
FROM
  customer
WHERE
  fed_id = '111-11-1111';

INSERT INTO customer (fed_id, cust_type_cd, address, city, state, postal_code)
    VALUES ('222-22-2222', 'I', '372 Clearwater Blvd', 'Woburn', 'MA', '01801');
INSERT INTO individual (cust_id, fname, lname, birth_date)
SELECT
  cust_id,
  'Susan',
  'Tingley',
  '1968-08-15'
FROM
  customer
WHERE
  fed_id = '222-22-2222';

INSERT INTO customer (fed_id, cust_type_cd, address, city, state, postal_code)
    VALUES ('333-33-3333', 'I', '18 Jessup Rd', 'Quincy', 'MA', '02169');
INSERT INTO individual (cust_id, fname, lname, birth_date)
SELECT
  cust_id,
  'Frank',
  'Tucker',
  '1958-02-06'
FROM
  customer
WHERE
  fed_id = '333-33-3333';

INSERT INTO customer (fed_id, cust_type_cd, address, city, state, postal_code)
    VALUES ('444-44-4444', 'I', '12 Buchanan Ln', 'Waltham', 'MA', '02451');
INSERT INTO individual (cust_id, fname, lname, birth_date)
SELECT
  cust_id,
  'John',
  'Hayward',
  '1966-12-22'
FROM
  customer
WHERE
  fed_id = '444-44-4444';

INSERT INTO customer (fed_id, cust_type_cd, address, city, state, postal_code)
    VALUES ('555-55-5555', 'I', '2341 Main St', 'Salem', 'NH', '03079');
INSERT INTO individual (cust_id, fname, lname, birth_date)
SELECT
  cust_id,
  'Charles',
  'Frasier',
  '1971-08-25'
FROM
  customer
WHERE
  fed_id = '555-55-5555';

INSERT INTO customer (fed_id, cust_type_cd, address, city, state, postal_code)
    VALUES ('666-66-6666', 'I', '12 Blaylock Ln', 'Waltham', 'MA', '02451');
INSERT INTO individual (cust_id, fname, lname, birth_date)
SELECT
  cust_id,
  'John',
  'Spencer',
  '1962-09-14'
FROM
  customer
WHERE
  fed_id = '666-66-6666';

INSERT INTO customer (fed_id, cust_type_cd, address, city, state, postal_code)
    VALUES ('777-77-7777', 'I', '29 Admiral Ln', 'Wilmington', 'MA', '01887');
INSERT INTO individual (cust_id, fname, lname, birth_date)
SELECT
  cust_id,
  'Margaret',
  'Young',
  '1947-03-19'
FROM
  customer
WHERE
  fed_id = '777-77-7777';

INSERT INTO customer (fed_id, cust_type_cd, address, city, state, postal_code)
    VALUES ('888-88-8888', 'I', '472 Freedom Rd', 'Salem', 'NH', '03079');
INSERT INTO individual (cust_id, fname, lname, birth_date)
SELECT
  cust_id,
  'Louis',
  'Blake',
  '1977-07-01'
FROM
  customer
WHERE
  fed_id = '888-88-8888';

INSERT INTO customer (fed_id, cust_type_cd, address, city, state, postal_code)
    VALUES ('999-99-9999', 'I', '29 Maple St', 'Newton', 'MA', '02458');
INSERT INTO individual (cust_id, fname, lname, birth_date)
SELECT
  cust_id,
  'Richard',
  'Farley',
  '1968-06-16'
FROM
  customer
WHERE
  fed_id = '999-99-9999';

/* corporate customer data */
INSERT INTO customer (fed_id, cust_type_cd, address, city, state, postal_code)
    VALUES ('04-1111111', 'B', '7 Industrial Way', 'Salem', 'NH', '03079');
INSERT INTO business (cust_id, name, state_id, incorp_date)
SELECT
  cust_id,
  'Chilton Engineering',
  '12-345-678',
  '1999-05-01'
FROM
  customer
WHERE
  fed_id = '04-1111111';

INSERT INTO officer (cust_id, fname, lname, title, start_date)
SELECT
  cust_id,
  'John',
  'Chilton',
  'President',
  '1999-05-01'
FROM
  customer
WHERE
  fed_id = '04-1111111';

INSERT INTO customer (fed_id, cust_type_cd, address, city, state, postal_code)
    VALUES ('04-2222222', 'B', '287A Corporate Ave', 'Wilmington', 'MA', '01887');
INSERT INTO business (cust_id, name, state_id, incorp_date)
SELECT
  cust_id,
  'Northeast Cooling Inc.',
  '23-456-789',
  to_date('2005-01-01', 'YYYY-MM-DD')
FROM
  customer
WHERE
  fed_id = '04-2222222';

INSERT INTO officer (cust_id, fname, lname, title, start_date)
SELECT
  cust_id,
  'Paul',
  'Hardy',
  'President',
  to_date('2005-01-01', 'YYYY-MM-DD')
FROM
  customer
WHERE
  fed_id = '04-2222222';

INSERT INTO customer (fed_id, cust_type_cd, address, city, state, postal_code)
    VALUES ('04-3333333', 'B', '789 Main St', 'Salem', 'NH', '03079');
INSERT INTO business (cust_id, name, state_id, incorp_date)
SELECT
  cust_id,
  'Superior Auto Body',
  '34-567-890',
  to_date('2006-06-30', 'YYYY-MM-DD')
FROM
  customer
WHERE
  fed_id = '04-3333333';

INSERT INTO officer (cust_id, fname, lname, title, start_date)
SELECT
  cust_id,
  'Carl',
  'Lutz',
  'President',
  to_date('2006-06-30', 'YYYY-MM-DD')
FROM
  customer
WHERE
  fed_id = '04-3333333';

INSERT INTO customer (fed_id, cust_type_cd, address, city, state, postal_code)
    VALUES ('04-4444444', 'B', '4772 Presidential Way', 'Quincy', 'MA', '02169');
INSERT INTO business (cust_id, name, state_id, incorp_date)
SELECT
  cust_id,
  'AAA Insurance Inc.',
  '45-678-901',
  '2003-05-01'
FROM
  customer
WHERE
  fed_id = '04-4444444';

INSERT INTO officer (cust_id, fname, lname, title, start_date)
SELECT
  cust_id,
  'Stanley',
  'Cheswick',
  'President',
  '2003-05-01'
FROM
  customer
WHERE
  fed_id = '04-4444444';

/* residential account data */
INSERT INTO account (product_cd, cust_id, open_date, last_activity_date, status, open_branch_id, open_emp_id, avail_balance, pending_balance)
SELECT
  a.prod_cd,
  c.cust_id,
  a.open_date,
  a.last_date,
  'ACTIVE',
  e.branch_id,
  e.emp_id,
  a.avail,
  a.pend
FROM
  customer c
  CROSS JOIN (
    SELECT
      b.branch_id,
      e.emp_id
    FROM
      branch b
      INNER JOIN employee e ON e.assigned_branch_id = b.branch_id
    WHERE
      b.city = 'Woburn'
    LIMIT 1) e
  CROSS JOIN (
    SELECT
      'CHK' prod_cd,
      to_date('2004-01-15', 'YYYY-MM-DD') open_date,
      to_date('2009-01-04', 'YYYY-MM-DD') last_date,
      1057.75 avail,
      1057.75 pend
  UNION ALL
  SELECT
    'SAV' prod_cd,
    to_date('2004-01-15', 'YYYY-MM-DD') open_date,
    to_date('2008-12-19', 'YYYY-MM-DD') last_date,
    500.00 avail,
    500.00 pend
  UNION ALL
  SELECT
    'CD' prod_cd,
    to_date('2008-06-30', 'YYYY-MM-DD') open_date,
    to_date('2008-06-30', 'YYYY-MM-DD') last_date,
    3000.00 avail,
    3000.00 pend) a
WHERE
  c.fed_id = '111-11-1111';

INSERT INTO account (product_cd, cust_id, open_date, last_activity_date, status, open_branch_id, open_emp_id, avail_balance, pending_balance)
SELECT
  a.prod_cd,
  c.cust_id,
  a.open_date,
  a.last_date,
  'ACTIVE',
  e.branch_id,
  e.emp_id,
  a.avail,
  a.pend
FROM
  customer c
  CROSS JOIN (
    SELECT
      b.branch_id,
      e.emp_id
    FROM
      branch b
      INNER JOIN employee e ON e.assigned_branch_id = b.branch_id
    WHERE
      b.city = 'Woburn'
    LIMIT 1) e
  CROSS JOIN (
    SELECT
      'CHK' prod_cd,
      to_date('2005-03-12', 'YYYY-MM-DD') open_date,
      to_date('2008-12-27', 'YYYY-MM-DD') last_date,
      2258.02 avail,
      2258.02 pend
  UNION ALL
  SELECT
    'SAV' prod_cd,
    to_date('2005-03-12', 'YYYY-MM-DD') open_date,
    to_date('2008-12-11', 'YYYY-MM-DD') last_date,
    200.00 avail,
    200.00 pend) a
WHERE
  c.fed_id = '222-22-2222';

INSERT INTO account (product_cd, cust_id, open_date, last_activity_date, status, open_branch_id, open_emp_id, avail_balance, pending_balance)
SELECT
  a.prod_cd,
  c.cust_id,
  a.open_date,
  a.last_date,
  'ACTIVE',
  e.branch_id,
  e.emp_id,
  a.avail,
  a.pend
FROM
  customer c
  CROSS JOIN (
    SELECT
      b.branch_id,
      e.emp_id
    FROM
      branch b
      INNER JOIN employee e ON e.assigned_branch_id = b.branch_id
    WHERE
      b.city = 'Quincy'
    LIMIT 1) e
  CROSS JOIN (
    SELECT
      'CHK' prod_cd,
      to_date('2006-11-23', 'YYYY-MM-DD') open_date,
      to_date('2008-11-30', 'YYYY-MM-DD') last_date,
      1057.75 avail,
      1057.75 pend
  UNION ALL
  SELECT
    'MM' prod_cd,
    to_date('2006-12-15', 'YYYY-MM-DD') open_date,
    to_date('2008-12-05', 'YYYY-MM-DD') last_date,
    2212.50 avail,
    2212.50 pend) a
WHERE
  c.fed_id = '333-33-3333';

INSERT INTO account (product_cd, cust_id, open_date, last_activity_date, status, open_branch_id, open_emp_id, avail_balance, pending_balance)
SELECT
  a.prod_cd,
  c.cust_id,
  a.open_date,
  a.last_date,
  'ACTIVE',
  e.branch_id,
  e.emp_id,
  a.avail,
  a.pend
FROM
  customer c
  CROSS JOIN (
    SELECT
      b.branch_id,
      e.emp_id
    FROM
      branch b
      INNER JOIN employee e ON e.assigned_branch_id = b.branch_id
    WHERE
      b.city = 'Waltham'
    LIMIT 1) e
  CROSS JOIN (
    SELECT
      'CHK' prod_cd,
      to_date('2007-09-12', 'YYYY-MM-DD') open_date,
      to_date('2009-01-03', 'YYYY-MM-DD') last_date,
      534.12 avail,
      534.12 pend
  UNION ALL
  SELECT
    'SAV' prod_cd,
    to_date('2004-01-15', 'YYYY-MM-DD') open_date,
    to_date('2008-10-24', 'YYYY-MM-DD') last_date,
    767.77 avail,
    767.77 pend
  UNION ALL
  SELECT
    'MM' prod_cd,
    to_date('2008-09-30', 'YYYY-MM-DD') open_date,
    to_date('2008-11-11', 'YYYY-MM-DD') last_date,
    5487.09 avail,
    5487.09 pend) a
WHERE
  c.fed_id = '444-44-4444';

INSERT INTO account (product_cd, cust_id, open_date, last_activity_date, status, open_branch_id, open_emp_id, avail_balance, pending_balance)
SELECT
  a.prod_cd,
  c.cust_id,
  a.open_date,
  a.last_date,
  'ACTIVE',
  e.branch_id,
  e.emp_id,
  a.avail,
  a.pend
FROM
  customer c
  CROSS JOIN (
    SELECT
      b.branch_id,
      e.emp_id
    FROM
      branch b
      INNER JOIN employee e ON e.assigned_branch_id = b.branch_id
    WHERE
      b.city = 'Salem'
    LIMIT 1) e
  CROSS JOIN (
    SELECT
      'CHK' prod_cd,
      to_date('2008-01-27', 'YYYY-MM-DD') open_date,
      to_date('2009-01-05', 'YYYY-MM-DD') last_date,
      2237.97 avail,
      2897.97 pend) a
WHERE
  c.fed_id = '555-55-5555';

INSERT INTO account (product_cd, cust_id, open_date, last_activity_date, status, open_branch_id, open_emp_id, avail_balance, pending_balance)
SELECT
  a.prod_cd,
  c.cust_id,
  a.open_date,
  a.last_date,
  'ACTIVE',
  e.branch_id,
  e.emp_id,
  a.avail,
  a.pend
FROM
  customer c
  CROSS JOIN (
    SELECT
      b.branch_id,
      e.emp_id
    FROM
      branch b
      INNER JOIN employee e ON e.assigned_branch_id = b.branch_id
    WHERE
      b.city = 'Waltham'
    LIMIT 1) e
  CROSS JOIN (
    SELECT
      'CHK' prod_cd,
      to_date('2006-08-24', 'YYYY-MM-DD') open_date,
      to_date('2008-11-29', 'YYYY-MM-DD') last_date,
      122.37 avail,
      122.37 pend
  UNION ALL
  SELECT
    'CD' prod_cd,
    to_date('2008-12-28', 'YYYY-MM-DD') open_date,
    to_date('2008-12-28', 'YYYY-MM-DD') last_date,
    10000.00 avail,
    10000.00 pend) a
WHERE
  c.fed_id = '666-66-6666';

INSERT INTO account (product_cd, cust_id, open_date, last_activity_date, status, open_branch_id, open_emp_id, avail_balance, pending_balance)
SELECT
  a.prod_cd,
  c.cust_id,
  a.open_date,
  a.last_date,
  'ACTIVE',
  e.branch_id,
  e.emp_id,
  a.avail,
  a.pend
FROM
  customer c
  CROSS JOIN (
    SELECT
      b.branch_id,
      e.emp_id
    FROM
      branch b
      INNER JOIN employee e ON e.assigned_branch_id = b.branch_id
    WHERE
      b.city = 'Woburn'
    LIMIT 1) e
  CROSS JOIN (
    SELECT
      'CD' prod_cd,
      to_date('2008-01-12', 'YYYY-MM-DD') open_date,
      to_date('2008-01-12', 'YYYY-MM-DD') last_date,
      5000.00 avail,
      5000.00 pend) a
WHERE
  c.fed_id = '777-77-7777';

INSERT INTO account (product_cd, cust_id, open_date, last_activity_date, status, open_branch_id, open_emp_id, avail_balance, pending_balance)
SELECT
  a.prod_cd,
  c.cust_id,
  a.open_date,
  a.last_date,
  'ACTIVE',
  e.branch_id,
  e.emp_id,
  a.avail,
  a.pend
FROM
  customer c
  CROSS JOIN (
    SELECT
      b.branch_id,
      e.emp_id
    FROM
      branch b
      INNER JOIN employee e ON e.assigned_branch_id = b.branch_id
    WHERE
      b.city = 'Salem'
    LIMIT 1) e
  CROSS JOIN (
    SELECT
      'CHK' prod_cd,
      to_date('2005-05-23', 'YYYY-MM-DD') open_date,
      to_date('2009-01-03', 'YYYY-MM-DD') last_date,
      3487.19 avail,
      3487.19 pend
  UNION ALL
  SELECT
    'SAV' prod_cd,
    to_date('2005-05-23', 'YYYY-MM-DD') open_date,
    to_date('2008-10-12', 'YYYY-MM-DD') last_date,
    387.99 avail,
    387.99 pend) a
WHERE
  c.fed_id = '888-88-8888';

INSERT INTO account (product_cd, cust_id, open_date, last_activity_date, status, open_branch_id, open_emp_id, avail_balance, pending_balance)
SELECT
  a.prod_cd,
  c.cust_id,
  a.open_date,
  a.last_date,
  'ACTIVE',
  e.branch_id,
  e.emp_id,
  a.avail,
  a.pend
FROM
  customer c
  CROSS JOIN (
    SELECT
      b.branch_id,
      e.emp_id
    FROM
      branch b
      INNER JOIN employee e ON e.assigned_branch_id = b.branch_id
    WHERE
      b.city = 'Waltham'
    LIMIT 1) e
  CROSS JOIN (
    SELECT
      'CHK' prod_cd,
      to_date('2007-07-30', 'YYYY-MM-DD') open_date,
      to_date('2008-12-15', 'YYYY-MM-DD') last_date,
      125.67 avail,
      125.67 pend
  UNION ALL
  SELECT
    'MM' prod_cd,
    to_date('2008-10-28', 'YYYY-MM-DD') open_date,
    to_date('2008-10-28', 'YYYY-MM-DD') last_date,
    9345.55 avail,
    9845.55 pend
  UNION ALL
  SELECT
    'CD' prod_cd,
    to_date('2008-06-30', 'YYYY-MM-DD') open_date,
    to_date('2008-06-30', 'YYYY-MM-DD') last_date,
    1500.00 avail,
    1500.00 pend) a
WHERE
  c.fed_id = '999-99-9999';

/* corporate account data */
INSERT INTO account (product_cd, cust_id, open_date, last_activity_date, status, open_branch_id, open_emp_id, avail_balance, pending_balance)
SELECT
  a.prod_cd,
  c.cust_id,
  a.open_date,
  a.last_date,
  'ACTIVE',
  e.branch_id,
  e.emp_id,
  a.avail,
  a.pend
FROM
  customer c
  CROSS JOIN (
    SELECT
      b.branch_id,
      e.emp_id
    FROM
      branch b
      INNER JOIN employee e ON e.assigned_branch_id = b.branch_id
    WHERE
      b.city = 'Salem'
    LIMIT 1) e
  CROSS JOIN (
    SELECT
      'CHK' prod_cd,
      to_date('2006-09-30', 'YYYY-MM-DD') open_date,
      to_date('2008-12-15', 'YYYY-MM-DD') last_date,
      23575.12 avail,
      23575.12 pend
  UNION ALL
  SELECT
    'BUS' prod_cd,
    to_date('2006-10-01', 'YYYY-MM-DD') open_date,
    to_date('2008-08-28', 'YYYY-MM-DD') last_date,
    0 avail,
    0 pend) a
WHERE
  c.fed_id = '04-1111111';

INSERT INTO account (product_cd, cust_id, open_date, last_activity_date, status, open_branch_id, open_emp_id, avail_balance, pending_balance)
SELECT
  a.prod_cd,
  c.cust_id,
  a.open_date,
  a.last_date,
  'ACTIVE',
  e.branch_id,
  e.emp_id,
  a.avail,
  a.pend
FROM
  customer c
  CROSS JOIN (
    SELECT
      b.branch_id,
      e.emp_id
    FROM
      branch b
      INNER JOIN employee e ON e.assigned_branch_id = b.branch_id
    WHERE
      b.city = 'Woburn'
    LIMIT 1) e
  CROSS JOIN (
    SELECT
      'BUS' prod_cd,
      to_date('2008-03-22', 'YYYY-MM-DD') open_date,
      to_date('2008-11-14', 'YYYY-MM-DD') last_date,
      9345.55 avail,
      9345.55 pend) a
WHERE
  c.fed_id = '04-2222222';

INSERT INTO account (product_cd, cust_id, open_date, last_activity_date, status, open_branch_id, open_emp_id, avail_balance, pending_balance)
SELECT
  a.prod_cd,
  c.cust_id,
  a.open_date,
  a.last_date,
  'ACTIVE',
  e.branch_id,
  e.emp_id,
  a.avail,
  a.pend
FROM
  customer c
  CROSS JOIN (
    SELECT
      b.branch_id,
      e.emp_id
    FROM
      branch b
      INNER JOIN employee e ON e.assigned_branch_id = b.branch_id
    WHERE
      b.city = 'Salem'
    LIMIT 1) e
  CROSS JOIN (
    SELECT
      'CHK' prod_cd,
      to_date('2007-07-30', 'YYYY-MM-DD') open_date,
      to_date('2008-12-15', 'YYYY-MM-DD') last_date,
      38552.05 avail,
      38552.05 pend) a
WHERE
  c.fed_id = '04-3333333';

INSERT INTO account (product_cd, cust_id, open_date, last_activity_date, status, open_branch_id, open_emp_id, avail_balance, pending_balance)
SELECT
  a.prod_cd,
  c.cust_id,
  a.open_date,
  a.last_date,
  'ACTIVE',
  e.branch_id,
  e.emp_id,
  a.avail,
  a.pend
FROM
  customer c
  CROSS JOIN (
    SELECT
      b.branch_id,
      e.emp_id
    FROM
      branch b
      INNER JOIN employee e ON e.assigned_branch_id = b.branch_id
    WHERE
      b.city = 'Quincy'
    LIMIT 1) e
  CROSS JOIN (
    SELECT
      'SBL' prod_cd,
      to_date('2008-02-22', 'YYYY-MM-DD') open_date,
      to_date('2008-12-17', 'YYYY-MM-DD') last_date,
      50000.00 avail,
      50000.00 pend) a
WHERE
  c.fed_id = '04-4444444';

/* put $100 in all checking/savings accounts on date account opened */
INSERT INTO TRANSACTION (txn_date, account_id, txn_type_cd, amount, funds_avail_date)
SELECT
  a.open_date,
  a.account_id,
  'CDT',
  100,
  a.open_date
FROM
  account a
WHERE
  a.product_cd IN ('CHK', 'SAV', 'CD', 'MM');

/* end data population */
