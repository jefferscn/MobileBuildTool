import React , { PureComponent } from 'react';
import { List, Datagrid, TextInput , Create , Edit , TabbedForm , Show ,ReferenceField , ShowButton ,
    SimpleShowLayout , EditButton , FormTab , TextField , UrlField } from 'admin-on-rest/lib/mui';
// import RichTextInput from 'aor-rich-text-input';
import FileInput , { FilePreview } from '../FileInput'
import IOSInstallLink from '../IOSInstallLink';
import baseUrl from '../../server/baseUrl';
import QRCodeField from '../QRCodeField';

export class ProjectList extends PureComponent{
    render(){
        return (<List {...this.props}>
            <Datagrid>
                <TextField source="name" />
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
                        <TextInput source="name" />
                        <TextInput source="desc" />
                    </FormTab>
                    <FormTab label="IOS">
                        <TextInput source="ios.svn.url" />
                        <TextInput source="ios.svn.userName" />
                        <TextInput source="ios.svn.password" type="password"/>
                        <FileInput url="http://1.1.8.34:3001/upload" source="ios.mobileProvision" placeholder="上传IOS打包用签名文件">
                            <FilePreview/>
                        </FileInput>
                    </FormTab>
                    <FormTab label="Android">
                        <TextInput source="android.svn.url" />
                        <TextInput source="android.svn.userName" />
                        <TextInput source="android.svn.password" type="password"/>
                        <FileInput url="http://1.1.8.34:3001/upload" source="android.keyStore.file" placeholder="上传Android打包签名文件">
                            <FilePreview/>
                        </FileInput>
                        <TextInput source="android.keyStore.userName" />
                        <TextInput source="android.keyStore.password" type="password"/>
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
                        <TextField source="name" />
                        <TextInput source="desc" />
                    </FormTab>
                    <FormTab label="IOS">
                        <TextInput source="ios.svn.url" />
                        <TextInput source="ios.svn.userName" />
                        <TextInput source="ios.svn.password" type="password"/>
                        <FileInput url="http://1.1.8.34:3001/upload" source="ios.mobileProvision" placeholder="上传IOS打包用签名文件">
                            <FilePreview/>
                        </FileInput>
                    </FormTab>
                    <FormTab label="Android">
                        <TextInput source="android.svn.url" />
                        <TextInput source="android.svn.userName" />
                        <TextInput source="android.svn.password" type="password"/>
                        <FileInput url="http://1.1.8.34:3001/upload" source="android.keyStore.file" placeholder="上传Android打包签名文件">
                            <FilePreview/>
                        </FileInput>
                        <TextInput source="android.keyStore.userName" />
                        <TextInput source="android.keyStore.password" type="password"/>
                    </FormTab>
                </TabbedForm>
            </Edit>
        )
    }
}


export class ProjectShow extends PureComponent{
    render(){
        return (<Show {...this.props} hasEdit={false} hasList={false}>
            <SimpleShowLayout>
                <TextField label="项目" source="name" />
                <TextField source="lastRelease.ios.version" label="版本"/>
                <QRCodeField text={ (record)=>`${baseUrl}/#/projects/${record.id}/show`} source="id" label="二维码"/>
                <ReferenceField source="lastRelease.ios.taskId" reference="tasks" elStyle={{textDecoration: 'none'}}>
                    <IOSInstallLink addLabel = {true} label = "" buttonLabel="安装" source = "targetUrl"/>
                </ReferenceField>
            </SimpleShowLayout>
        </Show>)
    }
}

