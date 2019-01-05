import React , { PureComponent } from 'react';
import { required } from 'admin-on-rest';
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
                <EditButton/>
            </Datagrid>
        </List>);
    }
}

export class TaskCreate extends PureComponent{
    render(){
        return (
            <Create {...this.props}>
                <SimpleForm>
                    <ReferenceInput label="项目" allowEmpty source="projectId" reference="projects" validate={required}>
                        <SelectInput optionText="name" />
                    </ReferenceInput>
                    <SelectInput source="platform" defaultValue="android" choices={[
                        { id: 'android', name: 'Android' },
                        { id: 'ios', name: 'IOS' }
                    ]} />
                    <TextInput source="version" label="版本" defaultValue="1.0.0"/>
                    <BooleanInput source="release" label="是否发布" defaultValue ={false}/>
                    <BooleanInput source="debug" label="是否调试版本" defaultValue ={true}/>
                    <FileInput url="./upload" source="package" placeholder="点击上传发布包" validate={required}>
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
                    <ReferenceInput label="项目" allowEmpty source="projectId" reference="projects" >
                        <SelectInput optionText="name"  options={{disabled:true}} />
                    </ReferenceInput>
                    <SelectInput source="platform" default="android" choices={[
                        { id: 'android', name: 'Android' },
                        { id: 'ios', name: 'IOS' }
                    ]} options={{disabled:true}} />
                    <BooleanInput source="release" label="是否发布" defaultValue={false} options={{disabled:true}}/>
                    <BooleanInput source="debug" label="是否调试版本" defaultValue={true} options={{disabled:true}} />
                    <DisabledInput source="status.code" label="状态" />
                    <FunctionField label="发布包" render={record=><a href={record.package.url} style={{display:'flex', marginTop:5}}>{record.package.filename}</a>}></FunctionField>
                    <BooleanInput source="repackage" label="重新打包" defaultValue={false}/>
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
                <FunctionField label="平台" render={record => record.platform === 'ios'?'IOS':'Android'} />
                <TextField source="version" label="版本"/>
                <FunctionField label="类型" render={record => record.debug ?'调试':'发布'} />
                <QRCodeField text={ (record)=>`${baseUrl}/#/tasks/${record.id}/show`} source="id" label="二维码"/>
                <IOSInstallLink addLabel = {true} label = "" buttonLabel="安装" source = "targetUrl"/>
            </SimpleShowLayout>
        </Show>)
    }
}