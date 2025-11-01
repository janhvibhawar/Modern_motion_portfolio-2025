const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration:1.5,
        ease:Expo.easeInOut
    })
    .to(".boundingelem", {
       y:0,
       ease:Expo.easeInOut,
       duration:2,
       delay: -1,
       stagger: .2
    })
    .from("#headingfooter", {
        y: '-10',
        opacity: 0,
        duration:1.5,
        delay: -1,
        ease:Expo.easeInOut
    })
}

// var timeout;
// function miniMizeCircle(){
//     //define default scale value
//     var xscale = 1;
//     var yscale = 1;

//     var xprev = 0;
//     var yprev = 0;

//     window.addEventListener("mousemove", function(dets){
//         clearTimeout(timeout);

//         xscale = gsap.utils.clamp(0.8,1.2,dets.clientX - xprev);
//         yscale = gsap.utils.clamp(0.8,1.2,dets.clientY - yprev);

//         xprev = dets.clientX;
//         yprev = dets.clientY;

//        circleMouseFollower(xscale,yscale);
//        timeout = setTimeout(function() {
//         document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
//        }, 100);
//     });
// }

// function circleMouseFollower(xscale,yscale){
//     window.addEventListener("mousemove", function(dets){
//         document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`
//     });
// }  


function miniMizeCircle(){
    var xprev = 0;
    var yprev = 0;
    var timeout;
    var minicircle = document.querySelector("#minicircle");

    window.addEventListener("mousemove", function(dets){
        var xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
        var yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        gsap.to(minicircle, {
            x: dets.clientX,
            y: dets.clientY,
            scaleX: xscale,
            scaleY: yscale,
            duration: 0.2,
            ease: "power3.out"
        });

        clearTimeout(timeout);
        timeout = setTimeout(function(){
            gsap.to(minicircle, {
                scaleX: 1,
                scaleY: 1,
                duration: 0.3,
                ease: "power3.out"
            });
        }, 100);
    });
}


miniMizeCircle();
// circleMouseFollower();
firstPageAnim();

//se;ect 5 elements , apply mousemove on them, track mouse position when ever it is moved means find x and y position , then instead of mouse x and y position show image and move that image, while moving image also rotate it and as the mouse speed increases rotation should also increase

document.querySelectorAll(".elem").forEach(function (elem) {   
    var  rotate = 0;
    var diffrot = 0;

     elem.addEventListener("mouseleave", function(dets) {
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease:Power3,
            duration:.5,
        });
    });

    elem.addEventListener("mousemove", function(dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;

        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease:Power1,
            top:diff,
            left:dets.clientX,
            rotate: gsap.utils.clamp(-20,20,diffrot),
        });
    });
});

document.querySelectorAll(".elem").forEach(elem => {
    const img = elem.querySelector("img");
    const h1 = elem.querySelector("h1");
    const h5 = elem.querySelector("h5");

    elem.addEventListener("mouseenter", function (dets) {
        // instantly appears image below cursor
        gsap.set(img, {
        left: dets.clientX,
        top: dets.clientY,
        opacity: 1
        });


        // fade text
        gsap.to(h1, {
            opacity: 0.3,      // reduce text opacity
            x: 50,             // move text slightly forward (right)
            duration: 0.3,
            overwrite: "auto"
        });

        gsap.to(h5, {
            opacity: 0.3,   // fade only
            duration: 0.3,
            overwrite: "auto"
        });
    });

    elem.addEventListener("mouseleave", () => {
        // hide image
        gsap.to(img, { opacity: 0, duration: 0.3 });

        // restore text
        gsap.to([h1, h5], {
            opacity: 1,
            x: 0,
            duration: 0.3,
            overwrite: "auto"
        });
    });
});

