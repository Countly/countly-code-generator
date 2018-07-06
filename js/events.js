var events = {
    web: function(data){
        return "<script type='text/javascript'>\n"+
        "Countly.q.push(['add_event',"+JSON.stringify(data, null, 3)+"]);\n"+
        "</scri" + "pt>";
    },
    nodejs: function(data){
        return "Countly.add_event("+JSON.stringify(data, null, 3)+");";
    },
    android: function(data){
        var ret, key;
        if(!data.sum && !data.segmentation){
            return 'Countly.sharedInstance().recordEvent("'+data.key+'", '+data.count+');';
        }
        else if(!data.segmentation){
            return 'Countly.sharedInstance().recordEvent("'+data.key+'", '+data.count+', '+data.sum+');';
        }
        else{
            ret = "HashMap<String, String> segmentation = new HashMap<String, String>();\n";
            for(key in data.segmentation){
                ret += 'segmentation.put("'+key+'", "'+data.segmentation[key]+'");\n';
            }
            if(typeof data.sum !== "undefined"){
                return ret + 'Countly.sharedInstance().recordEvent("'+data.key+'", segmentation, '+data.count+', '+data.sum+');';
            }
            else{
                return ret + 'Countly.sharedInstance().recordEvent("'+data.key+'", segmentation, '+data.count+');';
            }
        }
    },
    ios: function(data){
        var ret, key;
        if(!data.sum && !data.segmentation){
            return '[Countly.sharedInstance recordEvent:@"'+data.key+'" count:'+data.count+'];';
        }
        else if(!data.segmentation){
            return '[Countly.sharedInstance recordEvent:@"'+data.key+'" count:'+data.count+' sum:'+data.sum+'];';
        }
        else{
            ret = "NSDictionary* dict = @{";
            for(key in data.segmentation){
                ret += '@"'+key+'":@"'+data.segmentation[key]+'", ';
            }
            ret = ret.slice(0, -2)+"};\n";
            if(typeof data.sum !== "undefined"){
                return ret + '[Countly.sharedInstance recordEvent:@"'+data.key+'" segmentation:dict count:'+data.count+' sum:'+data.sum+'];';
            }
            else{
                return ret + '[Countly.sharedInstance recordEvent:@"'+data.key+'" segmentation:dict count:'+data.count+'];';
            }
        }
    },
    windows: function(data){
        var ret, key;
        if(!data.sum && !data.segmentation){
            return 'Countly.RecordEvent("'+data.key+'", '+data.count+');';
        }
        else if(!data.segmentation){
            return 'Countly.RecordEvent("'+data.key+'", '+data.count+', '+data.sum+');';
        }
        else{
            ret = "Segmentation segmentation = new Segmentation();\n";
            for(key in data.segmentation){
                ret += 'segmentation.Add("'+key+'", "'+data.segmentation[key]+'");\n';
            }
            if(typeof data.sum !== "undefined"){
                return ret + 'Countly.RecordEvent("'+data.key+'", '+data.count+', '+data.sum+', segmentation);';
            }
            else{
                return ret + 'Countly.RecordEvent("'+data.key+'", '+data.count+', segmentation);';
            }
        }
    }
};