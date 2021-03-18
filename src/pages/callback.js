import React, { useEffect } from "react";

export default function CallbackPage({ location }) {
  useEffect(() => {
    const params = new URLSearchParams(location.hash.substring(1));
    sessionStorage.setItem("token", params.get("access_token"));

    window.location.href = `${window.location.protocol}//${window.location.host}/mood`;
  }, [location.hash]);

  return <></>;
}