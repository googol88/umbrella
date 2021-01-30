import React, { useCallback, useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  Input,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import './App.css';
import StickyGrid from './components/StickyGrid';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isFetching: null,
      url: '/api',
      stickyMessage: 'ledefault'
    }
    this.fetchData = this.fetchData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  /*const [message, setMessage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [url, setUrl] = useState('/api');*/
  
  fetchData() {
    fetch(this.state.url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({message: json.message, fetching: false}); /*setMessage(json.message)*/
        /*this.setIsFetching(false);*/
      }).catch(e => {
        this.setState({message: `API call failed: ${e}`, fetching: false});
        /*setMessage(`API call failed: ${e}`);
        setIsFetching(false);*/
      })
  };

  /*useEffect(() => {
    setIsFetching(true);
    fetchData();
  }, [fetchData]);*/

  componentDidMount() {
    this.setState({isFetching: true});
    this.fetchData();
    // Will. put jquery stuff there
    // https://reactjs.org/docs/integrating-with-other-libraries.html
  }

  handleChange(e) {
    this.setState({stickyMessage: e.target.value});
  }
  handleSubmit(e) {
    alert(this.state.stickyMessage);
    /*this.setState((message) => { 
      let stickyMessage = e.target.value;
      alert(stickyMessage);
      return {stickyMessage}
    });*/
    //alert(this.state.stickyMessage);
    e.preventDefault();
  }
  
  render() {
    return (
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <VStack spacing={8}>
              <StickyGrid />
              <form onSubmit={this.handleSubmit}>
                <Input placeholder="Enter message" value={this.state.value} onChange={this.handleChange}></Input>
              </form>
              { process.env.NODE_ENV === 'production' ?
                  <Text>
                    This is a production build from create-react-app.
                  </Text>
                : <Text>
                    Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
                  </Text>
              }
              <Text>{'« '}
              {this.state.isFetching
                ? 'Fetching message from API'
                : this.state.message}
              {' »'}</Text>
              <Link
                color="teal.500"
                href="https://chakra-ui.com"
                fontSize="2xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn Chakra
              </Link>
            </VStack>
          </Grid>
        </Box>
      </ChakraProvider>
    );
  }
}

export default App;
/*
import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [url, setUrl] = useState('/api');

  const fetchData = useCallback(() => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        setMessage(json.message);
        setIsFetching(false);
      }).catch(e => {
        setMessage(`API call failed: ${e}`);
        setIsFetching(false);
      })
  }, [url]);

  useEffect(() => {
    setIsFetching(true);
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        { process.env.NODE_ENV === 'production' ?
            <p>
              This is a production build from create-react-app.
            </p>
          : <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
        }
        <p>{'« '}<strong>
          {isFetching
            ? 'Fetching message from API'
            : message}
        </strong>{' »'}</p>
        <p><a
          className="App-link"
          href="https://github.com/mars/heroku-cra-node"
        >
          React + Node deployment on Heroku
        </a></p>
        <p><a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a></p>
      </header>
    </div>
  );

}

export default App;
*/