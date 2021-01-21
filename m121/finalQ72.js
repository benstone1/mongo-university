var pipeline = [
  {
    $unwind: "$airlines"
  },
  {
    $project: {
      _id: 0,
      "name": "$name",
      "airline": "$airlines"
    }
  },
  {
    $lookup: {
      from: "air_routes",
      let: { alliance_airline: "$airline" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $or: [
                    { $and: [ { $eq: ["$src_airport", "LHR"] }, { $eq: ["$dst_airport", "JFK"] }] },
                    { $and: [ { $eq: ["$src_airport", "JFK"] }, { $eq: ["$dst_airport", "LHR"] }] },
                  ]
                },
                { $eq: ["$$alliance_airline", "$airline.name"] },
              ]
            }
          }
        },
      ],
      as: "LHR_JFK_flights",
    }
  },
  {
    $project: {
      "alliance": "$name",
      "carrier": "$airline",
      "has_lhr_jfk_flights": {
        $cond: [ {$eq: [ { $size: "$LHR_JFK_flights" }, 0]}, 0, 1] 
      }
    }
  },
  {
    $group: {
      _id: "$alliance",
      total_valid_carriers: { $sum: "$has_lhr_jfk_flights" }
    }
  }
]

var cursor = db.air_alliances.aggregate(pipeline)
cursor.forEach(printjson)
