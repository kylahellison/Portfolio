//when adding a page to the nav menu, need to update the css top values in the javascript, 
//currently -270px, and need to update the padding-top value of the UL in the general scss 

function clickBurger() {
  console.log("hamburger menu was clicked");
    var nav = document.getElementById("nav");
    if (nav.style.top === '-270px') { //was -250
        nav.style.top = '0px';
        nav.style.padding = '51px 0 0 0';
    }
    else {
        nav.style.top ='-270px'; //was -250
        nav.style.padding = '31px 0 0 0';
    }
}
 

 $(document).ready(function() {

    //FUNCTION TO HIDE NAV MENU
        //Click anywhere on the document
        //If nav menu is showing, hide it
    $(document).on("click", function() {
      console.log("closed hamburger menu");
        if ($('#nav').css('top') == ('0px')) {
                $('#nav').css('top', '-270px');  //was -250px
            }
    }); //End function to hide nav menu



//FUNCTION TO HIDE AND SHOW CONTENT ON LARGE SCREENS

    function checkWidth() {
      var width = $(window).width();
      if (width >= 768) {
        console.log("hide all elements except for home");
        $("#about").hide();
        $("#contact").hide();
        $("#portfolio").hide();
        $("#home").show();
      } else {
        console.log("show all elements");
        $("#about").show();
        $("#contact").show();
        $("#portfolio").show();
      }
    }
    checkWidth();
     $(window).resize(checkWidth);


    $('#wide-nav-list a').on('click', function(){
      var targetLI = $(this).parent();
      
       var target = $(this).attr('rel'); //uses the rel attribute to select the user-selected div by its ID (which matches the rel)
       var home = document.getElementById("home");
       var about = document.getElementById("about");
      var portfolio = document.getElementById("portfolio");
       var contact = document.getElementById("contact");

       $("#"+target).show().siblings("div").hide();
       console.log("show/hide siblings based on user click");

       //TEST
        $(targetLI).addClass("selected"); //TEST
        $(targetLI).siblings("li").removeClass("selected");
}); //End function to hide and show content on large screens


  //Show Treehouse Div
  var modal = document.getElementById("modal");
  var btn = document.getElementById("open");
  var close = document.getElementById("close");


// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
    $(".tPoints").fadeIn(3500);
    $(".pie").fadeIn(3000);
    $(".legend").fadeIn(3000);
}

// When the user clicks on <span> (x), close the modal
close.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

}); //END READY



//CODE FOR TREEHOUSE ACHIEVEMENTS
  //Code by Ethan Neff
  // https://codepen.io/ethanneff/pen/NPxzxZ

  
$.ajax('https://teamtreehouse.com/kylahellison.json')
  .done(function(data) {
 // pull was a success
  var items = [];
  $.each( data, function( key, val ) {
    if (key.toLowerCase() === 'points') {
      $.each(val, function( key2, val2 ) {
        if (val2 !== 0) {
          if (key2.toLowerCase() !== 'total') {
            items.push([key2,val2]);
          } else {
            $('strong.total').text(val2);
          }
        }
      });
    }
  });

  // sort
  var sorted = [];
  if (items.length === 0) {
    sorted = items;
  } else {
    sorted = [items.shift()];
  }

  while (items.length > 0) {
    for (i = 0; i < sorted.length; i++) {
      if (items[0][1] > sorted[i][1]) {
        sorted.splice(i,0,items.shift());
        break;
      }
      if (i === sorted.length-1) {
        sorted.push(items.shift());
        break;
      }
    }
  }
  // make into html
  html = [];
  html.push("<ul>");
  for (s in sorted) {
    html.push("<li>");
    html.push("<em>" + sorted[s][0] + "</em>");
    html.push("<span>" + sorted[s][1]  + "</span>");
    html.push("</li>");
  }
  html.push("</ul>");

  // make legend
  $('.legend').append(html.join(""));

  // make pie
  createPie(".legend", ".pie");
  })
  .fail(function() {
    $('.team-treehouse > a > h2').text("Could not connect. Username my be incorrect.");
  })


function sliceSize(dataNum, dataTotal) {
  return (dataNum / dataTotal) * 360;
}

function addSlice(sliceSize, pieElement, offset, sliceID, color) {
  $(pieElement).append("<div class='slice "+sliceID+"'><span></span></div>");
  var offset = offset - 1;
  var sizeRotation = -179 + sliceSize;
  $("."+sliceID).css({
    "transform": "rotate("+offset+"deg) translate3d(0,0,0)"
  });
  $("."+sliceID+" span").css({
    "transform"       : "rotate("+sizeRotation+"deg) translate3d(0,0,0)",
    "background-color": color
  });
}

function iterateSlices(sliceSize, pieElement, offset, dataCount, sliceCount, color) {
  var sliceID = "s"+dataCount+"-"+sliceCount;
  var maxSize = 179;
  if(sliceSize<=maxSize) {
    addSlice(sliceSize, pieElement, offset, sliceID, color);
  } else {
    addSlice(maxSize, pieElement, offset, sliceID, color);
    iterateSlices(sliceSize-maxSize, pieElement, offset+maxSize, dataCount, sliceCount+1, color);
  }
}

function createPie(dataElement, pieElement) {
  var listNames = [];
  var listData = [];
  $(dataElement+" li").each(function() {
    listNames.push($(this).children('em').html());
    listData.push(Number($(this).children('span').html()));
  });

  var listTotal = 0;
  for(var i=0; i<listData.length; i++) {
    listTotal += listData[i];
  }

  var offset = 0;
  var colors = {};
  colors['Android'] = '#5cb860';
  colors['Business'] = '#f9845b';
  colors['CSS'] = '#3079ab';
  colors['Design'] = '#e59a13';
  colors['Development Tools'] = '#637a91';
  colors['HTML'] = '#39add1';
  colors['iOS'] = '#53bbb4';
  colors['Java'] = '#2c9676';
  colors['Javascript'] = '#c25975';
  colors['PHP'] = '#7d669e';
  colors['Python'] = '#f092b0';
  colors['Ruby'] = '#e15258';
  colors['WordPress'] = '#838cc7';
  colors['Digital Literacy'] = '#c38cd4';

  for(var i=0; i<listData.length; i++) {
    var size = sliceSize(listData[i], listTotal);
    var color = '#000000';
    for (var c in colors) {
      if (listNames[i].toLowerCase() === c.toLowerCase()) {
        color = colors[c];
      }
    }

    // make slices
    iterateSlices(size, pieElement, offset, i, 0, color);

    // set legend colors
    $(dataElement+" li:nth-child("+(i+1)+")").css("border-color", color);
    offset += size;
  }
}
