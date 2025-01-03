document.getElementById("repDateInput").value = 2024;
createPlots(drivers_reports, "drivers");
createPlots(routes_reports, "routes");
function createPlots(reports, report_type) {
    var root = am5.Root.new(report_type + "chartdiv");

    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    var chart = root.container.children.push(
        am5xy.XYChart.new(root, {
            panY: false,
            wheelY: "zoomX",
            layout: root.verticalLayout,
            maxTooltipDistance: 0
        })
    );

    let [data, names] = createData(reports, report_type);

    var yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
            extraTooltipPrecision: 1,
            renderer: am5xy.AxisRendererY.new(root, {})
        })
    );

    var xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
            baseInterval: { timeUnit: "month", count: 1 },
            renderer: am5xy.AxisRendererX.new(root, {
                minGridDistance: 50
            }),
            tooltipDateFormats: { month: "MMM yyyy" },
            dateFormats: { month: "MMM yyyy" },
            periodChangeDateFormats: { month: "MMM yyyy" }
        })
    );

    function createDriversSeries(name, field) {
        var series = chart.series.push(
            am5xy.SmoothedXLineSeries.new(root, {
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: field,
                valueXField: "date",
                tooltip: am5.Tooltip.new(root, {})
            })
        );

        series.strokes.template.set("strokeWidth", 2);

        series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate('MMM yyyy')}: {valueY}")
        series.data.setAll(data);
    }
    function createRoutesSeries(name, field) {
        var series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: field,
                valueXField: "date",
                tooltip: am5.Tooltip.new(root, {})
            })
        );

        series.columns.template.setAll({
            width: am5.percent(80),
            tooltipText: "[bold]{name}[/]\n{valueX.formatDate('MMM yyyy')}: {valueY}"
        });

        series.data.setAll(data);
    }

    for (let name in names) {
        if (report_type == "drivers")
            createDriversSeries(names[name], name);
        else if (report_type == "routes")
            createRoutesSeries(names[name], name);
    }

    chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "zoomXY",
        xAxis: xAxis
    }));

    yAxis.set("tooltip", am5.Tooltip.new(root, {
        themeTags: ["axis"]
    }));

    var legend = chart.children.push(am5.Legend.new(root, {
      nameField: "categoryX",
      centerX: am5.percent(50),
      x: am5.percent(50)
    }));

    legend.data.setAll(chart.series.values);
}

function createData(reports, rep_type) {
    let data = [];
    let names = [];
    reports.forEach(report => {
        const date = new Date(report.rep_year, report.rep_month - 1, 1).getTime();

        let existingEntry = data.find(entry => entry.date === date);

        if (!existingEntry) {
            existingEntry = { date: date };
            data.push(existingEntry);
        }

        if (rep_type == "drivers") {
            existingEntry[report.personnel_number] = report.hour_count;

            if (!names[report.personnel_number])
                names[report.personnel_number] = report.FIO;
        }
        else if (rep_type == "routes") {
            existingEntry[report.route_id] = report.shifts_count;

            if (!names[report.route_id])
                names[report.route_id] = report.route_name;
        }
    });

    data.sort((a, b) => a.date - b.date);

    return [data, names]
}