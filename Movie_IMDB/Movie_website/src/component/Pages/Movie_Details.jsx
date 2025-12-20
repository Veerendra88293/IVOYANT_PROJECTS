import React from "react";
import { useLocation } from "react-router-dom";
import { Typography, Image, Button, Card, Space, Divider, theme } from "antd";
const { Title, Text, Paragraph } = Typography;

function Movie_Details() {
  const { token } = theme.useToken();
  const location = useLocation();
  const movie = location.state?.movie;

  if (!movie)
    return (
      <Title type="secondary" level={3}>
        No movie found.
      </Title>
    );

  return (
    <div style={{ background: token.colorBgBase }}>
      <Button
        type="primary"
        style={{ marginBottom: 16, marginLeft: 20 }}
        onClick={() => window.history.back()}
      >
        Back
      </Button>

      <Title level={1} style={{ textAlign: "center" }}>
        Movie Details
      </Title>

      <Card bordered hoverable style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Space align="start" size="large">
          <Image
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.original_title}
            width={250}
            preview={false}
            style={{ borderRadius: 8 }}
          />

          <Space direction="vertical" size="middle">
            <Title level={2}>{movie.original_title}</Title>

            <Text strong>
              Release Date: <Text>{movie.release_date}</Text>
            </Text>

            <Text strong>
              Rating: <Text>{movie.vote_average} / 10</Text>
            </Text>

            <Text strong>
              Popularity: <Text>{movie.popularity.toFixed(1)}</Text>
            </Text>

            <div>
              <Text strong>Overview:</Text>
              <Paragraph>{movie.overview}</Paragraph>
            </div>
          </Space>
        </Space>
      </Card>
    </div>
  );
}

export default Movie_Details;
