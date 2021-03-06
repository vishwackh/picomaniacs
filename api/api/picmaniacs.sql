CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `userName` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `token` varchar(200) NOT NULL,
  `firstName` varchar(200) NOT NULL,
  `lastName` varchar(200) NOT NULL,
  `phone` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `active` int(11) NOT NULL DEFAULT '0',
  `createdDate` datetime NOT NULL,
  `updatedDate` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


INSERT INTO `login` (`id`, `userName`, `password`, `token`, `firstName`, `lastName`, `phone`, `email`, `type`, `active`, `createdDate`, `updatedDate`) 
VALUES (1, 'admin', 'admin', '2057564ac24451b55368bb170fe0b91d', 'admin', 'admin', '9986552521', 'admin@gmail.com', 1, 1, '2017-02-02 13:43:08', '2017-02-02 13:43:08');

-- event mangement admin
/*picoSlider */
CREATE TABLE picoSlider(
  `id` int not null AUTO_INCREMENT,
  `name` varchar(256) not null,
  `url` varchar(1500) not null,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
);
/*picoPreWedding */
CREATE TABLE picoPreWedding(
  `id` int not null AUTO_INCREMENT,
  `name` varchar(256) not null,
  `url` varchar(1500) not null,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
);
CREATE TABLE picoWedding(
  `id` int not null AUTO_INCREMENT,
  `name` varchar(256) not null,
  `url` varchar(1500) not null,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
);
CREATE TABLE picoPostWedding(
  `id` int not null AUTO_INCREMENT,
  `name` varchar(256) not null,
  `url` varchar(1500) not null,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
);
CREATE TABLE picoBabyPhoto(
  `id` int not null AUTO_INCREMENT,
  `name` varchar(256) not null,
  `url` varchar(1500) not null,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
);