use [ISC_Student_Management]
go

alter table Student add IntakeID varchar(20)
alter table Student add Password varchar(1000)
alter table Lecturer add Password varchar(1000)

alter table ScheduleDetail add DayInWeek varchar(15)
alter table ScheduleDetail add LessionBegin int

alter table ScheduleDetail add TimeBegin time
alter table ScheduleDetail add LessionTime int

alter table ScheduleDetail drop column Lession
alter table ScheduleDetail drop column LessionTime

alter table Student alter column Id varchar(20) not null
alter table Student add constraint PK_Student primary key (Id)
