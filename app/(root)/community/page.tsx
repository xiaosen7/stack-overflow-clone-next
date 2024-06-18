import { prisma } from "@/prisma";
import { IPageProps, List, NoResults } from "@/shared";
import { USER_FILTER_OPTIONS, UserCard } from "@/user";
import React from "react";

const CommunityPage: React.FC<IPageProps<{}, { q: string }>> = async (
  props
) => {
  const {
    searchParams: { q },
  } = props;
  const users = await prisma.user.findMany({
    include: {
      tags: true,
    },
    where: q
      ? {
          OR: [
            {
              fullName: {
                contains: q,
              },
            },
            {
              username: {
                contains: q,
              },
            },
          ],
        }
      : undefined,
  });

  return (
    <List
      empty={
        <NoResults
          description="Be the first to break the silence! 🚀 Sign up to be the first and kickstart the community. Get involved! 💡"
          link="/sign-up"
          linkTitle="Sign Up"
          topic="Users"
        />
      }
      filter={{
        options: USER_FILTER_OPTIONS,
      }}
      items={users}
      renderItem={(user) => (
        <UserCard key={user.id} tags={user.tags} user={user} />
      )}
      search={{
        placeholder: "Search amazing minds here...",
      }}
      title={"All Users"}
    />
  );
};

export default CommunityPage;
