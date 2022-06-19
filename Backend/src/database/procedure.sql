drop procedure if exists registro_reserva;
delimiter //
create procedure registro_reserva( 
    in id_usuario char(36),
    in id_puntoturistico char(36),
    in aforo int,
    in comentario text,
    in id_reserva char(36),
    in id_aprueba char(36),
    in id_reserva_puntoturis char(36)
)
begin
    insert into reserva values( id_reserva, id_usuario, aforo, comentario, id_reserva_puntoturis);
    insert into aprueba_reserva values( id_aprueba, now(),null, null, 1 ,0, id_usuario,null, id_reserva);
end //
delimiter ;

drop procedure if exists registra_admin;
delimiter //
create procedure registra_admin( 
    in __id char(36),
    in nombre varchar(50),
    in apellido varchar(50),
    in email varchar(150),
    in password char(64),
    in cedula_pas varchar(10),
    in role varchar(10),
    in telefono varchar(15),
    in token char(36)
)
begin
    declare solucion boolean;
    set solucion= ( select valido from token where id_token = token limit 1);
    if role = "admin" then
        if solucion is null or not( solucion)then
            SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Token no valido, por favor ingrese uno activo';
        end if;
    end if;
    insert into usuario values(__id, nombre, apellido, email, password, cedula_pas,role, telefono);
    update token set valido = 0 where id_token = token;
end //
delimiter ;
