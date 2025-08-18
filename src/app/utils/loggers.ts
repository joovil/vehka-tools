const RESET = "\x1b[0m";
const RED = "\x1b[31m";
const PURPLE = "\x1b[35m";
const YELLOW = "\x1b[33m";
const GREEN = "\x1b[32m";
const MAGENTA = "\x1b[35m"; // Magenta and purple are often the same in ANSI

export function printRed(message: string) {
  console.log(`${RED}${message}${RESET}`);
}

export function printPurple(message: string) {
  console.log(`${PURPLE}${message}${RESET}`);
}

export function printYellow(message: string) {
  console.log(`${YELLOW}${message}${RESET}`);
}

export function printGreen(message: string) {
  console.log(`${GREEN}${message}${RESET}`);
}

export function printMagenta(message: string) {
  console.log(`${MAGENTA}${message}${RESET}`);
}
