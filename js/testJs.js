var jsonViewer = new JSONViewer();
var jsonObj = {};
document.querySelector("#json").appendChild(jsonViewer.getContainer());
var loadJsonBtn = document.querySelector('#treeViewButton');
var textarea = document.querySelector("#jsonInput");
var setJSON = function () {
    try {
        var value = document.getElementById('jsonInput').value;
        jsonObj = JSON.parse(value);
        document.getElementById("jsonOutput").style.display = "none";
        document.getElementById("errorJson").style.display = "none";
        document.getElementById("outputblock").style.display = "block";
    }
    catch (err) {
        errorJson.innerHTML = `Malformed Json ${err.message} <br> You can still use <strong>Plain Text</strong> button`;
        document.getElementById("errorJson").style.display = "block";
        document.getElementById("jsonOutput").style.display = "none";
        document.getElementById("outputblock").style.display = "none";
    }
};
function loadjsontree() {
    setJSON();
    jsonViewer.showJSON(jsonObj);
}
var downloadJson = function() {
    const jsonDiv = document.getElementById('jsonInput').value;
    var jsonData = parsetext(jsonDiv);
    console.log(jsonData);
    const encodedData = encodeURIComponent(jsonData);
    const downloadLink = document.createElement("a");
    downloadLink.setAttribute("href", "data:application/json;charset=utf-8," + encodedData);
    downloadLink.setAttribute("download", "data.json");
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}
var copyJson = function() {
    var datatext = document.getElementById("jsonInput").value;
    var copyText = parsetext(datatext);
    navigator.clipboard.writeText(copyText);
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied to Clipboard";
}
var parsetext = function (data){
    var a = data;
    for (var b = a.replace(/\n/g, " ").replace(/\r/g, " "), e = [], c = 0, d = !1, f = 0, i = b.length; f < i; f++) {
        var g = b.charAt(f);
        if (d && g === d) b.charAt(f -
            1) !== "\\" && (d = !1);
        else if (!d && (g === '"' || g === "'")) d = g;
        else if (!d && (g === " " || g === "\t")) g = "";
        else if (!d && g === ":") g += " ";
        else if (!d && g === ",") g += "\n" + ' '.repeat(c * 2);
        else if (!d && (g === "[" || g === "{")) c++, g += "\n" + ' '.repeat(c * 2);
        else if (!d && (g === "]" || g === "}")) c--, g = "\n" + ' '.repeat(c * 2) + g;
        e.push(g);
    }
    a = (e.join(""));
    return a;
}