var pipeline = [
  {
    $match: {
      languages: { $in: ["English"] }
    }
  },
  {
    $unwind: "$cast"
  },
  {
    $group: {
      _id: "$cast",
      num_films: { $sum: 1 },
      average: { $avg: "$imdb.rating" }
    }
  },
  {
    $sort: {
      num_films: -1
    }
  },
  {
    $limit: 1
  },
  {
    $set: {
      average: { $trunc: ["$average", 1] }
    }
  }
]

var cursor = db.movies.aggregate(pipeline)
cursor.forEach(printjson)
