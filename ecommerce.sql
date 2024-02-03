DROP DATABASE IF EXISTS ecommerce;
CREATE DATABASE ecommerce;
USE ecommerce;


CREATE TABLE `category`(
	categoryId int UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    catagory VARCHAR(50) not null
);

CREATE TABLE `fileTable`(
	uuid	 VARCHAR(50) PRIMARY KEY NOT NULL,
	imgdata  LONGBLOB,
	imgname	 VARCHAR(50) NOT NULL,
    typeImg  VARCHAR(50) NOT NULL
);

CREATE TABLE `infomation`(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    wattage VARCHAR(10),
    noise VARCHAR(10),
	technology VARCHAR(100),
    `level` VARCHAR(200),
    `mode` VARCHAR(300),
	accessory VARCHAR(200),
    size 		varchar(100),
    Weight 		VARCHAR(10),
    color		VARCHAR(50),
    funtion     text
);

CREATE TABLE `origin`(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    manufacturer VARCHAR(50),
    madeIn VARCHAR(50),
	guarantee VARCHAR(50)
);


DROP TABLE IF EXISTS `account`;

CREATE TABLE `account`(
	accountID			INT UNSIGNED PRIMARY KEY AUTO_INCREMENT ,
    email				VARCHAR(50) UNIQUE KEY NOT NULL,
    username			VARCHAR(50) UNIQUE KEY NOT NULL,
    lastname			VARCHAR(50)  NOT NULL,
    firstname			VARCHAR(50) NOT NULL,
    avatar				VARCHAR(100) ,
	phone				VARCHAR(20) NOT NULL,
    address				VARCHAR(100) NOT NULL,
    `password`			VARCHAR(100) NOT NULL,
    `role`				ENUM('ADMIN', 'USER'),
    CreateDate			DATE DEFAULT (now()),
    UUIDKey				VARCHAR(50) UNIQUE KEY NOT NULL,
    FOREIGN KEY(avatar) REFERENCES `fileTable`(uuid) ON DELETE CASCADE
);

INSERT INTO `account`(accountID, email, username, lastname, firstname, avatar, phone, address, 
`password`, `role`, CreateDate, UUIDKey)
VALUE ('3', 'dung8anx2@gmail.com', 'dung8anx2', 'Dũng', 'Nguyễn Xuân', 'cb28cce2-70a7-4ca1-a1ac-7b996c3e6261', '0358123123', 'Hà Nội', 
'$2a$10$lpF9ZwAt.QFjmejdFoY3p.pm87ZR6Kq8EzP8Rv5CJOV7kQrmvxLgC', 'ADMIN', '2024-02-03', '95bee17d-2070-4c83-8fee-83384b3fdf21'
);

UPDATE `account`
SET `role` = 'USER'
WHERE accountID = 3;

CREATE TABLE `products`(
	id int UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    productName VARCHAR(50) NOT NULL,
    imgUrl TEXT NOT NULL,
    price FLOAT UNSIGNED NOT NULL,
    priceSale FLOAT UNSIGNED DEFAULT 0,
    shortDesc TEXT NOT NULL,
    `description` TEXT NOT NULL,
    avgRating FLOAT ,
    
    catagoryId INT UNSIGNED,
    uuidUrl VARCHAR(50),
    originId INT UNSIGNED,
    informationId INT UNSIGNED,
    
    
    FOREIGN KEY(catagoryId) REFERENCES `category`(categoryid) ON DELETE CASCADE,
    FOREIGN KEY(uuidUrl) REFERENCES `fileTable`(uuid) ON DELETE CASCADE,
    FOREIGN KEY(originId) REFERENCES `origin`(id) ON DELETE CASCADE,
    FOREIGN KEY(informationId) REFERENCES `infomation`(id)ON DELETE CASCADE
);


CREATE TABLE `reviews`(
	reviewId int UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(50),
    reviewText TEXT,
    rating FLOAT UNSIGNED,
    productId int UNSIGNED,
	FOREIGN KEY(productId) REFERENCES `products`(id) ON DELETE CASCADE
);


CREATE TABLE `customers`(
	customersId INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    fullname VARCHAR(50),
    email    VARCHAR(50),
    phone		VARCHAR(50),
    address TEXT,
    city VARCHAR(50),
    postalcode INT UNSIGNED,
    country VARCHAR(50)
);

CREATE TABLE `orders`(
	ordersId INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	customersId INT UNSIGNED, 
    `status` ENUM("PENDING", "SHIPPING", "COMPLETED"),
    orderDate DATE DEFAULT (now()),
	totalAmount INT UNSIGNED,
    payment VARCHAR(50),
	FOREIGN KEY(customersId) REFERENCES `customers`(customersId) ON DELETE CASCADE
);



CREATE TABLE `OrderDetails`(
		OrderDetailsId INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        orderId INT UNSIGNED,
        productId INT UNSIGNED,
        quantity INT UNSIGNED,
        unitPrice  FLOAT UNSIGNED,
        FOREIGN KEY(orderId) REFERENCES `orders`(ordersId) ON DELETE CASCADE,
		FOREIGN KEY(productId) REFERENCES `products`(id) ON DELETE CASCADE
);

CREATE TABLE `quantity`(
		quantityId  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        totalQuantity INT UNSIGNED,
        totalSale INT UNSIGNED,
        productId INT UNSIGNED,
        FOREIGN KEY(productId) REFERENCES `products`(id) ON DELETE CASCADE
);

CREATE TABLE `payments`(
		paymentId INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        ordersId INT UNSIGNED,
        paymentDate DATE DEFAULT (now()),
        paymentAmount VARCHAR(50),
        paymentMethod  VARCHAR(50),
        
        FOREIGN KEY(ordersId) REFERENCES `orders`(ordersId) ON DELETE CASCADE
);