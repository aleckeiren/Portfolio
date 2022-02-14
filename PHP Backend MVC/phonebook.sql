 

DROP TABLE IF EXISTS `phonebook`;

CREATE TABLE `phonebook` (
  `id` int(11) NOT NULL auto_increment,
  `fname` varchar(50) default NULL,
  `lname` varchar(50) default NULL,
  `phone` varchar(50) default NULL,
  `email` varchar(100) default NULL,
  `location` varchar(15) default NULL,
  `mc` varchar(15) default NULL,
  `pos` varchar(15) default NULL,
  `dept` varchar(15) default NULL,
  PRIMARY KEY  (`id`)
);

/*Data for the table `phonebook` */

insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (1,'Stefanie','AlOtaiba','644-0717','alotaiba@blr.makeu.edu','2205-J STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (2,'Les','Aspinwall','644-8427','laspinwall@fsu.edu','G136 STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (3,'Debra','Austin','644-3581','austin@blr.makeu.edu','1210-D STB','4453','FAC','ELPS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (4,'Cynthia','Bailey','644-0577','bailey@blr.makeu.edu','1002 Tully','4280','STF','SMRMPE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (5,'Shannon','Barksdale','644-4854','barksdal@blr.makeu.edu','1114 STB','4450','STF','DEAN');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (6,'Amy','Baylor','292-8491','baylor@blr.makeu.edu','Wash DC','4453','FAC','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (7,'Betsy','Becker','645-2371','bjbecker@blr.makeu.edu','3204-F STB','4453','FAC','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (8,'Joseph','Beckham','644-5553','jbeckham@blr.makeu.edu','1210-K STB','4452','FAC','ELPS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (9,'Cheryl','Beeler','644-4813','beeler@blr.makeu.edu','1002 Tully','4280','FAC','SMRMPE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (10,'Kerry','Behnke','645-8382','behnke@blr.makeu.edu','1107 STB','4450','STF','DEAN');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (11,'Marsha','Best','644-4005','mbest@admin.fsu.edu','1211-F STB','4450','STF','DEAN/RES');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (12,'Erika','Bettilyon','644-7197','ebettilyon@admin.fsu.edu','1002 Tully','4280','STF','SMRMPE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (13,'Robert','Birken','644-5825','birken@blr.makeu.edu','2301 STB','4460','STF','DEAN/OASIS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (14,'Eileen','Bischof','644-8407','epace@fsu.edu','2205-D STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (15,'Annie','Biske','644-8810','abiske@blr.makeu.edu','2301-P STB','4460','STF','DEAN/OASIS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (16,'Rhonda','Blackwell-Flanagan','644-8166','flanagan@blr.makeu.edu','1209-D STB','4452','FAC','ELPS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (17,'Carol','Blankenhorn','746-0902','blankenh@blr.makeu.edu','Jupiter','4460','FAC','DEAN/OASIS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (18,'Natasha','Blankenship','644-6777','blanken@blr.makeu.edu','1209 STB','4452','STF','ELPS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (19,'Timolin','Bodison-Baker','644-8485','tbodisonbaker@fsu.edu','2204-G STB','4459','STF','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (20,'Michelle','Brimecombe','644-3953','mjp06d@fsu.edu','1002 Tully','4280','STF','SMRMPE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (21,'Leigh','Brown','645-8316','lbrown@blr.makeu.edu','2204-L STB','4459','STF','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (22,'Vernita','Brown','644-1645','vbrown@fsu.edu','1211-G STB','4450','STF','DEAN/RES');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (23,'Cindy','Campbell','910-9419','abic@msn.com','Tampa','4460','FAC','DEAN/OASIS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (24,'Angel','Canto','644-9440','acanto@fsu.edu','3206-J STB','4453','FAC','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (25,'Pamela \"Sissi\"','Carroll','644-0372','pcarroll@fsu.edu','1102 STB','4450','FAC','DEAN');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (26,'Pei-Hua','Chen','643-9876','chen@blr.makeu.edu','N/A','4453','FAC','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (27,'Kathy','Clark','644-8497','kclark@fsu.edu','G135 STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (28,'Robert','Clark','644-0370','rclark@fsu.edu','G129 STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (29,'Lora','Cohen-Vogel','644-8164','cohenvog@blr.makeu.edu','1209-E STB','4452','FAC','ELPS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (30,'Kelly','Conner','644-9185','kconner@blr.makeu.edu','1116 STB','4450','STF','DEAN');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (31,'Steve','Conner','644-0350','conner@blr.makeu.edu','1115 STB','4450','FAC','DEAN');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (32,'Carol','Connor','921-0703','cconnor@fcrr.org','2209-K STB','2540','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (33,'Becky','Culp','644-8403','bculp@fsu.edu','1209-L STB','4452','STF','ELPS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (34,'Jon','Dalton','644-6446','jdalton@admin.fsu.edu','1210-G STB','4452','FAC','ELPS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (35,'Aubteen','Darabi','644-5652','adarabi@lsi.fsu.edu','3205-B STB C462','4453','FAC','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (36,'Angie (Fiske)','Davis','645-1739','dr.angie.davis@gmail.com','G132 STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (37,'Kathy','Davis','644-2090','kdavis@pc.fsu.edu','PCC','1099','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (38,'Nancy','Davis','644-7804','ndavis@fsu.edu','G123 STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (39,'Vanessa','Dennen','644-8783','vdennen@fsu.edu','3205-D STB','4453','FAC','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (40,'Michaela','Densmore','644-8823','mdensmore@admin.fsu.edu','1120 STB','4450','STF','DEAN');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (41,'Marcy','Driscoll','644-6885','mdriscoll@fsu.edu','1105 STB','4450','FAC','DEAN');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (42,'Julie','Dunn','644-4244','dunn@blr.makeu.edu','1006 Tully','4280','FAC','SMRMPE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (43,'Peter','Easton','644-8165','easton@blr.makeu.edu','1204-H STB','4452','FAC','ELPS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (44,'Deborah','Ebener','644-1789','debener@su.edu','2209-L STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (45,'David','Eccles','644-5465','deccles@lsi.fsu.edu','3204-D STB C462','4453','FAC','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (46,'Barbara','Edwards','644-8416','bjedwards@fsu.edu','2205-G STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (47,'Robert','Eklund','645-2909','eklund@blr.makeu.edu','3204-K STB','4453','FAC','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (48,'Bill','English','644-2227','rwenglish@fsu.edu','2209-F STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (49,'Marion','Fesmire','644-5458','mfesmire@fsu.edu','PCC','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (50,'James','Fetterly','644-0494','jmf04m@fsu.edu','G130 STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (51,'Iris','Figueroa-Robles','644-4813','iaf07@fsu.edu','1002 Tully','4280','STF','SMRMPE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (52,'Donna','Fletcher','644-3843','dfletcher@fsu.edu','1019 Tully','4280','FAC','SMRMPE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (53,'Barbara','Foorman','644-0777','bfoorman@fcrr.org','2209-E STB','7825','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (54,'Brooke','Forester','644-4813','bef05@fsu.edu','1024 Tully','4280','FAC','SMRMPE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (55,'Neill','Franks','644-6015','franks@blr.makeu.edu','2301-F STB','4460','STF','DEAN/OASIS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (56,'Kathy','Froelich','644-2997','kfroelich@fsu.edu','G118 STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (57,'David','Funk','644-3767','dfunk@blr.makeu.edu','2301 STB','4460','STF','DEAN/OASIS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (58,'Gary','Gabel','644-3583','gabel@blr.makeu.edu','2301 STB','4460','FAC','DEAN/OASIS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (59,'Rebecca','Galeano','644-2129','ram5371@fsu.edu','G110 STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (60,'Alejandro','Gallard','644-7813','agallard@fsu.edu','G124 STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (61,'Kathy','Gartley','644-8411','kgartley@fsu.edu','2204-K STB','4459','STF','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (62,'JoAnne','Graf','644-2386','jgraf@mailer.fsu.edu','1030 Tully','4280','FAC','SMRMPE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (63,'Kathy','Guthrie','644-7078','kguthrie@admin.fsu.edu','1204-E STB','4452','FAC','ELPS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (64,'Mary Frances','Hanline','644-8417','mhanline@fsu.edu','2209-J STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (65,'Carolyn','Herrington','644-3632','cherrington@lsi.fsu.edu','1204-J STB','2540','FAC','ELPS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (66,'Rhonda','Hester','644-3760','hester@blr.makeu.edu','2301-B STB','4460','STF','DEAN/OASIS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (67,'Veronica','Hill','644-1230','vhill@fsu.edu','2204-F STB','4459','STF','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (68,'Lisa','Hodges','644-7812','lhodges@fsu.edu','G111 STB','4459','STF','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (69,'Alvin','Holloway','644-2094','holloway@blr.makeu.edu','2202 STB','4450','STF','DEAN/OIIT');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (70,'John','Hosp','645-8727','jhosp@fsu.edu','2208-M STB','4304','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (71,'Shouping','Hu','644-6721','shu@blr.makeu.edu','1210-H STB','4452','FAC','ELPS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (72,'Patrice','Iatarola','644-8162','iatarola@blr.makeu.edu','1209-G STB','4452','FAC','ELPS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (73,'Judith','Irvin','644-6447','irvin@blr.makeu.edu','1209-F STB','4452','FAC','ELPS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (74,'Elizabeth','Jakubowski','644-8428','emjakubowski@fsu.edu','G137 STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (75,'Jeffrey','James','644-9214','james@blr.makeu.edu','1012 Tully','4280','FAC','SMRMPE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (76,'Danae','Jarman','644-9782','jarman@blr.makeu.edu','2301 STB','4460','STF','DEAN/OASIS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (77,'Allan','Jeong','644-8784','jeong@blr.makeu.edu','3205-E STB','4453','FAC','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (78,'Tristan','Johnson','644-8770','tejohnson@fsu.edu','3205-A STB C462','4453','FAC','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (79,'Ithel','Jones','644-8468','ijones@fsu.edu','2208-C STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (80,'Akihito','Kamata','644-8794','kamata@blr.makeu.edu','3206-H STB','4453','FAC','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (81,'Zongmin','Kang','644-5203','kang@blr.makeu.edu','3204-J STB','4453','FAC','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (82,'Harriet','Kasper','644-2122','kasper@blr.makeu.edu','G133 STB','4280','STF','SMRMPE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (83,'Emily','Keeler','645-7146','ekeeler@fsu.edu','2206-B STB','4450','STF','DEAN');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (84,'John','Keller','644-8790','jkeller@fsu.edu','3205-G STB','4453','FAC','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (85,'Lucy','Kelly-Brown','644-3632','kbrown@blr.makeu.edu','1211-B STB','4450','STF','DEAN/RES');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (86,'Rosie','Keween','644-6570','keween@blr.makeu.edu','1008 Tully','4280','FAC','SMRMPE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (87,'Young-Suk','Kim','644-8413','yk06@fsu.edu','2208-M STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (88,'Yu Kyoum','Kim','644-7174','yukim@blr.makeu.edu','1034 Tully','4280','FAC','SMRMPE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (89,'Toni','Kirkwood-Tucker','645-2506','tkirkwoodtucker@fsu.edu','G126 STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (90,'Tammy','Kolbe','644-8175','kolbe@blr.makeu.edu','1205-J STB','4452','FAC','ELPS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (91,'Richard','Kunkel','645-6452','kunkel@blr.makeu.edu','1205-H STB','4452','FAC','ELPS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (92,'Vickie','Lake','644-1450','vlake@fsu.edu','2208-G STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (93,'Georgios','Lampropoulos','645-1293','lampropoulos@blr.makeu.edu','3206-L STB','4453','FAC','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (94,'Laura','Lang','644-2570','llang@fsu.edu','UCC 4605','2540','FAC','ELPS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (95,'Janet','Lenz','644-9547','jlenz@fsu.edu','2122 DSC','4453','FAC','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (96,'Sandra','Lewis','644-8409','slewis@fsu.edu','2205-L STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (97,'Peggy','Lollie','644-8786','lollie@blr.makeu.edu','3206-N STB','4453','STF','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (98,'Susan','Losh','644-8778','slosh@fsu.edu','3204-M STB','4453','FAC','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (99,'Thomas','Luschei','644-2570','tluschei@lsi.fsu.edu','1204-J STB','2540','FAC','ELPS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (100,'Susan','Lynn','644-3007','slynn@fsu.edu','1020 Tully','4280','FAC','SMRMPE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (101,'Patrick','Malone','644-0031','malone@blr.makeu.edu','2301 STB','4460','FAC','DEAN/OASIS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (102,'Susan','Martelli','644-0695','smartelli@fsu.edu','2208-K STB','4460','FAC','DEAN/OASIS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (103,'Nash','McCutchen','645-7239','nmccutchen@fsu.edu','1119 STB','4450','STF','DEAN');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (104,'Mary Kate','McKee','644-8792','mmckee@campus.fsu.edu','3210-B STB','4453','STF','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (105,'Amy','McKenzie','645-6588','armckenzie@fsu.edu','2205-F STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (106,'Amy','McKnight','644-4704','amcknight@fsu.edu','G112 STB','4459','STF','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (107,'Brenda','McMahon','644-7077','mcmahon@blr.makeu.edu','1205-G STB','4452','FAC','ELPS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (108,'Bruce','Menchetti','644-8414','bmenchetti@fsu.edu','2209-G STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (109,'Susan','Miller','645-6584','smiller2@fsu.edu','2209-H STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (110,'Jeffrey','Milligan','644-8171','milligan@blr.makeu.edu','1204-F STB','4452','FAC','ELPS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (111,'Sande','Milton','644-8168','milton@blr.makeu.edu','1209-H STB','4452','FAC','ELPS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (112,'Michael','Mondello','645-4825','mondello@blr.makeu.edu','1016 Tully','4280','FAC','SMRMPE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (113,'Robert','Moore','644-6798','rmoore@blr.makeu.edu','1113 STB','4450','STF','DEAN/OASIS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (114,'Brian','Mosier','644-2489','mosier@blr.makeu.edu','1013 Tully','4280','FAC','SMRMPE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (115,'Stephen','Mozier','644-3730','mozier@blr.makeu.edu','2301-J STB','4460','STF','DEAN/OASIS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (116,'Judy','Nalon','644-4369','jnalon@fsu.edu','2301-Q STB','4460','STF','DEAN/OASIS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (117,'Pamela','Oliver','348-0026','oliver@blr.makeu.edu','Kissimmee','4460','FAC','DEAN/OASIS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (118,'Barbara','Palmer','644-8471','palmerb@lsi.fsu.edu','G113 STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (119,'Jimmy','Pastrano','644-6781','pastrano@blr.makeu.edu','1209-J STB','4452','STF','ELPS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (120,'Joshua','Pesch','644-2865','pesch@blr.makeu.edu','3210-F STB','4453','STF','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (121,'Mary','Peterson','645-1317','mapeter@blr.makeu.edu','1209-K STB','4452','STF','ELPS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (122,'Steven','Pfeiffer','644-8796','pfeiffer@blr.makeu.edu','3206-G STB','4453','FAC','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (123,'Beth','Phillips','645-7662','bphillips@fcrr.org','3204-M STB','4453','FAC','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (124,'Carolyn','Piazza','644-8476','cpiazza@fsu.edu','G114 STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (125,'Ramona','Pittman','645-2623','rtpittman@fsu.edu','2208-D STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (126,'Terri','Powell','644-8046','powell@blr.makeu.edu','3210-E STB','4453','STF','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (127,'Melanie','Presnell','644-9235','mpresnell@fsu.edu','2205-H STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (128,'Frances','Prevatt','644-9445','fprevatt@blr.makeu.edu','3206-D STB','4453','FAC','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (129,'Rosemary','Prince','645-7692','prince@blr.makeu.edu','1010 Tully','4280','FAC','SMRMPE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (130,'Briley','Proctor','644-3742','proctor@blr.makeu.edu','3206-E STB','4453','FAC','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (131,'Tom','Ratliffe','644-7588','ratliff@blr.makeu.edu','1032 Tully','4280','FAC','SMRMPE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (132,'Janice','Reed','644-1141','reed@blr.makeu.edu','1103 STB','4450','STF','DEAN');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (133,'Robert','Reiser','644-4592','reiser@blr.makeu.edu','3205-F STB','4453','FAC','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (134,'Cecile \"Barbara\"','Reynaud','644-4298','reynaud@blr.makeu.edu','1026 Tully','4280','FAC','SMRMPE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (135,'Diana','Rice','645-4685','drice@fsu.edu','G131 STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (136,'Bryan','Richards','645-7976','brichards@fsu.edu','3210-A STB','4453','STF','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (137,'Christina','Rios','644-2090','crios@pc.fsu.edu','PCC','1099','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (138,'Kurt','Rockenstein','644-2094','rockenst@blr.makeu.edu','2202 STB','4450','STF','DEAN/OIIT');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (139,'Alysia','Roehrig-Bice','644-9080','aroehrig@fcrr.org','3204-E STB','4453','FAC','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (140,'Andy','Rudd','645-6883','rudd@blr.makeu.edu','1028 Tully','4280','FAC','SMRMPE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (141,'Stacey','Rutledge','644-8163','rutledge@blr.makeu.edu','1205-L STB','4452','FAC','ELPS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (142,'Jim','Sampson','645-6538','jsampson@fsu.edu','1104 STB','4450','FAC','DEAN');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (143,'Victor','Sampson','644-1651','vsampson@fsu.edu','G121 STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (144,'Kibbe','Sandin','644-0564','sandin@blr.makeu.edu','1107 STB','4450','STF','DEAN');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (145,'Linda','Schrader','644-8780','lschrade@mailer.fsu.edu','1205-F STB','4452','FAC','ELPS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (146,'Robert','Schwartz','644-8169','rschwart@blr.makeu.edu','1210-J STB','4452','FAC','ELPS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (147,'Ken','Shaw','644-2090','kshaw@pc.fsu.edu','PCC','1099','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (148,'Amy','Sherry','644-0918','asherry@fsu.edu','1018 Tully','4280','FAC','SMRMPE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (149,'Valerie','Shute','644-8785','vshute@fsu.edu','3205-C STB','4453','FAC','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (150,'Ann','Smith','644-4944','asmith@fsu.edu','1112 STB','4450','STF','DEAN');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (151,'Sherry','Southerland','645-4667','ssoutherland@fsu.edu','G119 STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (152,'Shari','Steadman','575-1212','mohawk@fsu.edu','G113 STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (153,'Charmaine','Steiner','644-0366','csteiner@blr.makeu.edu','1109 STB','4450','STF','DEAN');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (154,'Bunnie','Stripling-Hunter','644-3423','hstriplinghunter@fsu.edu','2204-E STB','4459','STF','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (155,'Rae','Sullivan','644-7914','sullivan@blr.makeu.edu','2301-D STB','4460','STF','DEAN/OASIS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (156,'Helge','Swanson','644-3145','hswanson@fsu.edu','G127 STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (157,'Gershon','Tenenbaum','644-8791','tenenbau@blr.makeu.edu','3204-G STB','4453','FAC','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (158,'Jeannine','Turner','645-2405','turner@blr.makeu.edu','3204-L STB','4453','FAC','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (159,'Joseph','Valente','644-6709','jvalente@fsu.edu','2208-F STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (160,'Dina','Vyortkina','644-9623','dvyortkina@fsu.edu','1301-D STB','4450','FAC','DEAN/OIIT');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (161,'Walt','Wager','644-8418','wwager@fsu.edu','G115 STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (162,'Jeanne','Wanzek','644-2542','jwanzek@fcrr.org','2208-M STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (163,'Andrew','Watkins','644-0565','watkins@blr.makeu.edu','1108 STB','4450','STF','DEAN');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (164,'Eve','Wettstein','644-3611','wettstein@blr.makeu.edu','2207 STB','4453','STF','EPLS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (165,'Headley','White','645-2505','hwhite@fsu.edu','G128 STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (166,'Karen','White','644-0371','klwhite@fsu.edu','1106 STB','4450','STF','DEAN');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (167,'Marsha','Whittaker','644-7913','strickla@blr.makeu.edu','2301-E STB','4460','STF','DEAN/OASIS');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (168,'Shelbie','Witte','644-6738','switte@fsu.edu','G117 STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (169,'Susan','Wood','644-1909','swood@fsu.edu','G116 STB','4459','FAC','STE');
insert  into `phonebook`(`id`,`fname`,`lname`,`phone`,`email`,`location`,`mc`,`pos`,`dept`) values (170,'Yanyun','Yang','644-8787','yang@blr.makeu.edu','3204-H STB','4453','FAC','EPLS');

 
