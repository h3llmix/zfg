var battleNetAPIMainURL = "https://eu.api.battle.net/",
    battleNetAPIKey = "?locale=en_GB&apikey=hc4vqbxa5mx9tsn9d3pyyvhpsckduupj",
    battleFieldAPIMainURL = "http://api.bf4stats.com/api/";

var APIManager = {
    Diablo:{
        GetDiabloProfile: function(battleTag, cb){
            $.ajax({
                url: battleNetAPIMainURL + "d3/profile/" + battleTag + "/" + battleNetAPIKey,
                success: function(profile){
                    cb(profile);
                }
            }, false);
        },
        GetCharacterInformation: function(battleTag, heroId, cb){
            $.ajax({
                url: battleNetAPIMainURL + "d3/profile/" + battleTag + "/hero/" + heroId + battleNetAPIKey,
                success: function(characterInfo){
                    cb(characterInfo);
                }
            }, false);
        }
    },
    Battlefield:{
        GetPlayerDetails: function(platform, playerName, cb){
            $.ajax({
                url: battleFieldAPIMainURL + "playerInfo?plat=" + platform + "&name=" + playerName + "&output=json",
                success: function(profile){
                    cb(profile);
                }
            }, false);
        }
    }
};
