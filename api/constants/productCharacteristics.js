export const CHARCTERISTIC_SCORES = {
  Humane: 1,
  "Locally Produced": 1,
  Healthy: 1,
  "Plastic-Free": 2,
  Unhealthy: -1,
  Wasteful: -1,
  Vegan: 0, // Characteristic not outlined in scoring rules.
};

export const VALID_CHARACTERISTICS = Object.keys(CHARCTERISTIC_SCORES);
