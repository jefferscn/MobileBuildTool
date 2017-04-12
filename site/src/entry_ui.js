import React , { Component } from 'react';
import { render } from "react-dom";
import { simpleRestClient, Admin, Resource } from 'admin-on-rest';
import { ProjectList , ProjectCreate } from './ui/projects'

render(
    <Admin restClient={simpleRestClient('http://localhost:3001')}>
        <Resource name="projects" create= { ProjectCreate } list={ProjectList} />
    </Admin>,
    document.getElementById('app')
);