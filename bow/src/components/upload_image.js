import React, { Component } from 'react';
import { Upload, notification, Icon } from 'antd';
import './avatar.css';

export default class UploadImage extends Component {
    state = { imageId: '' }
    beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            notification.error({ message: '您只能上传jpg类型的图片文件' });
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            notification.error({ message: '图片大小必须小于2MB' });
        }
        return isJPG && isLt2M;
    }

    handlePictureChange = ({ file }) => {
        if (file.status === 'done') {
            this.setState({ imageId: file.response.id });
            this.props.done(file);
        }
    }

    render() {
        let imageFolder = '/api/image';
        if (this.props.imageFolder) {
            imageFolder = this.props.imageFolder;
        }
        return <Upload
            className="avatar-uploader"
            name="avatar"
            showUploadList={ false }
            action={ imageFolder }
            beforeUpload={ this.beforeUpload }
            onChange={ this.handlePictureChange }>
            {
                this.state.imageId
                ? <img src={ `${imageFolder}/${this.state.imageId}` } alt="" className="avatar" />
                : this.props.default
                    ? <img src={ `${imageFolder}/${this.props.default}` } alt="" className="avatar" />
                    : <Icon type="plus" className="avatar-uploader-trigger" />
            }
        </Upload>
    }
}