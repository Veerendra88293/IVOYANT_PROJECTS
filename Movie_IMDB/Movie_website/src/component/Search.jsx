import React, { useState } from "react";
import { useGetMovieQuery, useGetSearchQuery } from "../store/slice/apiSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWatchList,
  removeFromWatchList,
} from "../store/slice/watchlistSlice";
import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Flex,
  Input,
  Row,
  Skeleton,
  theme,
  Typography,
} from "antd";
const { Text } = Typography;
function Search_List() {
  const { token } = theme.useToken();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");

  const {
    data: trendingData,
    isLoading: trendingLoading,
    isError: trendingError,
  } = useGetMovieQuery(1);

  const {
    data: searchResults,
    isLoading: searchLoading,
    isError: searchError,
  } = useGetSearchQuery(
    { query: searchData, page },
    { skip: !searchData.trim() }
  );

  const handleSearch = () => {
    console.log("Searching for:", search);
    setSearchData(search);
  };

  const dispatch = useDispatch();
  const watchList = useSelector((state) => state.watchList.watchlist);

  const movies =
    searchData && searchResults?.results?.length
      ? searchResults.results
      : trendingData?.results;

  const isLoading = trendingLoading || searchLoading;
  const isError = trendingError || searchError;

  const handleAdd = (e, movie) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToWatchList(movie));
  };

  const handleRemove = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeFromWatchList(id));
  };

  if (isLoading) {
    const arr = new Array(10).fill(0);
    return (
      <Row
        gutter={[24, 24]}
        justify="center"
        style={{ padding: 24, background: token.colorBgBase }}
      >
        {arr.map((_, index) => (
          <Col key={index} span={6}>
            <Card style={{ width: 240, height: 300 }}>
              <Skeleton.Image style={{ width: 190, height: 250 }} active />
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  if (isError) {
    return (
      <Button type="danger" style={{ background: token.colorBgBase }}>
        Something went wrong
      </Button>
    );
  }

  return (
    <div className="p-4" style={{ background: token.colorBgBase }}>
      <div className="flex justify-end gap-2 mb-6 float-right">
        <Input.Search
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={handleSearch}
          placeholder="Batman..."
          enterButton
          allowClear
          style={{ width: "220px", margin: 20 }}
        />
      </div>

      <Row gutter={[24, 24]} justify="center">
        {searchData && searchResults?.results?.length === 0 && (
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              height: "20vh",
              width: "100%",
            }}
          >
            <Empty description="No Movies Found" />
          </div>
        )}

        {movies?.map((movie) => {
          const inWatchList = watchList.some((m) => m.id === movie.id);

          return (
            <Col key={movie.id} span={5} style={{}}>
              <Link state={{ movie }} to={`/movie/${movie.id}`}>
                <Card
                  hoverable
                  style={{
                    width: 240,
                    height: 300,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
                    position: "relative",
                  }}
                >
                  {inWatchList ? (
                    <div
                      className="cursor-pointer"
                      onClick={(e) => handleRemove(e, movie.id)}
                    >
                      ❌
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer"
                      onClick={(e) => handleAdd(e, movie)}
                    >
                      ❤️
                    </div>
                  )}
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>

      {searchData && (
        <Flex justify="center" gap={10} className="mt-10">
          <Button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 bg-gray-300 rounded"
            type="primary"
          >
            Prev
          </Button>
          <Button
            disabled={
               page >= searchResults.total_pages
            }
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-gray-300 rounded"
            type="primary"
          >
            Next
          </Button>
        </Flex>
      )}
      
    </div>
  );
}

export default Search_List;
