import React from 'react';

const Link = (props) => {
  const {
    href,
    text
  } = props;
  return (
    <div>
      <a href={ href }>{ text }</a>
    </div>
  )
}

export default Link;
