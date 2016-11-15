
var owner = "bgabor666";
var repository = "csibe-results";
var branch = "experimental";

var arm_targets = [
    "clang-trunk-cortex-m0",
    "clang-trunk-cortex-m4"
];

var x86_targets = [
    "clang-trunk-native"
];

var project_names = [
    "mpgcut-1.1",
    "jpeg-6b",
    "zlib-1.1.4",
    "replaypc-0.4.0.preproc",
    "OpenTCP-1.0.4",
    "bzip2-1.0.2",
    "mpeg2dec-0.3.1",
    "jikespg-1.3",
    "libmspack",
    "compiler",
    "teem-1.6.0-src",
    "ttt-0.10.1.preproc",
    "unrarlib-0.4.0",
    "libpng-1.2.5",
    "flex-2.5.31",
    "cg_compiler_opensrc",
    "lwip-0.5.3.preproc"
];

var compiler_flags = [
    "-Os",
    "-Oz"
];

var chart_div = document.querySelector('#chart_div_cm');

var first_result_date = new Date("2016-09-26");

var chart_filter = {
    arch : "all",
    project : "all",
    flag : "-Os",
    from_date : first_result_date
};

var csv_url_prefix = "https://raw.githubusercontent.com/"
                + owner + "/" + repository + "/" + branch + "/";

var daily_summary_prefix = "https://raw.githubusercontent.com/"
                + owner + "/" + repository + "/" + branch + "/daily-results/";

var processed_days = [];
var csibe_results = [];

google.charts.load('current', { packages: ['corechart', 'line'] });

(function() {
    Date.prototype.toYMD = Date_toYMD;
    function Date_toYMD() {
        var year, month, day;
        year = String(this.getFullYear());
        month = String(this.getMonth() + 1);
        if (month.length == 1)
            month = "0" + month;
        day = String(this.getDate());
        if (day.length == 1)
            day = "0" + day;
        return year + "-" + month + "-" + day;
    }
})();

function findAlias(name) {
    switch (name) {
        case "clang-trunk-cortex-m0-Os":
            return "Clang, Cortex-M0, -Os";
        case "clang-trunk-cortex-m4-Os":
            return "Clang, Cortex-M4, -Os";
        case "clang-trunk-native-Os":
            return "Clang, x86-64, -Os";
        case "clang-trunk-cortex-m0-Oz":
            return "Clang, Cortex-M0, -Oz";
        case "clang-trunk-cortex-m4-Oz":
            return "Clang, Cortex-M4, -Oz";
        case "clang-trunk-native-Oz":
            return "Clang, x86-64, -Oz";
        default:
            return name;
    }
}

function drawChart(columns, rows, title) {
    var chart = new google.visualization.LineChart(chart_div);
    var data = new google.visualization.DataTable();

    for (var i = 0; i < columns.length; i++) {
        columns[i].id = columns[i].label;
        columns[i].label = findAlias(columns[i].label);
        data.addColumn(columns[i]);
    }

    data.addRows(rows);

    var options = {
        title : title,
        hAxis: {
            textPosition: "none",
        },
        tooltip : {
            isHtml : true,
            trigger : "both" // focus and selection
        },
        annotations: {
            style: 'line'
        },
    };

    chart.setAction({
        id: 'show_csv',
        text: 'Show CSV file',
        action: function() {
            var selection = chart.getSelection()[0];
            var platform_and_flag = columns[selection.column].id;
            var revision = rows[selection.row][0];

            for (var current_day of csibe_results) {
                if (current_day.revisions.hasOwnProperty(revision)) {
                    var date_parts = current_day.date.split("-");
                    var file_path = platform_and_flag + "/" + date_parts[0] + "/" + date_parts[1] + "/" + current_day.date + "-" + platform_and_flag + "-r" + revision + "-results.csv";
                    window.open(csv_url_prefix + file_path, '_blank');
                    return;
                }
            }
        }
    });

    chart.draw(data, options);
}

function getURL(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function() {
            var response = {
                url: xhr.responseURL,
                statusCode: xhr.status,
                content: xhr.response
            };
            resolve(response);
        };
        xhr.send();
    });
}

function downloadNecessaryResults() {
    var pending = [];
    var results = [];

    var current_date = new Date();
    var from_date;
    if (chart_filter.from_date == "all")
        from_date = first_result_date.getTime();
    else
        from_date = new Date(chart_filter.from_date).getTime();

    while (current_date.getTime() > from_date) {
        var current_YMD = current_date.toYMD();
        if (processed_days.includes(current_YMD)) {
            current_date.setDate(current_date.getDate() - 1);
            continue;
        }

        var month = String(current_date.getMonth() + 1);
        if (month.length == 1)
            month = "0" + month;
        var daily_result_url = daily_summary_prefix + current_date.getFullYear() + "/" + month + "/" + current_YMD + "-results.json";
        pending.push(getURL(daily_result_url).then(function(response) {
            if (response.statusCode == 200)
                results.push(JSON.parse(response.content));
        }));
        processed_days.push(current_YMD);

        current_date.setDate(current_date.getDate() - 1);
    }

    return Promise.all(pending).then(function() {
        csibe_results = csibe_results.concat(results);
    });
}

function summarizePlatformResultsByProject() {
    // Specify columns
    var columns = [
        { label: "Revision", type: "string" },
        { role: "annotation", type: "date" }
    ];

    var arch = chart_filter.arch;
    var platform_names = [];
    if (arch == "all" || arch == "arm")
        platform_names = platform_names.concat(arm_targets);
    if (arch == "all" || arch == "x86")
        platform_names = platform_names.concat(x86_targets);

    for (var platform of platform_names) {
        if (chart_filter.flag == "all") {
            for (var flag of compiler_flags) {
                columns.push({ label: platform + flag, type: "number" });
            }
        } else
            columns.push({ label: platform + chart_filter.flag, type: "number" });
    }

    // Fill rows
    var rows = [];
    return downloadNecessaryResults().then(function() {
        // Iterate days
        for (var current_day of csibe_results) {
            // Filter by date
            if (new Date(current_day.date) < chart_filter.from_date)
                continue;

            // Iterate revisions
            for (var revision_name in current_day.revisions) {
                if (!current_day.revisions.hasOwnProperty(revision_name))
                    continue;
                var revision = current_day.revisions[revision_name];

                // Iterate platforms
                for (var platform_name in revision) {
                    if (!revision.hasOwnProperty(platform_name))
                        continue;
                    var platform = revision[platform_name];

                    // Filter by platform name and flag
                    var foundInPlatformsList = false;
                    for (var p of platform_names) {
                        if (platform_name.startsWith(p)) {
                            foundInPlatformsList = true;
                            break;
                        }
                    }
                    if (!foundInPlatformsList || !platform.flags.includes(chart_filter.flag) && chart_filter.flag != "all")
                        continue;

                    // Summarize all projects or just the specified one
                    var sum = 0;
                    if (chart_filter.project != "all")
                        sum = platform.projects[chart_filter.project];
                    else
                        sum = platform.sum;

                    // Find or create a new row
                    var current_row = -1;
                    for (var i = 0; i < rows.length; i++) {
                        if (rows[i][0] == revision_name) {
                            current_row = i;
                            break;
                        }
                    }
                    if (current_row == -1) {
                        var new_row = new Array(columns.length);
                        new_row[0] = revision_name;
                        new_row[1] = new Date(current_day.date);
                        current_row = rows.push(new_row) - 1;
                    }

                    // Find the column and insert
                    for (var i = 2; i < columns.length; i++) {
                        var column_name = columns[i].label;
                        if (platform_name == column_name) {
                            rows[current_row][i] = sum;
                            break;
                        }
                    }
                }
            }
        }

        // Sort rows by revisions
        rows.sort(function(a, b){
            return parseInt(a[0]) - parseInt(b[0]);
        });

        var today = new Date();
        var from_date = new Date(chart_filter.from_date);
        var showAnnotations = chart_filter.from_date != "all"
                            && from_date.getTime() >= today.getTime() - 864010000;  // 10 days

        if (showAnnotations) {
            // Show every single day
            var previous_date = first_result_date;
            for (var i = 0; i < rows.length; i++) {
                if (rows[i][1].getTime() == previous_date.getTime())
                    rows[i][1] = null;
                else
                    previous_date = rows[i][1];
            }
        } else {
            // Show the first and the last day
            for (var i = 0; i < rows.length; i++) {
                if (i != 0 && i != rows.length - 1)
                    rows[i][1] = null;
            }
        }
    }).then(function() {
        var chart_data = {
            columns: columns,
            rows: rows
        };
        return chart_data;
    });
}

function showPlatforms() {
    chart_div.innerHTML = "Collecting data...";

    summarizePlatformResultsByProject().then(function(chart_data) {
        var title = "CSiBE code size";
        if (chart_filter.project != "all")
            title += " of " + chart_filter.project;

        drawChart(chart_data.columns, chart_data.rows, title);
    });
}
