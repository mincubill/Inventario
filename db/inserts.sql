INSERT INTO CAREER VALUES(1,'ingenieria informatica');
INSERT INTO CAREER VALUES(2,'ingenieria en administracio de recursos humanos');

INSERT INTO USERS VALUES(18732997,'jorge corvalan','corvalan mendez','higlord','higlord@gmail.com',3,1,1,'+56985067877','andes 3755 casa 25','123');
INSERT INTO USERS VALUES(19845227,'Ignacio','Donoso','iDonosof','nacho@correo.cl',3,1,1,'+569123456789','Algun lugar de maipu','asd123asd');

INSERT INTO PRODUCT (name,DESCRIPTION,STATUS,STOCK,price,STORE, AVAILABLESTOCK) VALUES ('pelota','es una pelota',1,10,30000,1 , 10);
INSERT INTO PRODUCT (name,DESCRIPTION,STATUS,STOCK,price,STORE, AVAILABLESTOCK) VALUES ('pelota2','es una pelota',1,10,30000,1, 10);




/*Usar solo para probar los pedidos*/
insert into MOVEMENT_HEADER(ID, DATE_BEGIN, DATE_END, DAYS, USER_M,DEBT, DESCRIPTION, STATUS) VALUES(1, '2019-05-28', null, 3, 19845227, 0, 'Description', 0);
insert into MOVEMENT_HEADER(ID, DATE_BEGIN, DATE_END, DAYS, USER_M,DEBT, DESCRIPTION, STATUS) VALUES(2, '2019-05-28', null, 5, 19845227, 0, 'Description1', 0);
insert into MOVEMENT_HEADER(ID, DATE_BEGIN, DATE_END, DAYS, USER_M,DEBT, DESCRIPTION, STATUS) VALUES(3, '2019-05-28', null, 1, 19845227, 0, 'Description3', 1);

insert into MOVEMENT_BODY(ID, PRODUCT_M, HEADER, QUANTITY) VALUES( 1, 1, 1, 10);
insert into MOVEMENT_BODY(ID, PRODUCT_M, HEADER, QUANTITY) VALUES( 2, 2, 1, 5);
insert into MOVEMENT_BODY(ID, PRODUCT_M, HEADER, QUANTITY) VALUES( 3, 1, 2, 2);
insert into MOVEMENT_BODY(ID, PRODUCT_M, HEADER, QUANTITY) VALUES( 4, 1, 3, 1);