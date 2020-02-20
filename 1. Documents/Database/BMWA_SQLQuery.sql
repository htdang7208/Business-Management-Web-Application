use [ISC_Student_Management]
go

alter table Schedule drop column WeekQuantity
alter table Schedule add Weeki int

alter table Lecturer drop column Password
alter table Lecturer add AvatarLink varchar(200) 

alter table Student add IntakeID varchar(20)
alter table Intake add WeekAmount int

alter table ScheduleDetail add DayInWeek varchar(15)
alter table ScheduleDetail add LessionBegin int

alter table ScheduleDetail add TimeBegin time
alter table ScheduleDetail add LessionTime int

alter table ScheduleDetail drop column Lession

alter table Student alter column Id varchar(20) not null
alter table Studying alter column StudentID varchar(20)
alter table Student add constraint PK_Student primary key (Id)

alter table WorkTrack drop constraint FK_WorkTrack_Student

ALTER TABLE WorkTrack DROP CONSTRAINT FK_WorkTrack_Student
alter table WorkTrack add constraint FK_WorkTrack_Student foreign key (StudentID) references Student(Id)
