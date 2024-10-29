import * as React from 'react';
import { Link } from 'react-router-dom';

export default function TextWithLink({ text, linkName, url }) {
  return (
    <p>
      {text}{' '}
      <Link to={url} style={{ color: '#0b6bcb', textDecoration: 'underline' }}>
        {linkName}
      </Link>
    </p>
  );
}