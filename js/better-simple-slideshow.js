/* var makeBSS=function(a,b){var c=document.querySelectorAll(a),d={},e={init:function(a,b){this.counter=0,this.el=a,this.$items=a.querySelectorAll("figure"),this.numItems=this.$items.length,b=b||{},b.auto=b.auto||!1,this.opts={auto:"undefined"==typeof b.auto?!1:b.auto,speed:"undefined"==typeof b.auto.speed?1500:b.auto.speed,pauseOnHover:"undefined"==typeof b.auto.pauseOnHover?!1:b.auto.pauseOnHover,fullScreen:"undefined"==typeof b.fullScreen?!1:b.fullScreen,swipe:"undefined"==typeof b.swipe?!1:b.swipe},this.$items[0].classList.add("bss-show"),this.injectControls(a),this.addEventListeners(a),this.opts.auto&&this.autoCycle(this.el,this.opts.speed,this.opts.pauseOnHover),this.opts.fullScreen&&this.addFullScreen(this.el),this.opts.swipe&&this.addSwipe(this.el)},showCurrent:function(a){this.counter=a>0?this.counter+1===this.numItems?0:this.counter+1:this.counter-1<0?this.numItems-1:this.counter-1,[].forEach.call(this.$items,function(a){a.classList.remove("bss-show")}),this.$items[this.counter].classList.add("bss-show")},injectControls:function(a){var b=document.createElement("span"),c=document.createElement("span"),d=document.createDocumentFragment();b.classList.add("bss-prev"),c.classList.add("bss-next"),b.innerHTML="&#10094",c.innerHTML="&#10095",d.appendChild(b),d.appendChild(c),a.appendChild(d)},addEventListeners:function(a){var b=this;a.querySelector(".bss-next").addEventListener("click",function(){b.showCurrent(1)},!1),a.querySelector(".bss-prev").addEventListener("click",function(){b.showCurrent(-1)},!1),a.onkeydown=function(a){a=a||window.event,37===a.keyCode?b.showCurrent(-1):39===a.keyCode&&b.showCurrent(1)}},autoCycle:function(a,b,c){var d=this,e=window.setInterval(function(){d.showCurrent(1)},b);c&&(a.addEventListener("mouseover",function(){e=clearInterval(e)},!1),a.addEventListener("mouseout",function(){e=window.setInterval(function(){d.showCurrent(1)},b)},!1))},addFullScreen:function(a){var b=this,c=document.createElement("span");c.classList.add("bss-fullscreen"),a.appendChild(c),a.querySelector(".bss-fullscreen").addEventListener("click",function(){b.toggleFullScreen(a)},!1)},

 addSwipe:function(a){
    var b=this,
    c=new Hammer(a);
    c.on("swiperight",function(){
        b.showCurrent(-1)}),
        
    c.on("swipeleft",function(){
        b.showCurrent(1)})
},

toggleFullScreen:function(a){document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement?document.exitFullscreen?document.exitFullscreen():document.msExitFullscreen?document.msExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen():document.documentElement.requestFullscreen?a.requestFullscreen():document.documentElement.msRequestFullscreen?a.msRequestFullscreen():document.documentElement.mozRequestFullScreen?a.mozRequestFullScreen():document.documentElement.webkitRequestFullscreen&&a.webkitRequestFullscreen(a.ALLOW_KEYBOARD_INPUT)}};[].forEach.call(c,function(a){d=Object.create(e),d.init(a,b)})}; */

var makeBSS = function (el, options) {
    var $slideshows = document.querySelectorAll(el), // a collection of all of the slideshow
        $slideshow = {},
        Slideshow = {
            init: function (el, options) {

                options = options || {}; // if options object not passed in, then set to empty object 
                options.auto = options.auto || false; // if options.auto object not passed in, then set to false
                this.opts = {
                    selector: (typeof options.selector === "undefined") ? "figure" : options.selector,
                    auto: (typeof options.auto === "undefined") ? false : options.auto,
                    speed: (typeof options.auto.speed === "undefined") ? 1500 : options.auto.speed,
                    pauseOnHover: (typeof options.auto.pauseOnHover === "undefined") ? false : options.auto.pauseOnHover,
                    fullScreen: /* (typeof options.fullScreen === "undefined") ? false : options.fullScreen, */ false,
                    swipe: /* (typeof options.swipe === "undefined") ? false : options.swipe */ true
                };
                
                this.counter = 0; // to keep track of current slide
                this.el = el; // current slideshow container    
                this.$items = el.querySelectorAll(this.opts.selector); // a collection of all of the slides, caching for performance
                this.numItems = this.$items.length; // total number of slides
                this.$items[0].classList.add('bss-show'); // add show class to first figure 
                this.injectControls(el);
                this.addEventListeners(el);
                if (this.opts.auto) {
                    this.autoCycle(this.el, this.opts.speed, this.opts.pauseOnHover);
                }
                if (this.opts.fullScreen) {
                    this.addFullScreen(this.el);
                }
                if (this.opts.swipe) {
                    this.addSwipe(this.el);
                }
            },
            showCurrent: function (i) {
                // increment or decrement this.counter depending on whether i === 1 or i === -1
                if (i > 0) {
                    this.counter = (this.counter + 1 === this.numItems) ? 0 : this.counter + 1;
                } else {
                    this.counter = (this.counter - 1 < 0) ? this.numItems - 1 : this.counter - 1;
                }

                // remove .show from whichever element currently has it 
                // http://stackoverflow.com/a/16053538/2006057
                [].forEach.call(this.$items, function (el) {
                    el.classList.remove('bss-show');
                });
  
                // add .show to the one item that's supposed to have it
                this.$items[this.counter].classList.add('bss-show');
            },
            injectControls: function (el) {
            // build and inject prev/next controls
                // first create all the new elements
                var spanPrev = document.createElement("span"),
                    spanNext = document.createElement("span"),
                    docFrag = document.createDocumentFragment();
        
                // add classes
                spanPrev.classList.add('bss-prev');
                spanNext.classList.add('bss-next');
        
                // add contents
                spanPrev.innerHTML = '&laquo;';
                spanNext.innerHTML = '&raquo;';
                
                // append elements to fragment, then append fragment to DOM
                docFrag.appendChild(spanPrev);
                docFrag.appendChild(spanNext);
                el.appendChild(docFrag);
            },
            addEventListeners: function (el) {
                var that = this;
                el.querySelector('.bss-next').addEventListener('click', function () {
                    that.showCurrent(1); // increment & show
                }, false);
            
                el.querySelector('.bss-prev').addEventListener('click', function () {
                    that.showCurrent(-1); // decrement & show
                }, false);
                
                el.onkeydown = function (e) {
                    e = e || window.event;
                    if (e.keyCode === 37) {
                        that.showCurrent(-1); // decrement & show
                    } else if (e.keyCode === 39) {
                        that.showCurrent(1); // increment & show
                    }
                };
            },
            autoCycle: function (el, speed, pauseOnHover) {
                var that = this,
                    interval = window.setInterval(function () {
                        that.showCurrent(1); // increment & show
                    }, speed);
                
                if (pauseOnHover) {
                    el.addEventListener('mouseover', function () {
                        clearInterval(interval);
                        interval = null;
                    }, false);
                    el.addEventListener('mouseout', function () {
                        if(!interval) {
                            interval = window.setInterval(function () {
                                that.showCurrent(1); // increment & show
                            }, speed);
                        }
                    }, false);
                } // end pauseonhover
                
            },
            addFullScreen: function(el){
                var that = this,
                fsControl = document.createElement("span");
                
                fsControl.classList.add('bss-fullscreen');
                el.appendChild(fsControl);
                el.querySelector('.bss-fullscreen').addEventListener('click', function () {
                    that.toggleFullScreen(el);
                }, false);
            },
            addSwipe: function(el){
                var that = this,
                    ht = new Hammer(el);
                ht.on('swiperight', function(e) {
                    that.showCurrent(-1); // decrement & show
                });
                ht.on('swipeleft', function(e) {
                    that.showCurrent(1); // increment & show
                });
            },
            toggleFullScreen: function(el){
                // https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode
                if (!document.fullscreenElement &&    // alternative standard method
                    !document.mozFullScreenElement && !document.webkitFullscreenElement &&   
                    !document.msFullscreenElement ) {  // current working methods
                    if (document.documentElement.requestFullscreen) {
                      el.requestFullscreen();
                    } else if (document.documentElement.msRequestFullscreen) {
                      el.msRequestFullscreen();
                    } else if (document.documentElement.mozRequestFullScreen) {
                      el.mozRequestFullScreen();
                    } else if (document.documentElement.webkitRequestFullscreen) {
                      el.webkitRequestFullscreen(el.ALLOW_KEYBOARD_INPUT);
                    }
                } else {
                    if (document.exitFullscreen) {
                      document.exitFullscreen();
                    } else if (document.msExitFullscreen) {
                      document.msExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                      document.mozCancelFullScreen();
                    } else if (document.webkitExitFullscreen) {
                      document.webkitExitFullscreen();
                    }
                }
            } // end toggleFullScreen
            
        }; // end Slideshow object .....
        
    // make instances of Slideshow as needed
    [].forEach.call($slideshows, function (el) {
        $slideshow = Object.create(Slideshow);
        $slideshow.init(el, options);
    });
};