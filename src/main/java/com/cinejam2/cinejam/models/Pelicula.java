package com.cinejam2.cinejam.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "pelicula")
@ToString
@EqualsAndHashCode
public class Pelicula {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Getter
    @Setter
    @Column(name = "pel_id")
    private Integer pel_id;

    @Getter @Setter @Column (name = "gen_id")
    private Integer gen_id;

    @Getter @Setter @Column (name = "dir_id")
    private Integer dir_id;

    @Getter @Setter @Column(name = "for_id")
    private Integer for_id;

    @Getter @Setter @Column(name = "pel_nombre")
    private String pel_nombre;

    @Getter @Setter @Column(name = "pel_costo")
    private Float pel_costo;

    @Getter @Setter @Column(name = "pel_fecha_estreno")
    private Date pel_fecha_estreno;
}
