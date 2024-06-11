import { formatNumber } from "@/formatter";
import { IComponentBaseProps, cn, mp } from "@/shared";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface IMetricProps extends IComponentBaseProps {
  imgUrl: string;
  label: string;
  value: number;
  href?: string;
  classNames?: {
    text?: string;
  };
}

export const Metric: React.FC<IMetricProps> = (props) => {
  const { imgUrl, label, value, href, classNames } = props;
  let content = (
    <>
      <Image
        src={imgUrl}
        alt={label}
        width={16}
        height={16}
        className={cn(`object-contain invert-colors`, href && "rounded-full")}
      />
      <p className={cn("flex items-center gap-1", classNames?.text)}>
        {formatNumber(value)}
        <span className={"small-regular line-clamp-1 capitalize"}>{label}</span>
      </p>
    </>
  );

  if (href) {
    content = (
      <Link href={href} className="flex-center gap-1">
        {content}
      </Link>
    );
  }

  return mp(
    props,
    <div className="flex-center flex-wrap gap-1">{content}</div>
  );
};