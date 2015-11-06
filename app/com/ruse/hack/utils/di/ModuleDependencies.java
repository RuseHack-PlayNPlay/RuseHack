package com.ruse.hack.utils.di;

import com.google.inject.AbstractModule;

/**
 * Created by nslavov on 11/6/15.
 */
public class ModuleDependencies extends AbstractModule {

    @Override
    protected void configure() {
    install(new DaoModule());

    }
}
