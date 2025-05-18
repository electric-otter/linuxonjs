// Simulated CPU state
const CPUStart = new Map([
  ["1", 1],
  ["0", 1],
]);

// Simple string comparison
let text1 = "A";
let text2 = "B";
let result = text1 < text2;

// Operand map
const operands = new Map([
  ["z", "A"],
  ["d", "B"],
  ["result", "A" < "B"],
]);

// Addressing mode
const addressingMode = new Map([
  ["x", 5]
]);

// Fake contentScriptOptions
const contentScriptOptions = {
  world: () => "LeviWorldContext"
};

const register = new Map([
  ["world", contentScriptOptions.world()]
]);

// Worker setup (just list, not a Map)
const workers = [
  new Worker("worker.js"),
  new Worker("worker.js", { type: "module" })
];

// HTML escape (unused, but cleaned up)
const htmlEscapeMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
};

const c = () => {
  fetch('/endpoint')
    .then(res => res.text())
    .then((result) => {
      const reg = /[&<>"'/]/ig;
      const sanitized = result.replace(reg, (match) => htmlEscapeMap[match]);
      if (typeof b === "function") b(sanitized);
    });
};

// Simulated virtual file structure
const data = {
  "home": {
    "another_folder": {
      "third_folder": {
        "0": "test.txt",
      }
    }
  },
  "user": {
    "0": "up_file.txt",
    "another_folder2": {
      "third_folder2": ["test1.txt", "test2.png", "test3.pdf"]
    }
  }
};

// Path resolver
function generatePath(value, currentPath = '', currentObject = data) {
  for (const property in currentObject) {
    if (currentObject[property] === value) {
      return `${currentPath}/${value}`;
    }
    if (typeof currentObject[property] === 'object') {
      const result = generatePath(value, `${currentPath && currentPath + '/'}${property}`, currentObject[property]);
      if (result) {
        return result;
      }
    }
  }
  return "Not found";
}

// Simulated wget function
function wgetJS(url, path = "/tmp/file.txt") {
  fetch(url)
    .then(res => res.text())
    .then(data => {
      console.log(`Downloaded from ${url} to ${path}`);
      virtualFileSystem.set(path, data);
    })
    .catch(err => {
      console.error(`wget failed: ${err.message}`);
    });
}

// Virtual FileSystem
const virtualFileSystem = new Map();

// Bash command simulator
function startBash(command) {
  try {
    const [cmd, ...args] = command.split(" ");

    switch (cmd) {
      case "echo":
        return args.join(" ");
      case "pwd":
        return window.location.pathname;
      case "wget":
        wgetJS(args[0], args[1]);
        return `Fetching ${args[0]}...`;
      case "ls":
        return JSON.stringify(data, null, 2);
      default:
        return `Command not recognized: ${cmd}`;
    }
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

// Display paths on screen
document.write(
  generatePath("test.txt"), '<br>',
  generatePath("test1.txt"), '<br>',
  generatePath("test2.png"), '<br>',
  generatePath("test3.pdf")
);
