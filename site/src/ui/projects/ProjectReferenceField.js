import React from 'react';
import { ReferenceField } from 'admin-on-rest/lib/mui';
import ProjectName from './ProjectName';

const ProjectReferenceField = (props) => {
    return (
        <ReferenceField source="projectId" reference="projects" {...props}>
            <ProjectName />
        </ReferenceField>
    )
};

export default ProjectReferenceField;
