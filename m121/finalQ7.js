var pipeline = [
  {
    $match: {
      $or: [
        { $and: [ { src_airport: "LHR" }, { dst_airport: "JFK" }] },
        { $and: [ { src_airport: "JFK" }, { dst_airport: "LHR" }] }
      ]
    }
  },
  {
    $lookup:
      {
        from: "air_alliances",
        foreignField: "airlines",
        localField: "airline.name",
        as: "alliance"
      }
  }
]

var cursor = db.air_routes.aggregate(pipeline)
cursor.forEach(printjson)
