import { SearchUtil, prisma } from "@/prisma";
import { IPageProps, List, NoResults } from "@/shared";
import { USER_FILTER_OPTIONS, UserCard } from "@/user";
import { Prisma } from "@prisma/client";
import React from "react";

const CommunityPage: React.FC<IPageProps<{}>> = async (props) => {
  const { searchParams } = props;

  const searchUtil = new SearchUtil(Prisma.ModelName.User, searchParams);
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      include: {
        tags: true,
      },
      ...searchUtil.args,
    }),
    searchUtil.count(),
  ]);

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
      total={total}
    />
  );
};

export default CommunityPage;
