import React , { PureComponent } from 'react';
import { List, Datagrid, TextInput , Create , Edit , TabbedForm , 
    EditButton , FormTab , TextField , UrlField } from 'admin-on-rest/lib/mui';
// import RichTextInput from 'aor-rich-text-input';
import FileInput , { FilePreview } from '../FileInput'

export class ProjectList extends PureComponent{
    render(){
        return (<List {...this.props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="desc" />
                <EditButton />
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
        return (
            <TabbedForm {...this.props}>
                <FormTab label="基本信息">
                    <TextField source="name" />
                    <TextField source="desc" />
                </FormTab>
                <FormTab label="ios">
                    <TextField source="ios.svn.url" />
                    <TextField source="ios.svn.username" />
                    <TextField source="ios.svn.password" type="password"/>
                    <UrlField source = "ios.mobileProvision.url"/>
                </FormTab>
                <FormTab label="Android">
                    <TextInput source="android.svn.url" />
                    <TextInput source="android.svn.userName" />
                    <TextInput source="android.svn.password" type="password"/>
                    <UrlField source = "ios.mobileProvision.url"/>
                    <TextInput source="android.keyStore.userName" />
                    <TextInput source="android.keyStore.password" type="password"/>
                </FormTab>
            </TabbedForm>
        )
    }
}
