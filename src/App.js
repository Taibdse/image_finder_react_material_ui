import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import Navbar from './components/navbar/Navbar';
import Search from './components/search/Search';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Navbar/>
          <Search/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
