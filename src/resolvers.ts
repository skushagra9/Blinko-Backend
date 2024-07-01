import { v4 as uuidv4 } from 'uuid';
import { getRandomPayoutMultiplier } from './logic';
import prisma from './singleton'

enum CasinoGamePlinkoRiskEnum {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}

interface PlinkoBet {
  amount: number;
  risk: CasinoGamePlinkoRiskEnum;
  address: string;
}

export const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
  Mutation: {
    connectWallet: async (_: any, { address }: { address: string }) => {
      try {
        const existingUser = await prisma.prisma.user.findUnique({
          where: {
            address: address,
          },
        });

        if (!existingUser) {
          await prisma.prisma.user.create({
            data: {
              address,
            },
          });
          return 'Successfully saved user in the database.';
        }
      } catch (error) {
        console.error('Error connecting wallet:', error);
        throw new Error('Failed to connect wallet.');
      }
    },

    plinkoBet: async (_: any, { amount, risk, address }: PlinkoBet) => {
      const user = await prisma.prisma.user.findUnique({
        where: {
          address: address,
        },
      });
      let payoutMultipliers;
      let probabilities;
      let payoutMultiplier
      switch (risk) {
        case 'LOW':
          payoutMultiplier = getRandomPayoutMultiplier();
          break;
        case 'MEDIUM':
          payoutMultipliers = [1, 1.5, 2, 5, 10, 20, 50, 0.5, 1, 1.5, 2, 5, 10, 20, 50];
          break;
        case 'HIGH':
          payoutMultipliers = [1, 2, 5, 10, 50, 100, 200, 0.5, 1, 2, 5, 10, 50, 100, 200];
          break;
        default:
          payoutMultipliers = [1];
          probabilities = [1];
      }
      const totalProbability = probabilities!.reduce((acc, prob) => acc + prob, 0);
      if (totalProbability >= 1) {
        throw new Error('Total probability of payout multipliers must be less than 1.');
      }
      const path = Array.from({ length: 16 }, (_, index) => (index % 2 === 0 ? 'R' : 'L'));

      const betId = uuidv4();
      const updatedAt = new Date().toISOString();
      if (payoutMultiplier) {
        return {
          id: betId,
          active: true,
          payoutMultiplier: payoutMultiplier,
          amount,
          payout: amount * payoutMultiplier,
          updatedAt,
          game: 'Plinko',
          user,
          state: {
            risk,
            point: payoutMultiplier,
            path
          },
        }
      };
    },
  },
};

