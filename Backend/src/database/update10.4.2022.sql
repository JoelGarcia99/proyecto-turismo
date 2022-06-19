-- adding an schedule for guide
create table guide_schedule(
  __id char(36) primary key,
  horario_inicio datetime not null,
  horario_fin datetime not null,
  fk_guide char(36) not null,

  foreign key(fk_guide) references guia(__id)
    on update cascade on delete cascade
)engine=InnoDB;

