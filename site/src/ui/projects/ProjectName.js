import React from 'react';
import get from 'lodash.get';

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    image: {
        height: 25,
        paddingRight: 5,
    }
}
const ProjectName = ({ record={}, source }) => {
    return (
        <div style={styles.container}>
            <img src={get(record, 'icon.url')} style={styles.image} />
            {get(record, 'name')}
        </div>
    )
}

export default ProjectName;