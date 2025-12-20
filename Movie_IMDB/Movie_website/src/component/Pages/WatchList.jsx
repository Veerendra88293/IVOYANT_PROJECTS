import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWatchList } from "../../store/slice/watchlistSlice";
import { Typography, Image, Button, Input, Table, theme, Empty } from "antd";
const { Title, Text } = Typography;

function WatchList() {
  const { token } = theme.useToken();
  const [search, setSearch] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const columns = [
    {
      title: "Poster",
      dataIndex: "poster_path",
      key: "poster",
      render: (poster) =>
        poster ? (
          <Image
            src={IMG_BASE + poster}
            width={60}
            height={90}
            style={{ objectFit: "cover", borderRadius: 4 }}
          />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Original Title",
      dataIndex: "original_title",
      key: "original_title",
    },
    {
      title: "Lang",
      dataIndex: "original_language",
      key: "lang",
    },
    {
      title: "Release",
      dataIndex: "release_date",
      key: "release",
    },
    {
      title: "Popularity",
      dataIndex: "popularity",
      key: "popularity",
      render: (value) => value?.toFixed?.(2) ?? value,
    },
    {
      title: "Remove",
      key: "remove",
      render: (_, m) => (
        <Button danger onClick={() => dispatch(removeFromWatchList(m.id))}>
          Delete
        </Button>
      ),
    },
  ];

  const movies = useSelector((state) => state.watchList.watchlist);
  let finalList = movies;
  const IMG_BASE = "https://image.tmdb.org/t/p/original/";
  const dispatch = useDispatch();
  if (movies.length <= 0) {
    return (
      <div>
        <Empty description="No Movies Found" />
        <Button type="link" href="/">
          Goto Home
        </Button>
      </div>
    );
  }
  if (isSorted) {
    finalList = [...movies].sort((a, b) => b.popularity - a.popularity);
  }
  const filteredMovies = finalList.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="overflow-x-auto"
      style={{ minHeight: "100vh", background: token.colorBgBase }}
    >
      <Input
        className="float-right"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: 200, marginBottom: 16, marginRight: 10 }}
        allowClear
      />
      <Button
        type="primary"
        onClick={() => setIsSorted(!isSorted)}
        className="float-right mr-2"
      >
        Sort By Popularity
      </Button>

      <Table
        columns={columns}
        rowKey="id"
        dataSource={filteredMovies}
        locale={{ emptyText: <Empty description="No Movies Found" /> }}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default WatchList;
