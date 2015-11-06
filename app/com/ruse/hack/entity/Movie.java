package com.ruse.hack.entity;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * Created by omisoft on 11/6/15.
 */

@javax.persistence.Entity
@Table(name = "movie")
public class Movie extends  BaseEntity {

    @Column(name = "name")
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
