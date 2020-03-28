const wrapper=document.getElementById("wrapper"),SWIPE_THRESHOLD=15,carousel=document.querySelector("#skill-items-container"),nextBtn=document.querySelector("#nav-btn-next"),prevBtn=document.querySelector("#nav-btn-prev"),peekGradient=document.querySelector("#fade-gradient"),navDots=document.querySelector("#nav-dots"),navBar=document.getElementById("navbar"),navMenuBtn=document.getElementById("nav-menu-btn"),navBtnList=document.getElementById("nav-list"),sliderIcon=document.getElementById("slider-icon"),modeCheckbox=document.getElementById("mode-checkbox"),connections=document.getElementById("connections");let xStart=null,yStart=null;const handleWheel=e=>{e.deltaY<0?scrollToPrev():e.deltaY>0&&scrollToNext()},handleTouchStart=e=>{xStart=e.touches[0].clientX,yStart=e.touches[0].clientY},handleTouchEnd=e=>{if(!xStart||!yStart)return;const t=e.changedTouches[0].clientX,n=e.changedTouches[0].clientY,o=xStart-t,r=yStart-n;if(Math.abs(o)>15&&Math.abs(o)>Math.abs(r)){if("skill-items-container"!=e.currentTarget.id)return;o>0?scrollToNextItem():scrollToPrevItem(),xStart=null,yStart=null}else Math.abs(r)>15&&Math.abs(r)>Math.abs(o)&&(r>0?scrollToNext():scrollToPrev(),xStart=null,yStart=null)};function autoSetMode(){const e=(new Date).getHours();(e>=19||e<=5)&&(sliderIcon.classList.remove("fa-sun"),sliderIcon.classList.add("fa-moon"),document.body.classList.add("dark"))}autoSetMode(),window.addEventListener("wheel",handleWheel),wrapper.addEventListener("touchstart",handleTouchStart),wrapper.addEventListener("touchend",handleTouchEnd),carousel.addEventListener("touchstart",handleTouchStart),carousel.addEventListener("touchend",handleTouchEnd),peekGradient.addEventListener("click",e=>{scrollToNextItem()}),nextBtn.addEventListener("click",scrollToNextItem),prevBtn.addEventListener("click",scrollToPrevItem),navDots.addEventListener("click",e=>{scrollToItem(e.target)}),navMenuBtn.addEventListener("click",toggleNavMenu),navBtnList.addEventListener("click",e=>{if("A"==e.target.tagName){e.preventDefault(),toggleNavMenu(),scrollToSection(sections.indexOf(e.target.getAttribute("href")))}}),modeCheckbox.addEventListener("click",e=>{modeCheckbox.checked?(sliderIcon.classList.remove("fa-moon"),sliderIcon.classList.add("fa-sun"),document.body.classList.remove("dark")):(sliderIcon.classList.remove("fa-sun"),sliderIcon.classList.add("fa-moon"),document.body.classList.add("dark"))});const NAV_COLLAPSED="nav-collapsed",NAV_EXPANDED="nav-expanded",BTN_COLLAPSED="fa-bars",BTN_EXPANDED="fa-times";let isNavBarCollapsed=!0;function toggleNavMenu(){window.innerWidth>600||(isNavBarCollapsed?(navBar.classList.remove(NAV_COLLAPSED),navBar.classList.add(NAV_EXPANDED),navMenuBtn.classList.remove("fa-bars"),navMenuBtn.classList.add("fa-times")):(navBar.classList.remove(NAV_EXPANDED),navBar.classList.add(NAV_COLLAPSED),navMenuBtn.classList.remove("fa-times"),navMenuBtn.classList.add("fa-bars")),isNavBarCollapsed=!isNavBarCollapsed)}const Section=Object.freeze({Intro:"#intro",About:"#about",Skills:"#skills",Connect:"#connect"});let currentSectionIdx=0;const sections=[Section.Intro,Section.About,Section.Skills,Section.Connect];let lockScroll=!1;function scrollToNext(){lockScroll||currentSectionIdx<sections.length-1&&(currentSectionIdx++,document.querySelector(sections[currentSectionIdx]).scrollIntoView(!0),setScrollLockTimeout(),animateHeader(currentSectionIdx))}function scrollToPrev(){lockScroll||currentSectionIdx>0&&(currentSectionIdx--,document.querySelector(sections[currentSectionIdx]).scrollIntoView(!0),setScrollLockTimeout(),animateHeader(currentSectionIdx))}function scrollToSection(e){lockScroll||(currentSectionIdx=e,document.querySelector(sections[currentSectionIdx]).scrollIntoView(!0),setScrollLockTimeout(),animateHeader(currentSectionIdx))}function setScrollLockTimeout(){lockScroll=!0,setTimeout(()=>{lockScroll=!1},500)}function reset(){currentSectionIdx=0,document.getElementById("intro").scrollIntoView(!0)}function animateHeader(e){switch(e){case 1:document.getElementById("header-about").classList.add("type-about");break;case 2:document.getElementById("header-skills").classList.add("type-skills");break;case 3:document.getElementById("header-connect").classList.add("type-connect")}}let interval,timeout,original,element,chars="1234567890!&$#?%".split(""),handleRandomizeText=e=>{"A"==e.target.tagName&&(timeout&&clearTimeout(timeout),interval&&clearInterval(interval),element&&(element.innerText=original.join("")),element=0==e.target.children.length?e.target:e.target.children[1],randomizeText())};function randomizeText(){original=element.innerText.split(""),interval=setInterval(()=>{element.innerText=getRandomText(original.slice(0))},80),timeout=setTimeout(()=>{clearInterval(interval),element.innerText=original.join(""),interval=null,element=null,original=null,timeout=null},400)}function getRandomText(e){var t;for(t in e)"\n"!=e[t]&&getRandomBool()&&(e[t]=getRandomChar());return e.join("")}function getRandomChar(){return chars[Math.floor(Math.random()*chars.length)]}function getRandomBool(){return Math.random()>=.5}navBtnList.addEventListener("mouseenter",handleRandomizeText,!0),connections.addEventListener("mouseenter",handleRandomizeText,!0);const navDotToggleClass="nav-dot-current";let currentIdx=0;const items=Array.from(carousel.getElementsByClassName("skill-item")).slice(0,-1),navDotsList=Array.from(document.getElementById("nav-dots").getElementsByClassName("nav-dot"));function scrollToNextItem(){currentIdx>=items.length-1||(navDotsList[currentIdx].classList.remove("nav-dot-current"),currentIdx++,carousel.scrollTo(items[currentIdx].offsetLeft,0),navDotsList[currentIdx].classList.add("nav-dot-current"))}function scrollToPrevItem(){currentIdx<=0||(navDotsList[currentIdx].classList.remove("nav-dot-current"),currentIdx--,carousel.scrollTo(items[currentIdx].offsetLeft,0),navDotsList[currentIdx].classList.add("nav-dot-current"))}function scrollToItem(e){const t=navDotsList.indexOf(e);-1!=t&&(navDotsList[currentIdx].classList.remove("nav-dot-current"),currentIdx=t,carousel.scrollTo(items[currentIdx].offsetLeft,0),navDotsList[currentIdx].classList.add("nav-dot-current"))}function getRelativeX(e){return document.querySelector(e).offsetLeft}