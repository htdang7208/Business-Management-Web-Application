USE [master]
GO
/****** Object:  Database [ISC_Student_Management]    Script Date: 3/12/2020 8:34:12 AM ******/
CREATE DATABASE [ISC_Student_Management]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ISC_Student_Management', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\ISC_Student_Management.mdf' , SIZE = 4096KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'ISC_Student_Management_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\ISC_Student_Management_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [ISC_Student_Management] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ISC_Student_Management].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ISC_Student_Management] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ISC_Student_Management] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ISC_Student_Management] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ISC_Student_Management] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ISC_Student_Management] SET ARITHABORT OFF 
GO
ALTER DATABASE [ISC_Student_Management] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ISC_Student_Management] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ISC_Student_Management] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ISC_Student_Management] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ISC_Student_Management] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ISC_Student_Management] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ISC_Student_Management] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ISC_Student_Management] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ISC_Student_Management] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ISC_Student_Management] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ISC_Student_Management] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ISC_Student_Management] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ISC_Student_Management] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ISC_Student_Management] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ISC_Student_Management] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ISC_Student_Management] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ISC_Student_Management] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ISC_Student_Management] SET RECOVERY FULL 
GO
ALTER DATABASE [ISC_Student_Management] SET  MULTI_USER 
GO
ALTER DATABASE [ISC_Student_Management] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ISC_Student_Management] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ISC_Student_Management] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ISC_Student_Management] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [ISC_Student_Management] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'ISC_Student_Management', N'ON'
GO
USE [ISC_Student_Management]
GO
/****** Object:  Table [dbo].[Admin]    Script Date: 3/12/2020 8:34:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Admin](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Username] [varchar](50) NULL,
	[Password] [varchar](max) NULL,
	[Email] [varchar](200) NULL,
	[IsShown] [bit] NULL,
 CONSTRAINT [PK_Admin] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Class]    Script Date: 3/12/2020 8:34:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Class](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[SubjectID] [int] NULL,
	[LecturerID] [int] NULL,
	[Name] [nvarchar](255) NULL,
	[DateBegin] [date] NULL,
	[DateEnd] [date] NULL,
	[IsShown] [bit] NULL,
 CONSTRAINT [PK_Class] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Company]    Script Date: 3/12/2020 8:34:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Company](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NULL,
	[Address] [nvarchar](255) NULL,
	[PersonContact] [nvarchar](255) NULL,
	[Phone] [varchar](20) NULL,
	[Email] [varchar](255) NULL,
	[IsShown] [bit] NULL,
 CONSTRAINT [PK_Company] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[EducationProgram]    Script Date: 3/12/2020 8:34:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EducationProgram](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IntakeID] [int] NULL,
	[Name] [nvarchar](255) NULL,
	[IsShown] [bit] NULL,
 CONSTRAINT [PK_EducationProgram] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[EducationProgramDetail]    Script Date: 3/12/2020 8:34:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EducationProgramDetail](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[EducationProgramID] [int] NULL,
	[SubjectID] [int] NULL,
 CONSTRAINT [PK_EducationProgramDetail] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Intake]    Script Date: 3/12/2020 8:34:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Intake](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NULL,
	[DateBegin] [date] NULL,
	[DateEnd] [date] NULL,
	[WeekAmount] [int] NULL,
	[IsShown] [bit] NULL,
 CONSTRAINT [PK_Intake] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Interview]    Script Date: 3/12/2020 8:34:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Interview](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NULL,
	[Date] [date] NULL,
	[IsShown] [bit] NULL,
 CONSTRAINT [PK_Interview] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Lecturer]    Script Date: 3/12/2020 8:34:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Lecturer](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NULL,
	[Phone] [varchar](20) NULL,
	[Email] [varchar](255) NULL,
	[ImageUrl] [varchar](max) NULL,
	[IsShown] [bit] NULL,
 CONSTRAINT [PK_Lecturer] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Photo]    Script Date: 3/12/2020 8:34:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Photo](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Url] [varchar](max) NULL,
	[Description] [varchar](255) NULL,
	[DateAdded] [date] NULL,
	[IsMain] [bit] NULL,
	[AdminID] [int] NULL,
	[IsShown] [bit] NULL,
 CONSTRAINT [PK_Photo] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Room]    Script Date: 3/12/2020 8:34:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Room](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NULL,
	[Amount] [int] NULL,
	[Status] [bit] NULL,
	[IsShown] [bit] NULL,
 CONSTRAINT [PK_Room] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Student]    Script Date: 3/12/2020 8:34:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Student](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NULL,
	[Phone] [varchar](20) NULL,
	[Email] [varchar](255) NULL,
	[Address] [varchar](255) NULL,
	[InterviewID] [int] NULL,
	[RegisterDate] [date] NULL,
	[Passed] [bit] NULL,
	[Remark] [nvarchar](255) NULL,
	[IsShown] [bit] NULL,
 CONSTRAINT [PK_Student] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Studying]    Script Date: 3/12/2020 8:34:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Studying](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ClassID] [int] NULL,
	[TraineeID] [int] NULL,
	[Score] [float] NULL,
	[IsShown] [bit] NULL,
 CONSTRAINT [PK_Studying] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Subject]    Script Date: 3/12/2020 8:34:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Subject](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NULL,
	[LessionAmount] [int] NULL,
	[MinScore] [float] NULL,
	[IsShown] [bit] NULL,
 CONSTRAINT [PK_Subject] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TimeTable]    Script Date: 3/12/2020 8:34:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TimeTable](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DateBegin] [date] NULL,
	[DateEnd] [date] NULL,
	[Weeki] [int] NULL,
	[IsShown] [bit] NULL,
 CONSTRAINT [PK_TimeTable] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TimeTableDetail]    Script Date: 3/12/2020 8:34:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TimeTableDetail](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ClassID] [int] NULL,
	[TimeTableID] [int] NULL,
	[RoomID] [int] NULL,
	[TimeBegin] [datetime] NULL,
	[TimeEnd] [datetime] NULL,
 CONSTRAINT [PK_TimeTableDetail] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Trainee]    Script Date: 3/12/2020 8:34:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Trainee](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IntakeID] [int] NULL,
	[UniversityID] [int] NULL,
	[Name] [nvarchar](255) NULL,
	[Gender] [nvarchar](20) NULL,
	[Dob] [date] NULL,
	[Phone] [varchar](20) NULL,
	[Email] [varchar](255) NULL,
	[Password] [varchar](max) NULL,
	[Address] [nvarchar](255) NULL,
	[ImageUrl] [varchar](max) NULL,
	[IdentityNumber] [varchar](20) NULL,
	[Certification] [bit] NULL,
	[Deposit] [bit] NULL,
	[IsShown] [bit] NULL,
 CONSTRAINT [PK_Trainee] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[University]    Script Date: 3/12/2020 8:34:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[University](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NULL,
	[Address] [nvarchar](255) NULL,
	[PersonContact] [nvarchar](255) NULL,
	[Phone] [varchar](20) NULL,
	[Email] [varchar](255) NULL,
	[IsShown] [bit] NULL,
 CONSTRAINT [PK_University] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[WorkTrack]    Script Date: 3/12/2020 8:34:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorkTrack](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TraineeID] [int] NULL,
	[CompanyID] [int] NULL,
	[WorkDateBegin] [date] NULL,
	[DateSignContract] [date] NULL,
	[Status] [bit] NULL,
	[Remark] [nvarchar](255) NULL,
	[IsShown] [bit] NULL,
 CONSTRAINT [PK_WorkTrack] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[Admin] ON 

INSERT [dbo].[Admin] ([Id], [Username], [Password], [Email], [IsShown]) VALUES (1, N'freda', N'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', N'aa@gmail.com', 0)
INSERT [dbo].[Admin] ([Id], [Username], [Password], [Email], [IsShown]) VALUES (2, N'aida', N'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', N'aida77676@gmail.com', 0)
INSERT [dbo].[Admin] ([Id], [Username], [Password], [Email], [IsShown]) VALUES (3, N'susie', N'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', N'aa@gmail.com', 0)
INSERT [dbo].[Admin] ([Id], [Username], [Password], [Email], [IsShown]) VALUES (5, N'nichole', N'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', N'aa@gmail.com', 0)
INSERT [dbo].[Admin] ([Id], [Username], [Password], [Email], [IsShown]) VALUES (6, N'bridget', N'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', N'aa@gmail.com', 0)
INSERT [dbo].[Admin] ([Id], [Username], [Password], [Email], [IsShown]) VALUES (7, N'fisher', N'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', N'aa@gmail.com', 0)
INSERT [dbo].[Admin] ([Id], [Username], [Password], [Email], [IsShown]) VALUES (8, N'simon', N'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', N'aa@gmail.com', 0)
INSERT [dbo].[Admin] ([Id], [Username], [Password], [Email], [IsShown]) VALUES (9, N'rivers', N'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', N'aa@gmail.com', 0)
INSERT [dbo].[Admin] ([Id], [Username], [Password], [Email], [IsShown]) VALUES (10, N'boyer', N'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', N'aa@gmail.com', 0)
INSERT [dbo].[Admin] ([Id], [Username], [Password], [Email], [IsShown]) VALUES (11, N'johnson', N'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', N'aa@gmail.com', 0)
SET IDENTITY_INSERT [dbo].[Admin] OFF
SET IDENTITY_INSERT [dbo].[Intake] ON 

INSERT [dbo].[Intake] ([Id], [Name], [DateBegin], [DateEnd], [WeekAmount], [IsShown]) VALUES (1, N'Intake 02', CAST(N'2018-03-07' AS Date), CAST(N'2018-06-07' AS Date), 15, 0)
INSERT [dbo].[Intake] ([Id], [Name], [DateBegin], [DateEnd], [WeekAmount], [IsShown]) VALUES (2, N'Intake 02', CAST(N'2018-03-07' AS Date), CAST(N'2018-06-07' AS Date), 13, 0)
INSERT [dbo].[Intake] ([Id], [Name], [DateBegin], [DateEnd], [WeekAmount], [IsShown]) VALUES (3, N'Intake 01', CAST(N'2018-03-07' AS Date), CAST(N'2018-06-07' AS Date), 15, 0)
INSERT [dbo].[Intake] ([Id], [Name], [DateBegin], [DateEnd], [WeekAmount], [IsShown]) VALUES (4, N'Intake 04', CAST(N'2018-09-21' AS Date), CAST(N'2018-12-21' AS Date), 12, 0)
INSERT [dbo].[Intake] ([Id], [Name], [DateBegin], [DateEnd], [WeekAmount], [IsShown]) VALUES (5, N'Intake 05', CAST(N'2018-12-28' AS Date), CAST(N'2019-03-28' AS Date), 12, 0)
INSERT [dbo].[Intake] ([Id], [Name], [DateBegin], [DateEnd], [WeekAmount], [IsShown]) VALUES (6, N'Intake 06', CAST(N'2019-04-04' AS Date), CAST(N'2019-07-04' AS Date), 12, 0)
INSERT [dbo].[Intake] ([Id], [Name], [DateBegin], [DateEnd], [WeekAmount], [IsShown]) VALUES (7, N'Intake 07', CAST(N'2019-07-11' AS Date), CAST(N'2019-10-11' AS Date), 12, 0)
INSERT [dbo].[Intake] ([Id], [Name], [DateBegin], [DateEnd], [WeekAmount], [IsShown]) VALUES (8, N'Intake 08', CAST(N'2019-01-18' AS Date), CAST(N'2019-03-18' AS Date), 12, 0)
SET IDENTITY_INSERT [dbo].[Intake] OFF
SET IDENTITY_INSERT [dbo].[Interview] ON 

INSERT [dbo].[Interview] ([Id], [Name], [Date], [IsShown]) VALUES (1, N'Tuyển sinh khóa XI', CAST(N'2018-04-23' AS Date), NULL)
INSERT [dbo].[Interview] ([Id], [Name], [Date], [IsShown]) VALUES (2, N'Tuyển sinh khóa XI', CAST(N'2018-04-24' AS Date), NULL)
INSERT [dbo].[Interview] ([Id], [Name], [Date], [IsShown]) VALUES (3, N'Tuyển sinh khóa XI', CAST(N'2018-04-20' AS Date), NULL)
INSERT [dbo].[Interview] ([Id], [Name], [Date], [IsShown]) VALUES (4, N'Tuyển sinh khóa XI', CAST(N'2018-04-20' AS Date), NULL)
SET IDENTITY_INSERT [dbo].[Interview] OFF
SET IDENTITY_INSERT [dbo].[Photo] ON 

INSERT [dbo].[Photo] ([Id], [Url], [Description], [DateAdded], [IsMain], [AdminID], [IsShown]) VALUES (1, N'https://randomuser.me/api/portraits/women/38.jpg', NULL, CAST(N'2017-07-17' AS Date), 1, 1, NULL)
INSERT [dbo].[Photo] ([Id], [Url], [Description], [DateAdded], [IsMain], [AdminID], [IsShown]) VALUES (2, N'https://randomuser.me/api/portraits/women/69.jpg', NULL, CAST(N'2017-01-30' AS Date), 0, 1, NULL)
INSERT [dbo].[Photo] ([Id], [Url], [Description], [DateAdded], [IsMain], [AdminID], [IsShown]) VALUES (3, N'https://randomuser.me/api/portraits/women/13.jpg', NULL, CAST(N'2017-04-03' AS Date), 0, 1, NULL)
INSERT [dbo].[Photo] ([Id], [Url], [Description], [DateAdded], [IsMain], [AdminID], [IsShown]) VALUES (4, N'https://randomuser.me/api/portraits/women/40.jpg', NULL, CAST(N'2017-05-15' AS Date), 1, 2, NULL)
INSERT [dbo].[Photo] ([Id], [Url], [Description], [DateAdded], [IsMain], [AdminID], [IsShown]) VALUES (5, N'https://randomuser.me/api/portraits/women/28.jpg', NULL, CAST(N'2017-06-17' AS Date), 0, 2, NULL)
INSERT [dbo].[Photo] ([Id], [Url], [Description], [DateAdded], [IsMain], [AdminID], [IsShown]) VALUES (6, N'https://randomuser.me/api/portraits/women/31.jpg', NULL, CAST(N'2017-01-30' AS Date), 1, 3, NULL)
INSERT [dbo].[Photo] ([Id], [Url], [Description], [DateAdded], [IsMain], [AdminID], [IsShown]) VALUES (7, N'https://randomuser.me/api/portraits/women/6.jpg', NULL, CAST(N'2017-03-29' AS Date), 1, 6, NULL)
INSERT [dbo].[Photo] ([Id], [Url], [Description], [DateAdded], [IsMain], [AdminID], [IsShown]) VALUES (8, N'https://randomuser.me/api/portraits/women/2.jpg', NULL, CAST(N'2017-06-02' AS Date), 1, 5, NULL)
INSERT [dbo].[Photo] ([Id], [Url], [Description], [DateAdded], [IsMain], [AdminID], [IsShown]) VALUES (9, N'https://randomuser.me/api/portraits/women/7.jpg', NULL, CAST(N'2017-02-05' AS Date), 0, 6, NULL)
INSERT [dbo].[Photo] ([Id], [Url], [Description], [DateAdded], [IsMain], [AdminID], [IsShown]) VALUES (10, N'https://randomuser.me/api/portraits/women/85.jpg', NULL, CAST(N'2017-07-29' AS Date), 1, 7, NULL)
INSERT [dbo].[Photo] ([Id], [Url], [Description], [DateAdded], [IsMain], [AdminID], [IsShown]) VALUES (11, N'https://randomuser.me/api/portraits/women/97.jpg', NULL, CAST(N'2017-08-02' AS Date), 1, 8, NULL)
INSERT [dbo].[Photo] ([Id], [Url], [Description], [DateAdded], [IsMain], [AdminID], [IsShown]) VALUES (12, N'https://randomuser.me/api/portraits/women/10.jpg', NULL, CAST(N'2017-01-05' AS Date), 1, 9, NULL)
INSERT [dbo].[Photo] ([Id], [Url], [Description], [DateAdded], [IsMain], [AdminID], [IsShown]) VALUES (13, N'https://randomuser.me/api/portraits/women/60.jpg', NULL, CAST(N'2017-08-11' AS Date), 1, 10, NULL)
INSERT [dbo].[Photo] ([Id], [Url], [Description], [DateAdded], [IsMain], [AdminID], [IsShown]) VALUES (14, N'https://randomuser.me/api/portraits/women/84.jpg', NULL, CAST(N'2017-01-17' AS Date), 1, 11, NULL)
INSERT [dbo].[Photo] ([Id], [Url], [Description], [DateAdded], [IsMain], [AdminID], [IsShown]) VALUES (15, N'https://randomuser.me/api/portraits/women/84.jpg', NULL, CAST(N'2017-01-17' AS Date), 0, 5, NULL)
INSERT [dbo].[Photo] ([Id], [Url], [Description], [DateAdded], [IsMain], [AdminID], [IsShown]) VALUES (16, N'https://randomuser.me/api/portraits/women/84.jpg', NULL, CAST(N'2017-01-17' AS Date), 0, 3, NULL)
INSERT [dbo].[Photo] ([Id], [Url], [Description], [DateAdded], [IsMain], [AdminID], [IsShown]) VALUES (17, N'https://randomuser.me/api/portraits/women/84.jpg', NULL, CAST(N'2017-01-17' AS Date), 0, 7, NULL)
INSERT [dbo].[Photo] ([Id], [Url], [Description], [DateAdded], [IsMain], [AdminID], [IsShown]) VALUES (18, N'https://randomuser.me/api/portraits/women/84.jpg', NULL, CAST(N'2017-01-17' AS Date), 0, 8, NULL)
INSERT [dbo].[Photo] ([Id], [Url], [Description], [DateAdded], [IsMain], [AdminID], [IsShown]) VALUES (19, N'https://randomuser.me/api/portraits/women/84.jpg', NULL, CAST(N'2017-01-17' AS Date), 0, 8, NULL)
INSERT [dbo].[Photo] ([Id], [Url], [Description], [DateAdded], [IsMain], [AdminID], [IsShown]) VALUES (20, N'https://randomuser.me/api/portraits/women/84.jpg', NULL, CAST(N'2017-01-17' AS Date), 0, 9, NULL)
SET IDENTITY_INSERT [dbo].[Photo] OFF
SET IDENTITY_INSERT [dbo].[Student] ON 

INSERT [dbo].[Student] ([Id], [Name], [Phone], [Email], [Address], [InterviewID], [RegisterDate], [Passed], [Remark], [IsShown]) VALUES (1, N'Tuấn', N'0327590960', N'tuanaa@gmail.com', N'123 nguyen van cu', 1, CAST(N'2018-04-15' AS Date), 1, N'Vừa đủ tiêu chuẩn', NULL)
INSERT [dbo].[Student] ([Id], [Name], [Phone], [Email], [Address], [InterviewID], [RegisterDate], [Passed], [Remark], [IsShown]) VALUES (2, N'Lan', N'0327590962', N'lanny@gmail.com', N'333 hai ba trung', 1, CAST(N'2018-04-15' AS Date), 1, N'Tôi chấm em này', NULL)
INSERT [dbo].[Student] ([Id], [Name], [Phone], [Email], [Address], [InterviewID], [RegisterDate], [Passed], [Remark], [IsShown]) VALUES (3, N'Hung', N'0327590933', N'hungahau@gmail.com', N'749 nguyen thi thap', 2, CAST(N'2018-04-15' AS Date), 1, N'Chất quá chất quá', NULL)
INSERT [dbo].[Student] ([Id], [Name], [Phone], [Email], [Address], [InterviewID], [RegisterDate], [Passed], [Remark], [IsShown]) VALUES (4, N'Dang', N'0327590945', N'dangnek@gmail.com', N'18/8 phan van tri', 3, CAST(N'2018-04-15' AS Date), 1, N'Chuẩn men, cho vào', NULL)
SET IDENTITY_INSERT [dbo].[Student] OFF
ALTER TABLE [dbo].[Class]  WITH CHECK ADD  CONSTRAINT [FK_Class_Lecturer] FOREIGN KEY([LecturerID])
REFERENCES [dbo].[Lecturer] ([Id])
GO
ALTER TABLE [dbo].[Class] CHECK CONSTRAINT [FK_Class_Lecturer]
GO
ALTER TABLE [dbo].[Class]  WITH CHECK ADD  CONSTRAINT [FK_Class_Subject] FOREIGN KEY([SubjectID])
REFERENCES [dbo].[Subject] ([Id])
GO
ALTER TABLE [dbo].[Class] CHECK CONSTRAINT [FK_Class_Subject]
GO
ALTER TABLE [dbo].[EducationProgram]  WITH CHECK ADD  CONSTRAINT [FK_EducationProgram_Intake] FOREIGN KEY([IntakeID])
REFERENCES [dbo].[Intake] ([Id])
GO
ALTER TABLE [dbo].[EducationProgram] CHECK CONSTRAINT [FK_EducationProgram_Intake]
GO
ALTER TABLE [dbo].[EducationProgramDetail]  WITH CHECK ADD  CONSTRAINT [FK_EducationProgramDetail_EducationProgram] FOREIGN KEY([EducationProgramID])
REFERENCES [dbo].[EducationProgram] ([Id])
GO
ALTER TABLE [dbo].[EducationProgramDetail] CHECK CONSTRAINT [FK_EducationProgramDetail_EducationProgram]
GO
ALTER TABLE [dbo].[EducationProgramDetail]  WITH CHECK ADD  CONSTRAINT [FK_EducationProgramDetail_Subject] FOREIGN KEY([SubjectID])
REFERENCES [dbo].[Subject] ([Id])
GO
ALTER TABLE [dbo].[EducationProgramDetail] CHECK CONSTRAINT [FK_EducationProgramDetail_Subject]
GO
ALTER TABLE [dbo].[Photo]  WITH CHECK ADD  CONSTRAINT [FK_Photo_Admin] FOREIGN KEY([AdminID])
REFERENCES [dbo].[Admin] ([Id])
GO
ALTER TABLE [dbo].[Photo] CHECK CONSTRAINT [FK_Photo_Admin]
GO
ALTER TABLE [dbo].[Student]  WITH CHECK ADD  CONSTRAINT [FK_Student_Interview] FOREIGN KEY([InterviewID])
REFERENCES [dbo].[Interview] ([Id])
GO
ALTER TABLE [dbo].[Student] CHECK CONSTRAINT [FK_Student_Interview]
GO
ALTER TABLE [dbo].[Studying]  WITH CHECK ADD  CONSTRAINT [FK_Studying_Class] FOREIGN KEY([ClassID])
REFERENCES [dbo].[Class] ([Id])
GO
ALTER TABLE [dbo].[Studying] CHECK CONSTRAINT [FK_Studying_Class]
GO
ALTER TABLE [dbo].[Studying]  WITH CHECK ADD  CONSTRAINT [FK_Studying_Trainee] FOREIGN KEY([TraineeID])
REFERENCES [dbo].[Trainee] ([Id])
GO
ALTER TABLE [dbo].[Studying] CHECK CONSTRAINT [FK_Studying_Trainee]
GO
ALTER TABLE [dbo].[TimeTableDetail]  WITH CHECK ADD  CONSTRAINT [FK_TimeTableDetail_Class] FOREIGN KEY([ClassID])
REFERENCES [dbo].[Class] ([Id])
GO
ALTER TABLE [dbo].[TimeTableDetail] CHECK CONSTRAINT [FK_TimeTableDetail_Class]
GO
ALTER TABLE [dbo].[TimeTableDetail]  WITH CHECK ADD  CONSTRAINT [FK_TimeTableDetail_Room] FOREIGN KEY([RoomID])
REFERENCES [dbo].[Room] ([Id])
GO
ALTER TABLE [dbo].[TimeTableDetail] CHECK CONSTRAINT [FK_TimeTableDetail_Room]
GO
ALTER TABLE [dbo].[TimeTableDetail]  WITH CHECK ADD  CONSTRAINT [FK_TimeTableDetail_TimeTable] FOREIGN KEY([TimeTableID])
REFERENCES [dbo].[TimeTable] ([Id])
GO
ALTER TABLE [dbo].[TimeTableDetail] CHECK CONSTRAINT [FK_TimeTableDetail_TimeTable]
GO
ALTER TABLE [dbo].[Trainee]  WITH CHECK ADD  CONSTRAINT [FK_Trainee_Intake] FOREIGN KEY([IntakeID])
REFERENCES [dbo].[Intake] ([Id])
GO
ALTER TABLE [dbo].[Trainee] CHECK CONSTRAINT [FK_Trainee_Intake]
GO
ALTER TABLE [dbo].[Trainee]  WITH CHECK ADD  CONSTRAINT [FK_Trainee_University] FOREIGN KEY([UniversityID])
REFERENCES [dbo].[University] ([Id])
GO
ALTER TABLE [dbo].[Trainee] CHECK CONSTRAINT [FK_Trainee_University]
GO
ALTER TABLE [dbo].[WorkTrack]  WITH CHECK ADD  CONSTRAINT [FK_WorkTrack_Company] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[Company] ([Id])
GO
ALTER TABLE [dbo].[WorkTrack] CHECK CONSTRAINT [FK_WorkTrack_Company]
GO
ALTER TABLE [dbo].[WorkTrack]  WITH CHECK ADD  CONSTRAINT [FK_WorkTrack_Trainee] FOREIGN KEY([TraineeID])
REFERENCES [dbo].[Trainee] ([Id])
GO
ALTER TABLE [dbo].[WorkTrack] CHECK CONSTRAINT [FK_WorkTrack_Trainee]
GO
USE [master]
GO
ALTER DATABASE [ISC_Student_Management] SET  READ_WRITE 
GO
