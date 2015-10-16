$(function(){

    var diabloSelector = $(".mp-game-select--diablo"),
        battlefieldSelector = $(".mp-game-select--bf4"),
        h1z1Selector = $(".mp-game-select--h1z1");

    var profileContainer = $(".mp-middle-article"),
        clanMembers = [
            {
                battleTag: "h3llmix%232200",
                identifier: "h3llmix",
                battlefieldProfileName: "h3llmix"
            },
            {
                battleTag: "Nimfo%232123",
                identifier: "nimfo"
            },
            {
                battleTag: "brachux%232981",
                identifier: "brachux"
            },
            {
                battleTag: "Brutus%232631",
                identifier: "brutus",
                battlefieldProfileName: "EvilBrutus"
            },
            {
                battlefieldProfileName: "puisiitis"
            }
        ];

    diabloSelector.hover(function (e) {
        $("#zfgTextZero").toggleClass("zfg-text--white");
    });
    battlefieldSelector.hover(function (e) {
        $("#zfgTextFucks").toggleClass("zfg-text--white");
    });
    h1z1Selector.hover(function (e) {
        $("#zfgTextGiven").toggleClass("zfg-text--white");
    });

    function openTheGate(){
        $('.mp-game-select-container').addClass("mp-game-select-container--top");
        $('.mp-top-half').addClass('mp-top-half--minimized');
        $(".mp-middle-content").addClass('mp-middle-content--maximized');

        setTimeout(function(){
            $('.mp-game-select-container').addClass("mp-game-select-container--left");
            $('.mp-bottom-text-wrapper').addClass('mp-bottom-text-wrapper--top');
        }, 800);

    }

    h1z1Selector.on("click", function (e) {
        var selectedGame = $(e.target),
            otherGames = selectedGame.siblings(":visible").length;

        if(otherGames == 0){
            selectedGame.siblings().show("slow", function (e) {});
        } else {
            selectedGame.siblings().hide("slow", function (e) {
                openTheGate();
            });
        }
    });

    diabloSelector.on("click", function (e) {
        var selectedGame = $(e.target),
            otherGames = selectedGame.siblings(":visible").length;

        if(otherGames == 0){
            selectedGame.siblings().show("slow", function (e) {});
        } else {
            selectedGame.siblings().hide("slow", function (e) {
                openTheGate();
            });
        }

        getDiabloPlayerProfiles(clanMembers);

    });

    battlefieldSelector.on("click", function (e) {
        var selectedGame = $(e.target),
            otherGames = selectedGame.siblings(":visible").length;

        if(otherGames == 0){
            selectedGame.siblings().show("slow", function (e) {});
        } else {
            selectedGame.siblings().hide("slow", function (e) {
                openTheGate();
            });
        }

        getBattlefieldPlayerProfiles(clanMembers);

    });

    var getBattlefieldPlayerProfiles = function(members){
      profileContainer.empty();
        console.log(members)

        members.forEach(function(member){
            if(member.battlefieldProfileName){
                console.log(member)
                APIManager.Battlefield.GetPlayerDetails("pc", member.battlefieldProfileName, function(response){
                    TemplateManager.Battlefield.BuildProfileTemplate(response.player.name, response.player.score, profileContainer);
                })
            }
        })
    };

    var getDiabloPlayerProfiles = function(members){
        profileContainer.empty();

        members.forEach(function(member){
            if(!member.profile){
                APIManager.Diablo.GetDiabloProfile(member.battleTag, function(profile){
                    member.profile = profile;

                    var memberSeaasonalStats = profile.seasonalProfiles.season4,
                        eliteKillsSeason = memberSeaasonalStats.kills.elites,
                        elitesPerParagonLevel = Math.round((eliteKillsSeason / profile.paragonLevelSeasonHardcore) * 100) / 100;

                    TemplateManager.Diablo.BuildProfileTemplate(member.identifier, profile.paragonLevelSeasonHardcore, eliteKillsSeason, profileContainer);
                    var heroesList = $("#" + member.identifier).find(".profile-template_list-of-heroes");

                    console.log("Building profile for :: " + member.identifier);

                    $(".profile-template_list-of-heroes li").off("click");
                    $(".profile-template_list-of-heroes li").on("click", function(e){
                        var heroId = $(e.target).data("hero-id"),
                            ownerBattleTag = $(e.target).data("owner-battletag"),
                            ownerName = $(e.target).data("owner-name");

                        console.log(ownerName)

                        var ownerHeroList = $("#" + ownerName).find(".profile-template_list-of-heroes");

                        APIManager.Diablo.GetCharacterInformation(ownerBattleTag, heroId, function(char){
                            $(ownerHeroList).fadeOut("slow", function(){
                                TemplateManager.Diablo.BuildHeroDetailsTemplate(char, $("#" + ownerName));
                                var heroDetailsContainer = $("#" + ownerName).find(".profile-template_hero-details");
                                $(heroDetailsContainer).fadeIn("slow");

                                $(heroDetailsContainer).on("click", function(){
                                   $(heroDetailsContainer).fadeOut("slow", function(){
                                       $(heroDetailsContainer).remove();
                                       $(ownerHeroList).fadeIn("slow");
                                   })
                                });
                            });
                        })

                    });

                    profile.heroes.forEach(function(hero){
                        if(hero.hardcore && hero.seasonal && !hero.dead){
                            TemplateManager.Diablo.BuildHeroThumbnail(hero, heroesList, hero.class, hero.id, member.battleTag, member.identifier);
                        }
                    });
                })
            } else {
                var profile = member.profile;

                var memberSeaasonalStats = profile.seasonalProfiles.season4,
                    eliteKillsSeason = memberSeaasonalStats.kills.elites,
                    elitesPerParagonLevel = eliteKillsSeason / profile.paragonLevelSeasonHardcore;

                TemplateManager.Diablo.BuildProfileTemplate(member.identifier, profile.paragonLevelSeasonHardcore, eliteKillsSeason, profileContainer);
                var heroesList = $("#" + member.identifier).find(".profile-template_list-of-heroes");

                $(".profile-template_list-of-heroes li").off("click");
                $(".profile-template_list-of-heroes li").on("click", function(e){
                    var heroId = $(e.target).data("hero-id"),
                        ownerBattleTag = $(e.target).data("owner-battletag"),
                        ownerName = $(e.target).data("owner-name");

                    APIManager.Diablo.GetCharacterInformation(ownerBattleTag, heroId, function(char){
                        console.log(char);
                    })

                })
                //https://github.com/h3llmix/zfg.git
                profile.heroes.forEach(function(hero){
                    if(hero.hardcore && hero.seasonal && !hero.dead){
                        TemplateManager.Diablo.BuildHeroThumbnail(hero, heroesList, hero.class, hero.id, member.battleTag, member.identifier);
                    }
                });
            }

        });
    };


});