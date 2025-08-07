
export class StringWithoutChar {
  static removeChar(strOrigin, oldSubstr, newSubstr) {
    return strOrigin.replaceAll(oldSubstr, newSubstr);
  }
}
