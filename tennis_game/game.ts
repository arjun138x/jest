const score: number[] = [0, 0];
const nextScore = {
  "0": 15,
  "15": 30,
  "30": 40,
};

const game = {
  getScore: (): string => {
    // if both has score  more then 40
    if (score[0] >= 40 && score[1] >= 40) {
      if (score[0] === score[1]) return "deuce";
      const diff = score[0] - score[1];
      //   if diff is 2 then return winner
      if (Math.abs(diff) === 2) return `player ${diff > 0 ? "x" : "y"} wins`;
      //   else return adv
      return `player ${diff > 0 ? "x" : "y"} adv`;
    }
    // if any one player has more then 40
    else if (score[0] > 40 || score[1] > 40) {
      return score[0] > score[1] ? "player x wins" : "player y wins";
    }
    return score.join("-");
  },

  updateScore: (person: string): string => {
    if (person === "reset") {
      score[0] = 0;
      score[1] = 0;
      return game.getScore();
    }

    const index = person === "x" ? 0 : 1;
    const currentScore = score[index];
    const newScore = nextScore[currentScore] || currentScore + 1;
    score[index] = newScore;

    // Return the updated score after scoring
    return game.getScore();
  },
};

export default game;
