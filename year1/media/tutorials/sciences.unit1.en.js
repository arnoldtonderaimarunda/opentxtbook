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
        <p>This unit focuses on the scientific concept of using pushes and pulls to put objects in\
	motion, increase or decrease the object’s speed, change direction, or stop motion.</p>\
	\
	<p>Students are familiar with various games that involve the movement of objects, such as a ball. They\
	may not make the connection that the motion of a ball is affected by the strength and direction of\
	pushes and pulls on the ball. Students will explore this concept with both visible and invisible pushes\
	and pulls, contact and noncontact forces. They will recognize that motion is affected by the strength\
	and direction of pushes and pulls, the characteristics of objects, and the surface on which objects are\
	moved. Students will learn how motion changes and develop an understanding that pushes and pulls\
	of all different types are the cause of all changes in movement.</p>\
	\
	<p>In this unit, students investigate what causes changes in motion by exploring pushes and pulls.\
	Students will then use prior knowledge and information gained from their observations during various\
	tests to design a miniature golf course. Students explore concepts that include the following:\
	<ul><li>Pushes and pulls can have different strengths and directions.</li>\
	<li>Pushing and pulling on an object can change the speed or direction of its motion and can start\
	or stop it.</li></ul></p>\
        \
        <p>Engineers and engineering designers use knowledge of forces and motion as they develop solutions\
	to problems and make things that are useful to people. This series of lessons incorporates learning\
	goals that support the principles and practices of engineering design, such as defining problems and\
	evaluating and optimizing possible solutions.</p>\
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
        optionText: "MODULE 1 - Unit Opener",
        displayOrder: 1
    }),
    module2: new undum.Situation({
        enter: function(character, system, from) {
 	    system.setQuality("endurance", character.qualities.endurance+1);
            system.write($("#s_module2").html());
        },
        tags: ["module"],
        optionText: "MODULE 2 - Pushing and Pulling",
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
