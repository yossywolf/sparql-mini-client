function submitQuery() {
    var inputUrl = $('#sparql-input-url');
    var inputQuery = $('#sparql-input-query');

    var base = inputUrl.val();
    var query = inputQuery.val();
    var url = base + encodeURIComponent(query);

    setResultForLoading();

    $('#sparql-result-url').html(url);
    sendQuery(url);
}

function sendQuery(url) {
    $.ajax({
      url: url,
      dataType: "jsonp",
      jsonpCallback: "jsonpCallback"
    });
} 

function jsonpCallback(json){
    $('#sparql-result-response').html(JSON.stringify(json, null , "    "));
}

function setResultForLoading() {
    $('#sparql-result-url').html("URL取得中…");
    $('#sparql-result-response').html("実行結果取得中…");   
}

function clearQuery() {
    console.log("clearQuery");
    $('#sparql-input-query').val("select * where {?s ?p ?o}");   
}

function clearResult() {
    $('#sparql-result-url').html("「送信」を押すとここにURLが表示されます。");
    $('#sparql-result-response').html("「送信」を押すとここにレスポンスのJSONが表示されます。");   
}