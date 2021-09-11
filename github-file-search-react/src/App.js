import React from 'react';
import Header from './components/Header';
import FilesList from './components/FilesList';
import SearchView from './components/SearchView';
import {
  ESCAPE_CODE,
  HOTKEY_CODE,
  UP_ARROW_CODE,
  DOWN_ARROW_CODE
} from './utils/keyCodes';
import files from './utils/api';
import InfoMessage from './components/InfoMessage';

export default class App extends React.Component {
  state = {
    isSearchView: false,
    filesList: files,
    counter: 0
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEvent);
  }

  handleEvent = (event) => {
    const { filesList, counter } = this.state;
    const keyCode = event.keyCode || event.which;

    switch (keyCode) {
      case HOTKEY_CODE:
        this.setState((prevState) => ({
          isSearchView: true,
          filesList: prevState.filesList.filter((file) => file.type === 'file')
        }));
        break;
      case ESCAPE_CODE:
        this.setState({ isSearchView: false, filesList: files });
        break;
      case UP_ARROW_CODE:
        if (counter > 0) {
          this.setState({ counter: counter - 1 });
        }
        break;
      case DOWN_ARROW_CODE:
        if (counter < filesList.length - 1) {
          this.setState({ counter: counter + 1 });
        }
        break;
      default:
        break;
    }
  };

  handleSearch = (searchTerm) => {
    let list;
    if (searchTerm) {
      const pattern = new RegExp(searchTerm, 'gi');
      list = files
        .filter(
          (file) =>
            file.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 &&
            file.type === 'file'
        )
        .map((file) => {
          return {
            ...file,
            name: file.name.replace(pattern, (match) => {
              return `<mark>${match}</mark>`;
            })
          };
        });
    } else {
      list = files.filter((file) => file.type === 'file');
    }

    this.setState({
      filesList: list,
      counter: 0
    });
  };

  render() {
    const { isSearchView, counter, filesList } = this.state;

    return (
      <div className="container">
        <Header />
        {isSearchView ? (
          <div className="search-view">
            <SearchView onSearch={this.handleSearch} />
            <InfoMessage />
            <FilesList
              files={filesList}
              isSearchView={isSearchView}
              counter={counter}
            />
          </div>
        ) : (
          <FilesList files={filesList} />
        )}
      </div>
    );
  }
}
