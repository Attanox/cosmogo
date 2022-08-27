import { Customizer } from "components/Customizer";
import { type GetStaticProps } from "next";
import React from "react";

interface LocalProps {}

const SuitPage = (props: LocalProps) => {
  return (
    <div className="flex h-full w-4/5 mx-auto items-center justify-center">
      <Customizer />
    </div>
  );
};

export const getStaticProps: GetStaticProps<LocalProps> = async () => {
  return {
    props: {},
  };
};

export default SuitPage;
