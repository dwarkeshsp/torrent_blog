import React, { useState, useEffect } from "react";
import WebTorrent from "webtorrent";
import Markdown from "markdown-to-jsx";

export default function Post() {
  const magnetURI =
    "magnet:?xt=urn:btih:28a86668149f4af5fa43f79d7d03b19b334f794b&dn=godel-wolfram-deutsch.md&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com";

  const [data, setData] = useState("");
  const [seeders, setSeeders] = useState(0);

  // download content
  useEffect(() => {
    let client = new WebTorrent();

    client.add(magnetURI, function (torrent) {
      console.log("Client is downloading:", torrent.infoHash);
      setSeeders(torrent.numPeers);

      torrent.files.forEach(async function (file) {
        const stream = file.createReadStream();
        let data = "";
        for await (const chunk of stream) {
          data += chunk;
        }
        setData(data);
      });
    });
  }, []);

  return (
    <div>
      <p>{"Seeders: " + seeders}</p>
      <Markdown>{data}</Markdown>
    </div>
  );
}
