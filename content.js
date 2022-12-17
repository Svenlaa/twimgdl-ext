console.log("Twimgdl is here!");

let downloads = [];

function DOMRegex(regex) {
  let output = [];
  for (let i of document.querySelectorAll("a")) {
    if (regex.test(i.href)) output.push(i);
  }
  return output;
}

function doThing() {
  const elements = DOMRegex(/\/status\/[0-9]{10,25}\/photo\/[0-4]/);
  console.log("---");

  for (const element of elements) {
    const my = document.createElement("button");
    const segments = element.href.split("/");
    const myLink = `http://localhost:5000/tweet/${segments[5]}/${
      segments[7] - 1
    }`;
    console.log(element, element.classList.contains("download"));
    if (element.classList.contains("download")) continue;

    my.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(myLink);
      if (downloads.includes(myLink)) return;
      downloads.push(myLink);
      fetch(myLink, { method: "GET" });
    });

    my.innerText = "💾";

    element.appendChild(my);
    element.classList.add("download");
  }
}

function clear() {
  downloads = [];
}

setInterval(doThing, 500);
setInterval(clear, 5000);
