
drop table if exists usuario;
create table usuario (
    __id char(36)primary key,
    nombre varchar(50) not null,
    apellido varchar(50) not null,
    email varchar(150) not null unique,
    password char(64) not null,
    cedula_pas varchar(10) not null,
    role enum("admin", "user", "pres_sev") default "user",
    telefono varchar(15)
) engine = innodb;

drop table if exists imagen;
create table imagen (
    __id char(36),
    url varchar(80) not null,
    descripcion text,
    primary key (__id)
) engine = innodb;

drop table if exists guia;
create table guia (
    __id char(36) primary key,
    nombre varchar(100) not null,
    cedula_pas varchar(10) not null,
    telefono varchar(15),
    disponibilidad boolean default 1,
    fk_imagen char(36),
    foreign key(fk_imagen) references imagen(__id) on update cascade on delete cascade
) engine = innodb;

drop table if exists categoria;
create table categoria (
    __id char(36) primary key,
    nombre varchar(50) not null,
    descripcion text
) engine = innodb;

drop table if exists punto_turistico;
create table punto_turistico(
    __id char(36) primary key,
    nombre varchar(30) not null,
    direccion text,
    reservable boolean default 1,
    lat float not null,
    lon float not null,
    descripcion text
) engine = innodb;

drop table if exists punto_imagen;
create table punto_imagen(
    id_puntoturistico char(36),
    id_imagen char(36),
    primary key (id_puntoturistico, id_imagen),
    foreign key(id_puntoturistico) references punto_turistico(__id) on update cascade on delete no action,
    foreign key(id_imagen) references imagen(__id) on update cascade on delete no action
) engine = innodb;

drop table if exists local_turistico;
create table local_turistico(
    __id char(36) primary key,
    nombre varchar(50) not null,
    direccion text,
    lat float not null,
    lon float not null,
    descripcion text,
    horario_inicio tinyint not null,
    horario_fin tinyint not null,
    id_usuario char(36),
    foreign key(id_usuario) references usuario(__id) on update cascade on delete no action
) engine = innodb;

drop table if exists tel_local;
create table tel_local(
    numero varchar(15) primary key,
    id_local char(36) not null unique,
    foreign key (id_local) references local_turistico(__id)
    on update cascade on delete no action
)engine = innodb;

drop table if exists categoria_local;
create table categoria_local(
    id_categoria char(36),
    id_local char(36) ,
    primary key(id_categoria, id_local),
    foreign key (id_local) references local_turistico(__id)
    on update cascade on delete no action,
    foreign key (id_categoria) references categoria(__id)
    on update cascade on delete no action
)engine = innodb;

drop table if exists categoria_PuntoTuristico;
create table categoria_PuntoTuristico(
    id_categoria char(36),
    id_puntoturistico char(36),
    primary key(id_categoria, id_puntoturistico),
    foreign key (id_puntoturistico) references punto_turistico(__id)
    on update cascade on delete no action,
    foreign key (id_categoria) references categoria(__id)
    on update cascade on delete no action
)engine = innodb;

drop table if exists solicitud_local;
create table solicitud_local(
    id_solicitud char(36)primary key,
    id_local char(36)not null,
    id_usuario char(36),
    fecha datetime not null,
    comentario text,
    estado enum("pendiente", "revision","negado","aprobado") default "pendiente",
    foreign key (id_local) references local_turistico(__id)
    on update cascade on delete no action,
    foreign key(id_usuario) references usuario(__id)
    on update cascade on delete no action
)engine = innodb;


drop table if exists reserva;
create table reserva(
    __id char(36)primary key,
    id_usuario char(36),
    id_puntoturistico char(36),
    aforo integer not null,
    fecha datetime not null,
    comentario text,
    foreign key (id_usuario) references usuario(__id) 
    on update cascade on delete no action,
    foreign key (id_puntoturistico) references punto_turistico(__id) 
    on update cascade on delete no action
)engine = innodb;

drop table if exists reserva_puntoturis;
create table reserva_puntoturis(
    id_reserva char(36),
    id_puntoturistico char(36),
    hora_inicio datetime not null,
    horario_fin datetime not null,
    foreign key (id_reserva) references reserva(__id) 
    on update cascade on delete no action,
    foreign key (id_puntoturistico) references punto_turistico(__id) 
    on update cascade on delete no action
)engine = innodb;

drop table if exists aprueba_reserva;
create table aprueba_reserva(
    __id char(36)primary key,
    fecha datetime,
    estado enum("pendiente", "revision","negado","aprobado", "completado") default "pendiente",
    comentario text,
    leido_usuario boolean default 0,  
    leido_admin boolean default 0,
    id_usuario char(36) not null,
    id_admin char(36),
    foreign key (id_usuario) references usuario(__id) 
    on update cascade on delete no action,
    foreign key (id_admin) references usuario(__id) 
    on update cascade on delete no action
)engine = innodb;

drop table if exists calif_puntoturis;
create table calif_puntoturis(
    __id char(36) primary key,
    fecha datetime ,
    calificacion tinyint,
    comentario text,
    id_usuario char(36) not null,
    id_puntoturistico char(36)not null,
    foreign key (id_usuario) references usuario(__id) 
    on update cascade on delete no action,
    foreign key (id_puntoturistico) references punto_turistico(__id) 
    on update cascade on delete no action
)engine = innodb;

drop table if exists calif_local;
create table calif_local(
    __id char(36) primary key,
    fecha datetime,
    calificacion tinyint,
    comentario text,
    id_usuario char(36) not null,
    id_puntoturistico char(36)not null,
    foreign key (id_usuario) references usuario(__id) 
    on update cascade on delete no action,
    foreign key (id_puntoturistico) references punto_turistico(__id) 
    on update cascade on delete no action
)engine = innodb;

drop table if exists local_puntoturistico;
create table local_puntoturistico(
    id_local char(36)not null,
    id_puntoturistico char(36)not null,
    fecha datetime,
    foreign key (id_local) references local_turistico(__id) 
    on update cascade on delete no action,
    foreign key (id_puntoturistico) references punto_turistico(__id) 
    on update cascade on delete no action
)engine = innodb;

-- Token para registro de administrador--
create table token(
    id_token char(36) primary key,
    id_admin char(36) null,
    foreign key(id_admin) references usuario(__id)
    on update cascade on delete cascade
)engine = innodb;


-- modificacion--
alter table guia add column id_admin char(36) not null;
alter table guia add constraint fk_admin foreign Key(id_admin) references usuario(__id) 
on update cascade on delete no action;
alter table punto_turistico modify column nombre varchar(80) unique not null;
alter table guia modify column cedula_pas varchar(10) unique not null;
alter table reserva drop column fecha;
alter table reserva_puntoturis add column id_guia char(36) not null;
alter table reserva_puntoturis add constraint fk_guia foreign key (id_guia) references guia(__id)
on update cascade on delete no action;
alter table aprueba_reserva add column id_reserva char(36) not null;
alter table aprueba_reserva add constraint fk_reserva foreign key (id_reserva) references reserva(__id)
on update cascade on delete no action;
alter table reserva_puntoturis drop constraint reserva_puntoturis_ibfk_1;
alter table reserva_puntoturis drop column id_reserva;
alter table reserva drop constraint reserva_ibfk_2;
alter table reserva drop column id_puntoturistico;
alter table aprueba_reserva modify column estado enum("pendiente","negado","aprobado", "completado") default "pendiente" not null;

alter table reserva_puntoturis add column id_reserva_puntoturis char(36) not null;

alter table reserva_puntoturis add column __id char(36) primary key;

alter table reserva add column id_reserva_puntoturis char (36) not null;
alter table reserva add constraint fk_reserva_puntoturis foreign key( id_reserva_puntoturis) references reserva_puntoturis(__id)
on update cascade on delete no action;

alter table aprueba_reserva add column comentario_admin text;
alter table token add column valido boolean default 1;


