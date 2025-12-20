import React, { useState } from "react";
import { useGetMovieQuery } from "../store/slice/apiSlice";
import { Link } from "react-router-dom";
import {
  addToWatchList,
  removeFromWatchList,
} from "../store/slice/watchlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Skeleton, Typography, Button } from "antd";

const { Text } = Typography;

function Movies_List() {
  const [page, setPage] = useState(1);
  const { data, isError, isLoading } = useGetMovieQuery(page);
  const WatchListdata = useSelector((state) => state.watchList.watchlist);
  const dispatch = useDispatch();

  if (isLoading) {
    return (
      <Row gutter={[24, 24]} justify="center" style={{ padding: 24 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Col
            key={i}
            span={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Skeleton.Image style={{ width: 240, height: 300 }} active />
          </Col>
        ))}
      </Row>
    );
  }

  if (isError) return <Text type="danger">Something Went Wrong</Text>;

  const HandleRemove = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeFromWatchList(id));
  };

  const HandleAdd = (e, movie) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToWatchList(movie));
  };

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[24, 24]} justify="center">
        {data?.results?.map((Movie) => {
          const isAdded = WatchListdata.some((obj) => obj.id === Movie.id);

          return (
            <Col
              key={Movie.id}
              span={6}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Link state={{ movie: Movie }} to={`movie/${Movie.id}`}>
                <div
                  style={{
                    width: 240,
                    height: 300,
                    borderRadius: 10,
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${Movie.poster_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  <div
                    onClick={(e) =>
                      isAdded ? HandleRemove(e, Movie.id) : HandleAdd(e, Movie)
                    }
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      fontSize: 20,
                    }}
                  >
                    {isAdded ? "❌" : "❤️"}
                  </div>
                </div>
              </Link>
            </Col>
          );
        })}
      </Row>

      <div
        className="flex justify-center gap-4 mt-6 "
        style={{ textAlign: "center", padding: 10 }}
      >
        <Button
          type="primary"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          style={{ marginRight: 8 }}
        >
          Prev
        </Button>
        <Button type="primary" onClick={() => setPage((p) => p + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default Movies_List;
