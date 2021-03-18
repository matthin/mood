import React, { useEffect, useState } from "react";
import "./mood.css";

const Mood = {
  energy: 0,
  happiness: 0,
};

export default function MoodPage() {
  let [userMood, setUserMood] = useState({ ...Mood });
  let [avgMood, setAvgMood] = useState({ ...Mood });
  
  useEffect(() => {
    (async () => {
      setUserMood(await grabUserMood());
      setAvgMood(await grabAvgMood());
    })();
  }, []);

  return (
    <table class="mood table">
      <thead>
        <tr>
          <th></th>
          <th>Your Mood</th>
          <th>Average Mood</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Energy</th>
          <td>{userMood.energy}</td>
          <td>{avgMood.energy}</td>
        </tr>
        <tr>
          <th>Happiness</th>
          <td>{userMood.happiness}</td>
          <td>{avgMood.happiness}</td>
        </tr>
      </tbody>
    </table>
  );
}

async function grabUserMood() {
  const token = sessionStorage.getItem("token");

  let res = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=50", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  let body = await res.json();
  const tracks = body.items.map(item => item.track.id).join(",");

  res = await fetch(`https://api.spotify.com/v1/audio-features?ids=${tracks}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  body = await res.json();

  const mood = { ...Mood };

  body.audio_features.forEach(feature => {
    mood.energy += feature.energy;
    mood.happiness += feature.valence;
  });

  mood.energy /= body.audio_features.length;
  mood.happiness /= body.audio_features.length;

  mood.energy = Math.round(mood.energy * 100);
  mood.happiness = Math.round(mood.happiness * 100);

  return mood;
}

async function grabAvgMood() {
  const token = sessionStorage.getItem("token");

  let res = await fetch("https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  let body = await res.json();
  const tracks = body.tracks.items.map(item => item.track.id).join(",");

  res = await fetch(`https://api.spotify.com/v1/audio-features?ids=${tracks}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  body = await res.json();

  const mood = { ...Mood };

  body.audio_features.forEach(feature => {
    mood.energy += feature.energy;
    mood.happiness += feature.valence;
  });
  
  mood.energy /= body.audio_features.length;
  mood.happiness /= body.audio_features.length;
  
  mood.energy = Math.round(mood.energy * 100);
  mood.happiness = Math.round(mood.happiness * 100);

  return mood;
}