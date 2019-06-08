import React from 'react';

const tvShow = (props) => {
    console.log(props)
  return (
    <div>
      <br/>
      <img
          src={props.show.image ?
              props.show.image.medium :
              "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwik4OTd1triAhUkmu" +
          "AKHVdUAhMQjRx6BAgBEAU&url=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F7995080%2Fhtml-if-image-is-not-found&" +
          "psig=AOvVaw0VYhpjw5lVDTtwWWebkNKS&ust=1560110521343101"}
          onClick={() => props.selectShow(props.show)} alt=""
      />
    </div>
  );
}

export default tvShow;
