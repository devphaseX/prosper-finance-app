import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="lg:flex items-center hidden">
        <Image src="/logo.svg" height={28} width={28} alt="logo" />
        <p className="font-semibold text-white text-2xl ml-2.5">Prosper</p>
      </div>
    </Link>
  );
};
