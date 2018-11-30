import React , { Component } from 'react';
import { ImageInput } from 'admin-on-rest/lib/mui/input/ImageInput';
export FilePreview from './filepreview';
export ImagePreview from './imagepreview';

const readFile = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

export default class FileInput extends ImageInput {
    onDrop = async (file) => {
        console.log(file);
        //上传文件将返回的信息作为数据存放到state中
        // var data = await readFile(file[0]);
        var data = new FormData();
        data.append('file', file[0]);
        var result = await fetch(this.props.url,{
            method:'post',
            body:data
        });
        var json = await result.json();
        if(json.success){
            var files = [{
                filename:json.filename,
                url:json.url,
                id: json.id,
            }];
            this.setState({files});
            this.props.input.onChange(files[0]);
        }else{
            alert(json.message);
        }
    }
}

