import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function EmptyState() {
  return (
    <div className="p-5 py-24 flex items-center flex-col mt-20 border-2 border-dashed ">
      <h2>You dont have any short video generated</h2>
      <Link href={"/dashboard/create-new"}>
        <Button>Create New Video</Button>
      </Link>
    </div>
  );
}

export default EmptyState;
