/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

const countryList = ['russia', 'china', 'india', 'america', 'brazil', 'europe'];

const rondel = [
  'tax',
  'factory',
  'produce',
  'manuver',
  'invest',
  'import',
  'produce',
  'manuver',
];

const buyPhaseActions = ['buy', 'pass'];

const unwritten = {
  board: {
    map: { spaces: [''], links: [{ to: '', from: '' }] },
    scores: {},
  },
  players: [],
};

const startingMoney = [
  0, // 0 player game not playable
  0, // 1 player game not playable
  37,
  25,
  19,
  15,
  13,
];

function IsVictory(cells) {
  const countryWon = country => {
    if (country.scoreTrack >= 25) {
      console.log('game over');
      return true;
    }
    return false;
  };

  return true;
}

const Imperial = {
  name: 'Imperial',

  setup: ctx => ({
    cells: new Array(9).fill(null),
  }),

  moves: {
    clickCell(G, ctx, id) {
      const cells = [...G.cells];

      if (cells[id] === null) {
        cells[id] = ctx.currentPlayer;
        return { ...G, cells };
      }
    },
  },

  turn: {
    moveLimit: 1,
  },

  endIf: (G, ctx) => {
    if (IsVictory(G.cells)) {
      return { winner: ctx.currentPlayer };
    }
    if (G.cells.filter(c => c === null).length == 0) {
      return { draw: true };
    }
  },

  ai: {
    enumerate: G => {
      let r = [];
      for (let i = 0; i < 9; i++) {
        if (G.cells[i] === null) {
          r.push({ move: 'clickCell', args: [i] });
        }
      }
      return r;
    },
  },
};

export default Imperial;
