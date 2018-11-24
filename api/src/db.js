const pgp = require('pg-promise')();

const connection = process.env.DATABASE_URL;
const db = pgp(connection);

const point = (lng, lat, srid = 4326) => ({
  rawType: true,
  toPostgres: () =>
    pgp.as.format('ST_SetSRID(ST_Point($1, $2), $3)', [lng, lat, srid])
});

const normalizePoint = p => ({
  id: p.id,
  title: p.title,
  rating: p.reiting,
  address: p.address,
  geom: point(p.lng, p.lat)
});

const syncDatabase = (points) => {
  const cs = new pgp.helpers.ColumnSet(
    ['id', 'title', 'rating', 'address', 'geom'],
    {
      table: 'recycle_points'
    }
  );

  const values = points.map(normalizePoint);
  const insertPoints = () => pgp.helpers.insert(values, cs);

  return db.tx(t =>
    t.batch([t.none('delete from recycle_points'), t.none(insertPoints)]));
};

const nearestPoint = async (lng, lat) => {
  const result = await db.one({
    name: 'find-nearest-point',
    text: `SELECT *, st_asgeojson(geom) as geom
           FROM recycle_points
           ORDER BY geom <-> st_setsrid(st_point($1, $2), 4326)
           LIMIT 1`,
    values: [lng, lat]
  });

  return result;
};

module.exports = { syncDatabase, nearestPoint };
