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
        else if(!data.sum){
            ret = "HashMap<String, String> segmentation = new HashMap<String, String>();\n";
            for(key in data.segmentation){
                ret += 'segmentation.put("'+key+'", "'+data.segmentation[key]+'");\n';
            }
            return ret + 'Countly.sharedInstance().recordEvent("'+data.key+'", segmentation, '+data.count+');';
        }
        else{
            ret = "HashMap<String, String> segmentation = new HashMap<String, String>();\n";
            for(key in data.segmentation){
                ret += 'segmentation.put("'+key+'", "'+data.segmentation[key]+'");\n';
            }
            return ret + 'Countly.sharedInstance().recordEvent("'+data.key+'", segmentation, '+data.count+', '+data.sum+');';
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
        else if(!data.sum){
            ret = "NSDictionary* dict = @{";
            for(key in data.segmentation){
                ret += '@"'+key+'":@"'+data.segmentation[key]+'", ';
            }
            ret = ret.slice(0, -2)+"};\n";
            return ret + '[Countly.sharedInstance recordEvent:@"'+data.key+'" segmentation:dict count:'+data.count+'];';
        }
        else{
            ret = "NSDictionary* dict = @{";
            for(key in data.segmentation){
                ret += '@"'+key+'":@"'+data.segmentation[key]+'", ';
            }
            ret = ret.slice(0, -2)+"};\n";
            return ret + '[Countly.sharedInstance recordEvent:@"'+data.key+'" segmentation:dict count:'+data.count+' sum:'+data.sum+'];';
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
        else if(!data.sum){
            ret = "Segmentation segmentation = new Segmentation();\n";
            for(key in data.segmentation){
                ret += 'segmentation.Add("'+key+'", "'+data.segmentation[key]+'");\n';
            }
            return ret + 'Countly.RecordEvent("'+data.key+'", '+data.count+', segmentation);';
        }
        else{
            ret = "Segmentation segmentation = new Segmentation();\n";
            for(key in data.segmentation){
                ret += 'segmentation.Add("'+key+'", "'+data.segmentation[key]+'");\n';
            }
            return ret + 'Countly.RecordEvent("'+data.key+'", '+data.count+', '+data.sum+', segmentation);';
        }
    }
};