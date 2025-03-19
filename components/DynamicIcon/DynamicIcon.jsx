'use client'
import dynamic from 'next/dynamic'
import React from 'react';

const DynamicIconLoader = ({ iconName,library }) => {
    const DynamicIcon = dynamic(() => import(`react-icons/io5`).then((module) => module[iconName]), {
      loading: () => <p>Loading...</p>,
    });
  
    return <DynamicIcon />;
};
  

const DynamicIcon = ({ iconName }) => {
  
  return (
    <DynamicIconLoader iconName={'IoShirtOutline'}></DynamicIconLoader>
  );
};

export default DynamicIcon;