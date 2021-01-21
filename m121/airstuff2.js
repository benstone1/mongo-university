db.air_alliances.aggregate([
  {
    $match: {
      name: "OneWorld"
    }
  }
])
