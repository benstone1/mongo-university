var pipeline = [
  {
    $project: {
      wordsInTitle: { $size: { $split: ["$title", " "] }},
      title: 1,
      _id: 0
    }
  },
  {
    $match: { wordsInTitle: 1 }
  }
]

// var aggregations = db.getSiblingDB("aggregations")
// var resultsExplaination = aggregations.movies.aggregate(pipeline, {
//   explain: true
// })
// var foo = resultsExplaination.stages.pop()["$project"]
//
// for (var bar of Object.values(foo)) {
//   print(bar)
// }

var cursor = db.movies.aggregate(pipeline)
cursor.forEach(printjson)
print(db.movies.aggregate(pipeline).itcount())
