import React from "react";
import "./index.css";

export default function IndexPage() {
  return (
    <section className="index">
      <p>Can your 20 most recently played Spotify songs determine your mood?</p>
      <button className="button is-success is-rounded" onClick={connect}>Connect to Spotify</button>
    </section>
  )
}

function connect() {
  const id = "fa510d9c8dca414aa4e7bfacf2af5247";
  const type = "token";
  const redirect = "http://localhost:8000/callback";
  const scope = "user-read-recently-played";

  window.location.href = `https://accounts.spotify.com/authorize?client_id=${id}&response_type=${type}&redirect_uri=${redirect}&scope=${scope}`;
}