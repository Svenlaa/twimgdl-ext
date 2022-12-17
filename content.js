console.log("Twimgdl is here!");

let downloads = [];
let isOnline = null;

function clear() {
  downloads = [];
}

async function getStatus() {
  isOnline = !!(await fetch("http://localhost:5000/status", {
    method: "GET",
  }));
}
getStatus();

function DOMRegex(regex) {
  let output = [];
  for (let i of document.querySelectorAll("a")) {
    if (regex.test(i.href)) output.push(i);
  }
  return output;
}

async function doThing() {
  if (!isOnline) return;
  const elements = DOMRegex(/\/status\/[0-9]{10,25}\/photo\/[0-4]/);

  for (const element of elements) {
    const button = document.createElement("button");
    const segments = element.href.split("/");
    const myLink = `http://localhost:5000/tweet/${segments[5]}/${
      segments[7] - 1
    }`;
    if (element.classList.contains("download")) continue;

    button.addEventListener("click", (e) => {
      e.preventDefault();
      if (downloads.includes(myLink)) return;
      downloads.push(myLink);
      fetch(myLink, { method: "GET" });
    });

    button.innerText = "💾";

    element.appendChild(button);
    element.classList.add("download");
  }
}

setInterval(doThing, 500);
setInterval(clear, 5000);
setInterval(getStatus, 10000);
