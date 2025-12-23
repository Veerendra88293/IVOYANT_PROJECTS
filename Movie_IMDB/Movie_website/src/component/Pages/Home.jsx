import MovieFooter from "../Footer";
import Movies_List from "../Movies_List";
import Banner from "../banner";
import { Typography, theme } from "antd";
const { Title } = Typography;
function Home() {
  const { token } = theme.useToken();
  return (
    <div style={{ background: token.colorBgBase, minHeight: "100vh" }}>
    <Banner/>
      <div>
        <Title level={3} style={{ textAlign: "center", padding: "10px" }}>
          Trending Movies
        </Title>
        <Movies_List />
        <MovieFooter/>
      </div>
    </div>
  );
}

export default Home;
