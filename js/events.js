var events = {
    web: function(data){
        return "<script type='text/javascript'>\n"+
        "Countly.q.push(['add_event',"+JSON.stringify(data, null, 3)+"]);\n"+
        "</scri" + "pt>";
    }
};