const storage = require('Storage');
var qrData = storage.readJSON('qrcode.json', 1);
var qrImg = require("heatshrink").decompress(atob(qrData.qrCodeImgStr));
var backlight = 0;

if (!qrData.preventBrightnessChangeOnTouch) {
  Bangle.on('touch', function(button, xy) {
    backlight += 0.3;
    if (backlight > 1) backlight = 0;
    Bangle.setLCDBrightness(backlight);
  });
}

if (qrData.boostBacklight) {
  Bangle.setLCDBrightness(1);
}

if (qrData.stayOn) {
  Bangle.setLCDTimeout(0);
}

g.clear(1).setColor(1,1,1).setBgColor(0,0,0);
g.fillRect(0,0,g.getWidth()-1,g.getHeight()-1);
g.drawImage(qrImg,(g.getWidth()-qrImg[0])/2,(g.getHeight()-qrImg[1])/2);

if (!qrData.hideDescription) {
  g.setFontAlign(0,0).setFont("6x8").setColor(0,0,0);
  g.drawString(qrData.description,g.getWidth()/2,g.getHeight()-(g.getHeight()-qrImg[1])/4);
}

g.setColor(1,1,1);
