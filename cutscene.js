export default class Cutscene {
    constructor(name, classReq, IQReq) {
        this.name = name;
        this.classReq = classReq; //Class student must be in for cutscene to appear
        this.IQReq = IQReq; //IQ at which cutscene appears / *can appear ------- *To be implemented later with appearBool
        this.shown = false;
        // this.appearBool = function() {return true};
        this.topText = "";
        this.botText = "";
        this.img = "";
    }

    setTopText(text) {this.topText = text};
    setBotText(text) {this.botText = text};
    setImage(img) {this.img = img};

    // May be implemented later as an additional boolean check besides just classReq and IQReq.

    // setAppearBool(bool) {
    //     this.appearBool = bool;
    // }
}