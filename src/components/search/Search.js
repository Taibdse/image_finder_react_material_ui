import React from 'react';
import { TextField, SelectField, MenuItem } from 'material-ui';
import axios from 'axios';
import ImageResults from '../image-results/ImageResults';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            amount: 15,
            apiUrl: 'https://pixabay.com/api',
            apiKey: '8780392-e95a36fe89b2554a643157774',
            images: []
        };
    }

    onTextChange = e => {
        let { value, name } = e.target;
        this.setState({ [name]: value }, () => {
            if(value === ''){
                this.setState({ images: [] });
            } else {
                let { apiUrl, apiKey, searchText, amount } = this.state;
                const url = `${apiUrl}/?key=${apiKey}&q=${searchText}&image_type=photo&per_page=${amount}&safesearch=true`;
                axios.get(url)
                .then(res => this.setState({ images: res.data.hits }))
                .catch(err => console.log(err));
            }
        });
    }

    onAmountChange = (e, index, value) => {
        this.setState({ amount: value });
    }

    render() {
        // console.log(this.state.images);
        return (
            <div>
                <TextField 
                name="searchText" 
                value={this.state.searchText} 
                onChange={this.onTextChange} 
                floatingLabelText="Search for images"
                fullWidth={true}
                />
                <br/>
                <SelectField name="amount" 
                floatingLabelText="Amount"
                value={this.state.amount}
                onChange={this.onAmountChange}
                >
                    <MenuItem value={5} primaryText="5" />
                    <MenuItem value={10} primaryText="10" />
                    <MenuItem value={15} primaryText="15" />
                    <MenuItem value={30} primaryText="30" />
                    <MenuItem value={50} primaryText="50" />
                </SelectField>
                <br/>
                {this.state.images.length > 0 ? (<ImageResults images={this.state.images} />) : null}
            </div>
        );
    }
}

export default Search;
