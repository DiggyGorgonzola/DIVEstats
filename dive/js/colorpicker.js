document.addEventListener('DOMContentLoaded', () => {
    const picker1 = document.getElementById('backgroundPicker1');
    const picker2 = document.getElementById('backgroundPicker2');
    const picker3 = document.getElementById('backgroundPicker3');


    const styles = getComputedStyle(document.documentElement);
    const currentColor1 = styles
        .getPropertyValue('--col1')
        .trim();
    picker1.value = JSON.parse(localStorage.getItem("col1")) || currentColor1;
    const currentColor2 = styles
        .getPropertyValue('--col3')
        .trim();
    picker2.value = JSON.parse(localStorage.getItem("col2")) || currentColor2;
    const currentColor3 = styles
        .getPropertyValue('--col4')
        .trim();
    picker3.value = JSON.parse(localStorage.getItem("col3")) || currentColor3;


    document.documentElement.style.setProperty("--col1", JSON.parse(localStorage.getItem("col1")) || currentColor1)
    document.documentElement.style.setProperty("--col3", JSON.parse(localStorage.getItem("col2")) || currentColor2)
    document.documentElement.style.setProperty("--col4", JSON.parse(localStorage.getItem("col3")) || currentColor3)
    window.game.actuator.chart.data.datasets[0].borderColor = picker1.value;
    window.game.actuator.chart.data.datasets[0].backgroundColor = picker2.value;
    window.game.actuator.chart.update();
    picker1.addEventListener('input', () => {
        document.documentElement.style.setProperty(
            '--col1',
            picker1.value
        );
        window.game.actuator.chart.data.datasets[0].borderColor = picker1.value;
        window.game.actuator.chart.update();
        localStorage.setItem("col1",JSON.stringify(picker1.value))
    });
    picker2.addEventListener('input', () => {
        document.documentElement.style.setProperty(
            '--col3',
            picker2.value
        );
        window.game.actuator.chart.data.datasets[0].backgroundColor = picker2.value;
        window.game.actuator.chart.update();
        localStorage.setItem("col2",JSON.stringify(picker2.value))
    });
    picker3.addEventListener('input', () => {
        document.documentElement.style.setProperty(
            '--col4',
            picker3.value
        );
        localStorage.setItem("col3",JSON.stringify(picker3.value))

    });
    });