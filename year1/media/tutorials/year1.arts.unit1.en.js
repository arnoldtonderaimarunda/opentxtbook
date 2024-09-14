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
        <p>Unit 1 has three main purposes. The first purpose is to increase students'\
	awareness of environmental noises and words within sentences. \
	Paying attention to environmental noises and to words within sentences prepares\
	students to pay attention to sounds within words. The ability to hear sounds\
	(i.e., phonemes) is crucial for writing; when we write a word, we essentially\
	write one symbol (either a single- or multiple-letter spelling) for each sound\
	in the word. For this reason, it is important to begin to increase students’\
	awareness of the sounds they hear.</p>\
        \
        <p>The second purpose of Unit 1 is to teach students to draw a number of\
	writing strokes used to create letters (e.g., horizontal lines, vertical lines,\
	circles, etc.). As students learn to draw these writing strokes, their fine motor\
	skills will increase and they will begin to master the tripod grip. This will\
	prepare students to write letters in Unit 3.</p>\
        \
	<p>The third purpose of Unit 1 is to teach students the meanings of various\
	position words (e.g., right, left, top, bottom, etc.). In Unit 3, students will\
	begin to read and write. Reading and writing are done from left to right and\
	top to bottom, so it will be helpful if students are able to identify the left side,\
	right side, top, and bottom of a page. Additionally, when teaching students to\
	write letters, you will use position words. Finally, you will often use position\
	words when explaining worksheets to students.\
	</p>\
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
        optionText: "MODULE 1 - Emergent Reading and Writing Skills",
        displayOrder: 1
    }),
    todo1: new undum.SimpleSituation(
        "<p><a href='/media/tutorials/worksheet1.1.pdf' class='sticky'>Download worksheet 1.1</a>.</p>",
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
    module2: new undum.Situation({
        enter: function(character, system, from) {
            system.write($("#s_module2").html());
        },
        tags: ["module"],
        optionText: "MODULE 2 - Emergent Reading and Writing Skills",
        displayOrder: 2
    }),
   todo2: new undum.SimpleSituation(
        "<p><a href='/media/tutorials/worksheet2.1.pdf' class='sticky'>Download worksheet 2.1</a>.</p>",
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
        "<p>Students attitude has been boosted<span class='transient'></span>.</p><p class='transient'><a href='hub'>Return to the module list...</a>.</p>",
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
        "<p>Students attitude has been reduced<span class='transient'></span>.</p><p class='transient'><a href='hub'>Return to the module list...</a>.</p>",
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
    "high-attitude-only": new undum.SimpleSituation(
        "<p>Students attitude is higher than 'fair'.</p><p class='transient'><a href='hub'>Return to the module list...</a>.</p>",
        {
            tags: ["attitude"],
            optionText: "High attitude",
            displayOrder: 3,
            canView: function(character, system, host) {
                return character.qualities.attitude > 0;
            }
        }
    ),
    "low-attitude-only": new undum.SimpleSituation(
        "<p>Students attitude is lower than 'fair'.</p><p class='transient'><a href='hub'>Return to the module list...</a>.</p>",
        {
            tags: ["attitude"],
            optionText: "Low attitude",
            displayOrder: 3,
            canChoose: function(character, system, host) {
                return character.qualities.attitude < 0;
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
