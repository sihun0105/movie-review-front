import { FunctionComponent, PropsWithChildren } from "react";

interface AppLayoutProps extends PropsWithChildren {}

const AppLayout: FunctionComponent<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="fixed left-0 right-0 z-30 flex justify-center ">
        <header className="header-h w-full"></header>
      </div>

      <div className="header-h" />
      {children}
    </>
  );
};

export default AppLayout;
