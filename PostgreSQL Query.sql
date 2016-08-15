CREATE TABLE users (
id serial primary key,
first_name varchar(80) not null,
last_name varchar(80) not null,
username varchar(80) unique not null,
password varchar(80) not null,
email varchar(255),
phone varchar(80),
address varchar(100),
hourly_rate varchar(80)
);


CREATE TABLE jobs (
id serial primary key,
name varchar(80) not null,
hourly_rate varchar(80),
date_created varchar(80),
bill_organization varchar(80),
bill_individual varchar(80),
current_job boolean,
notes text,
user_id integer references users
);

CREATE TABLE times (
id serial primary key,
clock_in varchar(80),
clock_out varchar(80),
job_id integer references jobs
);

CREATE TABLE invoices (
id serial primary key,
address varchar(80),
balance_due varchar(80),
bill_to varchar(80),
description varchar(80),
due_date varchar(80),
email varchar(80),
hours varchar(80),
from_name varchar(80),
invoice_number varchar(80),
invoice_date varchar(80),
invoice_to varchar(80),
notes varchar(80),
phone varchar(80),
rate varchar(80),
terms varchar(80),
user_id integer references users
);
