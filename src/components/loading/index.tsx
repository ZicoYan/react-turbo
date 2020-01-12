import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

// In loading time it is important not to use external styles. Write your own
const styles = {
  div: {
    width: '20%',
    margin: 'auto',
    transition: 'margin 1s',
    backgroundColor: 'lightgreen',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '3px',
  },
};

export default function Loading(props) {
  if (props.error) {
    // If the error happened during loading time, we need to show the block
    // with an advice to make a hard reload (you will understand after PWA section)
    return (
      <div style={styles.div} onClick={() => window.location.reload(true)}>
        <h3>Please, click here or reload the page. New content is ready.</h3>
      </div>
    );
  } else if (props.pastDelay) {
    // If the loading time more than 300ms show the rotating circle
    return <CircularProgress color="primary" />;
  } else {
    // Else do not show Loading at all
    return null;
  }
}
