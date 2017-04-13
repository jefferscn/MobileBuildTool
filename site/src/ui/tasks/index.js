import React , { PureComponent } from 'react';
import { List, Datagrid, TextInput , Create , Edit , TabbedForm , SimpleForm , ReferenceInput ,
    SelectInput , DisabledInput ,
    EditButton , FormTab , TextField , UrlField , ReferenceField , BooleanInput } from 'admin-on-rest/lib/mui';

export class TaskList extends PureComponent{
    render(){
        return (<List {...this.props}>
            <Datagrid>
                <ReferenceField label="项目" source="projectId" reference="projects">
                    <TextField source="name" />
                </ReferenceField>
                <TextField source="platform" label="平台"/>
                <TextField source="version" label="版本"/>
                <TextField source="status.code" label="状态" />
                <EditButton />
            </Datagrid>
        </List>);
    }
}

export class TaskCreate extends PureComponent{
    render(){
        return (
            <Create {...this.props}>
                <SimpleForm>
                    <ReferenceInput label="项目" allowEmpty source="projectId" reference="projects">
                        <SelectInput optionText="name" />
                    </ReferenceInput>
                    <SelectInput source="platform" choices={[
                        { id: 'android', name: 'Android' },
                        { id: 'ios', name: 'IOS' }
                    ]} />
                    <TextInput source="version" label="版本" defaultValue="1.0.0"/>
                    <BooleanInput source="release" label="是否发布" defaultValue ={false}/>
                </SimpleForm>
            </Create>
        )
    }
}

export class TaskEdit extends PureComponent{
    render(){
        return (
            <Edit {...this.props}>
                <SimpleForm>
                    <ReferenceInput label="项目" allowEmpty source="projectId" reference="projects">
                        <SelectInput optionText="name" />
                    </ReferenceInput>
                    <SelectInput source="platform" choices={[
                        { id: 'android', name: 'Android' },
                        { id: 'ios', name: 'IOS' }
                    ]} />
                    <TextInput source="version" label="版本" defaultValue="1.0.0"/>
                    <BooleanInput source="release" label="是否发布" defaultValue ={false}/>
                    <DisabledInput source="status.code" label="状态"/>
                </SimpleForm>
            </Edit>
        )
    }
}
