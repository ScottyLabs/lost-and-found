import * as React from 'react';
import { Segment } from 'semantic-ui-react';

export default function MainFooter() {
  return (
    <footer style={{ position: 'relative', marginTop: '1em' }}>
      <Segment className="absolute bottom-0 w-full text-center">
        <p className="black w-[100px] bg-blue-600">
          Developed with ❤️ by
          <a href="https://scottylabs.org/" target="_blank" rel="noreferrer">
            {' '}
            ScottyLabs
          </a>
        </p>
      </Segment>
    </footer>
  );
}
