var fs = require("fs");

const getDatastream = () => {
  const inputText = fs.readFileSync("./input.txt").toString();
  //console.log(inputText);

  return inputText;
};

const getDatastreamReader = (datastream, size) => {
  const datastreamReader = {
    buffer: datastream.slice(size),
    marker: datastream.slice(0, size),
    position: size,
  };
  //console.log(datastreamReader);
  return datastreamReader;
};

const allUnique = (str = "") => {
  for (let i = 0; i < str.length; i++) {
    const el = str[i];
    if (str.indexOf(el) !== str.lastIndexOf(el)) {
      return false;
    }
  }
  return true;
};

const getMarkerPosition = (datastreamReader) => {
  let size = datastreamReader.buffer.length;
  for (let i = 0; i < size; i++) {
    if (allUnique(datastreamReader.marker)) {
      return datastreamReader.position;
    }

    datastreamReader.marker = datastreamReader.marker.substring(1);
    datastreamReader.marker += datastreamReader.buffer[0];
    datastreamReader.buffer = datastreamReader.buffer.substring(1);
    datastreamReader.position += 1;
  }
  return 0;
};

/* -- Exec. -- */

console.log("\n" + "--- Advent of Code 2022 ---");
console.log("--- Day 6: Tuning Trouble ---" + "\n");

console.log("--- Part 1 ---");
console.log(
  "How many characters need to be processed before the first start-of-packet marker is detected?" +
    "\n"
);

const datastream = getDatastream();
const datastreamReader = getDatastreamReader(datastream, 4);
const position = getMarkerPosition(datastreamReader);

console.log(
  position +
    " characters need to be processed to detect the first packet marker" +
    "\n"
);

console.log("--- Part 2 ---");
console.log(
  "How many characters need to be processed before the first start-of-message marker is detected?" +
    "\n"
);

const datastreamReaderMessage = getDatastreamReader(datastream, 14);
const positionMessage = getMarkerPosition(datastreamReaderMessage);

console.log(
  positionMessage +
    " characters need to be processed to detect the first message marker" +
    "\n"
);
