document.addEventListener("DOMContentLoaded",function(){
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting){
                entry.target.classList.add("viewing");
            } else {
                entry.target.classList.remove("viewing");
            }
        });
    },{
        threshold : 0.1
    });

    document.querySelectorAll(".first-view, .second-view, .third-view").forEach((el)=>{
        observer.observe(el);
    });
});


