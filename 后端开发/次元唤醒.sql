create table user1(
	user_id varchar(10) primary key,
	pwd int,
	nickname varchar(16),
	pic varchar(60),
)

create table favor(
	role varchar(10) primary key,
	options varchar(100),
	liking int,
)

create table works(
	skin_id int primary key,
	creator_id int,
	good int,
	download_number int,
	collection int,
)

create table clock(
	alarm_id int primary key,
	repeat int,
	c_time date,
	bell varchar(100),
)