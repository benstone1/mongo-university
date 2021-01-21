var pipeline = [
  {
    $match: {
        $and: [
          { "imdb.rating": { $ne: "" } },
          { metacritic: { $ne: "" } },
          { metacritic: { $ne: null } }
        ]
      }
    },
  {
    $project: { _id: 0, title: 1, "imdb.rating": 1, metacritic: 1}
  },
  {
    $facet: {
      topImdb: [
        { $sort: { "imdb.rating": -1 }},
        { $limit: 10 },
        { $project: { _id: 0, title: 1} }
      ],
      topMetacritic: [
        { $sort: { "metacritic": -1 } },
        { $limit: 10 },
        { $project: { _id: 0, title: 1 } }
      ]
    }
  },
  {
    $project: { movies_in_both: { $setIntersection: [ "$topMetacritic", "$topImdb" ] } }
  }
]

var cursor = db.movies.aggregate(pipeline)
cursor.forEach(printjson)
