import { prisma } from "../../lib/prisma";

//the route for only subscribes user
const getPremiumContent = async () => {
  const posts = await prisma.post.findMany({
    where: {
      isPremium: true,
    },
  });

  return posts;
};

export const premiumServices = {
  getPremiumContent,
};
