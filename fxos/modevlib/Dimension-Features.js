/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

importScript("Dimension.js");
importScript("qb/ESQuery.js");

if (!Mozilla) var Mozilla = {"name" : "Mozilla", "edges" : []};

Sprints = [
//	"33 Sprint 1- 6/23     6/10-6/23",
//	"33 Sprint 2- 7/7       6/24-7/7",
//	"33 Sprint 3- 7/21      7/7-7/21",
//	"34 Sprint 1- 8/4       7/22-8/4",
//	"34 Sprint 2- 8/18     8/5-8/18",
//	"34 Sprint 3- 9/1       8/19-9/1",
//	"35 Sprint 1- 9/15     9/2-9/15",
//	"35 Sprint 2- 9/29     9/16-9/29",
//	"35 Sprint 3- 10/1     9/30-10/13",
//	"36 Sprint 1- 10/27   10/14-10/27",
//	"36 Sprint 2- 11/10   10/28-11/10",
//	"36 Sprint 3- 11/24   11/11-11/24"
].map(function(v){
		var parts = v.split("-").map(function(v){
			return v.trim();
		});
		var name = v.split("-")[0];

		var targets = v.split("  ")[0].trim();
		var blocks = "fx" + name.split(" ")[0] + "+";
		var targetName = name.replaceAll("Sprint ", "S") + " Target";
		var dates = [parts[1].split(" ").last(), parts.last()];
		var startDate = Date.newInstance(dates[0].split("/").reverse().join("/") + "/2014");
		var endDate = Date.newInstance(dates[1].split("/").reverse().join("/") + "/2014");

		return {
			"name" : name,
			"start_date" : startDate,
			"targetDate" : endDate,
			"dateMarks" : [
				{"name" : targetName, "date" : endDate.addDay(), "style" : {strokeStyle : "black", verticalOffset : 20}}
			],
			"needed_fields" : ["target_milestone", "cf_blocking_loop", "cf_blocking_b2g"],
			"partitions" : [
				{"name" : "Blocking", "esfilter" : {"and" : [
					{"term" : {"cf_blocking_loop" : blocks}}
				]}},
				{"name" : "Targeted", "esfilter" : {"and" : [
					{"term" : {"target_milestone" : targets}}
//				{"not": {"term": {"cf_blocking_loop": blocks}}}  // UNFORTUNATE REDUNDANCY
				]}}
			]
		};
	}).appendArray([
//		"2.1 S1 (1aug)  7/28-8/1",
//		"2.1 S2 (15aug)  8/2-8/15",
//		"2.1 S3 (29aug)  8/16-8/29",
//		"2.1 S4 (12sep)  8/30-9/12",
//		"2.1 S5 (26sep)  9/13-9/26",
//		"2.1 S6 (10oct)  9/27-10/10"
	].map(function(v){
			var parts = v.split("  ").map(function(v){
				return v.trim();
			});
			var name = parts[0].left(6);
			var targets = parts[0].trim();
			var blocks = parts[0].left(3) + "+";

			var targetName = name;
			var dates = parts[1].split("-");
			var startDate = Date.newInstance(dates[0].split("/").reverse().join("/") + "/2014");
			var endDate = Date.newInstance(dates[1].split("/").reverse().join("/") + "/2014");

			return {
				"name" : name,
				"start_date" : startDate,
				"targetDate" : endDate,
				"dateMarks" : [
					{"name" : targetName, "date" : endDate.addDay(), "style" : {strokeStyle : "black", verticalOffset : 20}}
				],
				"needed_fields" : ["target_milestone", "cf_blocking_b2g", "cf_blocking_loop"],
				"partitions" : [
					{"name" : "Blocking", "esfilter" : {"and" : [
						{"term" : {"cf_blocking_b2g" : blocks}}
					]}},
					{"name" : "Targeted", "esfilter" : {"and" : [
						{"term" : {"target_milestone" : targets}}
//				{"not": {"term": {"cf_blocking_b2g": blocks}}}  // UNFORTUNATE REDUNDANCY
					]}}
				]
			};


		}));


Dimension.addEdges(true, Mozilla, [

	{"name" : "Feature", "index" : "bugs", "needed_fields" : ["cf_blocking_b2g"], "esfilter" : {"match_all" : {}}, "edges" : [
		{"name": "All 2.5 Features", "esfilter": {"terms": {"bug_id": [
			1180659, 1180660, 1180662, 1180672, 1180665, 1180666, 1180668, 1180669,
			1180678, 1180674, 1180675, 1180695, 1180696, 1180699, 1180701, 1167167,
			1180703, 1180705, 1180707, 1180710, 1179459, 1180716, 1180718, 1180719
		]}}},
		{"name": "Hackability", "esfilter": {"terms": {"bug_id": [1180659, 1180660]}}},
		{"name": "Help/Onboarding", "esfilter": {"term": {"bug_id": 1180662}}},
		{"name": "Personal", "esfilter": {"terms": {"bug_id": [1180672, 1180665, 1180666, 1180668, 1180669]}}},
		{"name": "Direct Contributor Updates", "esfilter": {"terms": {"bug_id": [1180678]}}},
		{"name": "Privacy", "esfilter": {"terms": {"bug_id": [1180674, 1180675]}}},
		{"name": "Device performance/Metrics", "esfilter": {"terms": {"bug_id": [1180695, 1180696, 1180699, 1180701, 1167167, 1180703, 1180705]}}},
		{"name": "Local Configuration", "esfilter": {"terms": {"bug_id": [1180707, 1180710, 1179459]}}},
		{"name": "Architecture Evolution", "esfilter": {"terms": {"bug_id": [1180716, 1180718]}}},
		{"name": "Devices Support", "esfilter": {"terms": {"bug_id": [1180719]}}},
//		{"name": "Other 2.5 Blockers", "esfilter": {"and":[
//			{"term": {"cf_blocking_b2g": "2.5+"}},
//			{"not": {"terms": {"bug_id": [
//				1180659, 1180660, 1180662, 1180672, 1180665, 1180666, 1180668, 1180669,
//				1180678, 1180674, 1180675, 1180695, 1180696, 1180699, 1180701, 1167167,
//				1180703, 1180705, 1180707, 1180710, 1179459, 1180716, 1180718, 1180719
//			]}}}
//		]}}
	]},
	{"name" : "EPM", "index" : "bugs", "needed_fields" : ["cf_blocking_b2g"], "esfilter" : {"match_all" : {}}, "edges" : [
		{"name": "Aaron Wu",
			"esfilter": {"terms": {"bug_id": [1180668]}}
		},
		{"name": "Bobby Chien",
			"esfilter": {"terms": {"bug_id": [1180695, 1180696, 1180703, 1180705]}}
		},
		{"name": "Candice Serran",
			"esfilter": {"terms": {"bug_id": [1167167]}}
		},
		{"name": "Jean",
			"esfilter": {"terms": {"bug_id": [1180719]}}
		},
		{"name": "Josh",
			"esfilter": {"terms": {"bug_id": [1180707, 1179459]}}
		},
		{"name": "Nicole Yee",
			"esfilter": {"terms": {"bug_id": [1180659, 1180660]}}
		},
		{"name": "Other EPM",
			"esfilter": {"terms": {"bug_id": [
				1180699, 1180662, 1180672, 1180665,
				1180666, 1180669, 1180678, 1180674,
				1180675, 1180701, 1180710, 1180716,
				1180718
			]}}
		}
	]},

	{"name" : "Milestone", "index" : "bugs", "isFacet" : true, "edges" : [
//		{
//			"name" : "Firefox31",
//			"start_date" : "18 MAR 2014",
//			"targetDate" : "28 APR 2014",
//			"dateMarks" : [
//				{"name" : "FF31 Target", "date" : "29 april 2014", "style" : {strokeStyle : "black", verticalOffset : 20}}
//			],
//			"needed_fields" : ["target_milestone", "cf_blocking_loop"],
//			"partitions" : [
//				{"name" : "Blocking", "esfilter" : {"and" : [
//					{"term" : {"cf_blocking_loop" : "fx31+"}}
//				]}},
//				{"name" : "Targeted", "esfilter" : {"and" : [
//					{"term" : {"target_milestone" : "mozilla31"}},
//					{"not" : {"term" : {"cf_blocking_loop" : "fx31+"}}}  // UNFORTUNATE REDUNDANCY
//				]}}
//			]
//		},
//		{
//			"name" : "2.0 S1",
//			"start_date" : "28 APR 2014",
//			"targetDate" : "9 MAY 2014",   //END OF DAY
//			"esfilter" : {"term" : {"target_milestone" : "2.0 S1 (9may)"}},
//			"partitions" : [
//				{"name" : "Blocking", "esfilter" : {"and" : [
//					{"terms" : {"cf_blocking_b2g" : ["2.0+", "1.5+"]}}
//				]}},
//				{"name" : "Targeted", "esfilter" : {"and" : [
//					{"exists" : {"field" : "target_milestone"}},
//					{"not" : {"term" : {"target_milestone" : "---"}}}
//				]}}
//
//			]
//		},
//
//		{
//			"name" : "2.0 S2",
//			"start_date" : "12 MAY 2014",
//			"targetDate" : "23 MAY 2014",
//			"esfilter" : {"term" : {"target_milestone" : "2.0 S2 (23may)"}},
//			"partitions" : [
//				{"name" : "Blocking", "esfilter" : {"and" : [
//					{"terms" : {"cf_blocking_b2g" : ["2.0+", "1.5+"]}}
//				]}},
//				{"name" : "Targeted", "esfilter" : {"and" : [
//					{"exists" : {"field" : "target_milestone"}},
//					{"not" : {"term" : {"target_milestone" : "---"}}}
//				]}}
//
//			]
//		},
//
//		{
//			"name" : "2.0 S3",
//			"start_date" : "26 MAY 2014",
//			"targetDate" : "6 JUNE 2014",
//			"esfilter" : {"term" : {"target_milestone" : "2.0 S3 (6june)"}},
//			"partitions" : [
//				{"name" : "Blocking", "esfilter" : {"and" : [
//					{"terms" : {"cf_blocking_b2g" : ["2.0+", "1.5+"]}}
//				]}},
//				{"name" : "Targeted", "esfilter" : {"and" : [
//					{"exists" : {"field" : "target_milestone"}},
//					{"not" : {"term" : {"target_milestone" : "---"}}}
//				]}}
//
//			]
//		},
//		{
//			"name" : "Firefox32",
//			"start_date" : "29 APR 2014",
//			"targetDate" : "9 JUN 2014",  //END OF
//			"dateMarks" : [
//				{"name" : "FF32 Target", "date" : "10 june 2014", "style" : {strokeStyle : "black", verticalOffset : 20}}
//			],
//			"needed_fields" : ["target_milestone", "cf_blocking_loop"],
//			"partitions" : [
//				{"name" : "Blocking",
//					"esfilter" : {"and" : [
//						{"term" : {"cf_blocking_loop" : "fx32+"}}
//					]}
//				},
//				{"name" : "Targeted",
//					"esfilter" : {"and" : [
//						{"term" : {"target_milestone" : "mozilla32"}},
//						{"not" : {"term" : {"cf_blocking_loop" : "fx32+"}}}  // UNFORTUNATE REDUNDANCY
//					]}
//				}
//			]
//		},
//
//		{
//
//			"name" : "2.0 S4",
//			"start_date" : "9 JUN 2014",
//			"targetDate" : "20 JUN 2014",
//			"esfilter" : {"term" : {"target_milestone" : "2.0 S4 (20june)"}},
//			"partitions" : [
//				{"name" : "Blocking", "esfilter" : {"and" : [
//					{"terms" : {"cf_blocking_b2g" : ["2.0+", "1.5+"]}}
//				]}},
//				{"name" : "Targeted", "esfilter" : {"and" : [
//					{"exists" : {"field" : "target_milestone"}},
//					{"not" : {"term" : {"target_milestone" : "---"}}}
//				]}}
//
//			]
//		},
//
//		{
//			"name" : "2.0 S5",
//			"start_date" : "23 JUN 2014",
//			"targetDate" : "4 JULY 2014",
//			"esfilter" : {"term" : {"target_milestone" : "2.0 S5 (4july)"}},
//			"partitions" : [
//				{"name" : "Blocking", "esfilter" : {"and" : [
//					{"terms" : {"cf_blocking_b2g" : ["2.0+", "1.5+"]}}
//				]}},
//				{"name" : "Targeted", "esfilter" : {"and" : [
//					{"exists" : {"field" : "target_milestone"}},
//					{"not" : {"term" : {"target_milestone" : "---"}}}
//				]}}
//
//			]
//		},
//
//		{
//			"name" : "2.0 S6",
//			"start_date" : "7 JULY 2014",
//			"targetDate" : "18 JULY 2014",
//			"esfilter" : {"term" : {"target_milestone" : "2.0 S6 (18july)"}},
//			"partitions" : [
//				{"name" : "Blocking", "esfilter" : {"and" : [
//					{"terms" : {"cf_blocking_b2g" : ["2.0+", "1.5+"]}}
//				]}},
//				{"name" : "Targeted", "esfilter" : {"and" : [
//					{"exists" : {"field" : "target_milestone"}},
//					{"not" : {"term" : {"target_milestone" : "---"}}}
//				]}}
//
//			]
//		},
//
//		{
//			"name" : "Firefox33",
//			"start_date" : "10 JUN 2014",
//			"targetDate" : "21 JUL 2014",
//			"dateMarks" : [
//				{"name" : "FF33 Target", "date" : "22 July 2014", "style" : {strokeStyle : "black", verticalOffset : 20}}
//			],
//			"needed_fields" : ["target_milestone", "cf_blocking_loop"],
//			"partitions" : [
//				{"name" : "Blocking", "esfilter" : {"and" : [
//					{"term" : {"cf_blocking_loop" : "fx33+"}}
//				]}},
//				{"name" : "Targeted", "esfilter" : {"and" : [
//					{"term" : {"target_milestone" : "mozilla33"}},
//					{"not" : {"term" : {"cf_blocking_loop" : "fx33+"}}}  // UNFORTUNATE REDUNDANCY
//				]}}
//			]
//		},
//		{
//			"name" : "Firefox34",
//			"start_date" : "22 JUL 2014",
//			"targetDate" : "1 SEP 2014",
//			"dateMarks" : [
//				{"name" : "FF34 Target", "date" : "2 sep 2014", "style" : {strokeStyle : "black", verticalOffset : 20}}
//			],
//
//			"needed_fields" : ["target_milestone", "cf_blocking_loop"],
//			"partitions" : [
//				{"name" : "Blocking", "esfilter" : {"and" : [
//					{"term" : {"cf_blocking_loop" : "fx34+"}}
//				]}},
//				{"name" : "Targeted", "esfilter" : {"and" : [
//					{"term" : {"target_milestone" : "mozilla34"}},
//					{"not" : {"term" : {"cf_blocking_loop" : "fx34+"}}}  // UNFORTUNATE REDUNDANCY
//				]}}
//			]
//		},
//		{
//			"name" : "Firefox35",
//			"start_date" : "1 sep 2014",
//			"targetDate" : "13 oct 2014",
//			"dateMarks" : [
//				{"name" : "FF35 Target", "date" : "24 oct 2014", "style" : {strokeStyle : "black", verticalOffset : 20}}
//			],
//
//			"needed_fields" : ["target_milestone", "cf_blocking_loop"],
//			"partitions" : [
//				{"name" : "Blocking", "esfilter" : {"and" : [
//					{"term" : {"cf_blocking_loop" : "fx35+"}}
//				]}},
//				{"name" : "Targeted", "esfilter" : {"and" : [
//					{"term" : {"target_milestone" : "mozilla35"}},
//					{"not" : {"term" : {"cf_blocking_loop" : "fx35+"}}}  // UNFORTUNATE REDUNDANCY
//				]}}
//			]
//		},
//		{
//			"name" : "Firefox36",
//			"start_date" : "14 OCT 2014",
//			"targetDate" : "24 nov 2014",
//			"dateMarks" : [
//				{"name" : "FF36 Target", "date" : "25 nov 2014", "style" : {strokeStyle : "black", verticalOffset : 20}}
//			],
//
//			"needed_fields" : ["target_milestone", "cf_blocking_loop"],
//			"partitions" : [
//				{"name" : "Blocking", "esfilter" : {"and" : [
//					{"term" : {"cf_blocking_loop" : "fx36+"}}
//				]}},
//				{"name" : "Targeted", "esfilter" : {"and" : [
//					{"term" : {"target_milestone" : "mozilla36"}},
//					{"not" : {"term" : {"cf_blocking_loop" : "fx36+"}}}  // UNFORTUNATE REDUNDANCY
//				]}}
//			]
//		}
		{
			"name" : "FxOS 2.5",
			"start_date" : "13 JUL 2015",
			"targetDate" : "02 OCT 2015",
			"dateMarks" : [
				{"name" : "Fx2.5 Target", "date" : "02 OCT 2015", "style" : {strokeStyle : "black", verticalOffset : 20}}
			],
			"needed_fields" : ["cf_blocking_b2g"],
			"partitions" : [
				{"name" : "Blocking", "esfilter" : {"and" : [
					{"term" : {"cf_blocking_b2g" : "2.5+"}}
				]}}
			]
		},

	].appendArray(Sprints).sort(function(a, b){
			if (Date.newInstance(a.targetDate) > Date.newInstance(b.targetDate)) return 1;
			if (Date.newInstance(a.targetDate) < Date.newInstance(b.targetDate)) return -1;
			if (Date.newInstance(a.start_date) > Date.newInstance(b.start_date)) return -1;
			if (Date.newInstance(a.start_date) < Date.newInstance(b.start_date)) return 1;
			return 0;
		})},

	{"name" : "CountType", "index" : "bugs", "isFacet" : true, "partitions" : [
		{"name" : "Regressions", "esfilter" : {"and" : [
			{"term" : {"keywords" : "regression"}},
			Mozilla.BugStatus.Open.esfilter
		]}},
		{"name" : "Open", "esfilter" : Mozilla.BugStatus.Open.esfilter},
		{"name" : "Closed", "esfilter" : Mozilla.BugStatus.Closed.esfilter}
	]},
	{"name" : "ChurnType", "partitions" : [
		{"name" : "Dups", "style" : {"color" : "#dddddd"}, "esfilter" : {"terms" : {"resolution" : ["duplicate", "worksforme"]}}},
		{"name" : "Regression", "esfilter" : {"term" : {"keywords" : "regression"}}},
		{"name" : "Blocker", "esfilter" : {"and" : [
			{"or" : [
				{"terms" : {"cf_blocking_b2g" : ["1.3+", "1.3t+", "1.4+", "2.0+", "2.1+", "2.2+", "2.5+", "3.0+"]}},
				{"terms" : {"cf_blocking_loop" : ["fx30+", "fx31+", "fx32+", "fx33+", "fx34+", "fx35+", "fx36+", "fx37+", "fx38+", "fx39+", "fx40+", "fx41+", "fx42+", "fx43+", "fx44+"]}}
			]}
		]}},
		{"name" : "Targeted",
			"style" : {"color" : "#9467bd", "visibility" : "hidden"},
			"esfilter" : {"and" : [
				{"exists" : {"field" : "target_milestone"}},
				{"not" : {"term" : {"target_milestone" : "---"}}}
			]}
		},
		{"name" : "Other", "style" : {"color" : "#dddddd"}, "esfilter" : {"match_all" : {}}}
	]}

]);

