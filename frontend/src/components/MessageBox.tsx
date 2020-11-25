import React from 'react';
interface props {
    variant: string;
    children: string;
  }

export default function MessageBox(props:props) {
  return (
    <div className={`alert alert-${props.variant || 'info'}`}>
      {props.children}
    </div>
  );
}