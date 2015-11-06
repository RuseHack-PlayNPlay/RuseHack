package com.ruse.hack.dao;

import com.ruse.hack.entity.Movie;

/**
 * Created by nslavov on 11/6/15.
 */
public class MovieDaoImpl extends BaseDaoImpl<Movie> implements MovieDao {
    public MovieDaoImpl(Class<Movie> type) {
        super(type);
    }

    public MovieDaoImpl(){
        this(Movie.class);
    }
}
