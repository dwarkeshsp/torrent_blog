import React, { useState, useEffect } from "react";
import WebTorrent from "webtorrent";
import Markdown from "markdown-to-jsx";

export default function Download() {
  const magnetURI =
    "magnet:?xt=urn:btih:7571fa2e788eb589d281db1e6b2ba6fbf329fe33&dn=p2p.md&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com";
  const [data, setData] = useState(null);
  useEffect(() => {
    let client = new WebTorrent();

    client.add(magnetURI, function (torrent) {
      // Got torrent metadata!
      console.log("Client is downloading:", torrent.infoHash);

      torrent.files.forEach(async function (file) {
        // Display the file by appending it to the DOM. Supports video, audio, images, and
        // more. Specify a container element (CSS selector or reference to DOM node).
        const stream = file.createReadStream();
        let data = await readableToString(stream);
        console.log(data);
        setData(data);
        //   file.appendTo("body");
      });
    });

    // download(magnetURI).then((data) => {
    //   console.log(data);
    //   setData(data);
    // });
  }, []);

  return <div>{data === null ? "null" : data}</div>;
}

function download(magnetURI) {
  let client = new WebTorrent();

  client.add(magnetURI, function (torrent) {
    // Got torrent metadata!
    console.log("Client is downloading:", torrent.infoHash);

    torrent.files.forEach(async function (file) {
      // Display the file by appending it to the DOM. Supports video, audio, images, and
      // more. Specify a container element (CSS selector or reference to DOM node).
      const stream = file.createReadStream();
      let data = await readableToString(stream);
      console.log(data);
      return data;
      //   file.appendTo("body");
    });
  });
}

async function readableToString(readable) {
  let result = "";
  for await (const chunk of readable) {
    result += chunk;
  }
  return result;
}
