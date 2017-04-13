import React , { Component } from 'react';
import { render } from "react-dom";
import { simpleRestClient, Admin, Resource } from 'admin-on-rest';
import { ProjectList , ProjectCreate , ProjectEdit , ProjectShow } from './ui/projects'
import { TaskList , TaskCreate , TaskEdit } from './ui/tasks'

render(
    <Admin restClient={simpleRestClient('http://1.1.8.34:3001')}>
        <Resource name="projects" show = { ProjectShow } edit = { ProjectEdit } create= { ProjectCreate } list={ProjectList} />
        <Resource name="tasks" edit = { TaskEdit } create= { TaskCreate } list={ TaskList } />
    </Admin>,
    document.getElementById('app')
);