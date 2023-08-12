alter user 'root'@'localhost' identified with mysql_native_password by 'Kam@13032003';

create database if not exists humanasset;
 
use humanasset;
create table if not exists forowner(email varchar(100) primary key, passwords varchar(500));
select *from humanasset.forowner;

create table if not exists humanasset.newblog(title LONGTEXT, descriptions LONGTEXT);

-- select *from humanasset.newblog;
-- delete from humanasset.newblog where title = "hwllo ";

create table if not exists humanasset.getintouchdata(ename varchar(100), email varchar(100), phone_no varchar(12) primary key, message LONGTEXT);
-- select *from humanasset.getintouchdata;

-- truncate humanasset.forowner;

-- update humanasset.blogs set descriptions = "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.";
