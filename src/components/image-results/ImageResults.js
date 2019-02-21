import React from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile, IconButton, Dialog, FlatButton } from 'material-ui';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';

class ImageResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            currentImage: '',

        };
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleOpen = (img) => {
        this.setState({ open: true, currentImage: img });
    }

    render() {
        let imageListContent;
        const { images } = this.props;

        if(images){
            imageListContent = (
                <GridList cols={3} >
                    { images.map(img => (
                        <GridTile 
                        title={img.tags} key={img.id} 
                        subtitle={ <span>by <strong>{ img.user }</strong></span> } 
                        actionIcon={
                            <IconButton onClick={() => this.handleOpen(img.largeImageURL)}>
                                <ZoomIn color="white" />
                            </IconButton>
                        }
                        >
                            <img src={img.largeImageURL} alt=""/>
                        </GridTile>
                    )) }
                </GridList>
            )
        } else {
            imageListContent = null
        }

        const actions = [
            <FlatButton label="Close" primary={true} onClick={this.handleClose} />
        ]

        return (
            <div>
                { imageListContent }
                <Dialog  
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <img src={this.state.currentImage} alt="" style={{ width:'100%' }} />
                </Dialog>
            </div>
        );
    }
}

ImageResults.propTypes = {
    images: PropTypes.array.isRequired
};

export default ImageResults;
