export const payoutMultipliers: number[] = [5.6, 2.1, 1.1, 1, 0.5, 1, 1.1, 2.1, 5.6];
export const probabilities: number[] = [0.3906, 3.1250, 10.9375, 21.8750, 27.3438, 21.8750, 10.9375, 3.1250, 0.3906];

export function calculateExpectedValue(payoutMultipliers: number[], probabilities: number[]): number {
  if (payoutMultipliers.length !== probabilities.length) {
    throw new Error('Arrays payoutMultipliers and probabilities must have the same length.');
  }

  let expectedValue = 0;
  for (let i = 0; i < payoutMultipliers.length; i++) {
    expectedValue += payoutMultipliers[i] * probabilities[i];
  }
  return expectedValue;
}

//   const expectedValue = calculateExpectedValue(payoutMultipliers, probabilities);
//   console.log('Expected Value (E):', expectedValue);


export function getRandomPayoutMultiplier() {
  const random = Math.random();

  let cumulativeProbability = 0;
  for (let i = 0; i < probabilities.length; i++) {
    cumulativeProbability += probabilities[i];

    if (random <= cumulativeProbability) {
      return payoutMultipliers[i];
    }
  }
  return payoutMultipliers[0];
}
