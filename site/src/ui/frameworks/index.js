import React , { PureComponent } from 'react';
import { List, Datagrid, TextInput , Create , Edit , TabbedForm , Show ,ReferenceField , ShowButton ,
    SimpleForm ,DeleteButton,
    SimpleShowLayout , EditButton , FormTab , TextField , UrlField, SimpleList, Responsive } from 'admin-on-rest/lib/mui';
// import RichTextInput from 'aor-rich-text-input';
import FileInput , { FilePreview } from '../FileInput'
import IOSInstallLink from '../IOSInstallLink';
import baseUrl from '../../server/baseUrl';
import QRCodeField from '../QRCodeField';

export class FrameworkList extends PureComponent{
    render(){
        return (
            <List {...this.props}>
                <Responsive
                    small={
                        <SimpleList
                            primaryText={record => record.name}
                            secondaryText={record => `desc ${record.desc}`}
                        />
                    }

                    medium={
                        <Datagrid>
                            <TextField source="name" />
                            <TextField source="desc" />
                            <EditButton />
                        </Datagrid>
                    }
                />
            </List>
        );
    }
}

export class FrameworkCreate extends PureComponent{
    render(){
        return (
            <Create {...this.props}>
                <SimpleForm>
                    <TextInput source="name" />
                    <TextInput source="desc" />
                    <TextInput source="url" />
                </SimpleForm>
            </Create>
        )
    }
}

export class FrameworkEdit extends PureComponent{
    render(){
        return (
            <Edit {...this.props}>
                <SimpleForm>
                    <TextField source="name" />
                    <TextInput source="desc" />
                    <TextInput source="url" />
                </SimpleForm>
            </Edit>
        )
    }
}
