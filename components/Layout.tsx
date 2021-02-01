type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return <div className="hoge">{children}</div>;
}

export default Layout;
