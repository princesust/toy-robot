import Robot from "../src/robot";
import sinon from "sinon";

let robot;
beforeEach(() => {
  robot = new Robot();
});
describe("place", () => {
  it("should place a robot properly on the table", () => {
    robot.place(0, 1, "north");
    expect(robot.isPlaced).toBeTruthy();
    expect(robot.x).toBe(0);
    expect(robot.y).toBe(1);
    expect(robot.currentFace).toBe("NORTH");
  });

  it("should silently ignore if robot is placed outside the table", () => {
    robot.place(-1, 1, "south");
    expect(robot.isPlaced).toBeFalsy();
    expect(robot.x).toBeNull();
    expect(robot.y).toBeNull();
    expect(robot.currentFace).toBeNull();
  });

  it("should correctly place the robot if place method called multiple times", () => {
    robot
      .place(1, 1, "south")
      .move()
      .place(3, 2, "west");

    expect(robot.isPlaced).toBeTruthy();
    expect(robot.x).toBe(3);
    expect(robot.y).toBe(2);
    expect(robot.currentFace).toBe("WEST");
  });
});

describe("move", () => {
  it("should return null if not placed", () => {
    expect(robot.move().currentFace).toBeNull();
  });
  it("should move one unit to north after being placed", () => {
    robot.place(0, 0, "north").move();
    expect(robot.x).toBe(0);
    expect(robot.y).toBe(1);
  });
  it("should move one unit to east after being placed", () => {
    robot.place(2, 2, "east").move();
    expect(robot.x).toBe(3);
    expect(robot.y).toBe(2);
  });
  it("should move two unit to west after being placed", () => {
    robot
      .place(3, 2, "west")
      .move()
      .move();
    expect(robot.x).toBe(1);
    expect(robot.y).toBe(2);
  });
  it("should move one unit to south after being placed", () => {
    robot.place(2, 2, "south").move();
    expect(robot.x).toBe(2);
    expect(robot.y).toBe(1);
  });
});

describe("left", () => {
  it("should return correct face after rotating left", () => {
    robot.place(1, 1, "north");
    expect(robot.left().currentFace).toBe("WEST");
    expect(robot.left().currentFace).toBe("SOUTH");
    expect(robot.left().currentFace).toBe("EAST");
    expect(robot.left().currentFace).toBe("NORTH");
  });
});

describe("right", () => {
  it("should return correct face after rotating right", () => {
    robot.place(1, 1, "north");
    expect(robot.right().currentFace).toBe("EAST");
    expect(robot.right().currentFace).toBe("SOUTH");
    expect(robot.right().currentFace).toBe("WEST");
    expect(robot.right().currentFace).toBe("NORTH");
  });
});

describe("report", () => {
  it("should return correct position and face", () => {
    let stub = sinon.stub(global.console, "log");
    robot
      .place(2, 3, "south")
      .report()
      .move()
      .report()
      .right()
      .report();

    expect(stub.called).toBeTruthy();
    expect(stub.callCount).toBe(3);
    expect(stub.getCall(0).args.toString()).toBe("2,3,SOUTH");
    expect(stub.getCall(1).args.toString()).toBe("2,2,SOUTH");
    expect(stub.getCall(2).args.toString()).toBe("2,2,WEST");

    stub.restore();
  });
});
