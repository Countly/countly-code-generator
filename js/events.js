var events = {
    web: function(data){
        return "<script type='text/javascript'>\n"+
        "Countly.q.push(['add_event',"+JSON.stringify(data, null, 3)+"]);\n"+
        "</scri" + "pt>";
    },
    android: function(data){
        if(!data.sum && !data.segmentation){
            return 'Countly.sharedInstance().recordEvent("'+data.key+'", '+data.count+');';
        }
        else if(!data.segmentation){
            return 'Countly.sharedInstance().recordEvent("'+data.key+'", '+data.count+', '+data.sum+');';
        }
        else if(!data.sum){
            var ret = "HashMap<String, String> segmentation = new HashMap<String, String>();\n";
            for(var key in data.segmentation){
                ret += 'segmentation.put("'+key+'", "'+data.segmentation[key]+'");\n';
            }
            return ret + 'Countly.sharedInstance().recordEvent("'+data.key+'", segmentation, '+data.count+');';
        }
        else{
            var ret = "HashMap<String, String> segmentation = new HashMap<String, String>();\n";
            for(var key in data.segmentation){
                ret += 'segmentation.put("'+key+'", "'+data.segmentation[key]+'");\n';
            }
            return ret + 'Countly.sharedInstance().recordEvent("'+data.key+'", segmentation, '+data.count+', '+data.sum+');';
        }
    },
    }
};