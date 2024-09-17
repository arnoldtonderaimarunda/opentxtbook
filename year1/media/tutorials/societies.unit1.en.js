// ---------------------------------------------------------------------------
// Edit this file to define your game. It should have at least four
// sets of content: undum.game.situations, undum.game.start,
// undum.game.qualities, and undum.game.init.
// ---------------------------------------------------------------------------

/* A unique id for your game. This is never displayed. I use a UUID,
 * but you can use anything that is guaranteed unique (a URL you own,
 * or a variation on your email address, for example). */
undum.game.id = "be1c95b9-cbc7-48c6-8e6a-89837aa9113e";

/* A string indicating what version of the game this is. Versions are
 * used to control saved-games. If you change the content of a game,
 * the saved games are unlikely to work. Changing this version number
 * prevents Undum from trying to load the saved-game and crashing. */
undum.game.version = "1.0";

/* A variable that changes the fade out speed of the option text on
 * a mobile. */
undum.game.mobileHide = 2000

/* A variable that changes the options fade out speed. */
undum.game.fadeSpeed = 1500

/* A variable that changes the slide up speed after clicking on an
 * option. */
undum.game.slideUpSpeed = 500

/* The situations that the game can be in. Each has a unique ID. */
undum.game.situations = {
    start: new undum.SimpleSituation(
        "<h1>Primary Goals</h1>\
	<h3>The Big Idea</h3><h4>Our world is a place with diverse physical and cultural geography</h4>\
        <p>We live on the planet Earth. Earth is made up of land and water. The water includes large bodies of\
	salt water called oceans, as well as freshwater lakes and rivers of various sizes. The land is divided into\
	seven large areas called continents. These continents contain many different landforms, including tall\
	mountains with snowy peaks, dry deserts, and deep canyons.</p>\
	\
	<p>Plants grow all over Earth’s land. They might make up a deep forest of tall trees, a thick steamy\
	rainforest full of trees and vines, or fields and plains of tall waving grass. Some parts of Earth are so dry\
	that sand covers the ground and only a few plants can survive</p>\
	\
	<p>Animals and plants depend on the land and water to live. Different animals and plants can be found in\
	different areas of Earth, depending on the kind of land and the weather in those areas. In some places,\
	plants and animals are endangered because of loss of habitat, hunting, or climate change.</p>\
        \
        <p>Weather is different all over Earth, and it affects the life of plants, animals, and humans. Very far north\
	and very far south on Earth, the weather is always cold and the ocean stays frozen all year long. In the\
	middle sections of Earth, where the sun’s rays are the most direct, the weather rarely gets cold, but it is\
	often wet.</p>\
	\
        <p>Just as there are many different kinds of plants and animals, there are also many different kinds of\
	people in our world. People have different beliefs and different ways of celebrating important events.\
	They eat different foods and wear different clothes. At the same time, all people share one important\
	characteristic: they are human beings.</p>\
	\
        <p>One way to explore our world is to travel to different places. When people travel to different places,\
	they often rely on maps for information. Maps can help you understand the geography of different\
	parts of the world, which includes Earth’s most important physical and human features, and can help\
	you get to places both near and far.</p>\
	\
	<h3>What the Students Need to Learn</h3><h4>Spatial Sense</h4>\
	<ul><li>What maps and globes represent and how they are used.</li>\
	<li>Rivers, lakes, and mountains: What they are and how they are represented on maps and globes.</li>\
	<li>The location of the Oceans.</li>\
	<li>The location of the North and South Poles.</li>\
	<li>The meaning of some basic terms of spatial orientation necessary for working with maps</li></ul>\
	\
	<h4>An Overview of the Seven Continents</h4>\
	<ul><li>The names and relative locations of the seven continents.</li>\
	<li>Familiar associations with each continent, such as wildlife,landmarks, etc..</li></ul>\
	\
        <p class='transient'><a href='hub'>continue...</a></p>"
    ),

    // NB: The 'hub' situation which is the main list of modules, is
    // defined wholly in the HTML file, and doesn't have an entry in
    // the tutorial.situations dictionary in this file.

    // For variety, here we define a situation using the top-level
    // Situation type. This is a neat approach to generate text by
    // looking it up in the HTML document. For static text that makes
    // more sense than writing it longhand.
    module1: new undum.Situation({
        enter: function(character, system, from) {
            system.setQuality("endurance", character.qualities.endurance+1);
            system.write($("#s_module1").html());
        },
        tags: ["module"],
        optionText: "MODULE 1 - Where Do You Live?",
        displayOrder: 1
    }),
    module2: new undum.Situation({
        enter: function(character, system, from) {
 	    system.setQuality("endurance", character.qualities.endurance+1);
            system.write($("#s_module2").html());
        },
        tags: ["module"],
        optionText: "MODULE 2 - Finding Your Way Around",
        displayOrder: 2
    }),
   todo: new undum.SimpleSituation(
	"<b>&nbsp;</b>",
        {
        enter: function(character, system, from) {
	    system.writeChoices(system.getSituationIdChoices(['#attitude']));
        },

            exit: function(character, system, to) {
            	system.setQuality("skill", character.qualities.skill+1);
		system.setQuality("novice", 1);
            }
        }
    ),
    "character-text": new undum.SimpleSituation(
        "<h1>Character Text</h1>\
        <p>Above the list of qualities is a short piece of text, called\
        the character-text. This describes the character in some way. It\
        can be set by any action or when entering or leaving a situation.\
        It is just regular HTML content, as for all text in Undum. It can\
        also contain Undum links, so this is another place you can put\
        actions that the character can carry out over a long period of time.\
        </p>\
        <p class='transient'>Let's go back to the\
        <a href='hub'>module list</a>. As you do, I'll change the\
        character text. Notice that it is highlighted, just the same as\
        when a quality is altered.</p>",
        {
            exit: function(character, system, to) {
                system.setCharacterText(
                    "<p>We're nearing the end of the road.</p>"
                );
            }
        }
    ),
    "implicit-boost": new undum.SimpleSituation(
        "<strong><p style='color: green'>&#9873; Students attitude has been boosted<span class='transient'></span>.</p><p class='transient'><a href='hub'>Return to the module list...</a>.</p></stong>",
        {
            tags: ["attitude"],
            enter: function(character, system, from) {
                system.animateQuality("attitude", character.qualities.attitude+1)
            },
            optionText: "Boost students attitude",
            displayOrder: 1,
            canView: function(character, system, host) {
                return character.qualities.attitude < 4;
            }
        }
    ),
    "implicit-drop": new undum.SimpleSituation(
        "<strong><p style='color: red'>&#9873; Students attitude has been reduced<span class='transient'></span>.</p><p class='transient'><a href='hub'>Return to the module list...</a>.</p></strong>",
        {
            tags: ["attitude"],
            enter: function(character, system, from) {
                system.animateQuality("attitude", character.qualities.attitude-1)
            },
            optionText: "Reduce students attitude",
            displayOrder: 2,
            canView: function(character, system, host) {
                return character.qualities.attitude > -4;
            }
        }
    ),
    "last": new undum.SimpleSituation(
        "<h1>Where to Go Now</h1>\
        <p>So that's it. We've covered all of Undum. This situation is the\
        end, because it has no further links. The 'The End' message is\
        just in the HTML output of this situation, it isn't anything special\
        to Undum</p>\
        \
        <p>I've added an\
        inspiration quality to your character list. Its time for you to\
        crack open the game file and write your own story.</p>\
        <h1>The End</h1>",
        {
            tags: ["module"],
            optionText: "Finish the Unit",
            displayOrder: 8,
            enter: function(character, system, from) {
                system.setQuality("inspiration", 1);
                system.setCharacterText(
                    "<p>You feel all inspired, why not have a go?</p>"
                );
            }
        }
    )
};

// ---------------------------------------------------------------------------
/* The Id of the starting situation. */
undum.game.start = "start";

// ---------------------------------------------------------------------------
/* Here we define all the qualities that our characters could
 * possess. We don't have to be exhaustive, but if we miss one out then
 * that quality will never show up in the character bar in the UI. */
undum.game.qualities = {
    skill: new undum.IntegerQuality(
        "Skill", {priority:"0001", group:'stats'}
    ),
    endurance: new undum.NumericQuality(
        "Endurance", {priority:"0002", group:'stats'}
    ),
    attitude: new undum.FudgeAdjectivesQuality( // Fudge as in the FUDGE RPG
        "<span title='Skill, Endurance and Attitude are reverently borrowed from the Fighting Fantasy series of gamebooks. The words representing attitude are from the FUDGE RPG. This tooltip is illustrating that you can use any HTML in the label for a quality (in this case a span containing a title attribute).'>Attitude</span>",
        {priority:"0003", group:'stats'}
    ),

    inspiration: new undum.NonZeroIntegerQuality(
        "Inspiration", {priority:"0001", group:'progress'}
    ),
    novice: new undum.OnOffQuality(
        "Novice", {priority:"0002", group:'progress', onDisplay:"&#10003;"}
    )
};

// ---------------------------------------------------------------------------
/* The qualities are displayed in groups in the character bar. This
 * determines the groups, their heading (which can be null for no
 * heading) and ordering. QualityDefinitions without a group appear at
 * the end. It is an error to have a quality definition belong to a
 * non-existent group. */
undum.game.qualityGroups = {
    stats: new undum.QualityGroup(null, {priority:"0001"}),
    progress: new undum.QualityGroup('Progress', {priority:"0002"})
};

// ---------------------------------------------------------------------------
/* This function gets run before the game begins. It is normally used
 * to configure the character at the start of play. */
undum.game.init = function(character, system) {
    character.qualities.skill = 0;
    character.qualities.endurance = 0;
    character.qualities.attitude = 0;
    character.qualities.novice = 5;
    character.qualities.inspiration = 0;
    system.setCharacterText("<p>Students are starting on an exciting journey.</p>");
};
