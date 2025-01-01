import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface User {
  userId: string;
  email: string;
  name: string;
  imageUrl: string;
}

const {getUser} = getKindeServerSession()
const kindeUser = await getUser()


export const useUser = async ({ userId }: User) => {

  // const user = await prisma.user.findUnique({
  //   where: {
  //     email: kindeUser.email,
  //   },
  // });

  const createUser = async () => {
    if (!kindeUser) {
      throw new Error("No kinde user found");
    }
    return await prisma.user.create({
      data: {
      kindeId: kindeUser.id,
      name: `${kindeUser.given_name} ${kindeUser.family_name}`,
      imageUrl: kindeUser.picture,
      email: kindeUser.email,
      firstName: kindeUser.given_name,
      lastName: kindeUser.family_name,
      },
    });
  };
};

const updateUser = async (user: User) => {
  return await prisma.user.update({
    where: {
      id: user.userId,
    },
    data: {
      email: user.email,
      name: user.name,
      imageUrl: user.imageUrl,
    },
  });
};

const deleteUser = async (userId: string) => {
  return await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  return {
      deleteUser,
      updateUser,
  };
};
