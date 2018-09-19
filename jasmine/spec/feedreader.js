$(function() {
    //Tests about RSS feeds (allFeeds variable)
    describe('RSS Feeds', function() {

        //Tests if the feeds array is defined and not empty
        it('should be defined and not empty', function() {

            expect(allFeeds).toBeDefined();

            expect(allFeeds.length).not.toBe(0);

        });

        //Tests the feeds url => used another describe, because it's about other objects
        describe("url", function(){

            it ('should be defined', function(){
                allFeeds.forEach(function(feed){
                    expect(feed.url).toBeDefined();
                });
            });

            it ('should be strings', function(){
                //Loop through all the feed urls and checks if they are strings
                allFeeds.forEach(function(feed){
                    expect(typeof feed.url).toBe("string");
                });                
            });

            it ('should be not empty', function(){
                //Loop through all the feed urls and checks if they are not empty
                allFeeds.forEach(function(feed){
                    expect(feed.url).not.toBe('');
                });
            });
        });

        //Tests name, the same way as the url are tested

        describe("name", function(){
            
            it ('should be defined', function(){
                allFeeds.forEach(function(feed){
                    expect(feed.name).toBeDefined();
                });
            });

            it ('should be strings', function(){
                allFeeds.forEach(function(feed){
                    expect(typeof feed.name).toBe("string");
                });                
            });

            it ('should be not empty', function(){
                allFeeds.forEach(function(feed){
                    expect(feed.name).not.toBe('');
                });
            });
        });
    });

    describe('The menu', function(){
        it('should be hidden by default', function(){
            var bodyClasses = document.querySelector('body').classList;
            expect(bodyClasses).toContain('menu-hidden');
            //TODO: teste pra ver se o menu está escondido por default
            // Verificar se existe a classe hide menu no body quando em jQuery (hasClass(classe))
            // No vanillaJS usar o classList (pegar o elemento por selector, e usar a função classList)
            // Jasmine => toContain (verifica se o objeto tem um certo de pedaço)
        });

        it('should have visibility changed on click', function(){
            //Selects the list of classes of the body, which defines if the menu is displayed or hidden
            var menuClassList = document.querySelector('body').classList;
            //Selects the menu icon
            debugger;
            var menuIcon = document.querySelector('.menu-icon-link');
            //clicks the menu icon and expect the menu to be displayed (no menu hidden class)
            menuIcon.click();
            expect(menuClassList.value).not.toContain('menu-hidden');
            //clicks the menu icon again and expect the menu to be hidden (menu hidden class)
            menuIcon.click();
            expect(menuClassList.value).toContain('menu-hidden');
        });
    });

    describe('Initial entries', function(){
        var firstFeed;
        beforeEach(function(done){
            loadFeed(0,function(){
                //sets the value of firstFeed to the HTML inside .feed
                firstFeed = $('.feed')[0].innerHTML;
                done();
            });
        });
        it('should have at least one .entry element in the .feed container when loadFeed completes it\'s work',function(){
            //checks if the HTML inside .feed has at least one .entry
            expect(firstFeed.indexOf('class="entry-link"')).not.toBe(-1);
        });
    });

    describe('New Feed Selection', function(){
        var firstFeed,
            secondFeed;
            //Use the beforeEach function as well as callback functions to test async code.
        beforeEach(function(done){
            loadFeed(0,function(){
                //Atributes the innerHTML of the feed(0) as firstFeed, and call loadFeed(1)
                firstFeed = $('.feed')[0].innerHTML;
                loadFeed(1,function(){
                //Atributes the innerHTML of the feed(1) as secondFeed, and calls done() to continue to the spec
                    secondFeed = $('.feed')[0].innerHTML;
                    done();
                });
            });

        });

        it('should have it\'s content changed when loadFeed runs', function(){
            //Tests if the second feed has the first feed.
            //It will be false if the second feed has the first feed in it.
            expect(secondFeed).not.toEqual(firstFeed);
        });
    });
}());