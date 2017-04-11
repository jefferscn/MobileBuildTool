import React , { Component } from 'react';
import { render } from "react-dom";
import { simpleRestClient, Admin, Resource } from 'admin-on-rest';

render(
    <Admin restClient={simpleRestClient('http://localhost:3001')}>
        <Resource name="projects" list={CommentList} />
    </Admin>,
    document.getElementById('app')
);