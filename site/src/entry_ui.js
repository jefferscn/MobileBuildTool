import React , { Component } from 'react';
import { render } from "react-dom";
import { simpleRestClient, Admin, Resource } from 'admin-on-rest';
import { Delete } from 'admin-on-rest/lib/mui';
import { ProjectList , ProjectCreate , ProjectEdit , ProjectShow } from './ui/projects';
import { TaskList , TaskCreate , TaskEdit , TaskShow } from './ui/tasks';
import { FrameworkList , FrameworkCreate , FrameworkEdit } from './ui/frameworks';
import 'whatwg-fetch';
const client = simpleRestClient('.');
render(
    <Admin title="手机打包服务" restClient={client}>
        <Resource name="projects" show = { ProjectShow } edit = { ProjectEdit } create= { ProjectCreate } list={ProjectList} remove={Delete}/>
        <Resource name="tasks" edit = { TaskEdit } show = { TaskShow }  create= { TaskCreate } list={ TaskList } />
        <Resource name="frameworks" edit = { FrameworkEdit }  create= { FrameworkCreate } list={ FrameworkList } />
    </Admin>,
    document.getElementById('app')
);