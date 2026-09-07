function downloadCSV() {
    let csv = 'x,y\n';
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