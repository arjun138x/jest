# Tennis-test

Goal: Re-create a game of tennis in TypeScript including:

    - 2 players
    - The basic rules of Tennis

## Basic Rules of Tennis
    - Players scores one at a time
    - The score of a player increments in the following way: 0 - 15 - 30 - 40
    - When only one player has score 40 and he scores, then this player wins. Return `player x wins`
    - When both players have score 40, then return `deuce`
    - When player scores and there is deuce, then the scoring player gets advantage. Return `player x adv`
    - When player has advantage and scores again then this player wins. Return `player x wins`
    - When player has advantage and the other player scores, it goes back to `deuce`

## Out of scope
    - We are counting only one game
    - Server/receiver advantage counting (Advantage-In, Advantage-Out)
    - Tied score using all (15-all)
    - Love as zero (15-love, 30-love)
    - There is no need to reset the score after one player wins the game

## Available commands:
    - npm test (runs the `test.ts` file with jest)

##
    - to use JavaScript, change branch to `es5`
