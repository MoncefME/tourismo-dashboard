import React from "react";
import Loading from "./Loading";

type Props = {
  children: React.ReactNode;
};

const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className="mt-6 divide-y rounded border bg-white">{children}</div>
  );
};

export default Container;

type ContainerHeaderProps = {
  children?: React.ReactNode;
  title?: string;
};

export const ContainerHeader: React.FC<ContainerHeaderProps> = ({
  children,
  title,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-end gap-x-1 gap-y-1 p-4">
      {title && <p className="grow text-base font-medium">{title}</p>}
      {children}
    </div>
  );
};

type ContainerBodyProps = {
  children: React.ReactNode;
  loading?: boolean;
  grid?: boolean;
};

export const ContainerBody: React.FC<ContainerBodyProps> = ({
  children,
  loading,
  grid,
}) => {
  return (
    <>
      {loading ? (
        <div className="flex h-96 items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div
          className={
            grid ? "grid grid-cols-1 items-end gap-4 p-4 md:grid-cols-2" : ""
          }
        >
          {children}
        </div>
      )}
    </>
  );
};

type ContainerFooterProps = {
  children: React.ReactNode;
};

export const ContainerFooter: React.FC<ContainerFooterProps> = ({
  children,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-1 p-4">
      {children}
    </div>
  );
};
