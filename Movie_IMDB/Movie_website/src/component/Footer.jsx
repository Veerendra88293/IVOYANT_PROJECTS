import { Layout, Typography } from "antd";

const { Footer } = Layout;
const { Title, Text } = Typography;

export default function MovieFooter() {
  return (
    <Footer style={{ textAlign: "center", padding: "24px 0" }}>
      <Title level={5} style={{ marginBottom: 0 }}>
        🎬 Movie Website
      </Title>
      <Text type="secondary">
        Watch • Rate • Enjoy
      </Text>
      <div>
        <Text type="secondary">© {new Date().getFullYear()}</Text>
      </div>
    </Footer>
  );
}
