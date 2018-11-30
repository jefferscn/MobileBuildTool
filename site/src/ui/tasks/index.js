import React , { PureComponent } from 'react';
import { List, Datagrid, TextInput , Create , Edit , TabbedForm , SimpleForm , ReferenceInput ,
    SelectInput , DisabledInput , Show , SimpleShowLayout , DateField , ShowButton , FunctionField ,
    EditButton , FormTab , TextField , UrlField , ReferenceField , BooleanInput } from 'admin-on-rest/lib/mui';
import IOSInstallLink from '../IOSInstallLink';
import baseUrl from '../../server/baseUrl';
import FileInput , { FilePreview } from '../FileInput'
import QRCodeField from '../QRCodeField';
import ProjectReferenceField from '../projects/ProjectReferenceField';
import get from 'lodash.get';
const LogField= ({ source, record = {} ,labelSource}) => <a href={`javascript:window.open("${get(record,source)}","log","width=600,height=400")`}>{get(record, labelSource)}</a>; 

export class TaskList extends PureComponent{
    render(){
        return (<List {...this.props} sort={{ field: 'dateOfCreate', order: 'DESC' }}>
            <Datagrid>
                <ProjectReferenceField label="项目" source="projectId" reference="projects">
                </ProjectReferenceField>
                <TextField source="platform" label="平台"/>
                <TextField source="version" label="版本"/>
                <LogField source="status.log" labelSource="status.code" label="状态" />
                <DateField source="dateOfCreate" showTime label="创建日期" />
                <ShowButton/>
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
                    <SelectInput source="platform" defaultValue="android" choices={[
                        { id: 'android', name: 'Android' },
                        { id: 'ios', name: 'IOS' }
                    ]} />
                    <TextInput source="version" label="版本" defaultValue="1.0.0"/>
                    <BooleanInput source="release" label="是否发布" defaultValue ={false}/>
                    <BooleanInput source="debug" label="是否调试版本" defaultValue ={true}/>
                    <FileInput url="./upload" source="package" placeholder="点击上传发布包">
                        <FilePreview/>
                    </FileInput>
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
                    <SelectInput source="platform" default="android" choices={[
                        { id: 'android', name: 'Android' },
                        { id: 'ios', name: 'IOS' }
                    ]} />
                    <BooleanInput source="release" label="是否发布" defaultValue ={false}/>
                    <BooleanInput source="debug" label="是否调试版本" defaultValue ={true}/>
                    <DisabledInput source="status.code" label="状态"/>
                    <FileInput url="./upload" source="package" placeholder="点击上传发布包">
                        <FilePreview/>
                    </FileInput>
                </SimpleForm>
            </Edit>
        )
    }
}

export class TaskShow extends PureComponent{
    render(){
        return (<Show {...this.props} hasEdit={false} hasList={false}>
            <SimpleShowLayout>
                <TextField label="项目" source="project.name" />
                <TextField source="version" label="版本"/>
                <QRCodeField text={ (record)=>`${baseUrl}/#/tasks/${record.id}/show`} source="id" label="二维码"/>
                <IOSInstallLink addLabel = {true} label = "" buttonLabel="安装" source = "targetUrl"/>
            </SimpleShowLayout>
        </Show>)
    }
}