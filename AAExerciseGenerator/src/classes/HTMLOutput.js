// Corrected and modularized HTMLOutput class with proper constructor and StringBuffer
import { StringBuffer } from './StringBuffer.js';

export class HTMLOutput {
  constructor(sbInText = new StringBuffer(), sbOutText = new StringBuffer()) {
    this.sbInText = sbInText;
    this.sbOutText = sbOutText;
    this.sbHTML = new StringBuffer();
  }

  appendHTMLTableLine(sbHTML, sbIn, index) {
    sbHTML.append('<tr>');
    const str = sbIn.toString().split(',');
    for (let i = index; i < index + 10 && i < str.length; i++) {
      sbHTML.append('<td>');
      sbHTML.append(str[i]);
      sbHTML.append('</td>');
    }
    sbHTML.append('</tr>');
  }

  create() {
    const sbInHex = new StringBuffer();
    const sbInSplited = new StringBuffer();
    const sbOutHex = new StringBuffer();
    const sbOutSplited = new StringBuffer();

    this.sbHTML.append('<html><body><table border=1><tr valign="top"><td><table>');

    for (const c of this.sbInText.toString()) {
      sbInSplited.append(c).append(',');
      sbInHex.append(c.charCodeAt(0).toString(16)).append(',');
    }

    for (const c of this.sbOutText.toString()) {
      sbOutSplited.append(c).append(',');
      sbOutHex.append(c.charCodeAt(0).toString(16)).append(',');
    }

    this.sbHTML.append('<caption>Resultado Gerado</caption>');
    for (let i = 0; i < this.sbInText.toString().length; i += 10) {
      this.appendHTMLTableLine(this.sbHTML, sbInSplited, i);
      this.appendHTMLTableLine(this.sbHTML, sbInHex, i);
    }

    this.sbHTML.append('</table></td><td>');
    this.sbHTML.append('<table border=1>');
    this.sbHTML.append('<caption>Resultado Esperado</caption>');
    for (let i = 0; i < this.sbOutText.toString().length; i += 10) {
      this.appendHTMLTableLine(this.sbHTML, sbOutSplited, i);
      this.appendHTMLTableLine(this.sbHTML, sbOutHex, i);
    }

    this.sbHTML.append('</table></td></tr></table>');
    this.sbHTML.append('</body></html>');
    return this;
  }

  toString() {
    return this.sbHTML.toString();
  }

  reset() {
    this.sbHTML = new StringBuffer();
    return this;
  }

  padding(s, size) {
    if (size < s.length) return s;
    return ' '.repeat(size - s.length) + s;
  }
}
