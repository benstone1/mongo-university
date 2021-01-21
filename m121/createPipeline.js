load("validateLab1.js");

var pipeline = [
  {
    $match: {
      genres: { $nin: ["Crime", "Horror"] },
      'imdb.rating': { $gte: 7 },
      rated: { $in: ["G", "PG"] },
      languages: { $all: ["English", "Japanese"] }
    }
  }
];

validateLab1(pipeline);
