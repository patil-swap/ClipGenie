import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <div className="p-3 px-5 flex items-center justify-between shadow-md">
      <div className="flex gap-3 items-center">
        <Image src={"/logo.svg"} alt="logo" width={55} height={55} />
      </div>
      <div className="flex gap-3 items-center">
        <div className="flex gap-1 items-center">
          <Image src={"/coin.png"} width={20} height={20} alt="credits" />
          <h2 className="font-bold">{userDetail?.credits}</h2>
        </div>
        <Link href={"/dashboard"}>
          <Button>Dashboard</Button>
        </Link>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
