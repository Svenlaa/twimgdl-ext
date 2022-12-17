console.log("Twimgdl is here!");

function DOMRegex(regex) {
  let output = [];
  for (let i of document.querySelectorAll("a")) {
    if (regex.test(i.href)) {
      // or whatever attribute you want to search
      output.push(i);
    }
  }
  return output;
}

async function doThing() {
  const elements = DOMRegex(/[^/]{1,16}\/status\/[0-9]{15,20}\/photo\/[1-4]/);
  console.log("---");
  for (const element of elements) {
    const segments = element.href.split("/");
    const myLink = `http://localhost:5000/tweet/${segments[5]}/${
      segments[7] - 1
    }`;
    console.log(myLink, segments[3]);
    if (segments[3] === "twitter") {
      await fetch(myLink, { method: "GET" });
    }
  }
}

setInterval(doThing, 5000);
