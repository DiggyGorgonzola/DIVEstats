function downloadCSV() {
    let csv = 'game,score\n';
    const points = JSON.parse(localStorage.getItem("chartData")) || [];
    points.forEach(point => {
        csv += `${point.x},${point.y}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'dive-scores.csv';
    a.click();

    URL.revokeObjectURL(url);
}

function downloadSeedQuest() {
    let txt = "value,date\n"
    const points = JSON.parse(localStorage.getItem("seedQuest")) || [];
    points.forEach(point => {
        txt += `${point.value},${point.date.toLocaleString([], {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
})}\n`;
    });
    const blob = new Blob([txt], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'seed-quest.csv';
    a.click();

    URL.revokeObjectURL(url);
}

function copySeedsSeen() {

    var q = game.tilesSeen;

    navigator.clipboard.writeText("[" + q.join(", ") + "]");
}