import React , { PureComponent } from 'react';
import { List, Datagrid, TextField , Create , TextInput , TabbedForm , FormTab} from 'admin-on-rest/lib/mui';
// import RichTextInput from 'aor-rich-text-input';
import FileInput from '../FileInput'

export class ProjectList extends PureComponent{
    render(){
        return (<List {...this.props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="desc" />
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
                        <TextInput source="ios.svn.user" />
                        <TextInput source="ios.svn.password" type="password"/>
                        <FileInput source="ios.mobileprovision"/>
                    </FormTab>
                    <FormTab label="Android">
                        <TextInput source="android.svn.url" />
                        <TextInput source="android.svn.user" />
                        <TextInput source="android.svn.password" type="password"/>
                        <FileInput source="android.keystore.file"/>
                        <TextInput source="android.keystore.user" />
                        <TextInput source="android.keystore.password" type="password"/>
                    </FormTab>
                </TabbedForm>
            </Create>
        )
    }
}