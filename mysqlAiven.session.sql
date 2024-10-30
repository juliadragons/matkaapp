create table todos (
  ID int not null AUTO_INCREMENT,
  DESCRIPTION varchar(255),
  PRIORITY int,
  CREATED TIMESTAMP,
  IS_DONE INT,
  PRIMARY KEY (ID)
);


insert into todos (description, priority, is_done)
values ('prae mune', 3, 0);


insert into todos (description, priority, is_done)
values ('jaluta koera', 5, 0);


insert into todos (description, priority, is_done)
values ('pese hambaid', 3, 1);


select * from todos;