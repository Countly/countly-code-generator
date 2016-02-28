var users = {
    web: function(data){
        var script = "";
        for(var i in data){
            if(i != "custom"){
                script += "        "+i+": \""+data[i]+"\",\n";
            }
        }
        if(script != ""){
            script = "   Countly.user_details({\n"+script.slice(0,-2)+"\n    });\n";
        }
        
        if(data.custom){
            for(var i in data.custom){
                script += "    Countly.userData."+data.custom[i].action+"(\""+i+"\", \""+data.custom[i].value+"\");\n";
            }
        }
        return "<script type='text/javascript'>\n"+
        "Countly.q.push(function(){\n"+
        script+
        "});\n"+
        "</scri" + "pt>";
    }
};