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
    },
    ios: function(data){
        var script = "";
        for(var i in data){
            if(i != "custom"){
                if(i == "byear")
                    script += "CountlyUserDetails.sharedInstance.birthYear = "+data[i]+";\n";
                else
                    script += "CountlyUserDetails.sharedInstance."+i+" = @\""+data[i]+"\";\n";
            }
        }
        if(data.custom){
            var map = {
                set: "set",
                set_once: "setOnce",
                increment: "increment",
                multiply: "multiply",
                max: "max",
                min: "min",
                push_unique: "pushUnique",
                pull: "pull",
            };
            for(var i in data.custom){
                if(data.custom[i].action == "increment" || data.custom[i].action == "multiply" || data.custom[i].action == "min" || data.custom[i].action == "max")
                    script += "[CountlyUserDetails.sharedInstance "+map[data.custom[i].action]+":@\""+i+"\" value:"+data.custom[i].value+"];\n";
                else
                    script += "[CountlyUserDetails.sharedInstance "+map[data.custom[i].action]+":@\""+i+"\" value:@\""+data.custom[i].value+"\"];\n";
            }
        }
        return script;
    }
};