import React from 'react';
import { Todo } from 'react-environment';

class MyApp extends React.Component {
  render() {
    return (
      <div>
        <div>My Application</div>
        <div>
          <Todo message='Hello world' condition={2 === 1 + 1} />
        </div>
      </div>
    );
  }
}

export default MyApp;
