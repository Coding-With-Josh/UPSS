
import React from 'react';
import { extractNameFromEmail } from '@/utils/extractNameFromEmail';

const email = 'idele.joshua@upsssuab.com';
const name = extractNameFromEmail(email);

const SomeComponent: React.FC = () => {
  return (
    <div>
      <p>Email: {email}</p>
      <p>Name: {name}</p>
    </div>
  );
};

export default SomeComponent;