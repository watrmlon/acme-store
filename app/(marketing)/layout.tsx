import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function MarketingLayout({ children }: Props) {
  return <div>{children}</div>;
}
