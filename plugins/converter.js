const fs = require("fs");
const path = require("path");

// Function to convert a JavaScript file to a binary file
function convertToBinary(inputFilePath, outputFilePath, deleteOriginal = false) {
  try {
    // Check if the input file exists
    if (!fs.existsSync(inputFilePath)) {
      console.error(`Error: File "${inputFilePath}" does not exist.`);
      return;
    }

    // Read the JavaScript file
    const scriptContent = fs.readFileSync(inputFilePath, "utf-8");

    // Convert the content to a binary buffer
    const binaryBuffer = Buffer.from(scriptContent, "utf-8");

    // Write the binary buffer to the output file
    fs.writeFileSync(outputFilePath, binaryBuffer);
    console.log(`Converted "${inputFilePath}" to binary file "${outputFilePath}".`);

    // Optionally delete the original file
    if (deleteOriginal) {
      fs.unlinkSync(inputFilePath);
      console.log(`Original file "${inputFilePath}" has been deleted.`);
    }
  } catch (error) {
    console.error(`Error during conversion: ${error.message}`);
  }
}

// Configuration: Specify the paths for each command in the "scs" folder
const commands = [
  { name: "play", path: path.join(__dirname, "scs", "play.js") },
  { name: "menu", path: path.join(__dirname, "scs", "menu.js") },
  { name: "repo", path: path.join(__dirname, "scs", "repo.js") },
  { name: "ping", path: path.join(__dirname, "scs", "ping.js") },
];

// For each command, convert the JS file to a binary file
commands.forEach((command) => {
  const inputFile = command.path;
  const outputFile = path.join(__dirname, "scs", `${command.name}.bin`);
  const deleteOriginal = true; // Set to true to delete the original file

  convertToBinary(inputFile, outputFile, deleteOriginal);
});
