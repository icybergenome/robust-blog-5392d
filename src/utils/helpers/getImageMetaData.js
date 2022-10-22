


export const reader = new FileReader();

reader.onload = (function (){
    return function(evt){
        var imagex = evt.target.result;
        var getImage = [];
        var newimage = new Image();
        newimage.src = imagex;
        alert("the width is: " +newimage.width + " and the height is: " + newimage.height);
        getImage[0] = newimage.width;
        getImage[1] = newimage.height;
    return getImage;
    };
})();



