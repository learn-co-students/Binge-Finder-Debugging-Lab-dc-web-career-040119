import React from 'react';

const tvShow = (props) => {
    console.log(props)
  return (
    <div>
      <br/>
      <img src={props.show.image.medium} onClick={() => props.selectShow(props.show)} alt=""/>
    </div>
  );
}

export default tvShow;
