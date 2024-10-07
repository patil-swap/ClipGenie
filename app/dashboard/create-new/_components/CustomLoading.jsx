import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import Image from "next/image";

function CustomLoading({ loading }) {
  return (
    <div>
      <AlertDialog open={loading}>
        <AlertDialogContent className="bg-white">
          <AlertDialogTitle></AlertDialogTitle>
          <div className="flex flex-col items-center my-10 justify-center">
            <Image
              src={"/loading.gif"}
              alt="loading"
              width={100}
              height={100}
            />
            <h2>Hold On... Magic in Progress! Do Not Refresh!</h2>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default CustomLoading;
