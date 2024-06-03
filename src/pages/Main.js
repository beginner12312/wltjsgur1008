import React from 'react';
import '../styles/Main.css';
import InputForm from '../components/InputForm';

function Main() {
  return (
    <div className="main">
      <InputForm /> {/* InputForm 컴포넌트를 렌더링 */}
    </div>
  );
}

export default Main;
