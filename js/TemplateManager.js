var TemplateManager = {
    Diablo:{
        BuildProfileTemplate: function(profileId, seasonalParagon, epp, appendTarget){
            var template = "<div class='profile-template' id='" + profileId + "'>" +
                                "<div class='profile-template_member-name'>" + profileId + " (" + seasonalParagon + ")</div>" +
                                "<div class='profile-template_list-of-heroes'></div>" +
                           "</div>";
            $(appendTarget).append($(template));

        },
        BuildHeroThumbnail: function(hero, appendTarget, heroClass, heroId, battleTag, ownerName){
            var template = "<li data-owner-name='" + ownerName + "' data-hero-id='" + heroId + "' data-owner-battletag='" + battleTag + "' class='" + heroClass + "'>" +
                                "<div class='profile-template_hero-name'>" + hero.name + "</div>" +
                           "</li>";
            $(appendTarget).append($(template));
        },
        BuildHeroDetailsTemplate: function(heroDetails, appendTarget){
            var template = "<div class='profile-template_hero-details'>" +
                                "<div style='margin-bottom: 5px; text-align: center;'>" + heroDetails.name + "</div>" +
                                "<div>Damage: " + heroDetails.stats.damage + "</div>" +
                                "<div>Toughness: " + heroDetails.stats.toughness + "</div>" +
                                "<div>DPS: " + Math.round((heroDetails.stats.attackSpeed * heroDetails.stats.damage) * 100) / 100 + "</div>" +
                           "</div>"
            $(appendTarget).append($(template));
        }
    },
    Battlefield:{
        BuildProfileTemplate: function(profileName, profileScore, appendTarget){
            var template = "<div class='profile-template' id='" + profileName + "'>" +
                                "<div class='profile-template_member-name'>" + profileName + " (" + profileScore + ")</div>" +
                                "<div class='profile-template_list-of-heroes'></div>" +
                           "</div>";
            $(appendTarget).append($(template));
        }
    }
};

