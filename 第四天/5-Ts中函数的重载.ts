//函数声明
function message(options: object): void;
function message(text: string, onClose?: Function): void;
function message(text: string, mode: string, duration?: number): void;
function message(text: string, duration?: number, onClose?: Function): void;

//函数实现
function message(
  param1?: string | object,
  param2?: number | Function | string,
  param3?: Function | number
): void {
  console.log("11111");
}
message({
  mode: "mode",
  text: "text",
  onClose: function () {},
  duration: 3000,
});

message("text");
message("text", function () {});
message("text", "mode");
message("text", "mode", 3000);
message("text", 3000);
message("text", 3000, function () {});

export default {};

interface ShowMessage {
  (options: object): void;
  (text: string, onClose?: Function): void;
  (text: string, mode: string, duration?: number): void;
  (text: string, duration?: number, onClose?: Function): void;
}

interface Utils {
  showMessage: ShowMessage;
}

const utils: Utils = {
  showMessage(
    param1?: string | object,
    param2?: number | Function | string,
    param3?: Function | number
  ) {
    console.log("11111");
  },
};
utils.showMessage({
  mode: "mode",
  text: "text",
  onClose: function () {},
  duration: 3000,
});

utils.showMessage("text");
utils.showMessage("text", function () {});
utils.showMessage("text", "mode");
utils.showMessage("text", "mode", 3000);
utils.showMessage("text", 3000);
utils.showMessage("text", 3000, function () {});
