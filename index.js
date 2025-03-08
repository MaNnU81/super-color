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
        // Converti RGB in HSL
        let { h, s, l } = this.rgbToHsl();

        // Trova il colore complementare spostando la tonalità di 180°
        h = (h + 180) % 360;

        // Converti HSL di contrasto di nuovo in RGB
        let { r, g, b } = this.hslToRgb(h, s, l);

        // Restituisce il nuovo colore con lo stesso livello di trasparenza
        return new UColor(r, g, b, this.a);
    }


    getPalette() {
        // Converti RGB in HSL
        let { h, s, l } = this.rgbToHsl();

        // Genera le due tonalità equidistanti
        let h2 = (h + 120) % 360;
        let h3 = (h + 240) % 360;

        // Converti i colori in RGB
        let { r: r2, g: g2, b: b2 } = this.hslToRgb(h2, s, l);
        let { r: r3, g: g3, b: b3 } = this.hslToRgb(h3, s, l);

        // Restituisce un array con il colore originale e i due colori della triade
        return [
            this,  // Il colore originale
            new UColor(r2, g2, b2, this.a),  // Secondo colore (H + 120°)
            new UColor(r3, g3, b3, this.a)   // Terzo colore (H + 240°)
        ];
    }


// Converti RGB in HSL
rgbToHsl() {
    let r = this.r / 255;
    let g = this.g / 255;
    let b = this.b / 255;
    let max = Math.max(r, g, b)
    let min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // Scala di grigi
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
    }
    return { h, s, l };
}






// Converti HSL in RGB
hslToRgb(h, s, l) {
    let r, g, b;
    
    function hueToRgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }

    if (s === 0) {
        r = g = b = l; // Grigio
    } else {
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hueToRgb(p, q, h / 360 + 1 / 3);
        g = hueToRgb(p, q, h / 360);
        b = hueToRgb(p, q, h / 360 - 1 / 3);
    }
    
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}
}





const ucolor1 = new UColor(12, 34, 27);
const ucolor2 = UColor.fromHEX('#ff340031');
const ucolor3 = UColor.random()
const ucolor4 = UColor.fromRGBA('rgba(255,161,12,0.5)')
const ucolor5 = UColor.fromRGBA('rgb(255,161,12)')
const ucolor6 = UColor.fromRGBA('rgb(255,161,12,0.8)')


// console.log(ucolor2.toHEX())//'#ff3400'
// console.log(ucolor2.toRGBA())//'rgba(255,52,0,1)'
// console.log(ucolor2.getContrastColor())//UColor
console.log(ucolor2.getPalette())//[UColor, UColor, UColor]
// console.log(ucolor2.getGrayScale())//UColor

// console.log(ucolor3);
// console.log(ucolor1);
console.log(ucolor2);
// console.log(ucolor4);
// console.log(ucolor5);
// console.log(ucolor6);