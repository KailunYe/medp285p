function dragElement(terrariumElement) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    terrariumElement.onpointerdown = pointerDrag;

    function pointerDrag(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onpointermove = elementDrag;
        document.onpointerup = stopElementDrag;
    }

    function elementDrag(e) {
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        terrariumElement.style.top = (terrariumElement.offsetTop - pos2) + 'px';
        terrariumElement.style.left = (terrariumElement.offsetLeft - pos1) + 'px';
    }

    function stopElementDrag() {
        document.onpointerup = null;
        document.onpointermove = null;
    }
}
dragElement(document.getElementById('planet1'));
dragElement(document.getElementById('planet2'));
dragElement(document.getElementById('nebula1'));
dragElement(document.getElementById('nebula2'));
dragElement(document.getElementById('planet3'));
dragElement(document.getElementById('planet4'));
dragElement(document.getElementById('meteor1'));
dragElement(document.getElementById('meteor2'));
