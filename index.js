import mojs from 'mo-js';
import Animocon from './animocon.js';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';


const iconButton = document.getElementById('icon-button');
const icon = document.getElementById('icon');
new Animocon(iconButton, {
  tweens : [
    // burst animation
    new mojs.Burst({
      parent: 			iconButton,
      radius: 			{30:90},
      count: 				6,
      children : {
        fill: 			'#C0C1C3',
        opacity: 		0.6,
        radius: 		15,
        duration: 	1700,
        easing: 		mojs.easing.bezier(0.1, 1, 0.3, 1)
      }
    }),
    // ring animation
    new mojs.Shape({
      parent: 		iconButton,
      type: 			'circle',
      radius: 		{0: 60},
      fill: 			'transparent',
      stroke: 		'#C0C1C3',
      strokeWidth: {20:0},
      opacity: 		0.6,
      duration: 	700,
      easing: 		mojs.easing.sin.out
    }),
    // icon scale animation
    new mojs.Tween({
      duration : 1200,
      onUpdate: function(progress) {
        if(progress > 0.3) {
          var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
          icon.style.WebkitTransform = icon.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
        }
        else {
          icon.style.WebkitTransform = icon.style.transform = 'scale3d(0,0,1)';
        }
      }
    })
  ],
  onCheck : function() {
    iconButton.style.color = '#988ADE';
  },
  onUnCheck : function() {
    iconButton.style.color = '#C0C1C3';	
  }
});

