DROP SCHEMA tiger CASCADE;

CREATE TABLE recycle_points (
  id text,
  title text,
  rating text,
  address text,
  geom geometry(Point, 4326)
);

CREATE INDEX ON recycle_points USING GIST(geom);