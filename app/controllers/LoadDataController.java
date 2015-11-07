package controllers;

import com.google.inject.Inject;
import com.ruse.hack.dao.MovieDao;
import com.ruse.hack.dao.MovieDaoImpl;
import com.ruse.hack.entity.Movie;
import play.db.jpa.Transactional;
import play.mvc.Controller;
import play.mvc.Result;

/**
 * Created by omisoft on 11/6/15.
 */
public class LoadDataController extends Controller {

    private final MovieDao movieDao;

    @Inject
    public LoadDataController(MovieDaoImpl movieDao) {
        this.movieDao = movieDao;
    }

    @Transactional
    public Result loadData(){
//        Movie movie = new Movie();
//        movieDao.save(movie);
        return ok("asdasd");
    }
}
