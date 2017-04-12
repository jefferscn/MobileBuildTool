import React , { Component } from 'react';
import { ImageInput } from 'admin-on-rest';

export default class FileInput extends ImageInput {
    onDrag = (file) => {
        console.log(file);
    }
}

