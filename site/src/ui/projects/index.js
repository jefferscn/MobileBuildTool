import React , { PureComponent } from 'react';
import { List, Datagrid, TextInput , Create , Edit , TabbedForm , Show ,ReferenceField , ShowButton ,
    SimpleShowLayout , EditButton , FormTab , TextField , UrlField } from 'admin-on-rest/lib/mui';
// import RichTextInput from 'aor-rich-text-input';
import FileInput , { FilePreview, ImagePreview } from '../FileInput'
import IOSInstallLink from '../IOSInstallLink';
import baseUrl from '../../server/baseUrl';
import QRCodeField from '../QRCodeField';
import ProjectName from './ProjectName';

export class ProjectList extends PureComponent{
    render(){
        return (<List {...this.props}>
            <Datagrid>
                <ProjectName source="name" />
                {/* <TextField source="name" /> */}
                <TextField source="desc" />
                <TextField source="lastRelease.ios.version" label="IOS版本"/>
                <EditButton />
                <ShowButton/>
            </Datagrid>
        </List>);
    }
}

export class ProjectCreate extends PureComponent{
    render(){
        return (
            <Create {...this.props}>
                <TabbedForm>
                    <FormTab label="基本信息">
                        <TextInput label="项目名称" source="name" />
                        <TextInput label="项目表述" source="desc" />
                        <TextInput label="应用ID" source="appId"/>
                        <FileInput url="./upload" source="icon" placeholder="点击上传图标">
                            <ImagePreview/>
                        </FileInput>
                    </FormTab>
                    <FormTab label="IOS">
                        <TextInput label="项目svn地址" source="ios.svn.url" />
                        <TextInput label="项目svn用户" source="ios.svn.userName" />
                        <TextInput label="项目svn密码" source="ios.svn.password" type="password"/>
                        <TextInput label="应用ID" source="ios.appId"/>
                        <FileInput url="./upload" source="ios.certificate.file" placeholder="IOS发布证书(.p12)">
                            <FilePreview/>
                        </FileInput>
                        <TextInput label="证书密码" source="ios.certificate.password" type="password"/>
                        <FileInput url="./upload" source="ios.mobileProvision" placeholder="上传IOS打包用签名文件">
                            <FilePreview/>
                        </FileInput>
                    </FormTab>
                    <FormTab label="Android">
                        <TextInput source="android.svn.url" />
                        <TextInput source="android.svn.userName" />
                        <TextInput source="android.svn.password" type="password"/>
                        <TextInput label="应用ID" source="android.appId"/>
                        <FileInput url="./upload" source="android.keyStore.file" placeholder="上传Android打包签名文件">
                            <FilePreview/>
                        </FileInput>
                        <TextInput label="签名用户" source="android.keyStore.userName" />
                        <TextInput label="签名密码" source="android.keyStore.password" type="password"/>
                    </FormTab>
                </TabbedForm>
            </Create>
        )
    }
}

export class ProjectEdit extends PureComponent{
    render(){
        return (
            <Edit {...this.props}>
                <TabbedForm>
                    <FormTab label="基本信息">
                        <TextInput label="项目名称" source="name" />
                        <TextInput label="项目表述" source="desc" />
                        <TextInput label="应用ID" source="appId"/>
                        <FileInput url="./upload" source="icon" placeholder="点击上传图标">
                            <ImagePreview/>
                        </FileInput>
                    </FormTab>
                    <FormTab label="IOS">
                        <TextInput label="项目svn地址" source="ios.svn.url" />
                        <TextInput label="项目svn用户" source="ios.svn.userName" />
                        <TextInput label="项目svn密码" source="ios.svn.password" type="password"/>
                        <TextInput label="应用ID" source="ios.appId"/>
                        <FileInput url="./upload" source="ios.certificate.file" placeholder="IOS发布证书(.p12)">
                            <FilePreview/>
                        </FileInput>
                        <TextInput label="证书密码" source="ios.certificate.password" type="password"/>
                        <FileInput url="./upload" source="ios.mobileProvision" placeholder="上传IOS打包用签名文件">
                            <FilePreview/>
                        </FileInput>
                    </FormTab>
                    <FormTab label="Android">
                        <TextInput source="android.svn.url" />
                        <TextInput source="android.svn.userName" />
                        <TextInput source="android.svn.password" type="password"/>
                        <TextInput label="应用ID" source="android.appId"/>
                        <FileInput url="./upload" source="android.keyStore.file" placeholder="上传Android打包签名文件">
                            <FilePreview/>
                        </FileInput>
                        <TextInput label="签名用户" source="android.keyStore.userName" />
                        <TextInput label="签名密码" source="android.keyStore.password" type="password"/>
                    </FormTab>
                </TabbedForm>
            </Edit>
        )
    }
}


export class ProjectShow extends PureComponent{
    render(){
        return (<Show {...this.props} hasEdit={false} actions={<div/>} hasList={false}>
            <SimpleShowLayout>
                <TextField label="项目" source="name" />
                <TextField source="lastRelease.ios.version" label="版本"/>
                <QRCodeField text={ (record)=>`${baseUrl}/#/projects/${record.id}/show`} source="id" label="二维码"/>
                <ReferenceField source="lastRelease.ios.taskId" reference="tasks" elStyle={{textDecoration: 'none'}}>
                    <IOSInstallLink addLabel = {true} label = "" buttonLabel="IOS安装" source = "targetUrl"/>
                </ReferenceField>
                <ReferenceField source="lastRelease.android.taskId" reference="tasks" elStyle={{textDecoration: 'none'}}>
                    <IOSInstallLink addLabel = {true} label = "" buttonLabel="Android安装" source = "targetUrl"/>
                </ReferenceField>
            </SimpleShowLayout>
        </Show>)
    }
}
