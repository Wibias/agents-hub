const { pathToFileURL } = await import("node:url");
console.log("argv[1]:", JSON.stringify(process.argv[1]));
console.log("import.meta.url:", import.meta.url);
try {
  console.log("ptfu:", pathToFileURL(process.argv[1]).href);
  console.log("match:", import.meta.url === pathToFileURL(process.argv[1]).href);
} catch (e) {
  console.log("ptfu error:", e.message);
}
