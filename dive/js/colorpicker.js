document.addEventListener('DOMContentLoaded', () => {
    const picker1 = document.getElementById('backgroundPicker1');
    const picker2 = document.getElementById('backgroundPicker2');
    const picker3 = document.getElementById('backgroundPicker3');


    const styles = getComputedStyle(document.documentElement);
    const currentColor1 = styles
        .getPropertyValue('--col1')
        .trim();
    picker1.value = currentColor1;
    const currentColor2 = styles
        .getPropertyValue('--col3')
        .trim();
    picker2.value = currentColor2;
    const currentColor3 = styles
        .getPropertyValue('--col4')
        .trim();
    picker3.value = currentColor3;

    picker1.addEventListener('input', () => {
        document.documentElement.style.setProperty(
            '--col1',
            picker1.value
        );
    });
    picker2.addEventListener('input', () => {
        document.documentElement.style.setProperty(
            '--col3',
            picker2.value
        );
    });
    picker3.addEventListener('input', () => {
        document.documentElement.style.setProperty(
            '--col4',
            picker3.value
        );
    });
    });