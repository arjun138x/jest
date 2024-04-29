import game from "./game"; // Import the game module

describe("Tennis Game Tests", () => {
  beforeEach(() => {
    // Reset score and advantage before each test
    expect(game.updateScore("reset")).toBe("0-0");
  });

  test('Initial score is "0-0"', () => {
    expect(game.getScore()).toBe("0-0");
  });

  test("Player x wins after scoring four times consecutively", () => {
    game.updateScore("x");
    game.updateScore("x");
    game.updateScore("x");
    game.updateScore("x");
    expect(game.getScore()).toBe("player x wins");
  });

  test("Player y wins after scoring four times consecutively", () => {
    game.updateScore("y");
    game.updateScore("y");
    game.updateScore("y");
    game.updateScore("y");
    expect(game.getScore()).toBe("player y wins");
  });

  test("Deuce is reached after both players score four times consecutively", () => {
    game.updateScore("x");
    game.updateScore("x");
    game.updateScore("x");
    game.updateScore("y");
    game.updateScore("y");
    game.updateScore("y");
    expect(game.getScore()).toBe("deuce");
  });

  test("Player x gets advantage after deuce and scores", () => {
    game.updateScore("x");
    game.updateScore("x");
    game.updateScore("x");
    game.updateScore("y");
    game.updateScore("y");
    game.updateScore("y");
    expect(game.getScore()).toBe("deuce");
    game.updateScore("x");
    expect(game.getScore()).toBe("player x adv");
  });

  test("Player x wins after having advantage and scoring", () => {
    game.updateScore("x");
    game.updateScore("x");
    game.updateScore("x");
    game.updateScore("y");
    game.updateScore("y");
    game.updateScore("y");
    game.updateScore("x");
    expect(game.getScore()).toBe("player x adv");
    game.updateScore("x");
    expect(game.getScore()).toBe("player x wins");
  });
});
