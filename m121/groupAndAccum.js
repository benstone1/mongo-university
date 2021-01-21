var pipeline = [
  {
    $match: {
      awards: { $regex:  /Won .+ Oscar/  },
    }
  },
  {
    $addFields: {
      oscar_count: { $toInt: { $arrayElemAt: [ { $split: ["$awards", " "] }, 1 ]   } }
    }
  },
  {
    $match: {
      oscar_count: { $gte: 1 }
    }
  },
  {
    $group: {
      _id: 1,
      count: { $sum: 1 },
      max_rating: { $max:  "$imdb.rating" },
      min_rating: { $min:  "$imdb.rating" },
      avg_rating: { $avg: "$imdb.rating" },
      std_deviation: { $stdDevSamp: "$imdb.rating" }
    }
  }
]

var cursor = db.movies.aggregate(pipeline)
cursor.forEach(printjson)
