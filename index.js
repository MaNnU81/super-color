class UColor {

    static random(a = Math.round((Math.random() * 1000)) / 1000) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        return new UColor(r, g, b, a);
    }

    static fromHEX(hexString) {
        const r = parseInt(hexString.slice(1, 3), 16);
        const g = parseInt(hexString.slice(3, 5), 16);
        const b = parseInt(hexString.slice(5, 7), 16);
        let a = 1;
        if (hexString.length === 9) {
            a = parseFloat((parseInt(hexString.slice(7, 9), 16) / 255).toFixed(3));
        }
        return new UColor(r, g, b, a);
    }

    static fromRGBA(rgbaString) {
        const rgbContent = rgbaString.trim().slice(rgbaString.indexOf("(") + 1, -1);
     
        const rgbParts = rgbContent.split(',');
        const r = Number(rgbParts[0]);
        const g = Number(rgbParts[1]);
        const b = Number(rgbParts[2]);
        let a = 1;
        if (Number(rgbParts[3])) {
            a = Number(rgbParts[3]);
        }
        return new UColor(r, g, b, a);
    }

    constructor(r, g, b, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;

    }

    toHEX() {
        const decToHex = dec => dec.toString(16).padStart(2, '0');
        const rHex = decToHex(this.r);
        const gHex = decToHex(this.g);
        const bHex = decToHex(this.b);
        if (this.a === 1) {
            return `#${rHex}${gHex}${bHex}`;
        }
        const aHex = decToHex(Math.round(this.a * 255));
        return `#${rHex}${gHex}${bHex}${aHex}`;
    }

    toRGBA() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`; 
    }

    getGrayScale() {
        const gray = Math.round((this.r * 0.299) + (this.g * 0.587) + (this.b * 0.114));
        return new UColor(gray, gray, gray, this.a); 
    }

    getContrastColor() {
        const brightness = (this.r * 0.2126) + (this.g * 0.7152) + (this.b * 0.0722);
        const invertedBrightness = 255 - brightness;
    
        const newR = Math.min(255, Math.max(0, this.r + (invertedBrightness - brightness)));
        const newG = Math.min(255, Math.max(0, this.g + (invertedBrightness - brightness)));
        const newB = Math.min(255, Math.max(0, this.b + (invertedBrightness - brightness)));
    
        return new UColor(newR, newG, newB, this.a);
    }
    // getContrastColor() {
    //     const brightness = (this.r * 0.2126) + (this.g * 0.7152) + (this.b * 0.0722);
    //     let contrastValue;
    //     if (brightness >= 128) {
    //        contrastValue = 128 - (brightness - 128);
    //     } else {
    //         contrastValue = 128 + (128 - brightness);
    //     }
        
    //     const newR = contrastValue - ()
    //     const newG
    //     const newB
    // }

    getPalette() {

    }

}


const ucolor1 = new UColor(12, 34, 27);
const ucolor2 = UColor.fromHEX('#ff340031');
const ucolor3 = UColor.random()
const ucolor4 = UColor.fromRGBA('rgba(255,161,12,0.5)')
const ucolor5 = UColor.fromRGBA('rgb(255,161,12)')
const ucolor6 = UColor.fromRGBA('rgb(255,161,12,0.8)')


console.log(ucolor2.toHEX())//'#ff3400'
console.log(ucolor2.toRGBA())//'rgba(255,52,0,1)'
console.log(ucolor2.getContrastColor())//UColor
// console.log(ucolor2.getPalette())//[UColor, UColor, UColor]
console.log(ucolor2.getGrayScale())//UColor

console.log(ucolor3);
console.log(ucolor1);
console.log(ucolor2);
console.log(ucolor4);
console.log(ucolor5);
console.log(ucolor6);