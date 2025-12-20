import { ConfigProvider, theme } from "antd";

export default function ConfigProviderComponent({ children, isDark }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
}
