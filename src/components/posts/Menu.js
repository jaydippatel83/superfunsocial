import { IonIcon } from "@ionic/react";
import React from "react";
import {
  bookmarkOutline,
  notificationsOffOutline,
  flagOutline,
  stopCircleOutline,
  shareOutline,
  trashBinOutline,
} from "ionicons/icons";

const Menu = ({ hash, uuid }) => {
  return (
    <div className="absolute right-0 mt-2 w-[245px] bg-white rounded-lg shadow-lg z-10 dark:bg-slate-700">
      <nav className="flex flex-col p-2 space-y-1">
        <a
          href="#"
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600"
        >
          <IonIcon className="text-xl shrink-0" icon={flagOutline}></IonIcon>{" "}
          Report this post
        </a>
        <a
          href="#"
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600"
        >
          <IonIcon className="text-xl shrink-0" icon={shareOutline}></IonIcon>{" "}
          Share your profile
        </a>
        <a
          href="#"
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600"
          onClick={async (e) => {
            e.preventDefault();
            await fetch("/api/casts", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                signerUid: uuid,
                hash,
              }),
            }).then(() => {
              window.location.reload();
            });
          }}
        >
          <IonIcon
            className="text-xl shrink-0"
            icon={trashBinOutline}
          ></IonIcon>{" "}
          Delete
        </a>
      </nav>
    </div>
  );
};

export default Menu;
