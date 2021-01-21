var pipeline = [
  {
    $match: {
      "imdb.rating": { $gte: 1 },
      "imdb.votes": { $gte: 1 },
      "year": { $gte: 1990 }
    }
  },
  {
    $addFields: {
      scaled_votes: {
        $add: [
          1,
          {
            $multiply: [
              9,
              {
                $divide: [
                  { $subtract: ["$imdb.votes", 1] },
                  { $subtract: [1521105, 5] }
                ]
              }
            ]
          }
        ]
      },
      normalized_rating: {
        $avg: ["$scaled_votes", "$imdb.rating"]
      }
    }
  },
  {
    $sort: {
      normalized_rating: 1
    }
  },
  {
    $limit: 1
  }
]

var cursor = db.movies.aggregate(pipeline)
cursor.forEach(printjson)
