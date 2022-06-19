-- Registro de guia solo administrador--
drop trigger if exists administrar_guia;
delimiter //
create trigger administrar_guia before insert on guia for each row 
begin
    declare role enum("admin", "user", "pres_sev");
    set role = (select role from usuario where __id = new.id_admin limit 1);
    if role <> "admin" then 
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Usuario no autorizado para realizar petición';

	end if;
end //
delimiter ;

-- Solo administrador aprueba reserva--
drop trigger if exists aprueba_reserva;
delimiter //
create trigger aprueba_reserva before insert on aprueba_reserva for each row 
begin
    declare role enum("admin", "user", "pres_sev");
    set role = (select role from aprueba_reserva where __id = new.id_admin);
    if role <> "admin" then 
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Usuario no autorizado para realizar petición';
	end if;
end //
delimiter ;

delimiter //
create trigger actualizar_reserva before update on aprueba_reserva for each row 
begin
    declare role enum("admin", "user", "pres_sev");
    set role = (select role from aprueba_reserva where __id = new.id_admin);     
    if role <> "admin" then  
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Solo aldministrados puede aprobar las reservas';
	end if;
end //
delimiter ;


