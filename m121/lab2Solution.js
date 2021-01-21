load("validateLab2.js");

var pipeline = [
  {
    $match: {
      genres: { $nin: ["Crime", "Horror"] },
      'imdb.rating': { $gte: 7 },
      rated: { $in: ["G", "PG"] },
      languages: { $all: ["English", "Japanese"] }
    }
  },
  {
    $project: {
      _id: 0,
      title: 1,
      rated: 1
    }
  }
]

validateLab2(pipeline)
