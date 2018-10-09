class Parser {
  parseArgs(args) {
    if (!args.length) {
      return false;
    }
    let argsArray = args
      .split("\n")
      .map(item => item.trim().toLowerCase())
      .reduce((acc, raw) => {
        acc.push(this.parseInstruction(raw));
        return acc;
      }, []);
    return argsArray;
  }
  parseInstruction(instruction) {
    let multiWord = instruction.split(" ");
    if (multiWord.length > 1 && multiWord[0].toLowerCase() === "place") {
      return {
        command: "place",
        args: multiWord[1]
      };
    } else if (instruction.toLowerCase() === "move") {
      return { command: "move" };
    } else if (instruction.toLowerCase() === "report") {
      return { command: "report" };
    } else if (instruction.toLowerCase() === "left") {
      return { command: "left" };
    } else if (instruction.toLowerCase() === "right") {
      return { command: "right" };
    }
  }
}

export default Parser;
