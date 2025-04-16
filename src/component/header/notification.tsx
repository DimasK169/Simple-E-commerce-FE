import React, { useEffect } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Pusher from "pusher-js";

const pusher = new Pusher("33c159ea672431fa279c", {
  cluster: "ap1",
});

export default function Notification() {
  useEffect(() => {
    const channel = pusher.subscribe("flash-sale");
    channel.bind("create", function (data) {
      alert(JSON.stringify(data));
    });
    return () => channel.unsubscribe();
  }, []);
  return (
    <button className="text-gray-700 hover:text-red-500">
      <NotificationsIcon />
    </button>
  );
}
