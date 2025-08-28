
import React from 'react';
import { LeafIcon } from './IconComponents';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-center">
        <LeafIcon className="h-8 w-8 text-green-500 mr-3"/>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
          송파구 시설 날씨 정보
        </h1>
      </div>
    </header>
  );
};

export default Header;
