import React from 'react';
import BuyForm from './buy-form';

export default function AddTransaction(props) {
  return (
    <div className="transaction-form-wrapper">
      <BuyForm {...props} />
    </div>
  );
}