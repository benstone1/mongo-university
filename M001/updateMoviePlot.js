db.movieDetails.update(
	{"_id" : ObjectId("5f5414b49c7c68b2540971b6")},
	{ $set: 
		{
			"plot": "This is the new plot"
		}
	}
)
