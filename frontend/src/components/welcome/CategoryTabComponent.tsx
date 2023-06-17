import React, { useEffect, useState } from 'react';

interface ChildProp {
  text: String;
  img: React.ReactNode;
}
const CategoryTab: React.FC<ChildProp>= (props) => {

  return (
    <div className='category-tab'>
      <span className='category-img'>{props.img}</span>
      <span className='category-text'>{props.text}</span>
    </div>
  )
}

export default CategoryTab;