"use client";
import { IComponentBaseProps, formatNumber, mp } from "@/shared";
import Image from "next/image";
import React from "react";
import { imageUpvoteSrc } from "../assets/icons/upvote";
import { imageUpvotedSrc } from "../assets/icons/upvoted";

export interface IUpVoteProps extends IComponentBaseProps {
  count: number;
  voted?: boolean;
  onChange?: (vote: boolean) => void;
}

export const UpVote: React.FC<IUpVoteProps> = (props) => {
  const { count, voted, onChange } = props;
  return mp(
    props,
    <div className="flex gap-1.5">
      <Image
        src={voted ? imageUpvotedSrc : imageUpvoteSrc}
        width={18}
        height={18}
        alt="up vote"
        className="cursor-pointer"
        onClick={() => onChange?.(!voted)}
      />

      <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
        <p className="subtle-medium text-dark400_light900">
          {formatNumber(count)}
        </p>
      </div>
    </div>
  );
};