// 送信ボタンが押されたとき
function submitQuery() {
    var inputUrl = $('#sparql-input-url');
    var inputQuery = $('#sparql-input-query');

    var base = inputUrl.val();
    var query = inputQuery.val();
    var url = base + encodeURIComponent(query);

    setResultForLoading();

    $('#sparql-submit-time').html(getCurrentDate());
    $('#sparql-result-url').html(url);
    sendQuery(url);
}

// Ajaxの実行
function sendQuery(url) {
    $.ajax({
        url: url,
        dataType: "jsonp"
    }).then(displayJSON)
      .fail(displayError);
} 

// 結果に応じて表示: 成功
function displayJSON(json, status, xhr){
    console.log("Success");
    console.log(xhr);
    $('#sparql-result-response').html(JSON.stringify(json, null , "    "));
}

// 結果に応じて表示: 失敗
function displayError(xhr, textStatus, errorThrown){
    console.log("Error");
    console.log(xhr);
    console.log(textStatus);
    console.log(errorThrown);
    if(xhr.status=="400") {
        // 構文違い
        $('#sparql-result-response').html("SPARQLの構文に誤りがあります");
    } else if(xhr.status=="200") {
        // パースエラー
        $('#sparql-result-response').html("SPARQLの構文に誤りがありませんが，取得したデータをパースできません");
    } else if(xhr.status=="404") {
        var errorText = "HTTPエラー: " + xhr.status + " " + textStatus + "\nサーバが実在する場合はSPARQLの構文に誤りがあるかもしれません。";
        $('#sparql-result-response').html(errorText);
    } else {
        // HTTPエラー
        var errorText = "HTTPエラー: " + xhr.status + " " + textStatus;
        $('#sparql-result-response').html(errorText);
    }
}

// 取得中表示
function setResultForLoading() {
    $('#sparql-result-url').html("URL取得中…");
    $('#sparql-result-response').html("実行結果取得中…");   
}

function getCurrentDate() {
    var d= new Date();
    
    var year = d.getFullYear();
    var month = getZeroAddedStr(d.getMonth()+1);
    var day = getZeroAddedStr(d.getDate());

    var hour = getZeroAddedStr(d.getHours());
    var minute = getZeroAddedStr(d.getMinutes());
    var second = getZeroAddedStr(d.getSeconds());

    var str = year+"/"+month+"/"+day+" "+hour+":"+minute+":"+second;
    return str;
}

function getZeroAddedStr(str) {
    return ("0"+str).slice(-2); 
}

// リセット
function clearQuery() {
    console.log("clearQuery");
    $('#sparql-input-url').val("http://lod.per.c.fun.ac.jp:8080/sparql?default-graph-uri=http://localhost:8080/DAV/hakodate_sweets&format=json&query=");
    $('#sparql-input-query').val("select * where {?s ?p ?o}");  
}

function clearResult() {
    $('#sparql-result-url').html("「送信」を押すとここにURLが表示されます。");
    $('#sparql-result-response').html("「送信」を押すとここにレスポンスのJSONが表示されます。");   
}