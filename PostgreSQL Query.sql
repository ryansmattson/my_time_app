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
hourly_rate varchar(80) not null,
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
job_id integer references users
);
