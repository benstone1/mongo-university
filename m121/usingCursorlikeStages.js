var favorites = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney"
]

var pipeline = [
  {
    $match: {
      countries: { $in: ["USA"] },
      "tomatoes.viewer.rating": { $gte: 3 },
      cast: {
        $in: favorites
      }
    }
  },
  {
    $addFields: {
      num_favs: { $size: { $setIntersection: ["$cast", favorites]} }
    }
  },
    {
      $sort: {
        num_favs: -1,
        "tomatoes.viewer.rating": -1,
        title: -1
      }
    },
    {
      $skip: 24
    },
    {
      $limit: 1
    }
]

var cursor = db.movies.aggregate(pipeline)
cursor.forEach(printjson)
